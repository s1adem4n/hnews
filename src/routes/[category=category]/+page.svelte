<script lang="ts">
	import { Clock, ArrowUp, MessageCircle } from 'lucide-svelte';
	import { getOgImage, getTimeAgo } from '$lib/utils';
	import { CATEGORIES, getStoryPage } from '$lib/api/stories';
	import { stories } from '$lib/stores';
	import { navigating } from '$app/stores';

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
			loading = true;
			getStoryPage(data.category, page + 1).then((res) => {
				$stories.stories = [...$stories.stories, ...res];
				page += 1;
				loading = false;
			});
		}
	}

	const handleScroll = () => {
		const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
		scrollProgress = scrollTop / (scrollHeight - clientHeight);
	};
</script>

<svelte:window on:scroll={handleScroll} />

<div class="flex flex-col w-full max-w-lg gap-2 mx-auto py-2">
	<div class="flex w-full rounded-md bg-mantle">
		{#each CATEGORIES as category}
			<a
				href="/{category}"
				class="flex-1 text-center py-2 border-b-4"
				class:font-bold={category === data.category}
				class:border-transparent={category !== data.category}
				class:border-orange={category === data.category}
			>
				{category}
			</a>
		{/each}
	</div>

	{#if !$navigating}
		{#each $stories.stories as story}
			{#if story}
				<div class="flex flex-col gap-1 p-2 border border-crust rounded-md">
					{#if story.url}
						{#await getOgImage(story.url) then ogImage}
							{#if ogImage}
								<div class="w-full h-64">
									<img
										src={ogImage}
										alt={story.title}
										class="w-auto h-auto max-w-full max-h-full h-64 object-contain rounded-md rounded-md mx-auto"
									/>
								</div>
							{/if}
						{/await}

						<a
							href={story.url}
							target="_blank"
							class="text-lg font-bold hover:underline break-words">{story.title}</a
						>
					{:else}
						<p class="text-lg font-bold">
							{story.title}
						</p>
					{/if}
					<a href="/stories/{story.id}" class="text-sm text-gray-500 flex items-center gap-2">
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
