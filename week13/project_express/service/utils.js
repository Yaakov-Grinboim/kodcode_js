import {readFileContent, writeToFile} from "./dbManager.js";

async function sortBooksByCondition(condition) {
    const books = await readFileContent("books.json");
    const sortBooks = [];
    
}
