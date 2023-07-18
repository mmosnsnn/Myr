const {
    command
} = require("../lib/");
const {
    tiny
} = require("@viper-x/fancytext")
command(
    {
        pattern: "ping",
        fromMe: false,
        desc: "To check ping",
        type: "user",
    },
    async (message, match) => {
        const start = new Date().getTime();
        await message.sendMessage(tiny("*Ping!!!*"));
        const end = new Date().getTime();
        return await message.sendMessage(tiny(
            "*Pong!!*\n " + (end - start) + " *ms*"
        ));
    }
);