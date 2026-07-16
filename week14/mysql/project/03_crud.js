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
    console.log('--- התחברנו למסד הנתונים עבור פעולות CRUD ---');

    // 1. CREATE (הוספת משתמש חדש)
    console.log('\n1. יצירת משתמש חדש (CREATE):');
    const uniqueEmail = `avi_${Date.now()}@example.com`;
    
    // שימו לב: כאן אנו משרשרים משתנים ישירות לתוך השאילתה לצורך הדגמה פשוטה.
    // אזהרה: דרך זו אינה מאובטחת ומאפשרת הזרקת קוד SQL (SQL Injection)!
    // בקובץ הבא נראה כיצד לפתור זאת באמצעות Prepared Statements.
    const insertQuery = `INSERT INTO users (name, email) VALUES ('Avi Cohen', '${uniqueEmail}')`;
    const [insertResult] = await connection.query(insertQuery);
    
    // insertResult מכיל מידע על הפעולה שבוצעה, כולל insertId של השורה שנוצרה
    console.log(`משתמש חדש נוצר עם מזהה (ID): ${insertResult.insertId}`);

    // 2. READ (קריאת כל המשתמשים)
    console.log('\n2. קריאת כל המשתמשים (READ):');
    const [users] = await connection.query('SELECT * FROM users');
    console.table(users); // הדפסה יפה של השורות כטבלה במסוף

    // 3. UPDATE (עדכון משתמש)
    console.log('\n3. עדכון שם המשתמש שיצרנו (UPDATE):');
    const updateQuery = `UPDATE users SET name = 'Avi Cohen Updated' WHERE id = ${insertResult.insertId}`;
    const [updateResult] = await connection.query(updateQuery);
    
    // updateResult מחזיר מידע על כמות השורות שהושפעו (affectedRows)
    console.log(`מספר שורות שעודכנו: ${updateResult.affectedRows}`);

    // קריאה חוזרת כדי לראות את השינוי
    const [updatedUser] = await connection.query(`SELECT * FROM users WHERE id = ${insertResult.insertId}`);
    console.log('המשתמש המעודכן שחזר מהמסד:');
    console.log(updatedUser[0]);

    // 4. DELETE (מחיקת המשתמש)
    console.log('\n4. מחיקת המשתמש שיצרנו (DELETE):');
    const deleteQuery = `DELETE FROM users WHERE id = ${insertResult.insertId}`;
    const [deleteResult] = await connection.query(deleteQuery);
    console.log(`מספר שורות שנמחקו: ${deleteResult.affectedRows}`);

    // בדיקה סופית - רשימת המשתמשים שנותרו
    const [finalUsers] = await connection.query('SELECT * FROM users');
    console.log(`\nרשימת המשתמשים הסופית במסד (האבי שמחקנו לא אמור להופיע):`);
    console.table(finalUsers);

  } catch (error) {
    console.error('שגיאה במהלך פעולות ה-CRUD:', error.message);
  } finally {
    if (connection) {
      await connection.end();
      console.log('\nהחיבור למסד הנתונים נסגר.');
    }
  }
}

main();
