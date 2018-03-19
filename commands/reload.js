/*
Source: An Idiot's Guide.

Because of the way require() works in node, if you modify any of the command files in ./commands , the changes are not reflected immediately when you call that command again - because require() caches the file in memory instead of reading it every time. While this is great for efficiency, it means we need to clear that cached version if we change commands.

The Reload command does just that, simply deletes the cache so the next time that specific command is run, it'll refresh its code from the file.
*/

exports.run = (client, message, args) => {
  if(!args || args.size < 1) return message.reply("Must provide a command name to reload.");
  // the path is relative to the *current folder*, so just ./filename.js
  delete require.cache[require.resolve(`./${args[0]}.js`)];
  message.reply(`The command ${args[0]} has been reloaded`);
};
