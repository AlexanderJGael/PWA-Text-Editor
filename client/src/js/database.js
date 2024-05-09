import { openDB } from 'idb';

// Initialise the database
const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Create an object store
const dbStore = async () => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  return store;
};

// Add content to the database
export const putDb = async (content) => {
    const store = await dbStore();
    const result = await store.put({ id: 1, value: content});

    console.log('Data saved to database', result);
};

// Get content from the database
export const getDb = async () => {
  const store = await dbStore();
  const result = await store.getAll();

  if (!result || result.length === null) {
    console.log('No data found in database');
    return null;
  }
  
  console.log('content retrived from database');
  return result[0].value;
};

initdb();
