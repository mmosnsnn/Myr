const {
  command,
  getBuffer,
  fetchJson,
  getJson,
  getUrl,
  isIgUrl,
 fetchBuffer, 
} = require("../lib/");

const YT = require("../lib/ytdl");
const ytdl = require('ytdl-secktor')
const yts = require('secktor-pack')
const fs = require('fs')
var videotime = 60000 // 1000 min
var dlsize = 1000 // 1000mb

const ffmpeg = require("fluent-ffmpeg");
      

   
command({
            pattern: "song",
            
            desc: "Downloads audio from youtube.",
            category: "downloader",
            
        },
        async(message,match, m) => {
          message.client.sendMessage(message.jid, { react: { text: "🎶" , key: m.key }}) 
if (!match) return await message.reply(`*_Provide a song name/link!_*`)
            let yts = require("secktor-pack");
            let search = await yts(match);
            let anu = search.videos[0];
            const getRandom = (ext) => {
                return `${Math.floor(Math.random() * 10000)}${ext}`;
            };
            let infoYt = await ytdl.getInfo(anu.url);
            if (infoYt.videoDetails.lengthSeconds >= videotime) return message.reply(`_ Video file too big!_`);
            let titleYt = infoYt.videoDetails.title;
            let randomName = getRandom(".mp3");
            await message.client.sendMessage(message.jid, { text : `*_Downloading : ${titleYt}_*` },{quoted:m})
            const stream = ytdl(anu.url, {
                    filter: (info) => info.audioBitrate == 160 || info.audioBitrate == 128,
                })
                .pipe(fs.createWriteStream(`./${randomName}`));
            await new Promise((resolve, reject) => {
                stream.on("error", reject);
                stream.on("finish", resolve);
            });

            let stats = fs.statSync(`./${randomName}`);
            let fileSizeInBytes = stats.size;
            let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
            if (fileSizeInMegabytes <= dlsize) {
                let buttonMessage = {
                    audio: fs.readFileSync(`./${randomName}`),
                    mimetype: 'audio/mpeg',
                    fileName: titleYt + ".mp3",
                    
                }
                await message.client.sendMessage(message.jid, buttonMessage, { quoted: m })
                return fs.unlinkSync(`./${randomName}`);
            } else {
                message.reply(`_ File size bigger than 100mb_`);
            }
            fs.unlinkSync(`./${randomName}`);
            


        }
    )
command({
            pattern: "video",
            desc: "Downloads video from yt.",
            category: "downloader",
            
        },
        async(message,match,m) => {
message.client.sendMessage(message.jid, { react: { text: "🎥" , key: m.key }}) 
if (!match) return await message.reply(`*_Provide a video name/link!_*`)
            let yts = require("secktor-pack");
            let search = await yts(match);
            let anu = search.videos[0];
            let urlYt = anu.url
            const getRandom = (ext) => {
                return `${Math.floor(Math.random() * 10000)}${ext}`;
            };
                let infoYt = await ytdl.getInfo(urlYt);
                if (infoYt.videoDetails.lengthSeconds >= videotime) return message.reply(`_Video file too big!_`);
                let titleYt = infoYt.videoDetails.title;
                let randomName = getRandom(".mp4");
                await message.client.sendMessage(message.jid,{text:`*_Downloading : ${titleYt}_*`},{quoted:m})
                const stream = ytdl(urlYt, {
                        filter: (info) => info.itag == 22 || info.itag == 18,
                    })
                    .pipe(fs.createWriteStream(`./${randomName}`));
                await new Promise((resolve, reject) => {
                    stream.on("error", reject);
                    stream.on("finish", resolve);
                });
                let stats = fs.statSync(`./${randomName}`);
                let fileSizeInBytes = stats.size;
                let fileSizeInMegabytes = fileSizeInBytes / (1024 * 1024);
                if (fileSizeInMegabytes <= dlsize) {
                    let buttonMessage = {
                        video: fs.readFileSync(`./${randomName}`),
                        
                        mimetype: 'video/mp4',
                        fileName: `${titleYt}.mp4`,
                        caption: `Title : ${titleYt}\nFile Size : ${fileSizeInMegabytes} MB`,
                        
                    }
                 message.client.sendMessage(message.jid, buttonMessage, { quoted: m })
                 return fs.unlinkSync(`./${randomName}`);
                } else {
                    citel.reply(`_ File size bigger than 100mb_`);
                }
                return fs.unlinkSync(`./${randomName}`);      


        }
    )