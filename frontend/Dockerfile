
FROM node:20

WORKDIR /usr/src/app

# パッケージファイルをコピーしてインストール
COPY package*.json ./
RUN npm install

# アプリケーションのファイルをコピー
COPY . .

# ポートを公開
EXPOSE 3000

# Next.jsの開発サーバーを起動（Turbopackを使用）
CMD ["npm", "run", "dev"]
