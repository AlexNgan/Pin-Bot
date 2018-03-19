//PING PONG.
exports.run = (bot, message, args) => {
    message.channel.send("pong! Your ping to my server is " + Math.round(bot.ping) + " milliseconds.").catch(console.error);
};
