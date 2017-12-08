// Load up the discord.js library
const Discord = require("discord.js");

// This is your client. Some people call it `bot`, some people call it `self`,
// some might call it `cootchie`. Either way, when you see `client.something`, or `bot.something`,
// this is what we're refering to. Your client.
const client = new Discord.Client();

// Load config and settings
// config.token contains the bot's token
// config.prefix contains the message prefix.
const config    = require("./config.json");
// const settings  = require("./settings.json");

client.on("ready", () => {
  // This event will run if the bot starts, and logs in, successfully.
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
  // Example of changing the bot's playing game to something useful. `client.user` is what the
  // docs refer to as the "ClientUser".

  client.user.setGame(`FUD management v1.0.0`);
});

client.on("guildCreate", guild => {
  // This event triggers when the bot joins a guild.
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);

  let channels = guild.channels.array();
  for (let channel of channels) {
    if (channel.name === 'general') {
      channel.send('fud-dud -- Glad to be around everyone! I am here to actively monitor the FUD :-)');
    }
  }

  client.user.setGame(`FUD management v1.0.0`);
});

client.on("guildDelete", guild => {
  // this event triggers when the bot is removed from a guild.
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  client.user.setGame(`on ${client.guilds.size} servers`);
});

// Create an event listener for new guild members
client.on('guildMemberAdd', member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.find('name', 'member-log');
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  channel.send(`Welcome to the server, ${member}! We have an Obsidian Tipbot available here, type \`!help\` for usage!`);
});

client.on("message", async message => {
  // This event will run on every single message received, from any channel or DM.

  // It's good practice to ignore other bots. This also makes your bot ignore itself
  // and not get into a spam loop (we call that "botception").
  if(message.author.bot) return;

  // Also good practice to ignore any message that does not start with our prefix,
  // which is set in the configuration file.
  // if(message.content.indexOf(config.prefix) !== 0) return;

  let randomFudReply = [
    'Fud on /biz/? No way! /s',
    'Yes there is fud on biz. Please ignore it and think for yourself.',
    'Buy the FUD! Sell the FOMO! *(this is not real trading advice)*'
  ];

  if ( /fud/ig.test(message.content) === true &&
        (/biz/ig.test(message.content) === true || /4chan/ig.test(message.content) === true) ) {
    let randomReply = randomFudReply[Math.floor(Math.random() * randomFudReply.length)];
    message.channel.send(`${randomReply} -- This FUD has been controlled by the FUDBot`);
  }

  if ( /sage/ig.test(message.content) === true &&
        /leaving/ig.test(message.content) === true) {
    message.channel.send(`Sagemark is not leaving. -- This FUD has been controlled by the FUDBot`);
  }
});

client.login(config.token);
