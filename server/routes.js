import express from "express";

import { getJsonWord, writeJsonWord } from "./word-config.js";

const router = express.Router();
router.use(express.json());

// 获取全部单词
router.get("/words", async (req, res) => {
  const data = await getJsonWord();
  res.json(data);
});

// 获取某个单词
router.get("/word-get", async (req, res) => {
  const data = await getJsonWord();
  const word = data.words.find((item) => item.word === req.query.word);
  res.json(word);
});

// 添加添加
router.post("/word-add", async (req, res) => {
  if (!req.body) {
    return;
  }
  const data = await getJsonWord();
  const word = data.words.find((item) => item.word === req.body.word);
  if (word) {
    return console.error("word已经存在");
  }
  data.words.push(req.body);
  await writeJsonWord(data);
  res.header("Content-Type", "application/json");
  res.json(req.body);
});

// 修改单词
router.post("/word-update", async (req, res) => {
  if (!req.body || !req.query.word) {
    return;
  }
  const data = await getJsonWord();
  const index = data.words.findIndex((item) => item.word === req.query.word);
  data.words[index] = req.body;
  await writeJsonWord(data);
  res.header("Content-Type", "application/json");
  res.json(req.body);
});

// 删除单词
router.get("/word-delete", async (req, res) => {
  if (!req.query.word) {
    return;
  }
  const data = await getJsonWord();
  const index = data.words.findIndex((item) => item.word === req.query.word);
  data.words.splice(index, 1);
  await writeJsonWord(data);
  res.json(0);
});

export default router;
