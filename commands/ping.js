//PING PONG.
exports.run = (bot, message, args, level) => {
    message.channel.send("pong! Your ping to my server is " + Math.round(bot.ping) + " milliseconds.").catch(console.error);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "ping",
  category: "Miscelaneous",
  description: "It... like... pings. Then Pongs. And it\"s not Ping Pong.",
  usage: "ping"
};
