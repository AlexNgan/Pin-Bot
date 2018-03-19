/*
  index.js
  Author: Logan (aka Morty)
*/

const Discord = require('discord.js');  //bot runs on the Discord js module
const {promisify} = require('util');
const bot = new Discord.Client();
const readdir = promisify(require("fs").readdir);

//Stores shit.
const Enmap = require("enmap");
const EnmapLevel = require("enmap-level");
const tableSource = new EnmapLevel({name: "table"});
bot.table = new Enmap({provider: tableSource});

const config = require("./config.json");  //Allows config details to be stored secretly
require("./modules/functions.js")(bot); // Useful functions that we'll use throughout the bot, like logs and elevation features.
//const fs = require("fs");
bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();

    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    //bot.on(eventName, (...args) => eventFunction.run(bot, ...args));

const init = async () => {
  //Loads commands into memory.
  const commandFiles = await readdir('./commands/');
  bot.log("log", `Loading ${commandFiles.length} commands!`, 'LOAD ');
  commandFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = bot.loadCommand(f);
    if (response) console.log(response);
    	});

    	const eventFiles = await readdir('./events/');
    	bot.log("log", `Loading ${eventFiles.length} events!`, 'LOAD ');
    	eventFiles.forEach(file => {
    		const eventName = file.split(".")[0];
    		const event = require(`./events/${file}`);
    		bot.on(eventName, event.bind(null, bot));
    		delete require.cache[require.resolve(`./events/${file}`)];
    	});

      bot.login(config.token);  //Logs in bot by fetching token from config file.
    };  // End top-level async/await function.

    init();
