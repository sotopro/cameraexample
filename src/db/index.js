import SQLite from "react-native-sqlite-storage";

const db = SQLite.openDatabase('address.db');

export const init = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('CREATE TABLE IF NOT EXISTS address (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, image TEXT NOT NULL, address TEXT NOT NULL, latitude REAL NOT NULL, longitude REAL NOT NULL)', [], () => {
                resolve();
            }, (_, err) => {
                reject(err);
            });
        });
    });
    
    return promise;
}