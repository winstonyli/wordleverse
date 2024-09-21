<script lang="ts">
	import { onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import IconSun from '~icons/line-md/moon-to-sunny-outline-loop-transition';
	import IconMoon from '~icons/line-md/sunny-outline-to-moon-loop-transition';

	let theme: Writable<string>;
	let isDarkMode: boolean;

	onMount(() => {
		// Initialize theme in store.
		theme = writable(localStorage.theme || 'light');

		// Initialize theme in DOM.
		document.documentElement.setAttribute('data-theme', $theme);

		// When theme changes, update `localStorage` and DOM.
		theme.subscribe(updateTheme);

		// Initialize checkbox state.
		isDarkMode = $theme === 'dark';
	});

	$: $theme && ($theme = isDarkMode ? 'dark' : 'light');

	function updateTheme(theme: string) {
		localStorage.theme = theme;
		document.documentElement.setAttribute('data-theme', theme);
	}
</script>

<label class="btn btn-circle btn-accent relative inline-grid cursor-pointer place-content-center">
	<!-- Hidden checkbox controls state. -->
	<input
		type="checkbox"
		class="appearance-none"
		bind:checked={isDarkMode}
		aria-label="Toggle dark mode"
	/>

	{#if isDarkMode}
		<IconMoon class="size-6 -translate-y-1" />
	{:else}
		<IconSun class="size-6 -translate-y-1" />
	{/if}
</label>
