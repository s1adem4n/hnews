import { defineConfig, presetWind, presetTypography, transformerDirectives } from 'unocss';
import extractorSvelte from '@unocss/extractor-svelte';
import { variants } from '@catppuccin/palette';

const colors = {};

Object.entries(variants.mocha).forEach(([key, value]) => {
	colors[key] = value.hex;
});

export default defineConfig({
	presets: [presetWind(), presetTypography()],
	extractors: [extractorSvelte()],
	transformers: [transformerDirectives()],
	theme: {
		colors
	}
});
