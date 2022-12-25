
<script lang="ts">
    import { onMount } from 'svelte';
    import { createScene } from '$lib/three/mainScene';
    import ToolBar from '$lib/components/toolbar.svelte';

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
        <ToolBar />
    </div>

    <div>
        <button id="profile-btn">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
            </svg>
        </button>
    </div>

</body>


<style>
    #profile-btn {
        position: absolute;
        top: 0px;
        right: 0px;
        margin-right: 10px;

        width: calc(4vw + 4vh);
        height: auto;
        padding: 1vw;
        z-index: 1;
        color: #C24240;
        background-color: transparent; 
        border: none;
    }

    #profile-btn svg {
        width: 100%;
        height: 100%;
        border: #C24240 solid 5px;
        border-radius: 100%;
    }

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
        height: 100%;
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
        height: fit-content;
        z-index: 1;
        background-color: #ADFFC7;
    }

    
</style>