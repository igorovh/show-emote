import Settings from '../settings.js';
import { handleMessage } from '../chat-handler.js';
import { loadEmotes } from '../emotes.js';

export const twitchInit = async () => {
	const client = new tmi.Client({
		channels: [Settings.CHANNEL],
	});

	client.on('message', (channel, tags, message, self) => {
		const formattedMessage = {
			username: tags['display-name'],
			userId: tags['user-id'],
			content: message,
			moderator: findBadge('moderator', tags.badges),
			broadcaster: findBadge('broadcaster', tags.badges),
		};
		handleMessage(formattedMessage);
	});

	client.connect();
	console.info('[Twitch] Joined channel -', Settings.CHANNEL);

	loadEmotes();
};

export const findBadge = (type, array) => {
	return array !== null && array[type] !== undefined;
};
