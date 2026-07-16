// טעינת משתני סביבה
require('dotenv').config();
// שים לב לייבוא מתוך 'mysql2/promise' לצורך שימוש ב-Promises
const mysql = require('mysql2/promise');

async function run() {
  let connection;
  try {
    console.log('מנסה להתחבר למסד הנתונים באמצעות Promise API...');
    
    // יצירת חיבור מבוסס Promise
    connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      port: process.env.DB_PORT
    });

    console.log('התחברנו בהצלחה באמצעות Promises!');

    // ביצוע שאילתה פשוטה
    // השאילתה query מחזירה מערך עם שני איברים:
    // 1. rows - השורות שחזרו מהשאילתה (או אובייקט תוצאה במידה וזה לא SELECT)
    // 2. fields - מידע מטא-דאטה על העמודות (בדרך כלל לא צריך להשתמש בו)
    const [rows] = await connection.query('SELECT 1 + 1 AS solution');
    
    console.log('השאילתה הסתיימה בהצלחה. התוצאה:', rows[0].solution);

  } catch (error) {
    console.error('שגיאה במהלך העבודה עם מסד הנתונים:', error.message);
  } finally {
    // הבטחת סגירת החיבור בכל מקרה, גם אם הייתה שגיאה (בלוק finally)
    if (connection) {
      await connection.end();
      console.log('החיבור נסגר בהצלחה.');
    }
  }
}

run();
