import express from "express";
import fs from "fs/promises";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { addWordToJSONFile } from "./word-add.js";
import { updateWordToJSONFile } from "./word-update.js";
import { deleteWordToJSONFile } from "./word-delete.js";

// 创建 Express 应用
const app = express();
// 设置 Express 中间件来解析请求体中的 JSON 数据
app.use(express.json());
// 使用 cors 中间件处理跨域请求
app.use(cors());

const currentFilePath = fileURLToPath(import.meta.url);
const currentDir = path.dirname(currentFilePath);

const relativePath = "../docs/zh/english/words.json";

// 获取所有数据
app.get("/api/words", async (req, res) => {
  const absolutePath = path.resolve(currentDir, relativePath);
  const data = await fs.readFile(absolutePath, "utf8");
  const jsonData = JSON.parse(data);
  res.json(jsonData);
});

// 添加数据
app.post("/api/word-add", async (req, res) => {
  const newData = req.body;
  await addWordToJSONFile(relativePath, newData);
  // 设置响应头
  res.header("Content-Type", "application/json");
  res.json(newData);
});

// 获取某个数据
app.get("/api/word-get", async (req, res) => {
  const absolutePath = path.resolve(currentDir, relativePath);
  const data = await fs.readFile(absolutePath, "utf8");
  const jsonData = JSON.parse(data);
  const word = jsonData.words.find((item) => item.word === req.query.word);
  res.json(word);
});

// 修改数据
app.post("/api/word-update", async (req, res) => {
  const form = req.body;
  await updateWordToJSONFile(relativePath, form, form.activeIndex);
  // 设置响应头
  res.header("Content-Type", "application/json");
  res.json(form);
});

// // 删除数据
app.get("/api/word-delete", async (req, res) => {
  const index = req.query.index;
  await deleteWordToJSONFile(relativePath, index);
  res.json(0);
});

// 启动服务器，监听端口
const port = 9292;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
