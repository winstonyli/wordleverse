<script lang="ts">
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	import { fade } from 'svelte/transition';

	import { capitalCase, noCase } from 'change-case';
	import Fuse from 'fuse.js';
	import prand from 'pure-rand';
	import { browser } from '$app/environment';

	import { Confetti } from 'svelte-confetti';
	import Countdown from '$lib/components/Countdown.svelte';

	import IconSubmit from '~icons/line-md/arrow-right';
	import IconHigher from '~icons/line-md/arrow-up';
	import IconLower from '~icons/line-md/arrow-down';

	type Prop = string | number | readonly string[] | readonly number[];
	type Props = { src: string; aliases?: readonly string[] } & Record<string, Prop>;

	export let category: string;
	export let values: Record<string, { valueOf(): number }> = {};
	export let answers: Record<string, Props>;

	$: props = Object.keys(Object.values(answers)[0]).filter((k) => !['src', 'aliases'].includes(k));

	///////////
	// Time //
	/////////

	// Initialize misc. self-explanatory dates.
	let now = new Date();
	const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
	const tomorrow = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1);
	$: timeUntilTomorrow = new Date(tomorrow - +now);

	// Update `now` every second until tomorrow.
	let interval: number;
	onMount(() => {
		interval = setInterval(() => (now = new Date()), 1000);
		() => clearInterval(interval);
	});

	$: if (+timeUntilTomorrow === 0) {
		clearInterval(interval);
	}

	// Get answer of the day.
	let seed = +today;
	$: rng = prand.xoroshiro128plus(seed);
	$: [answerIndex, _] = prand.uniformIntDistribution(0, Object.keys(answers).length - 1, rng); // value in {1..6}, here: 2
	$: aotd = Object.keys(answers)[answerIndex];

	//////////////////
	// Suggestions //
	////////////////

	// Initialize fuzzy searching.
	$: fuse = new Fuse(
		Object.entries(answers).map(([name, props]) => ({ name, ...props })),
		{
			includeScore: true,
			includeMatches: true,
			keys: ['name', { name: 'aliases', weight: 0.5 }],
		},
	);

	/** Preserve original search when selecting search results. */
	let originalSearch = '';

	let suggestions: string[] = [];
	let domSuggestions: Record<string, HTMLLIElement> = {};
	let shouldShowSuggestions = false; // I tried to show/hide with pure CSS, but this is just so much more readable.

	/////////////////////
	// Event handlers //
	///////////////////

	/** Search bar value. */
	let submission = '';

	/** Called when input is updated. */
	function updateSuggestions() {
		// Update original search and suggestions.
		// Uses event handlers instead of reactive statements b/c shouldn't update in all cases (e.g. `onKeyDown`).
		suggestions = fuse.search((originalSearch = submission)).flatMap((result) => {
			// Threshold where searching `bear` stops giving bears. :)
			if (guesses.includes(result.item.name) || result.score! >= 0.25) return [];
			return [result.item.name];
		});
	}

	function onKeyDown(event: KeyboardEvent) {
		if (!suggestions.length) return;

		// Find currently focused option.
		const options = [originalSearch, ...suggestions];
		const index = options.findLastIndex((opt) => opt === submission);

		// Increment focus in direction corresponding to key pressed.
		const newIndex = { ArrowUp: index - 1, ArrowDown: index + 1 }[event.key];
		if (typeof newIndex === 'undefined') return;

		// Wrap focus at either end. I love not having an actual modulus operator :)
		// One addition is replaced with `.at` for brevity.
		submission = options.at((newIndex + options.length) % options.length)!;

		// Scroll next option (or 1st if wrapping that way) into view.
		const nextFocus = submission === originalSearch ? suggestions[0] : submission;
		domSuggestions[nextFocus].scrollIntoView({ block: 'nearest' });
	}

	function onSubmit(e: Event | undefined = undefined) {
		// Keep focus on input.
		if (e) e.preventDefault();

		// If no search results or already won, don't submit.
		if (typeof suggestions[0] === 'undefined' || guesses.includes(aotd)) return;

		// If no exact match, submit first suggestion.
		if (!(submission in answers)) {
			submission = suggestions[0];
		}

		// Add guess & reset submission.
		guesses = [submission, ...guesses];
		submission = '';
		updateSuggestions();
	}

	///////////////////////
	// Guessing & clues //
	/////////////////////

	type Clue = 'incorrect' | 'partial' | 'correct';

	let guesses: string[] = [];
	// guesses = Object.keys(answers);

	function checkProperty(guess: Props, field: string): Clue {
		const clue = answers[aotd][field];

		if (clue instanceof Array && guess[field] instanceof Array) {
			const overlap = (clue as unknown[]).reduce(
				(count: number, propItem) =>
					(guess[field] as unknown[]).includes(propItem) ? count + 1 : count,
				0,
			);

			if (overlap === clue.length) return 'correct';
			if (overlap > 0) return 'partial';
			return 'incorrect';
		}

		if (clue instanceof Array || guess[field] instanceof Array) {
			const [array, value] = clue instanceof Array ? [clue, guess[field]] : [guess[field], clue];
			if ((array as unknown[]).includes(value)) return 'partial';
			return 'incorrect';
		}

		return clue === guess[field] ? 'correct' : 'incorrect';
	}

	/** Get numeric value of prop. */
	function valueOf(x: Prop): number {
		if (typeof x === 'string' && x in values) return +values[x];
		if ('valueOf' in Object.getPrototypeOf(x)) return +(x as any);
		return NaN;
	}

	/** Spaceship operator for props. */
	function compare(a: Prop, b: Prop): number {
		// If either `a` or `b` is not numeric, `Math.sign` returns `NaN`, which is falsy.
		return Math.sign(valueOf(a) - valueOf(b)) || 0;
	}

	///////////////////////////////////
	// Winning & starting new games //
	/////////////////////////////////

	let hasWon = false;
	let isNewGameStarted = true;

	function onIntroEnd(guess: string, i: number) {
		// Only proceed after last winning clue is revealed.
		if (guess !== aotd || i < props.length - 1) return;

		hasWon = true;
		isNewGameStarted = false;
	}

	function getGuessCount() {
		return guesses.length;
	}

	function startNewGame() {
		guesses = [];
		seed = Date.now() ^ (Math.random() * 0x100000000);
		hasWon = false;
	}

	/** Called when win message finishes fading. */
	function onFinishStartingNewGame() {
		isNewGameStarted = true;
	}
