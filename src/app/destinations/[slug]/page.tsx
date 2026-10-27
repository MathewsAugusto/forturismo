import React from 'react';
import { notFound } from 'next/navigation';
import { DESTINATIONS, GUIDES, TOURS } from '@/data/mock-data';
import DestinationDetailClient from './DestinationDetailClient';

export const instant = false;

export async function generateStaticParams() {
  return DESTINATIONS.map((dest) => ({
    slug: dest.slug,
  }));
}

export default async function DestinationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const destination = DESTINATIONS.find((d) => d.slug === slug);

  if (!destination) {
    notFound();
  }

  const destinationGuides = GUIDES.filter((g) => g.destinationId === destination.id);
  const destinationTours = TOURS.filter((t) => t.destinationId === destination.id);

  return (
    <DestinationDetailClient
      destination={destination}
      guides={destinationGuides}
      tours={destinationTours}
    />
  );
}
