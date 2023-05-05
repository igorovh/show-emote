const displayImage = (src) => {
	if (!src) return;

	const image = new Image();
	image.src = src;
	image.classList.add('emote');

	image.style.opacity = 0;

	image.onload = () => {
		document.body.appendChild(image);

		image.style.left = `${generateRandomX(image.width)}px`;
		image.style.top = `${generateRandomY(image.height)}px`;

		setTimeout(() => (image.style.opacity = 1), 10); // Show emote
		setTimeout(() => {
			image.style.opacity = 0;
			setTimeout(() => image.remove(), 1000);
		}, config.SHOW_EMOTE_TIME * 1000); // Remove emote
	};
};

// const getEmoteByCode = (code) => {
// 	if (!code) return;
// 	const emote = emotes.find((emote) => emote.code === code);
// 	if (!emote) return;
// 	displayImage(emote.urls[emote.urls.length - 1].url);
// 	return emote;
// };

const generateRandomX = (width) => {
	return randomRange(0, window.innerWidth - width);
};

const generateRandomY = (height) => {
	return randomRange(0, window.innerHeight - height);
};

const randomRange = (min, max) => {
	let difference = max - min;
	let rand = Math.random();
	rand = Math.floor(rand * difference);
	rand = rand + min;
	return rand;
};
