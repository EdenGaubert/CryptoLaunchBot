const {Telegraf} = require('telegraf')
const bot = new Telegraf('5423239843:AAHbY2z7HKLsB74Jm8NpyQ54AFf6dn0bsAE')
const axios = require('axios').default;
const fs = require("fs");
bot.start((ctx) => {
    ctx.reply('The bot has started')
})

bot.on('photo', (ctx) => {
    ctx.telegram.getFileLink(ctx.message.photo[3].file_id).then(url => {
        console.log(url.toString());
        console.log(ctx.message)
        axios
          .get(url.toString(), {responseType: 'stream'})
          .then(response => {
            return new Promise(() => {
              response.data
                .pipe(
                  fs.createWriteStream(`images/${ctx.message.chat.id}.png`),
                )
                .on('finish', async () => {
                   const chatId = -1001588907952
                   console.log(ctx)
                   
                   bot.telegram.sendPhoto(chatId,{source: `images/${ctx.message.chat.id}.png`},
                    {caption: ctx.message.caption , caption_entities: ctx.message.caption_entities,  reply_markup : {
                      inline_keyboard: [
                        [{text: 'CryptoLaunch group chat 💬', url: 'https://t.me/CryptoLaunchApp'}]
                      ]
                    }}
                    
                   
                  );
                })
                .on('error', (e) => {
                    console.log(e)
                  ctx.reply(
                    '🚧 Something went wrong... if it keeps failing, please seek for help at @MobulaFi.',
                  );
                  
                });
            });
          });
      });
})




bot.on( 'message', (ctx) => {
        const chatId = -1001588907952
        const text = ctx.message.text
        entities = ctx.message.entities
        bot.telegram.sendMessage( chatId, text,{entities: ctx.message.entities, reply_markup: {
            inline_keyboard: [
                [{text: 'CryptoLaunch group chat 💬', url: 'https://t.me/CryptoLaunchApp'}]
            ]
        }})
        console.log(ctx.message.chat.id)
        console.log(entities)       
    })

    
   


bot.launch()