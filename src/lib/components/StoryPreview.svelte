<script lang="ts">
	import type { Item } from '$lib/api/items';
	import { getTimeAgo } from '$lib/utils';
	import { ArrowUp, Clock, MessageCircle } from 'lucide-svelte';
	import { onMount } from 'svelte';

	export let story: Item;
	let favicon: HTMLImageElement;

	const hostname = story.url ? new URL(story.url).hostname : '';

	onMount(() => {
		favicon.src = `https://${hostname}/favicon.ico`;
		favicon.onerror = favicon.remove;
	});
</script>

<div
	class="flex flex-col gap-1 p-2 border border-surface0 hover:border-orange rounded-md transition-colors"
>
	{#if story.url}
		<a
			href={story.url}
			class="flex h-5 items-center gap-1 text-subtext0 hover:underline"
			target="_blank"
		>
			<img
				bind:this={favicon}
				loading="lazy"
				alt=""
				class="aspect-square h-full w-auto rounded-full max-h-4"
			/>
			<span>
				{hostname}
			</span>
		</a>
		<a href={story.url} target="_blank" class="text-lg font-bold hover:underline break-words"
			>{story.title}</a
		>
	{:else}
		<p class="text-lg font-bold">
			{story.title}
		</p>
	{/if}
	<a href="/stories/{story.id}" class="text-sm text-subtext0 flex items-center gap-2">
		<span class="flex items-center gap-0.5">
			<ArrowUp size="1em" />
			{story.score}
		</span>
		<span class="flex items-center gap-0.5">
			<MessageCircle size="1em" />
			{story.descendants || 0}
		</span>
		<span class="flex items-center gap-0.5">
			<Clock size="1em" />
			{getTimeAgo(story.time || 0)}
		</span>
	</a>
</div>
