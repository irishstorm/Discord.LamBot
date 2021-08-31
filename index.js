require("dotenv").config();
const cron = require("cron");

const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const prefix = "!";

client.once("ready", () => {
  client.user.setStatus("available"); // Can be 'available', 'idle', 'dnd', or 'invisible'
  client.user.setPresence({
    game: {
      name: "HI there!",
      type: 0,
      url: "www.irishstorm.net",
    },
  });
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
      const embed = new MessageEmbed()
        .setTitle("Have you taken your meds today?")
        .setImage(
          "https://www.medco.ie/410-zoom_default/staff-nurse-bon-secours-hospital-cork.jpg"
        )
        .setAuthor("Lam Bot")
        .setTimestamp()
        .setFooter("Bot made with ❤ by irishstorm#2799");

      message.channel.send(embed).then((message) => {
        message.react("👍");
        message.react("👎");
      });
      break;

    case "feeling":
      const embed1 = new MessageEmbed()
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

      message.channel.send(embed1).then((message) => {
        message.react("😎");
        message.react("😀");
        message.react("😐");
        message.react("😒");
        message.react("😭");
      });
      break;

    case "bump":
      client.channels.cache.get("753703734084632697").send("!d bump");
      setInterval(function () {
        client.channels.cache.get("753703734084632697").send("!d bump");
      }, 7200);
      break;
  }
});

client.login(process.env.TOKEN);
