const { Client, GatewayIntentBits } = require("discord.js");
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// ボットが準備できたときのイベント
client.once("ready", () => {
  console.log(`${client.user.tag} としてログインしました！`);
});

// メッセージが送信されたときのイベント
client.on("messageCreate", async (message) => {
  // Botからのメッセージは無視
  if (message.author.bot) return;

  try {
    // ボットがオフラインの場合、再接続を試みる
    if (!client.isReady()) {
      await client.login(process.env.TOKEN);
      console.log("ボットが再接続しました");
    }

    // メッセージの内容に応じて応答
    if (message.content === "!help") {
      const helpMessage = `
**使用可能なコマンド一覧**
\`!help\` - このヘルプメッセージを表示
\`!ping\` - Pong!と返信
\`!hello\` - 挨拶を返信
\`!md\` - マークダウンの書き方を表示
\`!status\` - ボットの状態を確認
`;
      message.reply(helpMessage);
    }

    // 新しいステータス確認コマンドを追加
    if (message.content === "!status") {
      const status = client.isReady() ? "オンライン" : "オフライン";
      message.reply(`ボットの状態: ${status}`);
    }

    if (message.content === "!ping") {
      message.reply("Pong!");
    }

    if (message.content === "!hello") {
      message.reply("こんにちは！");
    }

    if (message.content === "!md") {
      const markdownHelp = `
**Discordで使えるMarkdownの書き方ガイド**
\`\`\`
# 見出し1
## 見出し2

**太字**
*イタリック*
***太字とイタリック***
__下線__
~~打ち消し線~~
||ネタバレ（スポイラー）||

> 引用

- 箇条書き
  - ネストされたリスト
    - さらにネスト
* 別の記号でも可能

絵文字 :smile: :heart: :thumbsup:

\`\`\`
`;
      message.reply(markdownHelp);
    }
  } catch (error) {
    console.error("エラーが発生しました:", error);
    message.reply("申し訳ありません。エラーが発生しました。");
  }
});

// エラーハンドリングを追加
client.on("disconnect", () => {
  console.log("ボットが切断されました。再接続を試みます...");
});

client.on("error", (error) => {
  console.error("エラーが発生しました:", error);
});

// Botのトークンを使用して接続
require("dotenv").config();
client.login(process.env.TOKEN);

// HTTPサーバーの設定を追加
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
