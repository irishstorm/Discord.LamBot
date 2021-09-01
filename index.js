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
      HaveYouTakenYourMeds(message);
      break;

    case "feeling":
      HowAreYouFeeling(message);
      break;

    case "checkin":
      CheckIn(message);
      break;

    case "help":
      Help(message);
      break;

    default:
      message.channel.send(
        "Please enter a vaild command, Type !help for help."
      );
      break;
  }
});

const HaveYouTakenYourMeds = (message) => {
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
};

const HowAreYouFeeling = (message) => {
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
};

const CheckIn = (message) => {
  const embed2 = new MessageEmbed()
    .setTitle("Weekly Checkin")
    .setAuthor("Lam Bot")
    .addFields(
      { name: "\u200B", value: "How are you feeling today?" },
      {
        name: "\u200B",
        value: "How would you rate your mental health this week?",
      },
      { name: "\u200B", value: "Your physical health? " },
      {
        name: "\u200B",
        value: "Is there anything you'd like to talk about today?",
      },
      {
        name: "\u200B",
        value:
          "Is there anything happening that you'd like to talk about BUT in DMs? ",
      },
      {
        name: "\u200B",
        value:
          "List AT LEAST one good thing that happened this week or that you're proud of yourself for.",
      },
      {
        name: "\u200B",
        value: "Tell us about someone you are thankful for this week.",
      },
      {
        name: "\u200B",
        value:
          " Is there anything minor you'd like to vent about here? If it's a serious issue head to #vent-nsfw ",
      },
      {
        name: "\u200B",
        value:
          "Want to share a song you've listened to? Talk about a book? TV show you're watching? A game you're playing? Talk here.",
      }
    )
    .setTimestamp()
    .setFooter("Bot made with ❤ by irishstorm#2799");

  let roleId = "";
  message.channel.send(`<@&${roleId}> Weekly Checkin`);
  message.channel.send(embed2);
};

const Help = (message) => {
  const embed3 = new MessageEmbed()
    .setTitle("Helpful Commands")
    .setAuthor("Lam Bot")
    .addFields(
      { name: "!feeling", value: "How are you feeling today" },
      { name: "!meds", value: "Did you take your meds today" },
      { name: "!checkin", value: "How is your week going" }
    )
    .setTimestamp()
    .setFooter("Bot made with ❤ by irishstorm#2799");

  message.channel.send(embed3);
};

client.login(process.env.TOKEN);
