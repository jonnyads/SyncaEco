import sqlite3
import os

# Verificar quais arquivos de banco existem
db_files = []
if os.path.exists('ecomanager.db'):
    db_files.append('ecomanager.db')
if os.path.exists('backend/ecomanager.db'):
    db_files.append('backend/ecomanager.db')

print("=== ARQUIVOS DE BANCO ENCONTRADOS ===")
for db_file in db_files:
    print(f"- {db_file} (tamanho: {os.path.getsize(db_file)} bytes)")

# Se não encontrar nenhum, criar um vazio para demonstração
if not db_files:
    print("Nenhum arquivo de banco encontrado!")
    exit()

# Examinar cada arquivo de banco
for db_file in db_files:
    print(f"\n{'='*50}")
    print(f"EXAMINANDO: {db_file}")
    print('='*50)
    
    try:
        conn = sqlite3.connect(db_file)
        cursor = conn.cursor()

        # Obter lista de tabelas
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()

        if not tables:
            print("Nenhuma tabela encontrada neste banco.")
            conn.close()
            continue

        print("\n=== TABELAS ENCONTRADAS ===")
        for table in tables:
            print(f"- {table[0]}")

        print("\n=== ESTRUTURA DETALHADA ===")
        for table in tables:
            table_name = table[0]
            print(f"\n--- TABELA: {table_name} ---")
            
            # Obter estrutura da tabela
            cursor.execute(f"PRAGMA table_info({table_name});")
            columns = cursor.fetchall()
            
            for col in columns:
                col_id, col_name, col_type, not_null, default_val, primary_key = col
                pk_marker = " [PRIMARY KEY]" if primary_key else ""
                null_marker = " NOT NULL" if not_null else ""
                default_marker = f" DEFAULT {default_val}" if default_val is not None else ""
                print(f"  {col_name}: {col_type}{null_marker}{default_marker}{pk_marker}")
            
            # Obter contagem de registros
            cursor.execute(f"SELECT COUNT(*) FROM {table_name};")
            count = cursor.fetchone()[0]
            print(f"  Total de registros: {count}")
            
            # Se tiver poucos registros, mostrar alguns exemplos
            if count > 0 and count <= 10:
                print("  Dados de exemplo:")
                cursor.execute(f"SELECT * FROM {table_name} LIMIT 3;")
                rows = cursor.fetchall()
                for row in rows:
                    print(f"    {row}")

        print("\n=== RELACIONAMENTOS (FOREIGN KEYS) ===")
        for table in tables:
            table_name = table[0]
            cursor.execute(f"PRAGMA foreign_key_list({table_name});")
            fks = cursor.fetchall()
            if fks:
                print(f"\n{table_name}:")
                for fk in fks:
                    id_fk, seq, table_ref, from_col, to_col, on_update, on_delete, match = fk
                    print(f"  {from_col} -> {table_ref}.{to_col}")

        conn.close()
        
    except Exception as e:
        print(f"Erro ao examinar {db_file}: {e}")
