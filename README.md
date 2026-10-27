# 🌍 ForTurismo — International Tourism Platform (Piloto MVP)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FMathewsAugusto%2Fforturismo)

> Plataforma internacional moderna, multilíngue e de alto padrão conectando viajantes do mundo inteiro a **14 guias turísticos locais credenciados** na **Tailândia**, **Dubai / Emirados Árabes Unidos** e **Brasil**.

---

## 🚀 Como Fazer o Deploy Grátis para Apresentação

O projeto está otimizado para o **Next.js 16 (App Router)** e pode ser publicado gratuitamente em 1 minuto na **Vercel** ou **Netlify**:

### Opção 1: Deploy em 1 Clique na Vercel (Recomendado)
1. Acesse: **[https://vercel.com/new/clone?repository-url=https://github.com/MathewsAugusto/forturismo](https://vercel.com/new/clone?repository-url=https://github.com/MathewsAugusto/forturismo)**
2. Faça login com sua conta do GitHub (**MathewsAugusto**).
3. Clique em **"Deploy"**.
4. Em menos de 60 segundos, a Vercel gerará seu link de apresentação público (ex: `https://forturismo.vercel.app`) com certificado SSL e CDN global gratuitos.

---

## 🛠️ Stack Tecnológica

- **Framework:** Next.js 16.4.3 (Turbopack, App Router, React 19)
- **Linguagem:** TypeScript 5+ (Tipagem estrita de ponta a ponta)
- **Estilização:** Tailwind CSS v4 + Lucide React Icons
- **Internacionalização (i18n):** Suporte nativo em tempo real para **Português**, **Inglês** e **Espanhol** com persistência
- **Conversão WhatsApp:** Deep linking com protocolo unívoco de atendimento (`#FOR-2026-XXXX`) e templates traduzidos
- **Backoffice Administrativo:** Painel CRM em `/admin` com gestão de leads, métricas e troca dinâmica do número de WhatsApp

---

## 📂 Documentação de Engenharia de Software

- [Especificação de Requisitos de Software (SRS)](docs/SRS_MVP_Forturismo.md)
- [Especificação de Dados da Rede de 14 Guias e Destinos](docs/SEED_DATA_SPEC.md)
- [ADR 001 — Decisões Arquiteturais e Tech Stack](docs/ADR_001_TECH_STACK_AND_ARCHITECTURE.md)

---

## 🌐 Destinos & Rede Inicial de 14 Guias Credenciados

1. **Tailândia (6 Guias):** Bangkok, Chiang Mai, Phuket/Krabi, Ayutthaya e Chiang Rai (licenças oficiais TAT).
2. **Dubai / Emirados Árabes (5 Guias):** Dubai Antigo/Deira, Modern Dubai, Safári no Deserto e Abu Dhabi (licenças oficiais DTCM e DCT).
3. **Brasil (3 Guias):** Rio de Janeiro, Salvador/Bahia e Foz do Iguaçu (credenciais oficiais CADASTUR MTur).

---

## 💻 Como Rodar Localmente

```bash
# Clone o repositório
git clone https://github.com/MathewsAugusto/forturismo.git

# Acesse o diretório
cd forturismo

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no seu navegador.
Para acessar o painel administrativo, acesse [http://localhost:3000/admin](http://localhost:3000/admin) (Senha padrão: `admin2026`).
