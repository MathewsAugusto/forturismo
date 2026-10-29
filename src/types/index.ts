export type Locale = 'en' | 'pt' | 'es';

export interface LocalizedString {
  en: string;
  pt: string;
  es: string;
}

export interface LocalizedArray {
  en: string[];
  pt: string[];
  es: string[];
}

export interface Destination {
  id: string;
  slug: string;
  countryCode: string;
  name: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  heroImage: string;
  gallery: string[];
  guideCount: number;
  currency: string;
  currencySymbol: string;
  topAttractions: LocalizedArray;
  travelTips: LocalizedArray;
  bestTimeToVisit: LocalizedString;
}

export interface GuideLanguage {
  code: string;
  name: LocalizedString;
  level: 'native' | 'fluent' | 'conversational';
}

export interface Guide {
  id: string;
  slug: string;
  destinationId: string;
  fullName: string;
  professionalTitle: LocalizedString;
  bio: LocalizedString;
  tagline: LocalizedString;
  avatarUrl: string;
  coverUrl: string;
  licenseNumber: string;
  licenseAuthority: string;
  yearsExperience: number;
  whatsappNumber: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isFeatured: boolean;
  languages: GuideLanguage[];
  specialties: LocalizedArray;
  baseRateUSD: number;
}

export interface Tour {
  id: string;
  slug: string;
  destinationId: string;
  guideId: string;
  title: LocalizedString;
  tagline: LocalizedString;
  description: LocalizedString;
  durationHours: number;
  priceStartingUSD: number;
  meetingPoint: LocalizedString;
  inclusions: LocalizedArray;
  exclusions: LocalizedArray;
  itinerary: {
    title: LocalizedString;
    description: LocalizedString;
  }[];
  heroImage: string;
  gallery: string[];
  isFeatured: boolean;
}

export interface BookingRequest {
  id: string;
  referenceCode: string;
  destinationId: string;
  guideId?: string;
  tourId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  travelDateStart: string;
  travelDateEnd?: string;
  paxAdults: number;
  paxChildren: number;
  preferredLocale: Locale;
  specialNotes?: string;
  status: 'PENDING' | 'CONTACTED' | 'CONFIRMED' | 'CANCELLED';
  createdAt: string;
}

export interface GuideAvailabilityBlock {
  id: string;
  guideId: string;
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
  reason: string;    // e.g. "Roteiro privativo", "Férias", "Compromisso pessoal"
  createdAt: string;
}

