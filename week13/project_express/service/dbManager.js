import fs from "fs/promises";

const DB_BASE_PATH = process.env.DB_BASE_PATH || "./db";

export async function readFileContent(fileName) {
    try {
        const filePath = `${DB_BASE_PATH}/${fileName}`
        const fileContent = await fs.readFile(filePath, "utf-8");
        return JSON.parse(fileContent);
    } catch (error) {
        console.error(`Error reading from ${fileName}:`, error.message)
    } return [];
};

export async function writeToFile(fileName, data) {
    try {
        const filePath = `${DB_BASE_PATH}/${fileName}`
        const fileContent = await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
        console.log(fileContent);
        
        return true;
    } catch (error) {
        console.error(`Error writing to ${fileName}:`, error.message)
    } return false;
};


