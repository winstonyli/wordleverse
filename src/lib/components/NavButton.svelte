<script lang="ts">
	import { page } from '$app/stores';

	export let title: string;
	export let href: string;
</script>

<a {href} class="peer z-10 flex items-center hover:text-accent">
	<slot />
	<p
		class="hidden -translate-x-full overflow-hidden text-clip text-xl font-black opacity-0 transition lg:block"
		class:translate-x-0={$page.route.id === href}
		class:opacity-100={$page.route.id === href}
	>
		{title}
	</p>
</a>
