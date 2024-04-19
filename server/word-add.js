import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

async function readJSONFile(relativePath) {
  try {
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDir = path.dirname(currentFilePath);
    const absolutePath = path.resolve(currentDir, relativePath);
    const data = await fs.readFile(absolutePath, "utf8");
    const jsonData = JSON.parse(data);
    return jsonData;
  } catch (error) {
    console.error("Error reading or parsing JSON file:", error);
  }
}

// 将新单词对象添加到 JSON 文件中的 words 数组中
export async function addWordToJSONFile(filePath, newWord) {
  try {
    // 读取 JSON 文件
    const jsonData = await readJSONFile(filePath);
    if (!jsonData) return;
    const word = jsonData.words.find((item) => item.word === newWord.word);
    if (word) {
      return console.error("word已经存在");
    }
    // 将新单词对象添加到 words 数组中
    jsonData.words.push(newWord);
    // 写入更新后的 JSON 数据到文件中
    const currentFilePath = fileURLToPath(import.meta.url);
    const currentDir = path.dirname(currentFilePath);
    const absolutePath = path.resolve(currentDir, filePath);
    await fs.writeFile(absolutePath, JSON.stringify(jsonData, null, 2));
    console.log("New word added to JSON file successfully!");
  } catch (error) {
    console.error("Error adding new word to JSON file:", error);
  }
}
