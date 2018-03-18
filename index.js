/*
  index.js
  Author: Logan (aka Morty)
*/

const Discord = require('discord.js');  //bot runs on the Discord js module
const bot = new Discord.Client();
const config = require("./config.json");  //Allows config details to be stored secretly
const fs = require("fs");


exports.run = (bot, message, args, level) => {
message.channel.fetchMessages({limit: 1, around: args[0]})
    .then(messages=> {
        const msg = messages.first();
        var HallOfFame = msg.guild.channels.find('name', 'hall-of-fame');
        if (!HallOfFame) return;
        if (message.reactions.me) return;
        msg.react("320770131741376512");
        const HoF = new Discord.RichEmbed();
            HoF.setColor(`${msg.member.displayHexColor}`)
            .setFooter('Hall of Fame 🏆')
            .setTimestamp()

        //If poster had no nickname...use their regular discord name.
        if (msg.member.nickname == null) {
            HoF.addField('User',`${msg.author.username}`, true)
        } else {
            HoF.addField('User',`${msg.member.nickname} (${msg.author.username})`, true);
        };

        HoF.addField('Channel', `${msg.channel.name}`, true)
        if (msg.attachments.size==0) {
            HoF.addField('Message', `${msg}`)
        } else {
            pictures = msg.attachments.array();
            if (msg != "") {
                HoF.addField('Message', `${msg}`)
            }
            HoF.setImage(pictures[0].url)
        }
        HallOfFame.send({embed: HoF});
        message.channel.send('Message successfully added!')
    });
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['hof', 'halloffame'],
    permLevel: 2
};

exports.help = {
    name: 'HoF',
    description: 'Adds a message to Hall of Fame manually, if it didn\'t get added for whatever reason',
    usage: 'HoF <messageID (found by clicking on the three dots next to the message, with developer mode on)'
};

bot.login(config.token);  //Logs in bot by fetching token from config file.
