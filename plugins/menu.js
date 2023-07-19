const plugins = require("../lib/plugins");

const {
    command,
    isPrivate,
    clockString
} = require("../lib");
const {
    config,
    caption,
    CAPTION
} = require("../config");
const {
    tiny
} = require("@viper-x/fancytext")
const { hostname, uptime } = require("os");
command(
    {
        pattern: "menu",
        fromMe: isPrivate,
        desc: "Show All commands",
        dontAddCommandList: true,
        type: "user",
    },
    async (message, match) => {
        if (match) {
            for (let i of plugins.commands) {
                if (i.pattern.test(message.prefix + match))
                    message.reply(tiny(
                    `Command : ${message.prefix}${match.trim()}
                    Description : ${i.desc}`
                ));
            }
        } else {
            let {
                prefix
            } = message;
            let [date,
                time] = new Date()
            .toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata"
            })
            .split(",");
            let menu =           `pari`
            let cmnd = [];
            let cmd;
            let category = [];
            plugins.commands.map((command, num) => {
                if (command.pattern) {
                    cmd = command.pattern
                    .toString()
                    .match(/(\W*)([A-Za-züşiğ öç1234567890]*)/)[2];
                }

                if (!command.dontAddCommandList && cmd !== undefined) {
                    let type;
                    if (!command.type) {
                        type = "misc";
                    } else {
                        type = command.type.toLowerCase();
                    }
                    cmnd.push({
                        cmd, type: type
                    });
                    if (!category.includes(type)) category.push(type);
                }
            });
            cmnd.sort();
            category.sort().forEach((cmmd) => {
                let comad = cmnd.filter(({
                    type
                }) => type == cmmd);
                comad.forEach(({
                    cmd
                }, num) => {
                    menu += `${cmd.trim()}\n`
                });
            });
           menu +=                        `                                                 ${config.caption}`;
            return await message.sendMessage(tiny(menu))
        }
    }
);
