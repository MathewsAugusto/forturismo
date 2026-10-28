-- =========================================================================
-- Schema PostgreSQL / Supabase para ForTurismo & Portal do Guia
-- Arquivo: docs/supabase_schema.sql
-- =========================================================================

-- Habilitar extensão para geração de UUID
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. TABELA DE DESTINOS
CREATE TABLE IF NOT EXISTS public.destinations (
    id VARCHAR(50) PRIMARY KEY,
    name_pt VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_es VARCHAR(100) NOT NULL,
    country_code VARCHAR(10) NOT NULL,
    hero_image_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. TABELA DE GUIAS TURÍSTICOS CREDENCIADOS
CREATE TABLE IF NOT EXISTS public.guides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
    destination_id VARCHAR(50) REFERENCES public.destinations(id),
    slug VARCHAR(100) UNIQUE NOT NULL,
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    phone_whatsapp VARCHAR(50) NOT NULL,
    professional_title_pt VARCHAR(150),
    professional_title_en VARCHAR(150),
    professional_title_es VARCHAR(150),
    license_number VARCHAR(100) NOT NULL,
    license_authority VARCHAR(150) NOT NULL,
    rating NUMERIC(3,2) DEFAULT 5.00,
    review_count INT DEFAULT 0,
    years_experience INT DEFAULT 5,
    base_rate_usd NUMERIC(10,2) DEFAULT 250.00,
    is_available BOOLEAN DEFAULT TRUE,
    photo_url TEXT,
    bio_pt TEXT,
    bio_en TEXT,
    bio_es TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BLOQUEIOS DE CALENDÁRIO / INDISPONIBILIDADE DO GUIA
CREATE TABLE IF NOT EXISTS public.guide_availability_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guide_id UUID NOT NULL REFERENCES public.guides(id) ON DELETE CASCADE,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    reason VARCHAR(255),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    CONSTRAINT valid_dates CHECK (end_date >= start_date)
);

-- 4. TABELA DE ROTEIROS / TOURS
CREATE TABLE IF NOT EXISTS public.tours (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    guide_id UUID REFERENCES public.guides(id) ON DELETE SET NULL,
    destination_id VARCHAR(50) REFERENCES public.destinations(id),
    title_pt VARCHAR(200) NOT NULL,
    title_en VARCHAR(200) NOT NULL,
    title_es VARCHAR(200) NOT NULL,
    duration VARCHAR(50) NOT NULL,
    meeting_point VARCHAR(200),
    inclusions JSONB DEFAULT '[]'::jsonb,
    price_usd NUMERIC(10,2) NOT NULL,
    status VARCHAR(30) DEFAULT 'ACTIVE', -- ACTIVE, PENDING_REVIEW, ARCHIVED
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. TABELA DE SOLICITAÇÕES DE RESERVA & LEADS
CREATE TABLE IF NOT EXISTS public.booking_requests (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_code VARCHAR(50) UNIQUE NOT NULL,
    guide_id UUID REFERENCES public.guides(id) ON DELETE SET NULL,
    tour_id UUID REFERENCES public.tours(id) ON DELETE SET NULL,
    destination_id VARCHAR(50) REFERENCES public.destinations(id),
    customer_name VARCHAR(150) NOT NULL,
    customer_email VARCHAR(150) NOT NULL,
    customer_phone VARCHAR(50) NOT NULL,
    travel_date_start DATE NOT NULL,
    travel_date_end DATE NOT NULL,
    pax_adults INT DEFAULT 2,
    pax_children INT DEFAULT 0,
    preferred_locale VARCHAR(10) DEFAULT 'pt',
    special_notes TEXT,
    guide_internal_notes TEXT,
    status VARCHAR(30) DEFAULT 'PENDING', -- PENDING, CONTACTED, CONFIRMED, CANCELLED
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. TABELA DE LOG DE NOTIFICAÇÕES (WHATSAPP E E-MAIL)
CREATE TABLE IF NOT EXISTS public.notification_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    booking_id UUID REFERENCES public.booking_requests(id) ON DELETE CASCADE,
    guide_id UUID REFERENCES public.guides(id) ON DELETE CASCADE,
    channel VARCHAR(20) NOT NULL, -- 'WHATSAPP' ou 'EMAIL'
    recipient VARCHAR(150) NOT NULL,
    status VARCHAR(20) DEFAULT 'SENT', -- 'SENT', 'FAILED', 'DELIVERED'
    sent_at TIMESTAMPTZ DEFAULT NOW()
);

-- =========================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =========================================================================

ALTER TABLE public.guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.guide_availability_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.booking_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tours ENABLE ROW LEVEL SECURITY;

-- Política 1: Vitrine pública pode visualizar guias e roteiros ativos
CREATE POLICY "Leitura pública de guias"
    ON public.guides FOR SELECT
    USING (true);

CREATE POLICY "Leitura pública de roteiros ativos"
    ON public.tours FOR SELECT
    USING (status = 'ACTIVE');

-- Política 2: Guias autenticados podem atualizar seu próprio status
CREATE POLICY "Guia atualiza seu próprio perfil"
    ON public.guides FOR UPDATE
    USING (auth.uid() = user_id);

-- Política 3: Guias gerenciam seus próprios bloqueios de calendário
CREATE POLICY "Guia gerencia seus bloqueios"
    ON public.guide_availability_blocks FOR ALL
    USING (guide_id IN (SELECT id FROM public.guides WHERE user_id = auth.uid()));

-- Política 4: O Guia só enxerga as reservas destinadas a ele
CREATE POLICY "Guia visualiza suas reservas"
    ON public.booking_requests FOR SELECT
    USING (guide_id IN (SELECT id FROM public.guides WHERE user_id = auth.uid()));

CREATE POLICY "Guia atualiza status e notas de suas reservas"
    ON public.booking_requests FOR UPDATE
    USING (guide_id IN (SELECT id FROM public.guides WHERE user_id = auth.uid()));

-- Política 5: Inserção pública de reservas via site
CREATE POLICY "Público pode registrar reservas"
    ON public.booking_requests FOR INSERT
    WITH CHECK (true);
