from sqlalchemy.orm import Session
from app.core.database import engine, Base, SessionLocal
from app.models.models import User, Location, Process, Alert, ProcessStatus, AlertType, UserRole
from app.core.security import get_password_hash
from datetime import datetime, timedelta

def init_db():
    # Criar tabelas
    Base.metadata.create_all(bind=engine)
    
    # Criar sessão
    db = SessionLocal()
    
    # Verificar se já existe usuário admin
    admin = db.query(User).filter(User.username == "admin").first()
    if not admin:
        print("Criando usuário admin...")
        # Criar usuário admin
        admin = User(
            email="admin@ecomanager.com",
            username="admin",
            full_name="Administrador do Sistema",
            hashed_password=get_password_hash("password"),
            role=UserRole.ADMIN,
            is_active=True
        )
        db.add(admin)
        db.commit()
        db.refresh(admin)
        
        # Criar localização de exemplo
        location = Location(
            name="Sede Principal",
            description="Localização principal da empresa",
            latitude=-23.5505,
            longitude=-46.6333,
            address="Av. Paulista, 1000"
        )
        db.add(location)
        db.commit()
        db.refresh(location)
        
        # Criar processo de exemplo
        process = Process(
            title="Licenciamento Ambiental",
            description="Processo de licenciamento ambiental para nova unidade",
            status=ProcessStatus.IN_ANALYSIS,
            priority="alta",
            due_date=datetime.now() + timedelta(days=30),
            location_id=location.id,
            created_by_id=admin.id
        )
        db.add(process)
        
        # Criar alerta de exemplo
        alert = Alert(
            title="Níveis de PM2.5 acima do normal",
            message="Detectados níveis elevados de partículas PM2.5 na zona industrial",
            alert_type=AlertType.WARNING,
            location_id=location.id,
            user_id=admin.id,
            is_read=False
        )
        db.add(alert)
        
        db.commit()
        print("Dados iniciais criados com sucesso!")
    else:
        print("Banco de dados já inicializado!")
    
    db.close()

if __name__ == "__main__":
    print("Inicializando banco de dados...")
    init_db()
