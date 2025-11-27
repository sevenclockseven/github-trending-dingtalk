#!/bin/bash

# 验证必须的环境变量（如果你希望在 Actions 中允许缺失，可将此检查移除）
if [ -z "${DINGTALK_WEBHOOK_URL:-}" ]; then
  echo "Error: DINGTALK_WEBHOOK_URL 未在环境变量中定义。"
  echo "在 GitHub Actions 中请将其配置为 repository secret 并在 workflow 中传入： env: DINGTALK_WEBHOOK_URL: \${{ secrets.DINGTALK_WEBHOOK_URL }} "
  exit 1
fi

# 运行编译后的脚本
echo "执行 dist/index.js..."
node dist/index.js

echo "脚本执行完成。"