<script lang="ts">
	import { page } from '$app/stores';
	import 'tailwindcss/tailwind.css';
	import '@fontsource/nunito';

	import { base } from '$app/paths';

	import DarkModeToggle from '$lib/components/DarkModeToggle.svelte';
	import NavButton from '$lib/components/NavButton.svelte';

	import IconBtd from '~icons/arcticons/bloonstd6';
	import IconFnaf from '~icons/arcticons/five-nights-at-freddys';
</script>

<!-- Fullscreen background -->
<div
	class="min-h-screen w-screen bg-cover bg-fixed bg-center"
	style:background-image="url('{base}/{$page.route.id}/background.jpg')"
>
	<!-- Fullscreen backdrop blur -->
	<div class="flex min-h-screen w-screen justify-center backdrop-blur">
		<!-- Main content -->
		<div class="items-center overflow-x-hidden bg-base-100">
			<!-- Navbar -->
			<nav class="navbar sticky top-0 z-20 bg-base-100 bg-opacity-80 px-6 backdrop-blur">
				<div class="navbar-start">
					<NavButton title="Bloondle" href="{base}/bloondle">
						<IconBtd class="size-20" />
					</NavButton>

					<NavButton title="Freddle" href="{base}/freddle">
						<IconFnaf class="size-20" />
					</NavButton>
				</div>

				<div class="navbar-end">
					<DarkModeToggle />
				</div>
			</nav>

			<div class="m-6 flex flex-col items-center gap-6">
				<slot />
			</div>
		</div>
	</div>
</div>
