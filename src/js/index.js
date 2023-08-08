import Settings from './settings.js';
import { kickInit } from './kick/kick-handler.js';
import { twitchInit } from './twitch/twitch-handler.js';

const services = {
	twitch: () => twitchInit(),
	kick: () => kickInit(),
};

console.info('Selected service:', Settings.SERVICE, `[#${Settings.CHANNEL}]`);
services[Settings.SERVICE]();
