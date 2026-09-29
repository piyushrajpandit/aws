/**
 * SatyaDrishti Local Storage Engine
 *
 * Provides high-capacity asynchronous IndexedDB persistence with transparent
 * fallback to localStorage. Safely stores high-resolution photos, multi-angle scans,
 * and Legal Metrology compliance audit ledgers locally on device.
 */
import type { StateStorage } from 'zustand/middleware';

const DB_NAME = 'satyadrishti_local_db';
const STORE_NAME = 'app_state';
const DB_VERSION = 1;

let dbPromise: Promise<IDBDatabase> | null = null;

function getDb(): Promise<IDBDatabase> {
  if (dbPromise) return dbPromise;

  dbPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported in this environment'));
    }

    try {
      const request = window.indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error || new Error('Failed to open IndexedDB'));
      };

      request.onblocked = () => {
        console.warn('[Storage] IndexedDB upgrade blocked by another open tab');
      };
    } catch (err) {
      reject(err);
    }
  });

  return dbPromise;
}

export const asyncIndexedDbStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    try {
      const db = await getDb();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const store = tx.objectStore(STORE_NAME);
        const req = store.get(name);
        req.onsuccess = () => {
          if (req.result !== undefined && req.result !== null) {
            resolve(req.result);
          } else {
            // Check localStorage migration fallback
            try {
              resolve(localStorage.getItem(name));
            } catch {
              resolve(null);
            }
          }
        };
        req.onerror = () => {
          try {
            resolve(localStorage.getItem(name));
          } catch {
            resolve(null);
          }
        };
      });
    } catch {
      try {
        return localStorage.getItem(name);
      } catch {
        return null;
      }
    }
  },

  setItem: async (name: string, value: string): Promise<void> => {
    try {
      const db = await getDb();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.put(value, name);
        req.onsuccess = () => resolve();
        req.onerror = () => {
          try {
            localStorage.setItem(name, value);
            resolve();
          } catch (e) {
            reject(e);
          }
        };
      });
    } catch {
      try {
        localStorage.setItem(name, value);
      } catch {
        // Quota exceeded fallback
      }
    }
  },

  removeItem: async (name: string): Promise<void> => {
    try {
      const db = await getDb();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        const store = tx.objectStore(STORE_NAME);
        const req = store.delete(name);
        req.onsuccess = () => resolve();
        req.onerror = () => {
          try {
            localStorage.removeItem(name);
          } catch {}
          resolve();
        };
      });
    } catch {
      try {
        localStorage.removeItem(name);
      } catch {}
    }
  },
};
