import mariadb, {Connection} from 'mariadb';
import dotenv from "dotenv";

dotenv.config();

const db_host = process.env.DB_HOST;
const db_database = process.env.DB_DATABASE;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASSWORD;

const pool = mariadb.createPool({
    host: db_host,
    user: db_user,
    password: db_pass,
    database: db_database
});

let getConnection: () => Promise<Connection> = function() {
    return new Promise(function(res, rej) {
        pool.getConnection()
            .then(function(conn) {
                res(conn);
            })
            .catch(function(err){
                rej(err);
            });
    });
}

export default getConnection;