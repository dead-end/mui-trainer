/**
 * The function reads an object from indexed db.
 */
export const storeGet = <T>(store: IDBObjectStore, id: string) => {
  return new Promise<T | void>((resolve, reject) => {
    const request = store.get(id);

    request.onsuccess = () => {
      console.log(
        'Store:',
        store.name,
        'id:',
        id,
        'get:',
        request.result ? request.result : 'NOT-FOUND'
      );
      resolve(request.result);
    };

    request.onerror = (e) => {
      console.error(`Store: ${store.name} id: ${id} storeGet error: ${e}`);
      reject();
    };
  });
};

/**
 * The function writes an object to indexed db.
 */
export const storePut = (store: IDBObjectStore, obj: any) => {
  return new Promise<void>((resolve, reject) => {
    const request = store.put(obj);

    request.onsuccess = () => {
      console.log('Store:', store.name, 'put:', obj);
      resolve();
    };

    request.onerror = (e) => {
      console.error(`Store: ${store.name} put: ${obj} error: ${e}`);
      reject();
    };
  });
};

// with strict mode useless
export const storeAdd = (store: IDBObjectStore, obj: any) => {
  console.log('ADD-CALLED');

  return new Promise<void>((resolve, reject) => {
    const request = store.add(obj);

    request.onsuccess = () => {
      console.log('ADD', 'Store:', store.name, 'add:', obj);
      resolve();
    };

    request.onerror = (e) => {
      console.error(`Store: ${store.name} add: ${obj} error: ${e}`);
      reject();
    };
  });
};
