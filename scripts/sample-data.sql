-- Dados de exemplo para o sistema EcoManager
-- Execute após criar as tabelas com as migrações

-- Inserir usuários de exemplo
INSERT INTO users (email, username, full_name, hashed_password, role, is_active) VALUES
('admin@ecomanager.com', 'admin', 'Administrador do Sistema', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8QZqK8e', 'admin', true),
('manager@ecomanager.com', 'manager', 'Gerente Ambiental', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8QZqK8e', 'manager', true),
('analyst@ecomanager.com', 'analyst', 'Analista Ambiental', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj4J/8QZqK8e', 'analyst', true);

-- Inserir localizações de exemplo
INSERT INTO locations (name, description, latitude, longitude, address) VALUES
('Zona Industrial Norte', 'Área industrial norte da cidade', -23.5505, -46.6333, 'Rua Industrial, 123'),
('Centro de Controle', 'Centro de controle ambiental', -23.5505, -46.6333, 'Av. Principal, 456'),
('Reserva Natural', 'Reserva natural protegida', -23.5505, -46.6333, 'Estrada da Reserva, 789');

-- Inserir processos de exemplo
INSERT INTO processes (title, description, status, priority, due_date, location_id, created_by_id) VALUES
('Licenciamento Ambiental - Área Industrial', 'Processo de licenciamento para nova área industrial', 'in_analysis', 'alta', '2024-01-15', 1, 1),
('Monitoramento de Qualidade da Água', 'Monitoramento contínuo da qualidade da água', 'approved', 'media', '2024-01-12', 2, 2),
('Relatório de Impacto Ambiental', 'Relatório de impacto ambiental para nova construção', 'pending', 'alta', '2024-01-20', 3, 3);

-- Inserir alertas de exemplo
INSERT INTO alerts (title, message, alert_type, location_id, user_id, is_read) VALUES
('Níveis de PM2.5 acima do normal', 'Detectados níveis elevados de partículas PM2.5 na zona industrial', 'warning', 1, 1, false),
('Manutenção programada - Estação de Monitoramento', 'Manutenção programada na estação de monitoramento do centro de controle', 'info', 2, 2, false),
('Relatório mensal enviado com sucesso', 'Relatório mensal de monitoramento foi enviado com sucesso', 'success', 3, 3, false);

-- Inserir métricas ambientais de exemplo
INSERT INTO environmental_metrics (metric_type, value, unit, location_id) VALUES
('air_quality', 85.5, 'AQI', 1),
('water_quality', 87.0, '%', 2),
('vegetation_cover', 94.2, '%', 3),
('air_quality', 82.1, 'AQI', 1),
('water_quality', 89.5, '%', 2),
('vegetation_cover', 93.8, '%', 3);
