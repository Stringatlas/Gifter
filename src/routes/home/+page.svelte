<script lang="ts">
    import { onMount } from 'svelte';
    import { createGift } from '$lib/three/gift';

    var giftCanvas: HTMLCanvasElement;

    onMount(() => {
        createGift(giftCanvas, "/largepresent.glb");
    });

</script>
<h1>aaa</h1>
<canvas id="giftCanvas" bind:this={giftCanvas} width=500 height=500> </canvas>