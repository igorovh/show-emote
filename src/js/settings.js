const Settings = {
	CHANNEL: 'igor_ovh',
	SHOW_EMOTE_TIME: 4,
	SHOW_EMOTE_COOLDOWN: 60,
	MULTI_SHOW_EMOTE_COOLDOWN: 180,
	MULTI_SHOW_EMOTES_AMOUNT: 5,
	ALLOW_LIST: [],
	SHOW_EMOTE_SIZE_MULTIPLIER: 1.25,
	SERVICE: 'twitch',
};

console.info('Loading config...');

const params = new URL(document.location).searchParams;
if (params.has('channel')) Settings.CHANNEL = params.get('channel');
if (params.has('service')) Settings.SERVICE = params.get('service');
if (params.has('showEmoteTime')) Settings.SHOW_EMOTE_TIME = parseInt(params.get('showEmoteTime'));
if (params.has('showEmoteCooldown')) Settings.SHOW_EMOTE_COOLDOWN = parseInt(params.get('showEmoteCooldown'));
if (params.has('multiShowEmoteCooldown'))
	Settings.MULTI_SHOW_EMOTE_COOLDOWN = parseInt(params.get('multiShowEmoteCooldown'));
if (params.has('multiShowEmotesAmount'))
	Settings.MULTI_SHOW_EMOTES_AMOUNT = parseInt(params.get('multiShowEmotesAmount'));
if (params.has('allowList')) Settings.ALLOW_LIST = params.get('allowList').split(',');
if (params.has('showEmoteSizeMultiplier')) Settings.SHOW_EMOTE_SIZE_MULTIPLIER = params.get('showEmoteSizeMultiplier');
console.info('[Config] Parsed:', Settings);

export default Settings;
