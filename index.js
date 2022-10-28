import { Context, Telegraf } from "telegraf";
const bot = new Telegraf("5662780845:AAGAGtRZBAmCI4Z6Tdz4BOSaZ8yD0dh5bvg");
import { ethers } from "ethers";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  "https://axvjkdntjlinhuodgrpz.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4dmprZG50amxpbmh1b2RncnB6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY2NjQyOTkxNiwiZXhwIjoxOTgyMDA1OTE2fQ.aZvOnbl4QO-WM3VF7FGyfQq8flClej5suHlnnAqF184"
);

export const stableTokens = {
  //used in bot.ts
  //leaving like this for now
  "BNB Smart Chain (BEP20)": [
    {
      vsToken0: "0xe9e7cea3dedca5984780bafc599bd69add087d56", //BUSD
      vsToken1: "0x55d398326f99059ff775485246999027b3197955", //USDT
    },
  ],
  Ethereum: [
    {
      vsToken0: "0xdac17f958d2ee523a2206206994597c13d831ec7", //USDT
      vsToken1: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", //USDC
    },
  ],
  "Avalanche C-Chain": [
    {
      vsToken0: "0xc7198437980c041c805a1edcba50c1ce5db95118", //USDTe
      vsToken1: "0xb97ef9ef8734c71904d8002f8b6bc66dd9c48a6e", //USDC
    },
  ],
  Polygon: [
    {
      vsToken0: "0x2791bca1f2de4661ed88a30c99a7a9449aa84174", //USDC
      vsToken1: "0xc2132d05d31c914a87c6611c10748aeb04b58e8f", //USDT
    },
  ],
  Fantom: [
    {
      vsToken0: "0x04068da6c83afcfa0e13ba15a6696662335d5b75", //USDC
      vsToken1: "0x049d68029688eabf473097a2fc38ef61633a3c7a", //Frapped USD
    },
  ],
  Cronos: [
    {
      vsToken0: "0xc21223249ca28397b4b6541dffaecc539bff0c59", //USDC
      vsToken1: "0x66e428c3f67a68878562e79a0234c1f83c208770", //USDT
    },
  ],
};

bot.start((ctx) => {
  const username = ctx.message.from.username;
  ctx.reply(
    "This is the official Sotrade Bot 🔫 deployed by Sotrade I can snipe call channels, presales and many more to come! Fire /sniper to summon the sniper panel."
  );
  supabase
    .from("users")
    .upsert({ username: username, id: ctx.message.from.id })
    .then(console.log);
  supabase
    .from("users_wallets")
    .upsert({ username: ctx.message.from.username, id: ctx.message.from.id })
    .then(console.log);
});

bot.command("sniper", (ctx) => {
  ctx.replyWithHTML(
    `What would you like to do today?

    <b>Monitor</b>
    Active Trades: 0
    Disabled Trades: 0`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Sotrade bot ", callback_data: "sotrade" }],
          [
            { text: "⚙️ Wallets", callback_data: "wallet" },
            { text: "⚙️ Copytrade", callback_data: "copytrade" },
          ],
        ],
      },
    }
  );
});

bot.action("sniper", (ctx) => {
  ctx.replyWithHTML(
    `What would you like to do today?

    <b>Monitor</b>
    Active Trades: 0
    Disabled Trades: 0`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Sotrade bot ", callback_data: "sotrade" }],
          [
            { text: "⚙️ Wallets", callback_data: "wallet" },
            { text: "⚙️ Copytrade", callback_data: "copytrade" },
          ],
        ],
      },
    }
  );
});

bot.action("wallet", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(`Select target chain:`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Sotrade bot ", callback_data: "sotrade" }],
        [{ text: "Return", callback_data: "sniper" }],
        [
          { text: "BSC", callback_data: "BSC" },
          { text: "ETH", callback_data: "ETH" },
        ],
      ],
    },
  });
});

bot.action("ETH", async (ctx) => {
  supabase
    .from("users")
    .upsert({ blockchain_user: "ETH", id: ctx.update.callback_query.from.id })
    .then(console.log);
  ctx.deleteMessage();
  const getUserInfos = await supabase
    .from("users")
    .select("*")
    .match({ id: ctx.update.callback_query.from.id });
  ctx.reply(
    `Address: Disconnected // a changer par l'addresse du wallet qu'on vient de générer ou connecter 
    Chain: ETH
    
   gas fees: undefined
    
    ℹ️ Smart Slippage is unsuitable for stealth launches and God Mode snipes.`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Sotrade bot ", callback_data: "sotrade" }],
          [
            { text: "Connect Wallet", callback_data: "connect" },
            { text: "return", callback_data: "wallet" },
          ],
          [{ text: "Generate Wallet", callback_data: "generate" }],
        ],
      },
    }
  );
});

