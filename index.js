const { default: axios } = require("axios");
const fs = require("fs");
const TelegramBot = require("node-telegram-bot-api");

const token = "5052672012:AAGaLo_LK0d34Y-iusDrnivZe8Vdgi6zaFQ";

const bot = new TelegramBot(token, { polling: true });

const weatherOptions = {
  reply_markup: JSON.stringify({
    inline_keyboard: [
      [{ text: "Бишкек", callback_data: "1Bishkek" }],
      [{ text: "Москва", callback_data: "1Moscow" }],
      [{ text: "Анкара", callback_data: "1Ankara" }],
      [{ text: "Нур-Султан", callback_data: "1Nur-Sultan" }],
      [{ text: "Ташкент", callback_data: "1Tashkent" }],
      [{ text: "Кемин", callback_data: "1Kemin" }],
    ],
  }),
};
const start = () => {
  bot.setMyCommands([
    { command: "/start", description: "начать разгавор с ботом" },
    { command: "/anegdot", description: "рассказать анегдот" },
    { command: "/weather", description: "узнать погоду" },
    { command: "/begish", description: "расписание бегиш" },
  ]);
  bot.on("message", async (msg) => {
    const text = msg.text;
    const chatId = msg.chat.id;

    if (text === "/start") {
      await bot.sendSticker(
        chatId,
        "https://tlgrm.ru/_/stickers/b50/063/b5006369-8faa-44d7-9f02-1ca97d82cd49/1.webp"
      );
      return bot.sendMessage(chatId, `Дарова ${msg.from.first_name}`);
    }
    //ffff
    if (text === "/anegdot") {
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
    if (text === "/weather") {
      return bot.sendMessage(chatId, "Выберите город", weatherOptions);
    }
    if (text === "/begish") {
      const image = fs.readFileSync("./images/begish.jpg");
      return bot.sendPhoto(chatId, image);
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

    //''''''''
    return bot.sendMessage(
      chatId,
      "Извини, в ответах я ограничен, правильно задавай вопросы"
    );
  });
  bot.on("callback_query", async (msg) => {
    const message = msg.data;
    const chatId = msg.message.chat.id;
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
