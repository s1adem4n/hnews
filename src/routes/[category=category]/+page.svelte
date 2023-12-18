<script lang="ts">
	import { getStoryPage } from '$lib/api/stories';
	import { stories } from '$lib/stores';
	import StoryPreview from '$lib/components/StoryPreview.svelte';
	import CategoryBar from '$lib/components/CategoryBar.svelte';
	import Throbber from '$lib/components/Throbber.svelte';

	export let data;

	let page = data.page;
	let scrollProgress = 0;
	let loading = false;

	$: console.log(loading);

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
	<CategoryBar category={data.category} />
	<noscript>
		<a href="/{data.category}/1" class="underline"> No JS? Enter paginated view -> </a>
	</noscript>

	{#each $stories[data.category] as story, i}
		{#if story}
			<StoryPreview {story} />
		{/if}
		{#if i !== $stories[data.category].length - 1}
			<div class="w-full h-px bg-surface0" />
		{/if}
	{/each}

	{#if loading}
		<Throbber />
	{/if}
</div>
