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
    // ボットの状態をチェックして再接続
    if (!client.isReady()) {
      console.log("ボットが非アクティブ状態です。再接続を試みます...");
      try {
        await client.login(process.env.TOKEN);
        console.log("ボットが再接続しました");
        // 再接続成功のメッセージを送信
        message.channel.send("ボットが再起動しました！");
      } catch (error) {
        console.error("再接続に失敗しました:", error);
        message.channel.send("申し訳ありません。再接続に失敗しました。");
        return;
      }
    }

    // !wakeupコマンドを追加
    if (message.content === "!wakeup") {
      const status = client.isReady()
        ? "既にオンラインです"
        : "再接続を試みます...";
      message.reply(status);
      if (!client.isReady()) {
        try {
          await client.login(process.env.TOKEN);
          message.reply("再接続に成功しました！");
        } catch (error) {
          message.reply(
            "再接続に失敗しました。しばらく待ってから再試行してください。"
          );
        }
      }
      return;
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
\`!kill\` - ボットをシャットダウン（管理者のみ）
`;
      message.reply(helpMessage);
    }

    // 新しいステータス確認コマンドを追加
    if (message.content === "!status") {
      const status = client.isReady() ? "オンライン" : "オフライン";
      const uptime = client.isReady()
        ? `\n稼働時間: ${Math.floor(client.uptime / 1000)}秒`
        : "";
      message.reply(`ボットの状態: ${status}${uptime}`);
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

    // シャットダウンコマンドを追加
    if (message.content === "!kill") {
      // 管理者権限を持つユーザーのみ実行可能
      if (!message.member.permissions.has("Administrator")) {
        message.reply("このコマンドは管理者のみ使用できます。");
        return;
      }

      message.reply("ボットをシャットダウンします...");
      console.log("ボットをシャットダウンします...");

      // クライアントを破棄してプロセスを終了
      await client.destroy();
      process.exit(0);
    }
  } catch (error) {
    console.error("エラーが発生しました:", error);
    message.reply("申し訳ありません。エラーが発生しました。");
  }
});

// エラーハンドリングを強化
client.on("disconnect", async () => {
  console.log("ボットが切断されました。再接続を試みます...");
  try {
    await client.login(process.env.TOKEN);
    console.log("再接続に成功しました");
  } catch (error) {
    console.error("再接続に失敗しました:", error);
  }
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
const PORT = process.env.PORT || 3005;

app.get("/", (req, res) => {
  res.send("Bot is running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
