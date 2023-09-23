import Config from './config';
import { getItems, type IDList } from './items';

const CATEGORIES = ['ask', 'show', 'job', 'new', 'top', 'best'] as const;
export type StoryCategory = (typeof CATEGORIES)[number];

const getStories = async (category: StoryCategory): Promise<IDList> => {
	const response = await fetch(`${Config.API_URL}${category}stories.json`);
	const stories = await response.json();
	return stories;
};

const getStoryPage = async (category: StoryCategory, page = 1) => {
	const storyIDs = (await getStories(category)).slice(0, 50 * page);
	const stories = await getItems(storyIDs);
	if (stories.indexOf(null) !== -1) {
		throw Error("Couldn't load stories. Please try again later.");
	}
	return stories;
};

export { getStories, getStoryPage, CATEGORIES };
