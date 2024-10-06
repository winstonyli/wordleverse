<script lang="ts">
	import Wordle from '$lib/components/Wordle.svelte';
	import * as bloondle from '$lib/bloondle';
</script>

<Wordle {...bloondle}></Wordle>

<style lang="postcss">
	:global(body) {
		background-attachment: fixed;
		background-image: url('/freddle/background.jpg');
		background-position: center;
		background-size: cover;
	}
</style>
