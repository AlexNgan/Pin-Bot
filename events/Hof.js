//idk
module.exports = async bot => {
  // Why await here? Because the ready event isn't actually ready, sometimes
  // guild information will come in *after* ready. 1s is plenty, generally,
  // for all of them to be loaded.
  await bot.wait(1000);

  // Both `wait` and `client.log` are in `./modules/functions`.
  bot.logger.log(`[READY] ${bott.user.tag}, ready to serve ${bot.users.size} users in ${bot.guilds.size} servers.`, "ready");
};
