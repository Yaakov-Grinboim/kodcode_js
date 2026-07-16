// טעינת משתני סביבה
require('dotenv').config();
const mysql = require('mysql2/promise');

async function main() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });
    console.log('--- התחברנו למסד הנתונים: הדגמת שאילתות מוגנות ---');

    // נניח שקיבלנו קלט מהמשתמש (למשל מטופס באתר)
    const userInputEmail = 'john@example.com';

    // ❌ הדרך הלא מאובטחת (שרשור מחרוזות):
    // const sql = `SELECT * FROM users WHERE email = '${userInputEmail}'`;
    // אם המשתמש היה מזין: " ' OR '1'='1 " הוא היה יכול לשלוף את כל המשתמשים ללא אישור (SQL Injection).

    // ✔️ הדרך המאובטחת: שימוש ב-Prepared Statements ובסימני שאלה (?) כמיקומים זמניים לערכים.
    console.log('\n1. שליפת משתמש יחיד בצורה מאובטחת:');
    const sql = 'SELECT * FROM users WHERE email = ?';
    
    // שימו לב לשימוש בשיטה connection.execute במקום connection.query.
    // השיטה execute מבצעת הכנה (Prepare) של השאילתה בשרת ה-MySQL,
    // שולחת את הערכים בנפרד, ומבטיחה שהם יתפרשו כנתונים בלבד ולא כחלק מקוד ה-SQL.
    const [rows] = await connection.execute(sql, [userInputEmail]);
    console.log('משתמש שנמצא בהצלחה:');
    console.log(rows[0]);

    // הדגמה 2: הכנסת מוצר חדש עם מספר פרמטרים בצורה מאובטחת
    console.log('\n2. יצירת מוצר חדש באמצעות Prepared Statement:');
    const productName = 'Noise Cancelling Headphones';
    const productPrice = 799.90;
    const productStock = 12;

    const insertSql = 'INSERT INTO products (name, price, stock) VALUES (?, ?, ?)';
    const [insertResult] = await connection.execute(insertSql, [productName, productPrice, productStock]);
    
    console.log(`המוצר נוצר בהצלחה! מזהה (ID): ${insertResult.insertId}`);

    // בדיקה ושליפה של המוצר שנוצר כעת
    const [productRows] = await connection.execute('SELECT * FROM products WHERE id = ?', [insertResult.insertId]);
    console.log('פרטי המוצר שנוצר:');
    console.log(productRows[0]);

  } catch (error) {
    console.error('שגיאה במהלך הפעולה:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\nהחיבור נסגר.');
    }
  }
}

main();
