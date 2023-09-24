<script lang="ts">
	import type { Item } from '$lib/api/items';
	import type { Comment as TComment } from '$lib/api/comments';
	import { getTimeAgo } from '$lib/utils';
	import Comment from './Comment.svelte';

	export let story: Item;
	export let comments: TComment[];
</script>

<div class="flex flex-col gap-2">
	<h1 class="text-2xl font-bold break-all">
		{story.title}
	</h1>
	<p class="text-sm text-subtext0">
		by {story.by} | {story.score} points | {story.descendants} comments | {getTimeAgo(
			story.time || 0
		)}
	</p>
	{#if story.url}
		<a href={story.url} target="_blank" class="text-sm text-subtext0 hover:underline">
			{story.url}
		</a>
	{/if}
	<div>
		{#each comments as comment}
			<Comment {comment} />
		{/each}
	</div>
</div>
