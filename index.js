const express = require("express");
const bodyParser = require("body-parser");
const TelegramBot = require("node-telegram-bot-api");

const app = express();
app.use(bodyParser.json());

// 🔑 ENV VARIABLES
const BOT_TOKEN = process.env.BOT_TOKEN;
const CHANNEL_ID = -1003137746166;     // e.g. -1001234567890
const PORT = process.env.PORT || 8000;

if (!BOT_TOKEN) {
  console.error("❌ BOT_TOKEN missing");
  process.exit(1);
}

// 🤖 Telegram Bot (polling OFF — web service ke liye safe)
const bot = new TelegramBot(BOT_TOKEN, { polling: false });

/*
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  VERIFY API (APK hits this)
  POST /verify
  body: { "user_id": 123456789 }
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
*/
app.post("/verify", async (req, res) => {
  const userId = req.body.user_id;

  if (!userId) {
    return res.status(400).json({
      success: false,
      message: "user_id missing"
    });
  }

  try {
    const member = await bot.getChatMember(CHANNEL_ID, userId);

    if (
      member.status === "member" ||
      member.status === "administrator" ||
      member.status === "creator"
    ) {
      return res.json({
        success: true,
        verified: true
      });
    } else {
      return res.json({
        success: true,
        verified: false
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      verified: false
    });
  }
});

// 🟢 Health check
app.get("/", (req, res) => {
  res.send("Telegram Verify Server Running ✅");
});

// 🚀 Start server
app.listen(PORT, () => {
  console.log(`✅ Verify server running on port ${PORT}`);
});