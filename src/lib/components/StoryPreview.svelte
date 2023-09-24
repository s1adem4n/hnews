<script lang="ts">
	import Image from './Image.svelte';
	import type { Item } from '$lib/api/items';
	import { getOgImage, getTimeAgo } from '$lib/utils';
	import { ArrowUp, Clock, MessageCircle } from 'lucide-svelte';

	export let story: Item;
</script>

<div
	class="flex flex-col gap-1 p-2 border border-surface0 hover:border-orange rounded-md transition-colors"
>
	{#if story.url}
		{@const hostname = new URL(story.url).hostname}
		{#await getOgImage(story.url) then ogImage}
			{#if ogImage}
				<Image src={ogImage} alt={story.title || hostname} />
			{/if}
		{/await}
		<a
			href={story.url}
			class="flex h-5 items-center gap-1 text-subtext0 hover:underline"
			target="_blank"
		>
			<img
				src="https://{hostname}/favicon.ico"
				on:error={(e) => {
					console.log(e);
					e.currentTarget.remove();
				}}
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
