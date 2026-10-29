import { GuideAvailabilityBlock } from '@/types';

// Default initial blocks for demonstration if none exist
const DEFAULT_SAMPLE_BLOCKS: Record<string, GuideAvailabilityBlock[]> = {
  'guide-th-01': [
    {
      id: 'block-th01-1',
      guideId: 'guide-th-01',
      startDate: '2026-11-24',
      endDate: '2026-11-27',
      reason: 'Tour Privativo VIP em Ayutthaya',
      createdAt: new Date().toISOString(),
    },
    {
      id: 'block-th01-2',
      guideId: 'guide-th-01',
      startDate: '2026-12-24',
      endDate: '2026-12-28',
      reason: 'Recesso de Fim de Ano',
      createdAt: new Date().toISOString(),
    },
  ],
  'guide-ae-01': [
    {
      id: 'block-ae01-1',
      guideId: 'guide-ae-01',
      startDate: '2026-12-10',
      endDate: '2026-12-14',
      reason: 'Atendimento a Delegação Oficial',
      createdAt: new Date().toISOString(),
    },
  ],
  'guide-br-01': [
    {
      id: 'block-br01-1',
      guideId: 'guide-br-01',
      startDate: '2026-12-30',
      endDate: '2027-01-02',
      reason: 'Agenda de Réveillon Copacabana Esgotada',
      createdAt: new Date().toISOString(),
    },
  ],
};

export function getGuideBlocks(guideId: string): GuideAvailabilityBlock[] {
  if (typeof window === 'undefined') {
    return DEFAULT_SAMPLE_BLOCKS[guideId] || [];
  }

  try {
    const raw = localStorage.getItem(`guide_blocks_${guideId}`);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch {
    // fallback
  }

  const initial = DEFAULT_SAMPLE_BLOCKS[guideId] || [];
  try {
    localStorage.setItem(`guide_blocks_${guideId}`, JSON.stringify(initial));
  } catch {
    // ignore
  }
  return initial;
}

export function saveGuideBlocks(guideId: string, blocks: GuideAvailabilityBlock[]): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`guide_blocks_${guideId}`, JSON.stringify(blocks));
  } catch (err) {
    console.error('Error saving guide blocks to localStorage:', err);
  }
}

export function checkRangeOverlap(
  guideId: string,
  startDateStr: string,
  endDateStr?: string
): GuideAvailabilityBlock | undefined {
  if (!guideId || !startDateStr) return undefined;

  const blocks = getGuideBlocks(guideId);
  const reqStart = new Date(startDateStr).getTime();
  const reqEnd = endDateStr ? new Date(endDateStr).getTime() : reqStart;

  return blocks.find((block) => {
    const bStart = new Date(block.startDate).getTime();
    const bEnd = new Date(block.endDate).getTime();

    // Check intersection: startA <= endB && endA >= startB
    return reqStart <= bEnd && reqEnd >= bStart;
  });
}
