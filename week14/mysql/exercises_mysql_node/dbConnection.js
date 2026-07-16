import mysql2 from "mysql2/promise";

const host = process.env.DB_HOST || "localhost";
const password = process.env.DB_PASSWORD || '123456';
const port = process.env.DB_PORT || 3306;
const user = process.env.DB_USER || "root";
const database = process.env.DB_DATABASE || "exercise";
const connectionLimit = process.env.DB_LIMIT || 10;

export const pool = mysql2.createPool({
    host: host,
    password: password,
    port: port,
    user: user,
    database: database,
    connectionLimit: connectionLimit,
});

export async function createTable() {
    try {
        await pool.execute(`CREATE TABLE IF NOT EXISTS soldiers (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                name VARCHAR(200) NOT NULL,
                                role VARCHAR(100),
                                soldier_rank VARCHAR(100),
                                unit VARCHAR(100),
                                age INT ,
                                service_status ENUM ('active', 'inactive'),
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                                )`
        );
        console.log("Table soldiers is created");
    } catch (e) {
        console.log(e.message);
    };
};


