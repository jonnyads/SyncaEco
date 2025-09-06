import sqlite3

# Conectar ao banco de dados
conn = sqlite3.connect('ecomanager.db')
cursor = conn.cursor()

# Obter lista de tabelas
cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
tables = cursor.fetchall()

print("=== TABELAS ENCONTRADAS ===")
for table in tables:
    print(f"- {table[0]}")

print("\n=== ESTRUTURA DAS TABELAS ===")
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
    print(f"  Registros: {count}")

print("\n=== FOREIGN KEYS ===")
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
