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

const config = require("./config.json");  //Allows config details to be stored secretly
// Require our logger
bot.logger = require("./util/Logger");
require("./modules/functions.js")(bot); // Useful functions that we'll use throughout the bot, like logs and elevation features.
//const fs = require("fs");

// Aliases and commands are put in collections where they can be read from, catalogued, listed, etc.
bot.commands = new Enmap();
bot.aliases = new Enmap();

//Essentially saves a collection to disk.
bot.settings = new Enmap({provider: new EnmapLevel({name: "settings"})});

const defaultSettings = {
  prefix: "-",
  //modLogChannel: "abandonment",
  modRole: "Mod Birb",
  adminRole: "Admin Birb",
  //welcomeMessage: "Say hello to {{user}}, everyone! We all need a warm welcome sometimes :D"
}

    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    //bot.on(eventName, (...args) => eventFunction.run(bot, ...args));

    bot.on("ready", () => {
      // This event will run if the bot starts, and logs in, successfully.
      console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
      bot.user.setActivity(`on ${bot.guilds.size} servers`);
    });

const init = async () => {
  //Loads commands into memory.
  const commandFiles = await readdir('./commands/');
  bot.logger.log("log", `Loading ${commandFiles.length} commands!`, 'LOAD ');
  commandFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = bot.loadCommand(f);
    if (response) console.log(response);
  });

    	const eventFiles = await readdir('./events/');
    	bot.logger.log("log", `Loading ${eventFiles.length} events!`, 'LOAD ');
    	eventFiles.forEach(file => {
    		const eventName = file.split(".")[0];
    		const event = require(`./events/${file}`);
        console.log(event);
    		bot.on(eventName, event.bind(null, bot));
    		delete require.cache[require.resolve(`./events/${file}`)];
    	});

      bot.login(config.token);  //Logs in bot by fetching token from config file.
    };  // End top-level async/await function.

    init();
