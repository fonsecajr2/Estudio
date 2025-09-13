import { NextResponse } from 'next/server';
import { readDb, writeDb } from '@/lib/db';

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const data = await request.json();
  const db = await readDb();

  const busIndex = db.buses.findIndex((bus) => bus.id === id);

  if (busIndex === -1) {
    return NextResponse.json({ error: 'Bus not found' }, { status: 404 });
  }

  db.buses[busIndex] = { ...db.buses[busIndex], ...data };

  await writeDb(db);

  return NextResponse.json(db.buses[busIndex]);
}