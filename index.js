const TelegramBot = require("node-telegram-bot-api");

// 🔑 BOT TOKEN
const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
  console.error("BOT_TOKEN missing");
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const text = `
👋 Welcome!

✅ Step 1: Join our channel
➡️ https://t.me/Alonetunnle

✅ Step 2: Click Verify after joining
`;

  bot.sendMessage(chatId, text, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "✅ Verify",
            callback_data: "verify"
          }
        ]
      ]
    }
  });
});

// Verify button
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;

  try {
    const member = await bot.getChatMember(
      "@AloneOpTunnel", // channel username
      userId
    );

    if (
      member.status === "member" ||
      member.status === "administrator" ||
      member.status === "creator"
    ) {
      bot.sendMessage(chatId, "🎉 Verified! Access granted ✅");
    } else {
      bot.sendMessage(chatId, "❌ Pehle channel join karo.");
    }
  } catch (e) {
    bot.sendMessage(chatId, "❌ Channel join nahi mila.");
  }
});