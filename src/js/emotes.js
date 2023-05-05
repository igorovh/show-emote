let emotes = [];
let reload = false;

window.addEventListener('DOMContentLoaded', () => {
	loadEmotes();
});

const loadEmotes = () => {
	fetch(`https://emotes.adamcy.pl/v1/channel/${config.CHANNEL}/emotes/all`)
		.then((response) => response.json())
		.then((json) => {
			emotes = json;

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
