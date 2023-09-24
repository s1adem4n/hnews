const getTimeAgo = (time: number) => {
	const diff = Date.now() - time * 1000;
	const convNums = [
		1000,
		1000 * 60,
		1000 * 60 * 60,
		1000 * 60 * 60 * 24,
		1000 * 60 * 60 * 24 * 7,
		1000 * 60 * 60 * 24 * 30,
		1000 * 60 * 60 * 24 * 365
	];
	const convNames = ['s', 'm', 'h', 'd', 'w', 'm', 'y'];
	const convs = convNums.map((num, i) => {
		return {
			value: Math.floor(diff / num),
			name: convNames[i]
		};
	});
	const smallest = convs.reduce((prev, curr) => {
		if (curr.value < prev.value && curr.value > 0) {
			return curr;
		}
		return prev;
	});
	return `${smallest.value}${smallest.name}`;
};

const getFavicon = (url: string) => {
	const hostname = new URL(url).hostname;
	return `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=https://${hostname}&size=32`;
};

export { getTimeAgo, getFavicon };
