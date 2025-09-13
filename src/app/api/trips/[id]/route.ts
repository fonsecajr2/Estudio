
import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function PUT(request, { params }) {
  const { id } = params;
  const db = await readDb();

  const tripIndex = db.trips.findIndex((trip) => trip.id === id);

  if (tripIndex === -1) {
    return NextResponse.json({ error: 'Trip not found' }, { status: 404 });
  }

  db.trips[tripIndex] = {
    ...db.trips[tripIndex],
    endTime: new Date().toISOString(),
    status: 'completed',
  };

  await writeDb(db);

  return NextResponse.json(db.trips[tripIndex]);
}
