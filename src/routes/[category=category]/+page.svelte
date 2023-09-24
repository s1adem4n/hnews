<script lang="ts">
	import { CATEGORIES, getStoryPage } from '$lib/api/stories';
	import { stories } from '$lib/stores';
	import StoryPreview from '$lib/components/StoryPreview.svelte';
	import { onMount } from 'svelte';

	export let data;

	let page = data.page;
	let scrollProgress = 0;
	let loading = false;

	$: if ($stories[data.category].length === 0) {
		loading = true;
	} else {
		loading = false;
	}

	$: {
		data.streamed.stories.then((stories) => {
			if ($stories[data.category].length === 0) {
				$stories[data.category] = stories;
			}
		});
	}

	$: if (scrollProgress > 0.6 && !loading) {
		loading = true;
		page++;
		getStoryPage(data.category, page).then((stories) => {
			$stories[data.category] = [...$stories[data.category], ...stories];
			// prevent fast scrolling from triggering multiple loads
			setTimeout(() => {
				loading = false;
			}, 3000);
		});
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
	<noscript>
		<a href="/{data.category}/1" class="underline"> No JS? Enter paginated view -> </a>
	</noscript>

	{#each $stories[data.category] as story}
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
</div>
