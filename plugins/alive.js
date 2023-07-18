const {
    command
} = require("../lib/");
const {
    tiny
} = require("@viper-x/fancytext")
command(
    {
        pattern: "alive",
        fromMe: false,
        desc: "To check bot is alive or not",
        type: "user",
    },
    async (message, m, match) => {
      let msg = tiny(`Im alive!!!\nType .alive to set alive.`);
await message.reply(msg);
    });
      