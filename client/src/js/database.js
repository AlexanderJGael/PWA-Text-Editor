import { openDB } from 'idb';

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

const dbStore = async () => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  return store;
};

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
    const store = await dbStore();
    const result = await store.put({ id: 1, content: content});

    console.log('Data saved to database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  const store = await dbStore();
  const result = await store.getAll();
  const content = result[0].content;

  console.log('content retrived from database');
  return content;
};

initdb();
