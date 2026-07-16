// טעינת משתני סביבה מקובץ .env
require('dotenv').config();
const mysql = require('mysql2');

console.log('מנסה להתחבר למסד הנתונים עם ההגדרות הבאות:');
console.log(`מארח: ${process.env.DB_HOST}, פורט: ${process.env.DB_PORT}, משתמש: ${process.env.DB_USER}`);

// יצירת החיבור למסד הנתונים
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

// פתיחת החיבור בפועל
connection.connect((err) => {
  if (err) {
    console.error('שגיאה בחיבור למסד הנתונים:', err.stack);
    console.error('אנא ודא שקונטיינר ה-MySQL שלך פועל (הרצה docker-compose up -d)');
    return;
  }
  console.log('החיבור למסד הנתונים בוצע בהצלחה! מזהה החיבור:', connection.threadId);

  // ביצוע שאילתת בדיקה פשוטה (Ping)
  connection.query('SELECT 1 + 1 AS solution', (error, results) => {
    if (error) {
      console.error('שגיאה בביצוע השאילתה:', error);
      return;
    }
    console.log('השאילתה הצליחה! התוצאה של SELECT 1+1 היא:', results[0].solution); // צריך להדפיס 2
    
    // תמיד לזכור לסגור את החיבור בסיום הפעולה!
    connection.end((endErr) => {
      if (endErr) {
        console.error('שגיאה בסגירת החיבור:', endErr);
      } else {
        console.log('החיבור נסגר בהצלחה.');
      }
    });
  });
});
