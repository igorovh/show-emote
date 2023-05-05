let emotes = [];
let reload = false;

window.addEventListener('DOMContentLoaded', () => {
	loadEmotes();
});

const loadEmotes = async () => {
	emotes = [];
	Promise.all([
		new Promise((resolve, reject) => {
			fetch(`https://emotes.adamcy.pl/v1/channel/${config.CHANNEL}/emotes/all`)
				.then((response) => response.json())
				.then((json) => {
					resolve(json);
				});
		}),
		new Promise((resolve, reject) => {
			fetch(`https://emotes.adamcy.pl/v1/global/emotes/all`)
				.then((response) => response.json())
				.then((json) => {
					resolve(json);
				});
		}),
	]).then((values) => {
		emotes.push(...values[0]);
		emotes.push(...values[1]);

		if (reload) displayImage('https://public.igor.ovh/reloaded.gif');
		logMessage(`Successfully ${reload ? 're' : ''}loaded ${emotes.length} emotes on channel ${config.CHANNEL}.`);

		reload = true;
	});
};

const getEmoteByCode = (code) => {
	if (!code) return;
	const emote = emotes.find((emote) => emote.code === code);
	if (!emote) return;
	return emote;
};
