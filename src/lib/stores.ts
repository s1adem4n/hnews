import { writable } from 'svelte/store';
import type { Item } from './api/items';
import type { StoryCategory } from './api/stories';

const stories = writable<{
	[key in StoryCategory]: (Item | null)[];
}>({
	ask: [],
	show: [],
	job: [],
	new: [],
	top: [],
	best: []
});

export { stories };
