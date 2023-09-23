import { getStoryPage, type StoryCategory } from '$lib/api/stories';

export const load = ({ params }) => {
	const category = params.category as StoryCategory;
	const stories = getStoryPage(category);

	return {
		stories,
		category,
		page: 1
	};
};
