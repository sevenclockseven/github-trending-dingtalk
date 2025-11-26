# GitHub Trending to Dingtalk

该项目旨在每天定时获取 GitHub 上最热的项目，并将项目信息发送到钉钉。通过使用 GitHub Actions，您可以自动化这一过程，无需手动干预。

## 功能

- 从 GitHub API 获取当前最热的项目数据
- 将获取到的项目信息格式化
- 通过钉钉 webhook 将信息发送到指定的钉钉群组
- 支持定时任务，自动化获取和发送

## 项目结构

```
github-trending-dingtalk
├── .github
│   └── workflows
│       └── daily.yml          # GitHub Actions 工作流配置
├── src
│   ├── index.ts               # 应用入口点
│   ├── fetchTrending.ts       # 获取最热项目的函数
│   ├── sendToDingtalk.ts      # 发送信息到钉钉的函数
│   ├── githubClient.ts         # GitHub API 客户端
│   ├── types
│   │   └── index.ts           # TypeScript 类型定义
│   └── utils
│       └── format.ts          # 格式化项目数据的工具函数
├── scripts
│   └── run-once.sh            # 手动运行项目的脚本
├── .env.example                # 环境变量示例
├── package.json                # npm 配置文件
├── tsconfig.json              # TypeScript 配置文件
├── .eslintrc.js               # ESLint 配置文件
└── README.md                  # 项目文档
```

## 安装

1. 克隆该项目到本地：
   ```
   git clone https://github.com/yourusername/github-trending-dingtalk.git
   cd github-trending-dingtalk
   ```

2. 安装依赖：
   ```
   npm install
   ```

3. 配置环境变量：
   复制 `.env.example` 文件为 `.env`，并根据需要填写 GitHub API 密钥和钉钉 webhook URL。

## 使用

- 手动运行项目：
  ```
  ./scripts/run-once.sh
  ```

- 设置 GitHub Actions 定时任务：
  项目已配置为每天自动运行，您可以在 `.github/workflows/daily.yml` 中查看和修改调度设置。

## 贡献

欢迎任何形式的贡献！请提交问题或拉取请求。

## 许可证

该项目使用 MIT 许可证，详细信息请参见 LICENSE 文件。