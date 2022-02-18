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

export const insertAddress = (title, image, address, latitude, longitude) => {
    const promise = new Promise((resolve, reject) => {
        db.
        transaction(tx => {
            tx.executeSql(
                'INSERT INTO address (title, image, address, latitude, longitude) VALUES (?, ?, ?, ?, ?)',
                [title, image, address, latitude, longitude],
                (_, result) => {
                    resolve(result);
                },
                (_, err) => {
                    reject(err);
                }
            );
        });
    });

    return promise;
}

export const fetchAddress = () => {
    const promise = new Promise((resolve, reject) => {
        db.transaction(tx => {
            tx.executeSql('SELECT * FROM address', [], (_, result) => {
                let data = []
                var len = result.rows.length;
                for (let i = 0; i < len; i++) {
                  let row = result.rows.item(i);
                    data.push(row);
                }
                resolve(data);
            }, (_, err) => {
                reject(err);
            });
        });
    });

    return promise;
}