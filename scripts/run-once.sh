#!/bin/bash
set -euo pipefail

# ...existing code...

# 说明：
#  - 在 GitHub Actions 中，secrets 会直接作为环境变量注入到运行环境（例如 DINGTALK_WEBHOOK_URL），
#    不需要也不应覆盖它们。脚本保留从本地 .env/.github_env 加载的能力，但仅在变量未被预先设置时才导入。
#  - 使用 npx tsc 确保使用项目本地的 TypeScript 编译器。

# 从文件加载环境变量（支持 key=value、带引号的值，忽略注释和空行）。
# 仅在变量当前未定义时导入，避免覆盖 GitHub Actions 注入的 secrets。
load_env_file_if_missing() {
  local file="$1"
  [ -f "$file" ] || return
  while IFS= read -r line || [ -n "$line" ]; do
    # 忽略空行或注释
    [[ -z "$line" || "${line#"${line%%[![:space:]]*}"}" = "#"* ]] && continue
    # 去掉可能的 "export " 前缀
    line="${line#export }"
    # 拆分 key/value
    key="${line%%=*}"
    value="${line#*=}"
    # 去除左右引号
    if [[ "${value:0:1}" == "\"" && "${value: -1}" == "\"" ]] || [[ "${value:0:1}" == "'" && "${value: -1}" == "'" ]]; then
      value="${value:1:-1}"
    fi
    # 仅在变量未被预先设置时才导出，保留已有环境变量（例如由 GitHub Actions 注入的 secret）
    if [ -z "${!key:-}" ]; then
      export "$key=$value"
    fi
  done < "$file"
}

# 优先加载仓库根目录的 .env（本地开发时有用）
load_env_file_if_missing ".env"

# 如果在 GitHub Actions 中运行，GITHUB_ENV 指向一个文件，加载其中变量（只在变量尚未存在时）
if [ -n "${GITHUB_ENV:-}" ] && [ -f "${GITHUB_ENV}" ]; then
  load_env_file_if_missing "${GITHUB_ENV}"
fi

# 可选：加载仓库内自定义的 .github_env 文件（如果存在）
load_env_file_if_missing ".github_env"

# 验证必须的环境变量（如果你希望在 Actions 中允许缺失，可将此检查移除）
if [ -z "${DINGTALK_WEBHOOK_URL:-}" ]; then
  echo "Error: DINGTALK_WEBHOOK_URL 未在环境变量中定义。"
  echo "在 GitHub Actions 中请将其配置为 repository secret 并在 workflow 中传入： env: DINGTALK_WEBHOOK_URL: \${{ secrets.DINGTALK_WEBHOOK_URL }} "
  exit 1
fi

# 编译 TypeScript（使用本地安装的 tsc）
echo "编译 TypeScript..."
npx tsc

# 运行编译后的脚本
echo "执行 dist/index.js..."
node dist/index.js

# ...existing code...

# Run the TypeScript compiler
tsc

# Execute the main script
node dist/index.js