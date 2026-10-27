# ADR 001: Definição da Stack Tecnológica, Arquitetura e Estratégia de Internacionalização

**Status:** Aprovado  
**Data:** 27 de Outubro de 2026  
**Contexto:** Plataforma Internacional de Turismo ForTurismo (Piloto MVP)  

---

## 1. Contexto do Problema
A ForTurismo necessita de uma plataforma web de alto padrão visual, multilíngue (inicialmente Português, Inglês e Espanhol), com foco em dispositivos móveis (mais de 85% do público de viagens converte via smartphone), tempo de carregamento inferior a 2 segundos em qualquer lugar do mundo (Ásia, Oriente Médio, Américas e Europa) e integração fluida com o WhatsApp para conversão de reservas com 14 guias turísticos credenciados.

## 2. Decisões Arquiteturais Tomadas

### 2.1 Framework e Renderização: Next.js (App Router + React + TypeScript)
- **Decisão:** Utilização do Next.js com App Router e Server-Side Rendering (SSR) / Static Site Generation (SSG).
- **Justificativa:** 
  1. Suporte nativo a *React Server Components* (RSC), reduzindo dramaticamente o tamanho do bundle JavaScript enviado para o celular do viajante.
  2. Mecanismo de otimização de imagens (`next/image`), fundamental para um site de turismo que exibe fotos de alta resolução dos destinos e guias em formatos modernos (AVIF/WebP) com lazy loading e responsive breakpoints.
  3. Facilidade de roteamento internacionalizado (`/[locale]/...`) e excelente pontuação em Core Web Vitals (LCP, FID/INP, CLS).

### 2.2 Internacionalização (i18n): Roteamento por Subcaminho com Dicionários Tipados
- **Decisão:** Estrutura baseada em rotas com prefixo de idioma (`/pt`, `/en`, `/es`).
- **Justificativa:** 
  1. URLs canônicas limpas e altamente indexáveis por motores de busca regionais (Google Brasil, Google Internacional, etc.), permitindo configuração de tags `hreflang`.
  2. Preservação do contexto na troca de idiomas (se o usuário estiver no perfil do guia de Dubai em `/pt/guides/ahmed-al-mansoor` e trocar para inglês, vai diretamente para `/en/guides/ahmed-al-mansoor`).
  3. Suporte a traduções tanto para strings de interface (botões, menus, rodapés) quanto para conteúdo dinâmico (biografias, descrições de roteiros).

### 2.3 Estilização e Design System: Tailwind CSS + Lucide Icons
- **Decisão:** Tailwind CSS com design tokens personalizados para a paleta de turismo internacional (tons de azul safira/oceano, areia dourada e esmeralda), tipografia refinada e ícones leves com Lucide Icons.
- **Justificativa:** Ausência de runtime CSS (zero overhead de performance), design responsivo intuitivo com breakpoints mobile-first (`sm`, `md`, `lg`, `xl`), componentes acessíveis e consistência visual premium.

### 2.4 Motor de Conversão & WhatsApp Dispatcher
- **Decisão:** Fluxo híbrido com registro de lead antes do disparo para o WhatsApp.
- **Justificativa:** 
  1. Se apenas colocássemos um link direto para o WhatsApp, perderíamos rastreabilidade e métricas caso o usuário fechasse o navegador ou tivesse problemas de conexão.
  2. O formulário valida os dados (datas, número de passageiros, guia escolhido, idioma de preferência) no cliente com Zod, gera um código de referência unívoco (#FOR-XXXX-XXXX) e abre o WhatsApp com a mensagem pronta e formatada.
  3. No MVP, a mensagem é direcionada ao número central de Concierge da ForTurismo, permitindo gestão unificada e garantia de qualidade na resposta ao viajante.

### 2.5 Camada de Dados para o MVP
- **Decisão:** Estrutura de dados desacoplada e fortemente tipada em TypeScript (`src/types/index.ts` e `src/data/mock-data.ts`).
- **Justificativa:** Permite que o MVP seja executado, testado e validado imediatamente com os 14 guias e experiências sem dependência de banco de dados externo ou latência de rede no piloto, mantendo a camada de serviço (`src/services/...`) idêntica à que será conectada ao Supabase/PostgreSQL na fase de escala.

## 3. Consequências e Benefícios
- **Velocidade de Desenvolvimento:** Criação rápida do MVP sem débito técnico.
- **SEO Ready:** Pronto para competir organicamente em buscas internacionais de turismo.
- **Transição Suave para Produção:** Nenhuma linha de UI precisará ser reescrita quando o banco de dados definitivo ou o gateway de pagamento for acoplado.
