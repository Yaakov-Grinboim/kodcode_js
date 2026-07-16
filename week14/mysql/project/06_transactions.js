// טעינת משתני סביבה
require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT
});

/**
 * פונקציה המדמה רכישת מוצר בתוך טרנזקציה
 */
async function purchaseProduct(productId, userId) {
  // אנו חייבים לקחת חיבור ספציפי מה-Pool כדי שכל השלבים
  // (התחלה, עדכונים, ואישור/ביטול) יבוצעו על גבי אותו הצינור.
  const connection = await pool.getConnection();
  
  try {
    // 1. התחלת הטרנזקציה (Begin Transaction)
    await connection.beginTransaction();
    console.log(`\n[טרנזקציה] התחלת תהליך רכישה עבור מוצר ${productId} על ידי משתמש ${userId}...`);

    // 2. בדיקת מלאי המוצר
    // אנו משתמשים ב-FOR UPDATE כדי לנעול את השורה הזו במסד הנתונים מפני עדכונים מקבילים של משתמשים אחרים בזמן הטרנזקציה.
    const [products] = await connection.execute(
      'SELECT name, price, stock FROM products WHERE id = ? FOR UPDATE',
      [productId]
    );

    if (products.length === 0) {
      throw new Error('המוצר המבוקש לא קיים במסד הנתונים.');
    }

    const product = products[0];
    console.log(`[שלב 1] בדיקת מלאי עבור "${product.name}": במלאי ${product.stock} יחידות.`);

    if (product.stock <= 0) {
      throw new Error(`המוצר "${product.name}" אזל מהמלאי!`);
    }

    // 3. עדכון המלאי - הורדת יחידה אחת
    console.log('[שלב 2] מעדכן מלאי (הורדת יחידה אחת)...');
    await connection.execute(
      'UPDATE products SET stock = stock - 1 WHERE id = ?',
      [productId]
    );

    // 4. במידה והכל עבר בשלום, נבצע שמירה סופית (Commit)
    await connection.commit();
    console.log(`[הצלחה] הרכישה הושלמה! הטרנזקציה נשמרה בהצלחה (Commit).`);

  } catch (error) {
    // 5. במידה ואחד השלבים נכשל (למשל אין מלאי או שגיאת שרת),
    // נבצע ביטול מוחלט של כל הפעולות שנעשו מתחילת הטרנזקציה (Rollback).
    console.error(`[כישלון] שגיאה ברכישה: "${error.message}"`);
    console.log('[ביטול] מבצע ביטול שינויים (Rollback) כדי להחזיר את המסד למצבו הקודם...');
    await connection.rollback();
    console.log('[ביטול] ה-Rollback בוצע בהצלחה.');
  } finally {
    // שחרור החיבור חזרה למאגר
    connection.release();
  }
}

async function main() {
  try {
    // תרחיש א': רכישת מוצר במלאי (מקלדת מכנית - מזהה 1, מלאי 15) -> אמור להצליח ולבצע Commit
    await purchaseProduct(1, 101);

    // תרחיש ב': רכישת מוצר שאזל מהמלאי (אוזניות גיימינג - מזהה 4, מלאי 0) -> אמור להיכשל ולבצע Rollback
    await purchaseProduct(4, 102);

    // הדפסת מצב המלאי הנוכחי במסד הנתונים כדי לראות את השינויים בפועל
    console.log('\n--- מצב המלאי הנוכחי בטבלת המוצרים ---');
    const [finalProducts] = await pool.query('SELECT id, name, stock FROM products');
    console.table(finalProducts);

  } catch (err) {
    console.error('שגיאה ראשית:', err.message);
  } finally {
    await pool.end();
  }
}

main();
