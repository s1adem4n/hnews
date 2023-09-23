import type { ParamMatcher } from '@sveltejs/kit';
import { CATEGORIES, type StoryCategory } from '$lib/api/stories';

// is story category function
export const match: ParamMatcher = (param) => {
	return CATEGORIES.includes(param as StoryCategory);
};
