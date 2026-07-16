import { pool } from "./lesson.js";

async function getAllUsers() {
    try {
        await pool.execute(`CREATE TABLE tasks (
                                id INT AUTO_INCREMENT PRIMARY KEY,
                                title VARCHAR(200) NOT NULL,
                                done BOOLEAN DEFAULT false,
                                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP`
        ));
        console.log(rows);
    } catch (e) {
        console.log(e);
    };
};

getAllUsers();