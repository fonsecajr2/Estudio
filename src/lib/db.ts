
import fs from 'fs/promises';
import path from 'path';

const dbPath = path.resolve(process.cwd(), 'db.json');

export async function readDb() {
  try {
    const data = await fs.readFile(dbPath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Database file doesn't exist, create it with empty data
      const emptyDb = {
        users: [],
        routes: [],
        stops: [],
        buses: [],
        trips: [],
      };
      await writeDb(emptyDb);
      return emptyDb;
    }
    throw error;
  }
}

export async function writeDb(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}
