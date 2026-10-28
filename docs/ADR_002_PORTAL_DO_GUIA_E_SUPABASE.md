# ADR 002: Arquitetura do Portal do Guia, Autenticação OTP via WhatsApp e Supabase

**Status:** Aprovado  
**Data:** 28 de Outubro de 2026  
**Contexto:** Plataforma Internacional ForTurismo — Módulo Portal do Guia  

---

## 1. Contexto do Problema
Com a expansão da ForTurismo para além da vitrine pública de turismo, tornou-se mandatória a criação de uma área restrita e operacional para os 14 guias de turismo credenciados.
Os guias precisam:
1. Acessar suas reservas e novos leads em tempo real diretamente do celular em campo.
2. Bloquear datas e gerenciar sua disponibilidade sem intervenção manual de terceiros.
3. Ser notificados instantaneamente quando um viajante solicitar um roteiro.

Como os guias trabalham em trânsito e em ambientes com conectividade móvel variável, uma autenticação tradicional por usuário e senha causaria atrito, perda de acessos e demora no retorno aos clientes.

---

## 2. Decisões Arquiteturais Tomadas

### 2.1 Autenticação por OTP / Link Mágico via WhatsApp
- **Decisão:** Autenticação sem senha (*passwordless*) baseada no número de WhatsApp oficial cadastrado e verificado do guia.
- **Justificativa:** 
  1. Elimina perda de senhas e necessidade de rotinas complexas de recuperação.
  2. O WhatsApp é a principal ferramenta de trabalho do guia internacional.
  3. Proporciona entrada em 1 toque através de *Magic Link* ou código numérico de 6 dígitos.

### 2.2 Camada de Dados: Supabase (PostgreSQL com Row Level Security)
- **Decisão:** Adoção do Supabase como banco de dados em produção e provedor de autenticação.
- **Justificativa:**
  1. Suporte nativo a políticas de segurança em nível de linha (*Row Level Security - RLS*), garantindo no nível de banco de dados que um guia nunca tenha acesso às reservas, notas ou clientes de outros guias.
  2. Recursos de *Realtime Subscriptions*, permitindo que novas reservas apareçam na tela do guia instantaneamente sem necessidade de recarregar a página.
  3. Escalabilidade internacional com replicação e baixa latência.

### 2.3 Notificações Híbridas (WhatsApp API + E-mail Transacional)
- **Decisão:** Disparo sincronizado em dois canais a cada novo lead.
- **Justificativa:**
  1. **WhatsApp:** Canal de urgência máxima para aviso sonoro no smartphone do guia com SLA de resposta rápida.
  2. **E-mail:** Registro formal com espelho da reserva, detalhes de passageiros e comprovante para o histórico do profissional.

### 2.4 Governança e Autonomia Moderada
- **Decisão:** Autonomia imediata para disponibilidade e bloqueio de calendário; aprovação necessária para catálogo de preços e novos roteiros.
- **Justificativa:**
  1. Preserva a consistência da marca e o padrão de curadoria *quiet luxury* da ForTurismo.
  2. Evita discrepâncias de preços públicos ou passeios fora das diretrizes de qualidade internacionais da plataforma.

---

## 3. Consequências e Próximos Passos
- **Segurança Reforçada:** RLS protege dados sensíveis e atende à conformidade LGPD e GDPR.
- **Experiência do Guia:** Menor tempo de resposta para fechamento de reservas internacionais.
- **Roteiro Técnico:** Adicionar pacote `@supabase/supabase-js` e configurar as variáveis de ambiente no Next.js e no Fly.io (`SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
