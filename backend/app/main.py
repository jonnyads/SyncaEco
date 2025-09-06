from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.routes import auth, dashboard, processes, monitoring, water_resources, flora_fauna, team, locations, alerts, settings as settings_routes

app = FastAPI(
    title="EcoManager API",
    description="API para Sistema de Gestão Ambiental",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# Incluir rotas
app.include_router(auth.router, prefix="/api/auth", tags=["Autenticação"])
app.include_router(dashboard.router, prefix="/api/dashboard", tags=["Dashboard"])
app.include_router(processes.router, prefix="/api/processes", tags=["Processos"])
app.include_router(monitoring.router, prefix="/api/monitoring", tags=["Monitoramento"])
app.include_router(water_resources.router, prefix="/api/water-resources", tags=["Recursos Hídricos"])
app.include_router(flora_fauna.router, prefix="/api/flora-fauna", tags=["Flora & Fauna"])
app.include_router(team.router, prefix="/api/team", tags=["Equipe"])
app.include_router(locations.router, prefix="/api/locations", tags=["Localizações"])
app.include_router(alerts.router, prefix="/api/alerts", tags=["Alertas"])
app.include_router(settings_routes.router, prefix="/api/settings", tags=["Configurações"])

@app.get("/")
async def root():
    return {"message": "EcoManager API - Sistema de Gestão Ambiental"}

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "ecomanager-api"}

# Configurar CORS para permitir requisições do frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Origem do frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"]
)
