const { default: axios } = require("axios");
const fs = require("fs");
const TelegramBot = require("node-telegram-bot-api");
const { weatherOptions } = require("./Options.js");
const { addDoc, collection } = require("firebase/firestore");
const { db } = require("./firebase");
const { calc, anime } = require("./functions");

const token = "5052672012:AAGaLo_LK0d34Y-iusDrnivZe8Vdgi6zaFQ";

const bot = new TelegramBot(token, { polling: true });

// const DBURL = "https://govno-bot-01.herokuapp.com/api/todo";
const DBURL = "http://localhost:6000/todo";

const start = () => {
  bot.setMyCommands([
    {
      command: "/start",
      description: "начать разгавор с ботом",
    },
    {
      command: "/anegdot",
      description: "рассказать анегдот",
    },
    { command: "/weather", description: "узнать погоду" },
    { command: "/begish", description: "расписание бегиш" },
    { command: "/dream", description: "гимн" },
    // { command: "/save", description: "сохранить" },
    // { command: "/todo", description: "напомнить" },
  ]);
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;
    console.log(msg);

    if (text === "/start" || text === "/start@bot_govnobot_bot") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/b50/063/b5006369-8faa-44d7-9f02-1ca97d82cd49/1.webp"
      );
      return bot.sendMessage(chatId, `Ohayo oniiii chan!!`);
    }
    //ffff
    if (text === "/anegdot" || text === "/anegdot@bot_govnobot_bot") {
      let joke = "";
      bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/e65/38d/e6538d88-ed55-39d9-a67f-ad97feea9c01/192/52.webp"
      );
      return bot.sendMessage(chatId, "пока я не знаю ни одного анегдота");
      // let { data } = await axios("https://icanhazdadjoke.com/j/1");
      // console.log(data);
    }
    //weatherwwwwwwwwwwwwwwwwww
    if (text === "/weather" || text === "/weather@bot_govnobot_bot") {
      return bot.sendMessage(chatId, "Выберите город", weatherOptions);
    }
    //begish
    if (text === "/begish" || text === "/begish@bot_govnobot_bot") {
      const image = fs.readFileSync("./images/begish.jpg");
      return bot.sendPhoto(chatId, image);
    }
    //dream
    if (text === "/dream" || text === "/dream@bot_govnobot_bot") {
      const dream = fs.readFileSync("./audio/Nelly.mp3");
      return bot.sendAudio(chatId, dream);
    }
    // todo CALC EXPERIMRNTSL

    if (/^\#sum/.test(text)) {
      let arrOfNums = text.match(/\d+/g);
      let data = await calc.getSum(arrOfNums);
      return bot.sendMessage(chatId, `${data}`);
      //
    } else if (/^\#diff/.test(text)) {
      let arrOfNums = text.match(/\d+/g);
      let data = await calc.getDifference(arrOfNums);
      return bot.sendMessage(chatId, `${data}`);
      //
    } else if (/^\#product/.test(text)) {
      let arrOfNums = text.match(/\d+/g);
      let data = await calc.getProduct(arrOfNums);
      return bot.sendMessage(chatId, `${data}`);
      //
    } else if (/^\#quot/.test(text)) {
      let arrOfNums = text.match(/\d+/g);
      let data = await calc.getQuotient(arrOfNums);
      return bot.sendMessage(chatId, `${data}`);
    }

    //save todo
    // ! DONT WORK
    if (text.split(" ")[0] === "/save") {
      console.log(text);
      let todo = text
        .replace(/\n/g, "")
        .match(
          /(name\s*\-\s*\w+\s*)|(do\s*\-\s*\w+\s*)|(date\s*\=\s*\d\d\-\d\d\-\d\d\d\d\s*)/g
        );
      console.log(todo);
      let todoOb = {
        name: todo[0].replace(/name|\-|\s/g, ""),
        do: todo[1].replace(/do|\s|\-/g, ""),
        date: todo[2].replace(/date|\s|\=/g, ""),
      };
      console.log(todoOb);
      return axios.post(DBURL, todoOb);
    }

    //todo
    // !DONT WORK
    if (text.split(" ")[0] === "/todo") {
      console.log(text);
      let name = text.replace(/ |todo|\//g, "").toLowerCase();
      let { data } = await axios(`${DBURL}?q=${name}`);
      console.log(data);

      console.log(text.replace(/ |todo|\//g, "").toLowerCase());
      return bot.sendMessage(
        chatId,
        `${data[0].name}\ndo - ${data[0].do}\ndate: ${data[0].date}`
      );
    }

    //;;;;;;;
    if (
      text.includes("как дела") ||
      text.includes("как делишки") ||
      text.includes("как твои дела")
    ) {
      return bot.sendMessage(chatId, `Отлично! У тебя как?`);
    }
    //rrrr
    if (
      text.includes("плохо") ||
      text.includes("не очень") ||
      text.includes("так себе") ||
      text.includes("поршиво") ||
      text.includes("ужастно")
    ) {
      await bot.sendMessage(chatId, "Не грусти");
      return bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/e65/38d/e6538d88-ed55-39d9-a67f-ad97feea9c01/6.webp"
      );
    }

    //rrrrr
    if (/(пошел\s*на\s*хуй)|(иди\s*на\s*хуй)|(нахуй\s*иди)/g.test(text)) {
      return bot.sendMessage(chatId, "Я же знаю где ты живешь!");
    }
    //dddd
    if (
      /(и\s*где\s*же\s*я живу)|(и\s*где\s*я\s*живу)|(и\s*где\s*же)/g.test(text)
    ) {
      return bot.sendMessage(chatId, "Со своей мамой");
    }
    if (/(расскажи историю)/g.test(text)) {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/e65/38d/e6538d88-ed55-39d9-a67f-ad97feea9c01/8.webp"
      );
      return bot.sendMessage(
        chatId,
        "Извини, но хозяин не разрешает мне общаться с чужаками"
      );
    }

    //photo
    if (text === "фото") {
      let url =
        "https://c.tenor.com/8oKcMm_H83MAAAAC/%D0%BF%D0%B0%D0%BF%D0%B8%D1%87%D0%BD%D0%B0%D1%80%D1%83%D1%82%D0%BE-%D0%BF%D0%B0%D0%BF%D0%B8%D1%87.gif";
      return bot.sendPhoto(chatId, url);
    }

    async function getTopAnime() {
      let { data } = await axios("https://api.jikan.moe/v4/top/anime");
      // console.log(data.data[0]);
      let rand = Math.floor(Math.random() * data.data.length);
      let d = await bot.sendPhoto(
        chatId,
        data.data[rand].images.jpg.large_image_url
      );
      return bot.sendMessage(
        chatId,
        `Аниме - ${data.data[rand].title}\n
                ${data.data[rand].title_english}
        Трейлер - ${data.data[rand].trailer.url}\n
        Описание - ${data.data[rand].synopsis}
        `
      );
    }
    if (text === "аниме") {
      return getTopAnime();
    }

    //''''''''
    return bot.sendMessage(
      chatId,
      "Извини братик, в ответах я ограничена, правильно задавай вопросы"
    );
  });

  //
  //
  //
  //
  bot.on("callback_query", async (msg) => {
    const message = msg.data;
    const chatId = msg.message.chat.id;
    //1
    if (message[0] == "1") {
      const apiKey = "42c86fedafa859132192ba49496ee723";
      let city = `${message.slice(1)}`;
      const URL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ru&units=metric&appid=${apiKey}`;
      let { data } = await axios(URL);
      return bot.sendMessage(
        chatId,
        `${data.name}\nпогода - ${data.main.temp}°C\nвлажность - ${data.main.humidity}%\nветер - ${data.wind.speed}км\ч`
      );
    }
  });
};
start();
