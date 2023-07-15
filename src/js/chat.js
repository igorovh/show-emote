window.addEventListener('config', () => {
	console.info(`Creating chat client for ${config.CHANNEL}.`);

	const client = new tmi.Client({
		channels: [config.CHANNEL],
	});

	client.connect();

	const COOLDOWNS = {
		showemote: 0,
		multishowemote: 0,
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
				console.info(
					`Showing emote with code ${code} ${
						ignoreCooldown ? '' : `and adding cooldown for ${config.SHOW_EMOTE_COOLDOWN} secs`
					}`
				);
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
			names: ['mshowemote', 'multishowemote'],
			moderator: false,
			executor: (data, args, ignoreCooldown = false, ignoreMaxAmount = false) => {
				if (!ignoreCooldown) {
					if (COOLDOWNS['multishowemote'] >= Date.now()) return;
					COOLDOWNS['multishowemote'] = Date.now() + config.MULTI_SHOW_EMOTE_COOLDOWN * 1000;
				}

				if (args.length < 1) return;
				let emotes = [];
				args.forEach((code) => {
					const emote = getEmoteByCode(code);
					if (emote) emotes.push(emote);
				});

				if (!ignoreMaxAmount) {
					if (emotes.length > config.MULTI_SHOW_EMOTES_AMOUNT) {
						emotes = emotes.splice(0, config.MULTI_SHOW_EMOTES_AMOUNT);
						console.info('Splicing emotes list to max amount which is ', config.MULTI_SHOW_EMOTES_AMOUNT);
					}
				}

				if (emotes.length < 2) return;
				console.info(
					`Showing multiple emotes (${emotes.length}) ${
						ignoreCooldown ? '' : `and adding cooldown for ${config.MULTI_SHOW_EMOTE_COOLDOWN} secs`
					}`
				);
				emotes.forEach((emote) => displayImage(emote.urls[emote.urls.length - 1].url));
			},
		},
		{
			names: ['forcemultishowemote', 'fmshowemote'],
			moderator: true,
			executor: (data, args) =>
				commands.find((command) => command.names.includes('multishowemote')).executor(data, args, true, true),
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
});
