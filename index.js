const TelegramBot = require("node-telegram-bot-api");
const express = require("express");

const TOKEN = process.env.BOT_TOKEN;
if (!TOKEN) {
  console.error("BOT_TOKEN missing");
  process.exit(1);
}

const bot = new TelegramBot(TOKEN, { polling: true });
const app = express();

app.use(express.json());

// 🔒 PRIVATE CHANNEL ID
const CHANNEL_ID = -1003137746166;

// =======================
// /start command
// =======================
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;

  const text =
`👋 Welcome!

Step 1️⃣ Join our private Telegram channel
👉 https://t.me/+KlO8aFTp9GkyNGQ1

Step 2️⃣ Come back & click Verify inside the app`;

  bot.sendMessage(chatId, text);
});

// =======================
// VERIFY API (REAL)
// =======================
app.post("/verify", async (req, res) => {
  const { telegram_id } = req.body;

  if (!telegram_id) {
    return res.status(400).json({ verified: false });
  }

  try {
    const member = await bot.getChatMember(CHANNEL_ID, telegram_id);

    if (
      member.status === "member" ||
      member.status === "administrator" ||
      member.status === "creator"
    ) {
      return res.json({ verified: true });
    } else {
      return res.json({ verified: false });
    }
  } catch (e) {
    return res.json({ verified: false });
  }
});

// =======================
// SERVER START
// =======================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("✅ Verify server running on port", PORT);
});