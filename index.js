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
client.on("messageCreate", (message) => {
  // Botからのメッセージは無視
  if (message.author.bot) return;

  // メッセージの内容に応じて応答
  if (message.content === "!help") {
    const helpMessage = `
**使用可能なコマンド一覧**
\`!help\` - このヘルプメッセージを表示
\`!ping\` - Pong!と返信
\`!hello\` - 挨拶を返信
\`!md\` - マークダウンの書き方を表示
`;
    message.reply(helpMessage);
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
});

// Botのトークンを使用して接続
require("dotenv").config();
client.login(process.env.TOKEN);
