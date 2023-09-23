import { getItems, type Item } from './items';

export type Comment = Item & {
	comments: Comment[];
};

// gets all the root comments for a given story, and then resolves all their replies
const resolveStoryComments = async (story: Item): Promise<Comment[]> => {
	const comments = await getItems(story.kids || []);
	if (comments.indexOf(null) !== -1) {
		return [];
	}
	const resolvedComments = await Promise.all(comments.map((comment) => resolveComments(comment!)));

	return resolvedComments;
};

// resolve all comments for a given comment with recursion
// depth: 0...n, -1 for infinite
const resolveComments = async (comment: Item, depth: number = -1): Promise<Comment> => {
	if (depth === 0) {
		return { ...comment, comments: [] };
	}

	const comments = await getItems(comment.kids || []);

	if (comments.indexOf(null) !== -1) {
		return { ...comment, comments: [] };
	}

	const resolvedComments = await Promise.all(
		comments.map((comment) => resolveComments(comment!, depth - 1))
	);

	return { ...comment, comments: resolvedComments };
};

export { resolveComments, resolveStoryComments };
