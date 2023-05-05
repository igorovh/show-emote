const client = new tmi.Client({
	channels: [config.CHANNEL],
});

client.connect();

const COOLDOWNS = {
	showemote: 0,
};

const commands = [
	{
		names: ['showemote'],
		moderator: false,
		executor: (data, args, ignoreCooldown = false) => {
			if (!ignoreCooldown) {
				if (COOLDOWNS['showemote'] >= Date.now()) return;
				COOLDOWNS['showemote'] = Date.now() + config.SHOW_EMOTE_COOLDOWN * 1000;
			}

			if (args.length < 1) return;
			const code = args[0];
			const emote = getEmoteByCode(code);
			if (!emote) return;
			displayImage(emote.urls[emote.urls.length - 1].url);
			console.log('Showing emote with code', code, `and adding cooldown for ${config.SHOW_EMOTE_COOLDOWN} secs`);
		},
	},
	{
		names: ['forceshowemote', 'fshowemote'],
		moderator: true,
		executor: (data, args) =>
			commands.find((command) => command.names.includes('showemote')).executor(data, args, true),
	},
	{
		names: ['reloademotes'],
		moderator: true,
		executor: (data, args) => loadEmotes(),
	},
	{
		names: ['showaha'],
		moderator: true,
		executor: (data, args) => {
			const ahaEmotes = emotes.filter((emote) => emote.code.startsWith('aha'));
			if (ahaEmotes.length < 1) return;
			ahaEmotes.forEach((emote) =>
				setTimeout(() => displayImage(emote.urls[emote.urls.length - 1].url), randomRange(1, 50) * 100)
			);
		},
	},
	{
		names: ['showbooba'],
		moderator: true,
		executor: (data, args) => {
			const boobaCodes = config.BOOBA_CODES.split(',');
			const boobaEmotes = [];
			boobaCodes.forEach((code) => {
				const emote = getEmoteByCode(code);
				if (emote) boobaEmotes.push(emote);
			});
			boobaEmotes.forEach((emote) =>
				setTimeout(() => displayImage(emote.urls[emote.urls.length - 1].url), randomRange(1, 50) * 100)
			);
		},
	},
];

client.on('message', (channel, tags, message, self) => {
	if (self || !message.startsWith('!')) return;

	const args = message.slice(1).split(' ');
	const commandName = args.shift().toLowerCase();

	const data = {
		username: tags['display-name'],
		userId: tags['user-id'],
		moderator: tags.mod || tags.badges?.broadcaster !== undefined,
		channel,
		roomId: tags['room-id'],
	};

	const command = commands.find((command) => command.names.includes(commandName));
	if (!command) return;

	if (command.moderator && !data.moderator && !config.ALLOW_LIST.includes(data.username)) return;

	command.executor(data, args);
});
