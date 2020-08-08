var mongoose = require('mongoose');

class Database {
    static connection = null;
    static mongoose = mongoose;

    static connect(uri) {
        return new Promise(
            (resolve, reject) => {
                mongoose.connect('mongodb://' + uri, { useNewUrlParser: true });
                Database.connection = mongoose.connection;

                Database.connection.once('open', function () {
                    resolve(Database.connection);
                });
                Database.connection.on('error', () => {
                        console.error.bind(console, 'connection error:');
                        reject();
                    }
                );
            }
        );
    }

    static makeSchema(name, schema) {
        return new mongoose.Schema(name, schema);
    }
}


module.exports = Database;