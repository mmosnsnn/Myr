const {
    command,
    isPrivate
} = require("../lib/")
const googleTTS = require("google-tts-api");
const { toAudio } = require("../lib/media");
command(
    {
        pattern: "tts",
        fromMe: isPrivate,
        desc: "text to speech.",
        category: "converter",
    },
    async (message, match,m) => {
        if (!match) {
            message.reply('Where is the text?')
        } else {
            const audio = googleTTS.getAudioUrl(`${match}`, {
                lang: "en",
                slow: false,
                host: "https://translate.google.com",
            })
            message.client.sendMessage(message.jid, {
                audio: {
                    url: audio,
                },
                mimetype: 'audio/mp4',
                ptt: false,
                fileName: `${match}.mp3`,
            }, {
                quoted: m,
            })
        }
    });
command(
  {
    pattern: "photo",
    fromMe: isPrivate,
    desc: "Changes sticker to Photo",
    type: "converter",
  },
  async (message, match, m) => {
    if (!message.reply_message)
      return await message.reply("_Reply to a sticker_");
    if (message.reply_message.mtype !== "stickerMessage")
      return await message.reply("_Not a sticker_");
    let buff = await m.quoted.download();
    return await message.sendMessage(buff, {}, "image");
  }
);
command(
  {
    pattern: "mp3",
    fromMe: isPrivate,
    desc: "converts video/voice to mp3",
    type: "downloader",
  },
  async (message, match, m) => {
    //if(message.reply_message.text) return await message.reply('_Enter Video Name_')
    let buff = await m.quoted.download();
    buff = await toAudio(buff, "mp3");
    return await message.sendMessage(buff, { mimetype: "audio/mpeg" }, "audio");
  }
);
