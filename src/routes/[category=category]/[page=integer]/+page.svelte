<script lang="ts">
	import { CATEGORIES } from '$lib/api/stories';
	import StoryPreview from '$lib/components/StoryPreview.svelte';

	export let data;
</script>

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
				href="/{category}/1"
				class="flex-1 text-center py-2"
				class:font-bold={category === data.category}
			>
				{category}
			</a>
		{/each}
	</div>

	{#each data.stories as story}
		{#if story}
			<StoryPreview {story} />
		{/if}
	{/each}
	<div class="flex items-center justify-between text-lg">
		{#if data.page > 1}
			<a href="/{data.category}/{data.page - 1}" class="underline"> {'<-'} </a>
		{/if}
		<a href="/{data.category}/{data.page + 1}" class="underline"> {'->'} </a>
	</div>
</div>
