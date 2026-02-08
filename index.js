const TelegramBot = require("node-telegram-bot-api");

// Bot token (Koyeb / Render env me set hona chahiye)
const TOKEN = process.env.BOT_TOKEN;

// 🔒 PRIVATE CHANNEL DETAILS
const CHANNEL_ID = -1003137746166;
const INVITE_LINK = "https://t.me/+KlO8aFTp9GkyNGQ1";

const bot = new TelegramBot(TOKEN, { polling: true });

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(
    chatId,
    `👋 Welcome!

🔒 Step 1: Join our PRIVATE channel
👉 ${https://t.me/+KlO8aFTp9GkyNGQ1}

✅ Step 2: Join karne ke baad Verify dabao`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "✅ Verify", callback_data: "verify" }]
        ]
      }
    }
  );
});

// Verify button logic
bot.on("callback_query", async (query) => {
  const userId = query.from.id;

  try {
    const member = await bot.getChatMember(CHANNEL_ID, userId);

    if (
      member.status === "member" ||
      member.status === "administrator" ||
      member.status === "creator"
    ) {
      bot.sendMessage(userId, "🎉 Verified! Access granted 🔓");
    } else {
      bot.sendMessage(userId, "❌ Pehle private channel join karo");
    }
  } catch (err) {
    bot.sendMessage(userId, "❌ Channel join detect nahi hua");
  }
});