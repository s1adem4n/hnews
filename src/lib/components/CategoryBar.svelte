<script lang="ts">
	import { CATEGORIES, type StoryCategory } from '$lib/api/stories';

	export let category: StoryCategory;
	export let paginated: boolean = false;
</script>

<div class="w-full sticky top-2">
	<div class="relative flex w-full rounded-md bg-mantle">
		<!-- category indicator -->
		<div
			class="absolute bottom-0 h-1 bg-orange rounded-md"
			style="width: {100 / CATEGORIES.length}%; left: {(100 / CATEGORIES.length) *
				CATEGORIES.indexOf(category)}%; transition: left 0.2s ease-in-out;"
		/>
		{#each CATEGORIES as CATEGORY, i}
			<a
				href="/{CATEGORY}{paginated ? '/1' : ''}"
				class="flex-1 text-center py-2 hover:bg-surface0 transition-colors rounded-md"
				class:font-bold={CATEGORY === category}
			>
				{CATEGORY}
			</a>
		{/each}
	</div>
</div>
