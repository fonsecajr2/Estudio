
import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';
import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
  const data = await request.json();
  const db = await readDb();

  const newTrip = {
    id: uuidv4(),
    ...data,
    startTime: new Date().toISOString(),
    endTime: null,
    status: 'ongoing',
  };

  db.trips.push(newTrip);
  await writeDb(db);

  return NextResponse.json(newTrip);
}