bot.action("BSC", async (ctx) => {
  supabase
    .from("users")
    .upsert({ blockchain_user: "BSC", id: ctx.update.callback_query.from.id })
    .then(console.log);
  ctx.deleteMessage();
  const getUserInfos = await supabase
    .from("users")
    .select("*")
    .match({ id: ctx.update.callback_query.from.id });
  ctx.reply(
    `Address: Disconnected // a changer par l'addresse du wallet qu'on vient de générer ou connecter 
    Chain: BSC
    
    Auto Buy: ✅
    Auto Sell: ✅
    Trailing Sell: ❌
    Smart Rug Auto Sell: ❌
    Duplicate Buy: ❌
    Multi Wallet: ❌
    Smart Slippage: ✅
    Trade Sell Confirmation: ✅
    
    Presale Amount: Disabled
    Max MCap: Disabled
    Min Liquidity: Disabled
    Max Liquidity: Disabled
    Min MCap/Liq: Disabled
    Max Buy Tax: Disabled
    Max Sell Tax: Disabled
    Gas Limit: Auto
    Max Gas Price: Disabled
    Gas Price: Auto (5 gwei)
    Slippage: Auto (100%)
    
    ℹ️ Smart Slippage is unsuitable for stealth launches and God Mode snipes.`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Sotrade bot ", callback_data: "sotrade" }],
          [
            { text: "Connect Wallet", callback_data: "connect" },
            { text: "return", callback_data: "wallet" },
          ],
          [{ text: "Generate Wallet", callback_data: "generate" }],
        ],
      },
    }
  );
});

bot.action("generate", async (ctx) => {
  const wal = ethers.Wallet.createRandom();
  const response = {
    privateKey: wal.privateKey,
    address: wal.address,
    mnemonic: wal._mnemonic().phrase,
  };

  ctx.replyWithHTML(`✅ Generated new wallet:
    Chain: BSC
    Address:${response.address}
    PK:${response.privateKey}
    Mnemonic: ${response.mnemonic}
    
    ⚠️ Make sure to save this mnemonic phrase OR private key. You could also import it to your Metamask/Trust Wallet. The bot will not display this information again.`);
  supabase
    .from("users_wallets")
    .upsert({
      address: response.address,
      username: ctx.update.callback_query.from.username,
      id: ctx.update.callback_query.from.id,
      wallet: true,
    })
    .then(console.log);
});

bot.action("copytrade", (ctx) => {
  ctx.deleteMessage();
  ctx.reply(`Select target chain:`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Sotrade bot ", callback_data: "sotrade" }],
        [{ text: "Return", callback_data: "sniper" }],
        [
          { text: "BSC", callback_data: "BSCcopy" },
          { text: "ETH", callback_data: "ETHcopy" },
        ],
      ],
    },
  });
});

bot.action("BSCcopy", async (ctx) => {
  supabase
    .from("users")
    .upsert({ blockchain_user: "BSC", id: ctx.update.callback_query.from.id })
    .then(console.log);
  ctx.deleteMessage();
  const button = await supabase
    .from("users")
    .select("button")
    .match({ id: ctx.update.callback_query.from.id });
  let callback = " ";
  let message = " ";
  if ((button.data as any)[0].button == false) {
    message = "🔴 OFF";
    callback = "on";
  } else {
    message = "🟢 On";
    callback = "off";
  }

  Promise.all([
    ctx.reply(`Add or remove wallets whose trades you'd like to copy!`, {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Sotrade bot ", callback_data: "sotrade" }],

          [
            { text: message, callback_data: callback },
            { text: "return", callback_data: "copytrade" },
          ],
          [{ text: "Add Wallet", callback_data: "addW" }],
        ],
      },
    }),
  ]).then((chibre) => {
    console.log(chibre, "test"); // [Message, Message]
    const messageid = chibre[0].message_id;
    supabase
      .from("users")
      .upsert({ message_id: messageid, id: ctx.update.callback_query.from.id })
      .then(console.log);
  });
});

