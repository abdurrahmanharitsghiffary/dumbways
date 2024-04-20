let db;

const MY_PROJECT_DB_NAME = "MyProjects";
const MY_PROJECT_CURRENT_DB_VERSION = 2;

const openDbConnection = () =>
  new Promise((resolve, reject) => {
    const dbOpenRequest = indexedDB.open(
      MY_PROJECT_DB_NAME,
      MY_PROJECT_CURRENT_DB_VERSION
    );

    dbOpenRequest.onsuccess = (e) => {
      db = dbOpenRequest.result;
      resolve({
        add: addProjects,
        read: readProjects,
        deleteData: deleteProjects,
      });
    };

    dbOpenRequest.onupgradeneeded = (e) => {
      const db = e.target.result;
      const objectStore = db.createObjectStore("projects", {
        autoIncrement: true,
      });
    };

    if (db) {
      db.onerror = (e) => {
        reject(
          "Something went wrong when connecting to database.\nError code:",
          e.target.errorCode
        );
      };
    }
  });

const addProjects = (projects = []) =>
  new Promise((resolve) => {
    const transaction = db.transaction(["projects"], "readwrite");

    transaction.onerror = (e) => {
      console.log(e.target.errorCode);
    };

    const successRequests = [];
    const failedRequets = [];
    const objectStore = transaction.objectStore("projects");

    const requestToAdd = () => {
      projects.forEach((project) => {
        const objectStoreRequest = objectStore.add(project);
        objectStoreRequest.onsuccess = (e) => {
          successRequests.push(project);
        };

        objectStoreRequest.onerror = (e) => {
          failedRequets.push(JSON.stringify("Failed to add: ", project));
        };
      });
    };

    requestToAdd();

    transaction.oncomplete = (e) => {
      resolve({ data: successRequests, errors: failedRequets });
    };
  });

const readProjects = (id) =>
  new Promise((resolve, reject) => {
    const data = [];
    let count;
    const transaction = db.transaction(["projects"], "readonly");

    const objectStore = transaction.objectStore("projects");
    count = objectStore.count(id);
    const res = id && objectStore.get(id);
    const openCursorRequest = id ? null : objectStore.openCursor();

    if (openCursorRequest)
      openCursorRequest.onsuccess = (e) => {
        const cursor = e.target.result;
        if (cursor) {
          data.push({ id: cursor.primaryKey, ...cursor.value });
          cursor.continue();
        }
      };

    transaction.oncomplete = () => {
      if (res?.result) data.push(res.result);
      resolve({ data, count: count.result });
    };

    transaction.onerror = (e) => {
      reject("Something went wrong");
    };
  });

const deleteProjects = (ids = []) =>
  new Promise((resolve) => {
    const transaction = db.transaction(["projects"], "readwrite");

    const objectStore = transaction.objectStore("projects");
    const requests = [];

    ids.forEach((id) => {
      objectStore.delete(id);
      requests.push(id);
    });

    transaction.oncomplete = () => {
      resolve(requests);
    };
  });
