// create variable to hold db connection
let db;
// establish a connection to IndexedDB database called 'social_network' and set it to version 1 using the indexDB.open() method; using 2 params (name of IndexDB db, version of db)
const request = indexedDB.open("social_network", 1);

// this event will emit if the database version changes (nonexistant to version 1, v1 to v2, etc.)
request.onupgradeneeded = function (event) {
  // save a reference to the database
  const db = event.target.result;
  // create an object store (table) called `new_social`, set it to have an auto incrementing primary key; this will store the db data; autoIncrement improves data retrieval options
  db.createObjectStore("new_social", { autoIncrement: true });
};

// eventhandler for successful connection to db (onsuccess)
request.onsuccess = function (event) {
  // when db is successfully created with its object store (from onupgradedneeded event above) or simply established a connection, save reference to db in global variable
  db = event.target.result;

  // check if app is online, if yes run uploadSocial() function to send all local db data to api; web link: https://developer.mozilla.org/en-US/docs/Web/API/Navigator
  if (navigator.onLine) {
   // call to upload social
    uploadSocial();
  }
};
// eventhandler for unsuccessful connection to db (onerror)
request.onerror = function (event) {
  // log error here
  console.log(event.target.errorCode);
};

// This function will be executed if we attempt to submit new social data and there's no internet connection (only works in presence of network failure)
function saveRecord(record) {
  // open a new transaction with the database with read and write permissions
  const transaction = db.transaction(["new_social"], "readwrite");

  // access the object store for `new_social`
  const socialObjectStore = transaction.objectStore("new_social");

  // add record to your store with add method
  socialObjectStore.add(record);
}
// handles collecting all of data from new_social object store in IndexedDB and POST it to server
function uploadSocial() {
  // open a transaction on your db
  const transaction = db.transaction(["new_social"], "readwrite");

  // access your object store
  const socialObjectStore = transaction.objectStore("new_social");

  // get all records from store and set to a variable;will have a .result property that is an array of all the data retrieved from new_socialobject store
  const getAll = socialObjectStore.getAll();

  // upon a successful .getAll() execution, run this function; asyncrhonous function needed to be attached to event handler in order to retrieve data
  getAll.onsuccess = function () {
    // if there was data in indexedDb's store, let's send it to the api server
    if (getAll.result.length > 0) {
      fetch("/api/social", {
        method: "POST",
        body: JSON.stringify(getAll.result),
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((serverResponse) => {
          if (serverResponse.message) {
            throw new Error(serverResponse);
          }
          // open one more transaction
          const transaction = db.transaction(["new_social"], "readwrite");
          // access the new_pizza object store
          const socialObjectStore = transaction.objectStore("new_social");
          // clear all items in your store
          socialObjectStore.clear();

          alert("All saved social data has been submitted!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
}

// browser event listener; listen for app coming back online
window.addEventListener('online', uploadSocial);