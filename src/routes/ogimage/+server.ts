import { error, json } from '@sveltejs/kit';
import { cache } from './cache.js';

export const GET = async ({ url }) => {
	const urlParam = url.searchParams.get('url');
	if (!urlParam) {
		throw error(400, 'Missing url parameter');
	}
	if (urlParam.startsWith('https://twitter.com')) {
		return json({ ogImage: null });
	}
	if (cache[urlParam] !== undefined) {
		console.log('cache hit', urlParam);
		return json({ ogImage: cache[urlParam] });
	}
	console.log('fetching', urlParam);
	const res = await fetch(urlParam, {
		redirect: 'follow'
	});
	const text = await res.text();
	// do this without DOMParser
	const ogImageMatch = text.match(/<meta\s+property="og:image"\s+content="([^"]+)"\s*\/?>/i);
	let ogImage = ogImageMatch ? ogImageMatch[1] : null;
	if (ogImage?.startsWith('/')) {
		console.log('relative url', ogImage);
		ogImage = null;
	}
	cache[urlParam] = ogImage;

	return json({ ogImage });
};
