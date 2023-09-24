<script lang="ts">
	import Story from '$lib/components/Story.svelte';
	export let data;

	const { story, comments } = data;
</script>

<main class="p-4">
	<Story {story} {comments} />
</main>
