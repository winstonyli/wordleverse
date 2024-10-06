<script lang="ts">
	import Wordle from '$lib/components/Wordle.svelte';
	import * as freddle from '$lib/freddle';
</script>

<Wordle {...freddle}></Wordle>

<style lang="postcss">
	:global(body) {
		background-attachment: fixed;
		background-image: url('/freddle/background.jpg');
		background-position: center;
		background-size: cover;
	}
</style>
