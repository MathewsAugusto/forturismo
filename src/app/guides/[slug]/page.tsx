import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { GUIDES, DESTINATIONS, TOURS } from '@/data/mock-data';
import TourCard from '@/components/TourCard';
import GuideDetailClient from './GuideDetailClient';

export async function generateStaticParams() {
  return GUIDES.map((guide) => ({
    slug: guide.slug,
  }));
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = GUIDES.find((g) => g.slug === slug);

  if (!guide) {
    notFound();
  }

  const destination = DESTINATIONS.find((d) => d.id === guide.destinationId);
  const guideTours = TOURS.filter((t) => t.guideId === guide.id);

  return (
    <GuideDetailClient
      guide={guide}
      destination={destination!}
      tours={guideTours}
    />
  );
}
