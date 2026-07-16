# Docker — תרגילים

## תרגיל 1 — הרצת Container בסיסית

הרץ container מ-image node:20-alpine שמדפיס "Hello from Docker":

```bash
docker run --rm node:20-alpine node -e "console.log('Hello from Docker')"
```

1. הרץ את הפקודה
2. הוסף `--name test-node` לcontainer
3. הצג את ה-images שיש לך: `docker images`

---

## תרגיל 2 — Port Mapping

הרץ nginx:alpine ועשה לו port mapping:
- port 8080 ב-host → port 80 בcontainer
- הרץ ב-detached mode
- גלוש ל-localhost:8080 בדפדפן

```bash
docker run -d --name mynginx -p 8080:80 nginx:alpine
```

1. הרץ
2. הצג containers פעילים: `docker ps`
3. עצור ומחק: `docker stop mynginx && docker rm mynginx`

---

## תרגיל 3 — Environment Variables

הרץ container מ-node:20-alpine עם env vars:
- `APP_ENV=development`
- `PORT=4000`

```bash
docker run --rm \
  -e APP_ENV=development \
  -e PORT=4000 \
  node:20-alpine \
  node -e "console.log(process.env.APP_ENV, process.env.PORT)"
```

---

## תרגיל 4 — Postgres ב-Docker

הרץ postgres:16 עם:
- Port 5432
- סיסמא: `secret`
- Volume: `pgdata:/var/lib/postgresql/data`

```bash
docker run -d \
  --name mydb \
  -e POSTGRES_PASSWORD=secret \
  -p 5432:5432 \
  -v pgdata:/var/lib/postgresql/data \
  postgres:16
```

1. הרץ
2. הצג logs: `docker logs mydb`
3. כנס ל-container: `docker exec -it mydb psql -U postgres`

---

## תרגיל 5 — Node.js App ב-Docker

צור server.js פשוט:
```javascript
const http = require('http');
http.createServer((req,res) => {
  res.end('Hello from Docker Container!');
}).listen(3000);
```

הרץ אותו ב-Docker עם bind mount:
```bash
docker run --rm \
  -p 3000:3000 \
  -v $(pwd):/app \
  -w /app \
  node:20-alpine \
  node server.js
```
