<script lang="ts">
	import StoryPreview from '$lib/components/StoryPreview.svelte';
	import CategoryBar from '$lib/components/CategoryBar.svelte';

	export let data;
</script>

<div class="flex flex-col w-full max-w-lg gap-2 mx-auto p-2">
	<CategoryBar category={data.category} paginated />

	{#each data.stories as story, i}
		{#if story}
			<StoryPreview {story} />
		{/if}
		{#if i !== data.stories.length - 1}
			<div class="w-full h-[1px] bg-surface0" />
		{/if}
	{/each}
	<div class="flex items-center justify-between text-lg">
		{#if data.page > 1}
			<a href="/{data.category}/{data.page - 1}" class="underline"> {'<-'} </a>
		{/if}
		<a href="/{data.category}/{data.page + 1}" class="underline"> {'->'} </a>
	</div>
</div>
