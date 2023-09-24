import { writable } from 'svelte/store';
import type { Item } from './api/items';
import type { StoryCategory } from './api/stories';

const stories = writable<{ category: StoryCategory | null; stories: (Item | null)[] }>({
	category: null,
	stories: []
});

export { stories };
