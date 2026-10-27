import { BookingRequest, Locale } from '@/types';
import { DESTINATIONS, GUIDES, TOURS } from '@/data/mock-data';

// Default Central Concierge WhatsApp Number
export const CENTRAL_CONCIERGE_PHONE = '5511999998888';

export function generateBookingReferenceCode(): string {
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const year = new Date().getFullYear();
  return `#FOR-${year}-${randomSuffix}`;
}

interface FormatWhatsAppParams {
  booking: BookingRequest;
  conciergePhone?: string;
  directToGuide?: boolean;
}

export function formatWhatsAppMessage(booking: BookingRequest, locale: Locale): string {
  const destination = DESTINATIONS.find((d) => d.id === booking.destinationId);
  const guide = booking.guideId ? GUIDES.find((g) => g.id === booking.guideId) : null;
  const tour = booking.tourId ? TOURS.find((t) => t.id === booking.tourId) : null;

  const destName = destination ? destination.name[locale] : 'Not specified';
  const guideName = guide ? guide.fullName : (locale === 'pt' ? 'Qualquer guia disponível' : locale === 'es' ? 'Cualquier guía disponible' : 'Any qualified guide');
  const tourTitle = tour ? tour.title[locale] : (locale === 'pt' ? 'Roteiro personalizado' : locale === 'es' ? 'Ruta personalizada' : 'Custom itinerary');

  const datesFormatted = booking.travelDateEnd
    ? `${booking.travelDateStart} → ${booking.travelDateEnd}`
    : booking.travelDateStart;

  const travelersText = `${booking.paxAdults} ${locale === 'pt' ? 'adulto(s)' : locale === 'es' ? 'adulto(s)' : 'adult(s)'}${
    booking.paxChildren > 0 ? `, ${booking.paxChildren} ${locale === 'pt' ? 'criança(s)' : locale === 'es' ? 'niño(s)' : 'child(ren)'}` : ''
  }`;

  if (locale === 'pt') {
    return `Olá, equipe ForTurismo Concierge! 👋
Gostaria de consultar disponibilidade e valores para minha viagem:

📋 *Protocolo:* ${booking.referenceCode}
🌍 *Destino:* ${destName}
👤 *Guia Escolhido:* ${guideName}
🗺️ *Experiência:* ${tourTitle}
📅 *Período/Data:* ${datesFormatted}
👥 *Viajantes:* ${travelersText}
🗣️ *Idioma de Preferência:* Português
${booking.specialNotes ? `📝 *Observações:* ${booking.specialNotes}\n` : ''}
Nome: ${booking.customerName}
E-mail: ${booking.customerEmail}

Aguardo confirmação de disponibilidade e orçamento. Obrigado!`;
  }

  if (locale === 'es') {
    return `¡Hola, equipo de ForTurismo Concierge! 👋
Quisiera consultar disponibilidad y tarifas para mi viaje:

📋 *Referencia:* ${booking.referenceCode}
🌍 *Destino:* ${destName}
👤 *Guía Seleccionado:* ${guideName}
🗺️ *Experiencia:* ${tourTitle}
📅 *Fechas:* ${datesFormatted}
👥 *Viajeros:* ${travelersText}
🗣️ *Idioma de Preferencia:* Español
${booking.specialNotes ? `📝 *Notas:* ${booking.specialNotes}\n` : ''}
Nombre: ${booking.customerName}
E-mail: ${booking.customerEmail}

Quedo a la espera de confirmación y presupuesto. ¡Muchas gracias!`;
  }

  // Default English
  return `Hello, ForTurismo Concierge Team! 👋
I would like to check availability and pricing for my upcoming trip:

📋 *Reference Code:* ${booking.referenceCode}
🌍 *Destination:* ${destName}
👤 *Selected Guide:* ${guideName}
🗺️ *Experience:* ${tourTitle}
📅 *Dates:* ${datesFormatted}
👥 *Travelers:* ${travelersText}
🗣️ *Preferred Language:* English
${booking.specialNotes ? `📝 *Notes:* ${booking.specialNotes}\n` : ''}
Name: ${booking.customerName}
E-mail: ${booking.customerEmail}

Looking forward to receiving availability and a customized quotation. Thank you!`;
}

export function buildWhatsAppUrl({ booking, conciergePhone, directToGuide }: FormatWhatsAppParams): string {
  const guide = booking.guideId ? GUIDES.find((g) => g.id === booking.guideId) : null;
  
  // Decide target phone
  let targetPhone = conciergePhone || CENTRAL_CONCIERGE_PHONE;
  if (directToGuide && guide && guide.whatsappNumber) {
    targetPhone = guide.whatsappNumber.replace(/[^0-9]/g, '');
  } else {
    targetPhone = targetPhone.replace(/[^0-9]/g, '');
  }

  const message = formatWhatsAppMessage(booking, booking.preferredLocale);
  const encodedText = encodeURIComponent(message);

  return `https://wa.me/${targetPhone}?text=${encodedText}`;
}
