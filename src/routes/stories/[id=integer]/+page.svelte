<script lang="ts">
	import Comment from '$lib/components/Comment.svelte';
	export let data;

	const {
		story,
		streamed: { comments }
	} = data;
</script>

<main class="p-4">
	<h1>{story.title}</h1>
	<p>
		by {story.by}
	</p>
	{#if story.url}
		<a href={story.url} target="_blank">{story.url}</a>
	{/if}
	{#await comments then comments}
		{#each comments as comment}
			<Comment {comment} />
		{/each}
	{/await}
</main>
