require("dotenv").config();
const Cheerio = require("cheerio");
const fetch = require("node-fetch");
const cron = require("cron");

const { Client, Intents, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const prefix = "!";

client.once("ready", () => {
  client.user.setStatus("available"); // Can be 'available', 'idle', 'dnd', or 'invisible'
  client.user.setPresence({
    status: "online",
    activity: {
      name: "!help",
      type: "PLAYING",
    },
  });
  console.log("Bot is ready.");
  WYR();
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

    case "pain":
      PainScale(message);
      break;

    case "mental":
      MentalHealth(message);
      break;

    case "help":
      Help(message);
      break;

    case "wyrr":
      test(message);
      break;

    default:
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

  let roleId = "878320380375334983";
  message.channel.send(`<@&${roleId}> Daily Checkin`);

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

  let roleId = "878320444271366144";
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
      { name: "!checkin", value: "How is your week going" },
      { name: "!mental", value: "A mental health pain scale" },
      { name: "!pain", value: "A pain scale" }
    )
    .setTimestamp()
    .setFooter("Bot made with ❤ by irishstorm#2799");

  message.channel.send(embed3);
};

const PainScale = (message) => {
  const embed = new MessageEmbed()
    .setTitle("Pain Chart")
    .setAuthor("Lam Bot")
    .setImage(
      "https://media.discordapp.net/attachments/758609398620487682/883005128284725298/4ccb76173ab9007b63277e0a49426a4b.jpg?width=318&height=424"
    )
    .setTimestamp()
    .setFooter("Bot made with ❤ by irishstorm#2799");

  message.channel.send(embed).then((message) => {
    message.react("0️⃣");
    message.react("1️⃣");
    message.react("2️⃣");
    message.react("3️⃣");
    message.react("4️⃣");
    message.react("5️⃣");
    message.react("6️⃣");
    message.react("7️⃣");
    message.react("8️⃣");
    message.react("9️⃣");
    message.react("🔟");
  });
};

const MentalHealth = (message) => {
  const embed = new MessageEmbed()
    .setTitle("Mental Health Chart")
    .setAuthor("Lam Bot")
    .setImage(
      "https://media.discordapp.net/attachments/758609398620487682/883008820434055188/be94fc891412d77e4d893f14d5f49033.jpg?width=390&height=682"
    )
    .setTimestamp()
    .setFooter("Bot made with ❤ by irishstorm#2799");

  message.channel.send(embed).then((message) => {
    message.react("0️⃣");
    message.react("1️⃣");
    message.react("2️⃣");
    message.react("3️⃣");
    message.react("4️⃣");
    message.react("5️⃣");
    message.react("6️⃣");
    message.react("7️⃣");
    message.react("8️⃣");
    message.react("9️⃣");
    message.react("🔟");
  });
};

let wordList = [];

const test = (message) => {
  const embed = new MessageEmbed()
    .setTitle("Would you Rather")
    .setDescription(wordList[getRandomInt(wordList.length)])
    .addFields(
      { name: "No", value: "❤", inline: true },
      { name: "Yes", value: "💚", inline: true }
    )
    .setTimestamp()
    .setFooter("Bot made with ❤ by irishstorm#2799");

  message.channel.send(embed).then((message) => {
    message.react("❤");
    message.react("💚");
  });
};

const WYR = async () => {
  const url = "https://woulduratherquestions.com/would-you-rather-questions/";

  const res = await fetch(url);
  const body = await res.text();
  const $ = Cheerio.load(body);
  const item = $("ol")
    .children()
    .map(function (iteration, element) {
      wordList[iteration] = $(this).text();
    });
};

const getRandomInt = (max) => {
  return Math.floor(Math.random() * max);
};

client.login(process.env.TOKEN);
