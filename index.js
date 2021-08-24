require("dotenv").config();
const cron = require("cron");

const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const prefix = "!";

client.once("ready", () => {
  console.log("Bot is ready.");
});

client.on("message", async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  switch (cmd) {
    case "meds":
      DidYouTakeYourMedication();
      break;

    case "feeling":
      HowAreYouFeelingToday();
      break;
  }
});

client.login(process.env.TOKEN);

function DidYouTakeYourMedication() {
  console.log("Starting Cron job");
  DisplayEmbed();
  let job = new cron.CronJob("0 0 9 * * *", () => {
    DisplayEmbed();
  });
  job.start();
}

function DisplayEmbed() {
  const embed = new MessageEmbed()
    .setTitle("Have you taken your meds today?")
    .setImage(
      "https://www.medco.ie/410-zoom_default/staff-nurse-bon-secours-hospital-cork.jpg"
    )
    .setAuthor("Lam Bot")
    .setTimestamp()
    .setFooter("Bot made with ❤ by irishstorm#2799");

  client.channels.cache
    .get(process.env.CHANNEL_ID)
    .send(embed)
    .then((message) => {
      message.react("👍");
      message.react("👎");
    });
}

function HowAreYouFeelingToday() {
  const embed = new MessageEmbed()
    .setTitle("How are you doing today?")
    .setAuthor("Lam Bot")
    .addFields(
      { name: "😎", value: "Excellent" },
      { name: "😀", value: "Good" },
      { name: "😐", value: "Neutral" },
      { name: "😒", value: "Bad" },
      { name: "😭", value: "Awful" }
    )
    .setTimestamp()
    .setFooter("Bot made with ❤ by irishstorm#2799");

  client.channels.cache
    .get(process.env.CHANNEL_ID)
    .send(embed)
    .then((message) => {
      message.react("😎");
      message.react("😀");
      message.react("😐");
      message.react("😒");
      message.react("😭");
    });
}
