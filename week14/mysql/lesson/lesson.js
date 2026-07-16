import mysql2 from "mysql2/promise";

export const pool = await mysql2.createPool({
    host: process.env.DB_,
    password: "123456", 
    port: 3306, 
    user: "root",
    database: "learning_db", 
    connectionLimit: 10,
});
console.log("connected success");
