module.exports = {
  weatherOptions: {
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
  },
};

// module.exports = {
//   calcOptions: {
//     reply_markup: JSON.stringify({
//       inline_keyboard: [
//         [{ text: "Бишкек", callback_data: "1Bishkek" }],
//         [{ text: "Москва", callback_data: "1Moscow" }],
//         [{ text: "Анкара", callback_data: "1Ankara" }],
//         [{ text: "Нур-Султан", callback_data: "1Nur-Sultan" }],
//         [{ text: "Ташкент", callback_data: "1Tashkent" }],
//         [{ text: "Кемин", callback_data: "1Kemin" }],
//       ],
//     }),
//   },
// };
