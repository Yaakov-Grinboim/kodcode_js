// טעינת משתני סביבה
require('dotenv').config();
const mysql = require('mysql2/promise');

// יצירת מאגר חיבורים (Connection Pool)
// במקום לפתוח ולסגור חיבור נפרד לכל בקשה (מה שפוגע בביצועים),
// אנו מגדירים מאגר שמחזיק מספר חיבורים פעילים מראש ומחלק אותם לפי הצורך.
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
  waitForConnections: true,
  connectionLimit: 10,   // כמות החיבורים המקסימלית שתיפתח בו-זמנית
  queueLimit: 0          // 0 אומר שאין הגבלה על כמות השאילתות שממתינות בתור לחיבור פנוי
});

async function main() {
  try {
    console.log('--- עבודה עם Connection Pool ---');
    console.log('שם לב: בשימוש ב-Pool, אין צורך לקרוא ל-connect() בצורה ידנית.');

    // 1. הרצת שאילתה ישירות דרך ה-Pool
    // ה-Pool יפתח/ייקח חיבור פנוי, יריץ את השאילתה ויחזיר את החיבור למאגר אוטומטית!
    const [users] = await pool.query('SELECT * FROM users');
    console.log(`\n1. נמצאו ${users.length} משתמשים בבדיקה ישירה מה-Pool.`);

    // 2. לקיחת חיבור ספציפי מהמאגר (למשל לביצוע מספר שאילתות רצופות)
    console.log('\n2. לקיחת חיבור ידני מתוך המאגר...');
    const connection = await pool.getConnection();
    
    try {
      const [products] = await connection.query('SELECT * FROM products');
      console.log(`נמצאו ${products.length} מוצרים באמצעות החיבור הייעודי.`);
      
      const [outOfStock] = await connection.query('SELECT * FROM products WHERE stock = 0');
      console.log(`מוצרים שאזלו מהמלאי: ${outOfStock.length}`);
      
    } finally {
      // ⚠️ קריטי ביותר: שחרור החיבור חזרה ל-Pool ולא סגירה שלו!
      // connection.release() מחזירה את החיבור למאגר כך שיוכל לשמש שאילתות אחרות.
      connection.release();
      console.log('החיבור שוחרר בחזרה למאגר בהצלחה.');
    }

  } catch (error) {
    console.error('שגיאה במהלך העבודה עם ה-Pool:', error.message);
  } finally {
    // סגירת כל החיבורים הפעילים ב-Pool (מתאים לביצוע בזמן כיבוי השרת - Graceful Shutdown)
    await pool.end();
    console.log('\nכל החיבורים ב-Pool נסגרו בצורה מסודרת.');
  }
}

main();
