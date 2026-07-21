# פרויקט  — DB Admin Dashboard

## תיאור
שרת Express פשוט + Compass לניהול נתונים — שילוב בין קוד ו-GUI.

## Entities

**Product**
- `name` — String, required
- `category` — String (enum: 'food', 'tech', 'clothing', 'other')
- `price` — Number, min: 0
- `stock` — Number, default: 0
- `active` — Boolean, default: true

## Endpoints

| Method | Path | תיאור |
|--------|------|--------|
| GET | `/products` | כל המוצרים הפעילים |
| POST | `/products` | הוספת מוצר |
| GET | `/products/stats` | סטטיסטיקה לפי קטגוריה |
| PATCH | `/products/:id/stock` | עדכון מלאי |

## סדר פיתוח

### שלב 1 — הקמת הפרויקט
```javascript
// models/Product.js
const productSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  category: { type: String,
    enum: ['food', 'tech', 'clothing', 'other'] },
  price:    { type: Number, min: 0 },
  stock:    { type: Number, default: 0 },
  active:   { type: Boolean, default: true },
});
```

### שלב 2 — Seed ב-Compass
במקום לכתוב seed script — הוסף 10 מוצרים דרך Compass GUI:
- לחץ Add Data → Insert Document
- הזן JSON לכל מוצר

### שלב 3 — Stats Endpoint עם Aggregation
```javascript
app.get('/products/stats', async (req, res) => {
  const stats = await Product.aggregate([
    { $match: { active: true } },
    { $group: {
      _id: '$category',
      count:    { $sum: 1 },
      avgPrice: { $avg: '$price' },
      totalStock: { $sum: '$stock' },
    }},
    { $sort: { count: -1 } },
  ]);
  res.json(stats);
});
```

**רמז:** בנה את ה-pipeline קודם ב-Compass, ואז ייצא לNode.js.

### שלב 4 — בדיקה ב-Compass
- אחרי POST מהשרת — ודא שהmוצר הופיע ב-collection
- אחרי PATCH /stock — ודא שהstock השתנה
- הרץ filter: `{ stock: { $lt: 5 } }` — מוצרים עם מלאי נמוך

## לוגיקה מיוחדת

```javascript
// PATCH /products/:id/stock
app.patch('/products/:id/stock', async (req, res) => {
  const { amount } = req.body;
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    { $inc: { stock: amount } },
    { new: true }
  );
  res.json(product);
});
// amount חיובי = הוספה, שלילי = הפחתה
```
