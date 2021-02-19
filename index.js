const Discord = require('discord.js');
const client = new Discord.Client({
	partials: ['MESSAGE', 'CHANNEL', 'REACTION']
});
const config = require('./config.json');
const { loadCommands } = require('./utils/loadCommands');
const DisTube = require('distube')

client.distube = new DisTube(client, { searchSongs: false, emitNewSongOnly: true });
client.distube
    .on("playSong", (message, queue, song) => message.channel.send(
        `Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${song.user}`
	))
	.on("addSong", (message, queue, song) => message.channel.send(
        `Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
    ))

require('./utils/loadEvents')(client);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();

loadCommands(client);

client.login(config.token);