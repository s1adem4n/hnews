import { getItem } from '$lib/api/items';
import { resolveStoryComments } from '$lib/api/comments';
import { error } from '@sveltejs/kit';

export const load = async ({ params }) => {
	const id = parseInt(params.id);
	const story = await getItem(id);

	if (!story) {
		throw error(404, 'Story not found');
	}

	const comments = resolveStoryComments(story);

	return {
		story,
		streamed: {
			comments
		}
	};
};