bot.action("ETHcopy", async (ctx) => {
  supabase
    .from("users")
    .upsert({ blockchain_user: "ETH", id: ctx.update.callback_query.from.id })
    .then(console.log);
  const button = await supabase
    .from("users")
    .select("button_eth")
    .match({ id: ctx.update.callback_query.from.id });
  let callback = " ";
  let message = " ";
  if ((button.data as any)[0].button_eth == false) {
    message = "🔴 OFF";
    callback = "on";
  } else {
    message = "🟢 On";
    callback = "off";
  }
  ctx.deleteMessage();
  ctx.reply(`Add or remove wallets whose trades you'd like to copy!`, {
    reply_markup: {
      inline_keyboard: [
        [{ text: "Sotrade bot ", callback_data: "sotrade" }],
        [
          { text: message, callback_data: callback },
          { text: "return", callback_data: "copytrade" },
        ],
        [{ text: "Add Wallet", callback_data: "addW" }],
      ],
    },
  });
});
bot.action("on", async (ctx) => {
  console.log("chibre on ");
  supabase
    .from("users")
    .update({ button: true, button_eth: true })
    .match({ id: ctx.update.callback_query.from.id })
    .then(console.log);
  try {
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [
        [{ text: "Sotrade bot ", callback_data: "sotrade" }],
        [
          { text: "🟢 On", callback_data: "off" },
          { text: "return", callback_data: "copytrade" },
        ],
        [{ text: "Add Wallet", callback_data: "addW" }],
      ],
    });
  } catch (e) {
    console.log("zebi");
  }
});
bot.action("off", async (ctx) => {
  console.log("chibre off");
  supabase
    .from("users")
    .update({ button: false, button_eth: false })
    .match({ id: ctx.update.callback_query.from.id })
    .then(console.log);

  try {
    await ctx.editMessageReplyMarkup({
      inline_keyboard: [
        [{ text: "Sotrade bot ", callback_data: "sotrade" }],
        [
          { text: "🔴 Off", callback_data: "on" },
          { text: "return", callback_data: "copytrade" },
        ],
        [{ text: "Add Wallet", callback_data: "addW" }],
      ],
    });
  } catch (e) {
    console.log("chibre");
  }
});

bot.action("addW", async (ctx) => {
  ctx.sendMessage(
    "What would you like to name this copy trade wallet? 8 letters max, only numbers and letters. Reply to this message with the command /setname"
  );
});

bot.command("setname", (ctx) => {
  const text = (ctx.message as any).text.split("/setname ")[1];
  if (text.length <= 8) {
    supabase
      .from("tracked_wallet")
      .upsert({
        name: text,
        id: ctx.message.from.id,
        username: ctx.message.from.username,
      })
      .then(console.log);
    ctx.sendMessage(
      "Reply to this message with the command /setwallet with the desired wallet address you'd like to copy trades from."
    );
  } else {
    ctx.reply(
      "This is not a valid wallet name. Name must be alphanumeric, 8 letters max."
    );
  }
});

bot.command("setwallet", async (ctx) => {
  const chatID = ctx.message.from.id;
  const blockchain = await supabase
    .from("users")
    .select("blockchain_user")
    .match({ id: ctx.message.from.id });
  console.log(blockchain);

  const name = await supabase
    .from("tracked_wallet")
    .select("name")
    .match({ id: ctx.message.from.id });
  console.log(name);

  const address = (ctx.message as any).text.split("/setwallet ")[1];
  console.log(address);

  const content = {
    inlinekeyboard: [
      [{ text: "SoTrade", callback_data: "sotarde" }],
      [
        { text: "message", callback_data: "callback" },
        { text: "return", callback_data: "copytrade" },
      ],
      [{ text: "Add Wallet", callback_data: "addW" }],
      [
        { text: name, callback_data: "copy_wallet" },
        { text: "rename", callback_data: "rename" },
        { text: "❌", callback_data: "delete" },
      ],
    ],
  };
  const inlineMessageId = "";
  if (ethers.utils.isAddress(address)) {
    supabase
      .from("tracked_wallet")
      .upsert({
        address_wallet: address,
      })
      .then(console.log);
    ctx.replyWithHTML(
      `✅ Added ${(blockchain.data as any)[0].blockchain_user} wallet (💳 <b>${
        (name.data as any)[0].name
      }</b>): <b>${address}</b>`
    );
  } else {
    ctx.reply("This is not a valid wallet address. Please try again.");
  }
  const messageID = await supabase
    .from("users")
    .select("message_id")
    .match({ id: ctx.message.from.id });
  console.log((messageID.data as any)[0].message_id, "teststst");
  try {
    ctx.telegram.editMessageReplyMarkup(
      chatID,
      messageID as any,
      inlineMessageId,
      content as any
    );
  } catch (e) {
    console.log("error zebi");
  }
});

bot.launch();
