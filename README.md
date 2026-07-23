# 江初鸭 🦆

> 一个记笔记的地方，记录学习、生活和思考的点点滴滴。

## ✨ 特性

- 📚 **知识管理** - 涵盖多个领域的笔记和教程
- 🛠️ **开发工具** - 实用的开发工具和资源
- 🌍 **多语言支持** - 中英文内容并存
- 🎨 **美观界面** - 基于 VitePress + Element Plus 构建的现代化界面
- 🔐 **私密保护** - 部分内容需要密码访问

## 🚀 快速开始

### 环境要求

- Node.js >= 16
- npm 或 yarn

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run docs:dev
```

### 构建生产版本

```bash
npm run docs:build
```

### 预览构建结果

```bash
npm run docs:preview
```

### 启动服务器

```bash
npm run server
```

## 📁 项目结构

```
notes/
├── docs/                 # 文档目录
│   ├── zh/              # 中文内容
│   │   ├── dao/         # 道家相关
│   │   ├── yao/         # 易经相关
│   │   ├── english/     # 英语学习
│   │   ├── dev/         # 开发相关
│   │   ├── tools/       # 工具集合
│   │   └── notes/       # 个人笔记
│   ├── en/              # 英文内容
│   └── public/          # 静态资源
├── package.json
└── README.md
```

## 📖 内容分类

### 🌟 主要板块

- **📚 笔记 (Notes)** - 个人学习笔记和思考记录
- **🛠️ 教程 (Tutorials)** - 各种技术教程和学习指南  
- **🔧 工具 (Tools)** - 实用的在线工具和资源

### 📚 知识领域

- **道家文化** - 太极图、五行、天干地支等传统文化
- **易经研究** - 六十甲子、干支互动等易学知识
- **英语学习** - 语法、词汇、语音等学习资料
- **开发技术** - 代码规范、最佳实践、技术文档

## 🛠️ 技术栈

- **框架**: [VitePress](https://vitepress.dev/) - 静态网站生成器
- **UI库**: [Element Plus](https://element-plus.org/) - Vue 3 组件库
- **3D渲染**: [Three.js](https://threejs.org/) - 3D图形库
- **样式**: Sass + CSS Modules
- **构建工具**: Vite

## 🎨 自定义组件

项目包含多个自定义 Vue 组件：

- `TaiJiTu` - 太极图组件
- `WuXing` - 五行展示组件  
- `TianGan` - 天干地支组件
- `WordItem` - 单词卡片组件
- `GanZhiSlider` - 干支滑块组件

## 🔐 访问控制

部分内容需要密码访问，默认密码为 `123456.`（可在代码中修改）。

## 📄 许可证

ISC License

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📧 联系方式

- GitHub: [@liudid](https://github.com/liudid)

---

⭐ 如果这个项目对你有帮助，请给个 Star！