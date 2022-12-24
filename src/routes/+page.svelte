
<script lang="ts">
    import { onMount } from 'svelte';
    import { createScene } from '$lib/three/mainScene';

    var sceneCanvas: HTMLCanvasElement;
    onMount(() => {
        createScene(sceneCanvas);
    });

</script>
<canvas id="mainScene" bind:this={sceneCanvas}></canvas>


<style>
    #mainScene {
        background-color: rgb(179, 5, 5);
        z-index: -1;
        position: absolute;
        top: 0;
        left: 0;
        width:100vw;
        height:100vh;
    }
</style>