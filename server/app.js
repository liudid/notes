import express from "express";
import cors from "cors";

import routes from "./routes.js";

const app = express();
app.use(cors());
app.use("/api", routes);

// 启动服务器，监听端口
const port = 9292;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
