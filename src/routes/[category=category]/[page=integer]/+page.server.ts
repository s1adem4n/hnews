import { getStoryPage, type StoryCategory } from '$lib/api/stories';

export const load = ({ params }) => {
	const category = params.category as StoryCategory;
	const page = parseInt(params.page);
	const stories = getStoryPage(category, page);

	return {
		category,
		page,
		stories
	};
};
