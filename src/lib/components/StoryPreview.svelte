<script lang="ts">
	import { preloadCode } from '$app/navigation';
	import type { Item } from '$lib/api/items';
	import { getFavicon } from '$lib/utils';
	import StoryStats from './StoryStats.svelte';

	export let story: Item;
	let favicon: HTMLImageElement | null = null;
	let hostname = '';

	$: hostname = story.url ? new URL(story.url).hostname : '';
</script>

<div
	class="flex flex-col gap-1 p-2"
	on:mouseover={() => preloadCode(`/stories/${story.id}`)}
	on:focus={() => preloadCode(`/stories/${story.id}`)}
	tabindex="-1"
	role="link"
>
	{#if story.url}
		<a
			href="https://{hostname}"
			class="flex h-5 items-center gap-1 text-subtext0 text-sm hover:underline"
			target="_blank"
		>
			<img
				bind:this={favicon}
				src={getFavicon(story.url)}
				loading="lazy"
				alt=""
				class="aspect-square h-full max-h-[16px] w-auto rounded-full"
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
	<a
		href="/stories/{story.id}"
		class="text-sm text-subtext0 flex items-center gap-2 hover:underline"
	>
		<StoryStats {story} />
	</a>
</div>
