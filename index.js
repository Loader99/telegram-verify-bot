const TelegramBot = require("node-telegram-bot-api");

// 🔑 BOT TOKEN (Render / Heroku env me set karo)
const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
  console.error("❌ BOT_TOKEN missing");
  process.exit(1);
}

// Bot start
const bot = new TelegramBot(TOKEN, { polling: true });

// 🔹 /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const text = `
👋 Welcome!

✅ Step 1: Join our channel Firts
➡️ https://t.me/Alonetunnle

✅ Step 2: Click Verify after joining
`;

  bot.sendMessage(chatId, text, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "✅ Verify",
            callback_data: "verify",
          },
        ],
      ],
    },
  });
});

// 🔹 Verify button
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;

  try {
    const member = await bot.getChatMember(
      -1003804142567, // ✅ CHANNEL ID
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
  } catch (err) {
    bot.sendMessage(chatId, "❌ Channel join nahi mila.");
  }
});

console.log("🤖 Bot is running...");