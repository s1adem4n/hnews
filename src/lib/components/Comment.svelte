<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
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
	<div style="padding-left: {1 * depth}rem;" id="comment{comment.id}">
		<div
			class="w-full mt-2 px-2 flex flex-col border-l-2 border-surface0"
			class:bg-mantle={$page.url.hash === `#comment${comment.id}`}
		>
			<div class="flex gap-1 text-peach text-sm">
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
				<button class="font-mono hover:underline" on:click={() => (collapsed = !collapsed)}>
					{collapsed ? '[+]' : '[-]'}
				</button>
				<span class="text-gray">|</span>
				<button
					on:click={() => {
						const url = `${$page.url.protocol}//${$page.url.host}${$page.url.pathname}#comment${comment.id}`;
						navigator.clipboard.writeText(url);
						goto(url, { replaceState: true });
					}}
					class="hover:underline"
				>
					link
				</button>
			</div>
			{#if !collapsed}
				<p class="comment break-words">
					{@html text}
				</p>
			{/if}
		</div>
	</div>
{/if}
{#if !collapsed}
	{#each comment.comments as reply}
		{#if reply.comments}
			<svelte:self comment={reply} depth={depth + 1} />
		{/if}
	{/each}
{/if}
