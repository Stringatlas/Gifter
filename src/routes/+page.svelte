
<script lang="ts">
    import { onMount } from 'svelte';
    import { createScene } from '$lib/three/mainScene';

    var sceneCanvas: HTMLCanvasElement;
    var canvasDiv: HTMLDivElement;

    onMount(() => {
        createScene(sceneCanvas, canvasDiv);

    });


</script>

<body>
    <div id="canvasDiv" bind:this={canvasDiv}>
        <canvas id="mainScene" bind:this={sceneCanvas}></canvas>
    </div>

    <div id="toolbar">
        
    </div>

</body>


<style>
    #mainScene {
        background-color: #829FC0;
        z-index: -1;
        width:100vw;
        height:100vh;
    }

    #canvasDiv {
        position: absolute;
        top: 0;
        left: 0;
        width: 100vw;
        height: 92.5vh;
        background-color: blue;
    }

    body {
        margin: 0;
        overflow: hidden;
    }

    #toolbar {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100vw;
        height: 7.5vh;
        z-index: 1;
        background-color: rgba(0, 0, 0, 0.5);
    }
</style>