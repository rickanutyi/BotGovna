module.exports = {
  calc: {
    getSum(nums) {
      return nums.reduce((acc, prev) => +acc + +prev);
    },
    getDifference(nums) {
      return nums.reduce((acc, prev) => +acc - +prev);
    },
    getProduct(nums) {
      return nums.reduce((acc, prev) => +acc * +prev);
    },
    getQuotient(nums) {
      return nums.reduce((acc, prev) => +acc / +prev);
    },
  },

  anime: {
    // async function getTopAnime() {
    //   let { data } = await axios("https://api.jikan.moe/v4/top/anime");
    //   // console.log(data.data[0]);
    //   let rand = Math.floor(Math.random() * data.data.length);
    //   let d = await bot.sendPhoto(
    //     chatId,
    //     data.data[rand].images.jpg.large_image_url
    //   );
    //   return bot.sendMessage(
    //     chatId,
    //     `Аниме - ${data.data[rand].title}\n
    //               ${data.data[rand].title_english}
    //     Трейлер - ${data.data[rand].trailer.url}\n
    //     Описание - ${data.data[rand].synopsis}
    //     `
    //   );
    // }
  },
};
