import PocketBase from 'pocketbase';

const POCKETBASE_URL = 'http://localhost:8090'; // zamijenit

export const pocketbase = new PocketBase(POCKETBASE_URL);
