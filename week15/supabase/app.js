import { createAuthors, getAllAuthors } from "./db.js";


getAllAuthors()

const res  =await createAuthors("Yosef", "Levy", "hchfcyfh@gmail.com")
console.log(res);
