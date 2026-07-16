import express from "express";

const app = express();


// ==========================================
// חלק ב' — השלמת קוד
// ==========================================

// 6

function logger(req, res, next) {
  console.log(req.method, req.url);
  next();
}

// app.use(logger);
app.use(requestTimer, auth)

// 7

app.use(express.json())

app.post('/users', (req, res) => {
  console.log(req.body);
  res.json({ received: req.body });
});


// 8

function auth(req, res, next) {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  next();
}

app.use(auth)


// ==========================================
// חלק ג' — ניתוח קוד (ענה כאן בהערה)
// ==========================================

/*
9. מה יהיה הפלט של הבקשות הבאות לשרת הזה? הסבר את סדר הריצה:
   app.use(logger);
   app.use('/api', auth);
   app.get('/home', (req, res) => res.send('Home'));
   app.get('/api/data', (req, res) => res.send('Data'));

א. GET /home — מה יקרה?
תשובה:

ב. GET /api/data ללא token — מה יקרה?
תשובה:

ג. GET /api/data עם token — מה יקרה?
תשובה:


10. מצא את הבאג בקוד הבא והסבר מה הבעיה:
   function checkAdmin(req, res, next) {
     if (req.headers['x-role'] === 'admin') {
       next();
     }
     res.status(403).json({ message: 'Forbidden' });
   }
תשובה:

*/


// ==========================================
// חלק ד' — כתיבת קוד
// ==========================================


// 11

function requestTimer(req, res, next) {
  req.startTime = new Date();
  console.log(req.startTime);
  
  next();
}

// 12

app.use(req, res)


// תרגיל 13 (בונוס): Middleware בשם validateBody
// לקבלת שדות חובה והחזרת שגיאה 400 אם שדה חסר


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Exercises server is running on http://localhost:${PORT}`);
});