const TelegramBot = require("node-telegram-bot-api");

// 🔑 BOT TOKEN (Koyeb / Render env me set hoga)
const TOKEN = process.env.BOT_TOKEN;

if (!TOKEN) {
  console.error("❌ BOT_TOKEN missing");
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });

// 🔒 PRIVATE CHANNEL DETAILS
const CHANNEL_ID = -1003137746166; // ← tumhara private channel ID
const INVITE_LINK = "https://t.me/+KlO8aFTp9GkyNGQ1"; // private invite link

// /start command
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const text = `👋 Welcome!

🔒 Step 1: Join our PRIVATE channel
👉 ${INVITE_LINK}

✅ Step 2: Join karne ke baad Verify dabao`;

  bot.sendMessage(chatId, text, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "✅ Verify", callback_data: "verify" }]
      ]
    }
  });
});

// Verify button
bot.on("callback_query", async (query) => {
  const chatId = query.message.chat.id;
  const userId = query.from.id;

  try {
    const member = await bot.getChatMember(CHANNEL_ID, userId);

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

console.log("🤖 Bot started successfully");