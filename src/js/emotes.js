import Settings from './settings.js';
import { displayImage } from './dispalyer.js';

let emotes = [];
let reload = false;

let kickUserId;

export const loadEmotes = (kickId) => {
	if (!kickUserId && kickId) kickUserId = kickId;

	emotes = [];

	const promises = [];
	fetchers[Settings.SERVICE].forEach((service) => promises.push(service()));
	Promise.all(promises).then((values) => {
		values.forEach((value) => emotes.push(...value));

		if (reload) displayImage('https://public.igor.ovh/reloaded.gif');
		console.info(`Successfully ${reload ? 're' : ''}loaded ${emotes.length} emotes on channel ${Settings.CHANNEL}.`);

		reload = true;
	});
};

const fetchers = {
	twitch: [
		() => {
			return new Promise((resolve, reject) => {
				fetch(`https://emotes.adamcy.pl/v1/channel/${Settings.CHANNEL}/emotes/all`)
					.then((response) => response.json())
					.then((json) => resolve(json))
					.catch((error) => reject(error));
			});
		},
		() => {
			return new Promise((resolve, reject) => {
				fetch(`https://emotes.adamcy.pl/v1/global/emotes/all`)
					.then((response) => response.json())
					.then((json) => resolve(json))
					.catch((error) => reject(error));
			});
		},
	],
	kick: [
		() => {
			return new Promise((resolve, reject) => {
				fetch('https://7tv.io/v3/users/kick/' + kickUserId).then((response) =>
					response
						.json()
						.then((json) => {
							const formattedEmotes = [];
							json.emote_set?.emotes?.forEach((emote) => {
								const host = emote.data.host.url;
								const urls = [{ url: host + '/1x.webp' }, { url: host + '/2x.webp' }, { url: host + '/4x.webp' }];
								formattedEmotes.push({
									code: emote.name,
									urls,
								});
							});
							resolve(formattedEmotes);
						})
						.catch((error) => reject(error))
				);
			});
		},
		() => {
			return new Promise((resolve, reject) => {
				fetch('https://kick.com/emotes/' + Settings.CHANNEL).then((response) =>
					response
						.json()
						.then((json) => {
							const formattedEmotes = [];
							json.forEach((set) => {
								set.emotes?.forEach((emote) => {
									const urls = [{ url: `https://files.kick.com/emotes/${emote.id}/fullsize` }];
									formattedEmotes.push({
										code: emote.name,
										urls,
									});
								});
							});
							resolve(formattedEmotes);
						})
						.catch((error) => reject(error))
				);
			});
		},
		() => {
			return new Promise((resolve, reject) => {
				fetch(`https://emotes.adamcy.pl/v1/global/emotes/7tv`)
					.then((response) => response.json())
					.then((json) => resolve(json))
					.catch((error) => reject(error));
			});
		},
	],
};

export const getEmoteByCode = (code) => {
	if (!code) return;
	const emote = emotes.find((emote) => emote.code === code);
	if (!emote) return;
	return emote;
};
