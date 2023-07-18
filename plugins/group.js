const { command, isPrivate } = require("../lib/");
const { isAdmin, parsedJid } = require("../lib");

command(
  {
    pattern: "add ",
    fromMe: isPrivate,
    desc: "Adds a person to group",
    type: "group",
  },
  async (message, match, m) => {
    if (!message.isGroup)
      return await message.reply("_This command is for groups_");
    match = match || message.reply_message.jid;
    if (!match) return await message.client.sendMessage(message.jid, { text : "_Mention a user to add!_"}, {quoted: m});
    let isadmin = await isAdmin(message.jid, message.user, message.client);
    if (!isadmin) return await message.client.sendMessage(message.jid, { text : "_I'm not an admin!_"},{quoted:m});
    let jid = parsedJid(match);
    await message.add(jid);
    return await message.client.sendMessage(message.jid, { text :`@${jid[0].split("@")[0]}, was added to the group!`}, {
      mentions: jid,
    });
  }
);