const config = {
	CHANNEL: 'igor_ovh',
	SHOW_EMOTE_TIME: 4,
	SHOW_EMOTE_COOLDOWN: 60,
	ALLOW_LIST: [],
	BOOBA_CODES:
		'POGGIES,tutorial,ematerasu,tadimason,THAT,AnySubGiftersInChat,please,pillow,hiheyhello,peepoSit,piksele,wideDvaAss,NewOutfit,CATBOOBS,GoodNight,mods,THIS,HUGS,mods,pjpj,rawr,HeyCutie,imready,GoodMusic,tssk,raveGirl,Lounge,YouAreVeryInteresting,BOOTY,npasThighs,tenderly,dollKisses,Kissy,dollBunny,JuwnaThighs,nonono,hannahNo,hannahYes,igotsomethingforyou,THOSE,LOOK,sussy,booty,roseDance,areyouaboy,NightRoutine,WhatYouLookingAt,Dubai,MyReactionToThatInformation,pantsu,BOOBAS',
};

window.addEventListener('DOMContentLoaded', () => {
	console.info('Loading config...');

	const params = new URL(document.location).searchParams;
	if (params.has('channel')) config.CHANNEL = params.get('channel');
	if (params.has('showEmoteTime')) config.SHOW_EMOTE_TIME = parseInt(params.get('showEmoteTime'));
	if (params.has('showEmoteCooldown')) config.SHOW_EMOTE_COOLDOWN = parseInt(params.get('showEmoteCooldown'));
	if (params.has('allowList')) config.ALLOW_LIST = params.get('allowList').split(',');
	if (params.has('boobaCodes')) config.BOOBA_CODES = params.get('boobaCodes');

	window.dispatchEvent(new Event('config'));
});
