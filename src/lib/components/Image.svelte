<script lang="ts">
	export let src: string;
	export let alt: string;

	let self: HTMLDivElement;
</script>

<div class="flex w-full items-center justify-center h-48 relative" bind:this={self}>
	<div class="absolute inset-0 opacity-50 overflow-hidden rounded-md">
		<img
			{src}
			{alt}
			loading="lazy"
			class="object-cover w-full h-full rounded-md blur-sm scale-[1.05]"
			on:error={() => {
				self.remove();
			}}
		/>
	</div>
	<img
		{src}
		{alt}
		class="object-contain w-auto h-auto max-w-full max-h-full z-10 rounded-md"
		loading="lazy"
	/>
</div>
