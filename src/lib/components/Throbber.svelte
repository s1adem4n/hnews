<div class="flex w-full justify-center">
	<div id="throbber" class="w-12 h-12 rounded-full" />
</div>

<style lang="postcss">
	@keyframes spin {
		from {
			transform: rotate(0deg);
		}

		to {
			transform: rotate(360deg);
		}
	}

	#throbber {
		border: 4px solid theme('colors.overlay0');
		border-top: 4px solid theme('colors.peach');
		animation: spin 2s linear infinite;
	}
</style>
