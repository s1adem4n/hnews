import type { ParamMatcher } from '@sveltejs/kit';

// is string function && not integer
export const match: ParamMatcher = (param) => {
	return !/^\d+$/.test(param);
};
