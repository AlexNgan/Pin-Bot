/*
  index.js
  Author: Logan (aka Morty)
*/

const Discord = require('discord.js');  //bot runs on the Discord js module
const bot = new Discord.Client();
const readdir = promisify(require("fs").readdir);
const config = require("./config.json");  //Allows config details to be stored secretly
//const fs = require("fs");
bot.commands = new discord.Collection();
bot.aliases = new discord.Collection();

    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    //bot.on(eventName, (...args) => eventFunction.run(bot, ...args));

    (async function() {
    	const commandFiles = await readdir('./commands/');
    	bot.log("log", `Loading ${commandFiles.length} commands!`, 'LOAD ');
    	commandFiles.forEach(f => {
    		try {
    			let commandFile = require(`./commands/${f}`);
    			bot.log("log", `Loading the ${commandFile.help.name} command!`, 'LOAD ');
    			bot.commands.set(commandFile.help.name, commandFile);
    			commandFile.conf.aliases.forEach(alias => {
    				bot.aliases.set(alias, commandFile.help.name);
    			});
    		} catch (e) {
    			bot.log(`Unable to load command ${f}: ${e}`);
    		}
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

    }());

//When a message is detected.
bot.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  ///Pulls off prefix and leaves just command and args.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
});
