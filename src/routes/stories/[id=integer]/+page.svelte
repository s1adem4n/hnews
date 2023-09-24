<script lang="ts">
	import Story from '$lib/components/Story.svelte';
	export let data;

	const { story, comments } = data;
</script>

<main class="flex flex-col w-full max-w-4xl gap-2 mx-auto p-2">
	<Story {story} {comments} />
</main>
