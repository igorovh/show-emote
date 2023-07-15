const config = {
	CHANNEL: 'igor_ovh',
	SHOW_EMOTE_TIME: 4,
	SHOW_EMOTE_COOLDOWN: 60,
	MULTI_SHOW_EMOTE_COOLDOWN: 180,
	MULTI_SHOW_EMOTES_AMOUNT: 5,
	ALLOW_LIST: [],
	SHOW_EMOTE_SIZE_MULTIPLIER: 1.25,
};

window.addEventListener('DOMContentLoaded', () => {
	console.info('Loading config...');

	const params = new URL(document.location).searchParams;
	if (params.has('channel')) config.CHANNEL = params.get('channel');
	if (params.has('showEmoteTime')) config.SHOW_EMOTE_TIME = parseInt(params.get('showEmoteTime'));
	if (params.has('showEmoteCooldown')) config.SHOW_EMOTE_COOLDOWN = parseInt(params.get('showEmoteCooldown'));
	if (params.has('multiShowEmoteCooldown'))
		config.MULTI_SHOW_EMOTE_COOLDOWN = parseInt(params.get('multiShowEmoteCooldown'));
	if (params.has('multiShowEmotesAmount'))
		config.MULTI_SHOW_EMOTES_AMOUNT = parseInt(params.get('multiShowEmotesAmount'));
	if (params.has('allowList')) config.ALLOW_LIST = params.get('allowList').split(',');
	if (params.has('showEmoteSizeMultiplier')) config.SHOW_EMOTE_SIZE_MULTIPLIER = params.get('showEmoteSizeMultiplier');
	console.info('Parsed config:', config);

	window.dispatchEvent(new Event('config'));
});
