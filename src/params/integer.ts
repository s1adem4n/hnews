import type { ParamMatcher } from '@sveltejs/kit';

// is integer function
export const match: ParamMatcher = (param) => {
	return /^\d+$/.test(param);
};
