import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";

const WORD_JSON_PATH = "../docs/zh/english/words.json";

export function getWordJsonPath() {
  const currentFilePath = fileURLToPath(import.meta.url);
  const currentDir = path.dirname(currentFilePath);
  return path.resolve(currentDir, WORD_JSON_PATH);
}

export async function getJsonWord() {
  const data = await fs.readFile(getWordJsonPath(), "utf8");
  return JSON.parse(data);
}

export async function writeJsonWord(data) {
  const path = await getWordJsonPath();
  await fs.writeFile(path, JSON.stringify(data, null, 2));
}
