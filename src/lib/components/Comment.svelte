<script lang="ts">
	import type { Comment } from '$lib/api/comments';
	import { getTimeAgo } from '$lib/utils';

	export let comment: Comment;
	export let depth = 0;
	export let collapsed = false;

	// regex to match sources eg. sometext[1], replave them with <sup>1</sup>
	const sourceRegex = /\[([0-9]+)\]/g;
	let text = comment.text ? comment.text.replace(sourceRegex, '<sup>$1</sup>') : '';
</script>

{#if text}
	<div
		class="w-full my-2 px-2 flex flex-col gap-1 border-l-2 border-crust"
		style="margin-left: {depth * 20}px"
	>
		<div class="flex gap-1 text-peach">
			<a
				href="https://news.ycombinator.com/user?id={comment.by}"
				target="_blank"
				class="hover:underline"
			>
				{comment.by}
			</a>
			<span class="text-gray">|</span>
			<span>
				{getTimeAgo(comment.time || 0)}
			</span>
			<span class="text-gray">|</span>
			<button class="font-mono" on:click={() => (collapsed = !collapsed)}>
				{collapsed ? '[+]' : '[-]'}
			</button>
		</div>
		{#if !collapsed}
			<p class="comment">
				{@html text}
			</p>
		{/if}
	</div>
{/if}

{#if !collapsed}
	{#each comment.comments as reply}
		{#if reply.comments}
			<svelte:self comment={reply} depth={depth + 1} />
		{/if}
	{/each}
{/if}
