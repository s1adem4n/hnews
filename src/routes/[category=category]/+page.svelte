<script lang="ts">
	import { Clock, ArrowUp, MessageCircle } from 'lucide-svelte';
	import { getOgImage, getTimeAgo } from '$lib/utils';
	import { CATEGORIES, getStoryPage } from '$lib/api/stories';
	import { stories } from '$lib/stores';
	import { navigating } from '$app/stores';
	import StoryPreview from '$lib/components/StoryPreview.svelte';

	export let data;
	$: {
		updateStories(data.stories);
	}

	const updateStories = (newData: any[]) => {
		if (data.category !== $stories.category) {
			$stories.stories = newData;
			$stories.category = data.category;
		}
		loading = false;
	};

	let page = data.page;
	let scrollProgress = 0;
	let loading = false;

	$: if (scrollProgress > 0.7) {
		if (!loading) {
			console.log('loading');
			loading = true;
			getStoryPage(data.category, page + 1).then((newData) => {
				$stories.stories = [...$stories.stories, ...newData];
				page++;
				setTimeout(() => {
					loading = false;
					console.log('done loading');
				}, 5000);
			});
		}
	}

	const handleScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		scrollProgress = scrollTop / (scrollHeight - clientHeight);
	};
</script>

<svelte:window on:scroll={handleScroll} />

<div class="flex flex-col w-full max-w-lg gap-2 mx-auto p-2">
	<div
		class="relative flex w-full rounded-md bg-mantle border border-surface0 hover:border-orange transition-colors"
	>
		<!-- category indicator -->
		<div
			class="absolute bottom-0 h-1 bg-orange rounded-md transition-all"
			style="width: {100 / CATEGORIES.length}%; left: {(100 / CATEGORIES.length) *
				CATEGORIES.indexOf(data.category)}%"
		/>
		{#each CATEGORIES as category, i}
			<a
				href="/{category}"
				class="flex-1 text-center py-2"
				class:font-bold={category === data.category}
			>
				{category}
			</a>
		{/each}
	</div>

	{#if !$navigating}
		{#each $stories.stories as story}
			{#if story}
				<StoryPreview {story} />
			{/if}
		{/each}
		{#if loading}
			<div class="flex justify-center">
				<div
					class="w-6 h-6 border-2 border-t-2 border-peach border-dotted rounded-full animate-spin"
				/>
			</div>
		{/if}
	{:else}
		<div class="flex justify-center">
			<div
				class="w-6 h-6 border-2 border-t-2 border-peach border-dotted rounded-full animate-spin"
			/>
		</div>
	{/if}
</div>
