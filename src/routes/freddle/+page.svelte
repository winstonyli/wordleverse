<script lang="ts">
	import Wordle from '$lib/components/Wordle.svelte';
	import * as freddle from '$lib/freddle';

	let isHardMode = false;

	const easyAnswers = Object.fromEntries(
		Object.entries(freddle.answers).filter(
			([k, v]) =>
				// Exclude book, VR, and AR characters.
				(!['TSE', 'TTO', 'TFC', 'FNaF: HW', 'FNaF: SD'].includes(v.debut) &&
					!v.debut.startsWith('FF') &&
					!v.debut.startsWith('TftP')) ||
				// Include exceptions.
				['Glitchtrap', 'Nightmare Endo'].includes(k),
		),
	);
</script>

<Wordle {...freddle} answers={isHardMode ? freddle.answers : easyAnswers}>
	<div
		class="tooltip"
		data-tip="Includes animatronics and animatronic-adjacent characters from the books, FNaF: HW hard mode, and FNaF: SD."
	>
		<label class="label cursor-pointer gap-3">
			<span class="label-text">Hard mode?</span>
			<input type="checkbox" bind:checked={isHardMode} class="checkbox-accent checkbox" />
		</label>
	</div>
</Wordle>

<style lang="postcss">
	:global(body) {
		background-attachment: fixed;
		background-image: url('/freddle/background.jpg');
		background-position: center;
		background-size: cover;
	}
</style>
