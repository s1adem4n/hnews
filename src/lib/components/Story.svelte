<script lang="ts">
	import type { Item } from '$lib/api/items';
	import type { Comment as TComment } from '$lib/api/comments';

	import Comment from './Comment.svelte';
	import StoryStats from './StoryStats.svelte';

	export let story: Item;
	export let comments: TComment[];
</script>

<div class="flex flex-col gap-2">
	<h1 class="text-2xl font-bold break-all">
		{story.title}
	</h1>
	<StoryStats {story} />
	{#if story.url}
		<a href={story.url} target="_blank" class="text-sm text-subtext0 hover:underline">
			{story.url}
		</a>
	{/if}
	<div>
		{#if comments.length > 0}
			{#each comments as comment}
				<Comment {comment} />
			{/each}
		{:else}
			<p class="text-subtext0 italic text-sm">No comments yet :-(</p>
		{/if}
	</div>
</div>