</script>

<!-- Display countdown until next animatronic here. -->
<p>
	Guess the {noCase(category)} of the day! Next {noCase(category)}
	{#if +timeUntilTomorrow}
		in <Countdown time={timeUntilTomorrow} />.
	{:else}
		after <button on:click={() => window.location.reload()} class="btn btn-accent btn-sm">
			reload
		</button>.
	{/if}
</p>

<div class="swap *:m-auto" class:swap-active={hasWon}>
	<!-- UI bar -->
	<form
		on:input={updateSuggestions}
		on:submit={onSubmit}
		autocomplete="off"
		class="swap-off flex flex-col items-center gap-3 lg:flex-row lg:gap-6"
		class:pointer-events-none={hasWon}
	>
		<div class="relative">
			<div class="join shadow">
				<label class="input join-item input-bordered input-accent flex items-center gap-3">
					<!-- Input answers here. -->
					<input
						bind:value={submission}
						on:keydown={onKeyDown}
						on:focusin={() => (shouldShowSuggestions = true)}
						on:focusout={() => (shouldShowSuggestions = false)}
						type="search"
						placeholder="{capitalCase(category)} name"
						class="grow"
					/>
				</label>

				<label class="btn btn-square btn-accent join-item">
					<input type="submit" value="" />
					<IconSubmit class="-ml-2 size-5 text-accent-content" />
				</label>
			</div>

			<!-- Display suggestions here. -->
			<ul
				class="menu absolute left-6 right-6 z-10 block max-h-[50vh] overflow-y-auto rounded-b-btn border-[1px] border-accent bg-base-100 shadow has-[:active]:block"
				class:hidden={!shouldShowSuggestions}
			>
				{#each suggestions as suggestion (suggestion)}
					<li bind:this={domSuggestions[suggestion]} class="flex" animate:flip={{ duration: 200 }}>
						<button
							on:click={() => {
								submission = suggestion;
								onSubmit();
							}}
							class:focus={suggestion === submission}
						>
							<img src={answers[suggestion].src} alt={suggestion} class="size-10 object-cover" />
							<p>{suggestion}</p>
						</button>
					</li>
				{:else}
					<p class="text-center">No results.</p>
				{/each}
			</ul>
		</div>

		<!-- Additional UI may be supplied by parents here. -->
		<slot />
	</form>

	<div
		on:transitionend={onFinishStartingNewGame}
		class="swap-on relative"
		class:pointer-events-none={!hasWon}
	>
		<!-- Without this workaround, you get a flash of "winning in 0 tries" before fading out -->
		{#key isNewGameStarted}
			<p>
				Congratulations on winning in {getGuessCount()} tr{getGuessCount() === 1 ? 'y' : 'ies'}! If
				you're impatient, you can also click
				<button on:click={startNewGame} class="btn btn-accent btn-sm"> here </button>
				for a new one right away.
			</p>
		{/key}

		<div class="absolute left-0 right-0 grid place-items-center">
			{#if hasWon}
				<Confetti x={[-2, 2]} y={[-1, 1]} />
			{/if}
		</div>
	</div>
</div>

<!-- Display guesses here. -->
<div
	class="flex gap-3 overflow-x-auto text-center align-middle"
	style:grid-template-columns="repeat({props.length + 1}, 6rem)"
>
	<!-- Headers -->
	<div class="flex gap-3">
		{#each [category, ...props] as prop}
			<p class="border-b-[1px] border-accent capitalize">
				{capitalCase(prop.toString())}
			</p>
		{/each}
	</div>

	{#each guesses as guess (guess)}
		<div animate:flip={{ duration: 500 }} class="flex gap-3">
			<!-- Icons -->
			<img in:fade src={answers[guess].src} alt={guess} class="size-24 object-cover drop-shadow" />

			<!-- Properties -->
			{#each props as prop, i (prop)}
				{@const cmp = compare(answers[aotd][prop], answers[guess][prop])}
				{@const clue = checkProperty(answers[guess], prop)}

				<div
					in:fade|global={{ delay: i * 500 }}
					on:introend={() => onIntroEnd(guess, i)}
					class="grid size-24 place-items-center rounded p-3 shadow clue-{clue}"
				>
					<!-- Display property here. -->
					{answers[guess][prop] instanceof Array
						? answers[guess][prop].join(', ')
						: answers[guess][prop]}

					<!-- Higher or lower? -->
					{#if cmp > 0}
						<IconHigher class="absolute size-20 opacity-50 dark:opacity-25" />
					{:else if cmp < 0}
						<IconLower class="absolute size-20 opacity-50 dark:opacity-25" />
					{/if}
				</div>
			{/each}
		</div>
	{/each}
</div>

<style lang="postcss">
	.clue-incorrect {
		@apply bg-error text-error-content;
	}

	.clue-partial {
		@apply bg-warning text-warning-content;
	}

	.clue-correct {
		@apply bg-success text-success-content;
	}
</style>
