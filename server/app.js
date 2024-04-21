import express from "express";
import cors from "cors";

import routes from "./routes.js";

import { getJsonWord, writeJsonWord } from "./word-config.js";

const app = express();
app.use(cors());
app.use("/api", routes);

// 启动服务器，监听端口
const port = 9292;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// TODO:TEMP
// async function init() {
//   const data = await getJsonWord();
//   data.words.forEach((item) => {
//     item.level = "1";
//   });
//   await writeJsonWord(data);
// }
// init();
