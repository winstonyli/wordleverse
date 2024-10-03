<script lang="ts">
	export let time: Date;
</script>

<span class="countdown rounded-box bg-accent p-1.5 text-2xl text-accent-content shadow">
	<span style:--value={time.getUTCHours()} />:
	<span style:--value={time.getUTCMinutes()} />:
	<span style:--value={time.getUTCSeconds()} />
</span>
