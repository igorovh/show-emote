import Settings from './settings.js';
import { getEmoteByCode, loadEmotes } from './emotes.js';
import { displayImage } from './dispalyer.js';

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
				COOLDOWNS['showemote'] = Date.now() + Settings.SHOW_EMOTE_COOLDOWN * 1000;
			}

			if (args.length < 1) return;
			const code = Settings.SERVICE === 'kick' ? getEmoteCode(args[0]) : args[0];
			const emote = getEmoteByCode(code);
			if (!emote) return;
			displayImage(emote.urls[emote.urls.length - 1].url);
			console.info(
				`Showing emote with code ${code} ${
					ignoreCooldown ? '' : `and adding cooldown for ${Settings.SHOW_EMOTE_COOLDOWN} secs`
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
				COOLDOWNS['multishowemote'] = Date.now() + Settings.MULTI_SHOW_EMOTE_COOLDOWN * 1000;
			}
			if (args.length < 1) return;
			let emotes = [];
			args.forEach((code) => {
				const emote = getEmoteByCode(Settings.SERVICE === 'kick' ? getEmoteCode(code) : code);
				if (emote) emotes.push(emote);
			});

			if (!ignoreMaxAmount) {
				if (emotes.length > Settings.MULTI_SHOW_EMOTES_AMOUNT) {
					emotes = emotes.splice(0, Settings.MULTI_SHOW_EMOTES_AMOUNT);
					console.info('Splicing emotes list to max amount which is ', Settings.MULTI_SHOW_EMOTES_AMOUNT);
				}
			}

			if (emotes.length < 2) return;
			console.info(
				`Showing multiple emotes (${emotes.length}) ${
					ignoreCooldown ? '' : `and adding cooldown for ${Settings.MULTI_SHOW_EMOTE_COOLDOWN} secs`
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

export const handleMessage = (message) => {
	if (!message.content.startsWith('!')) return;

	const args = message.content.slice(1).split(' ');
	const commandName = args.shift().toLowerCase();

	const data = {
		username: message.username,
		userId: message.userId,
		moderator: message.moderator || message.broadcaster,
	};

	const command = commands.find((command) => command.names.includes(commandName));
	if (!command) return;

	if (command.moderator && !data.moderator && !Settings.ALLOW_LIST.includes(data.username)) return;

	command.executor(data, args);
};

export const getEmoteCode = (emote) => {
	return emote.replace('[', '').replace(']', '').split(':')[2];
};
