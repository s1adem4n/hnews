<script lang="ts">
	import type { Item } from '$lib/api/items';
	import { getTimeAgo } from '$lib/utils';

	export let story: Item;
</script>

<p class="text-sm text-subtext0 hover:underline">
	by {story.by} | {story.score} points | {story.descendants || 0} comments | {getTimeAgo(
		story.time || 0
	)}
</p>
