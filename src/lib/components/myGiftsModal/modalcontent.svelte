<script lang="ts">
    import { writable } from 'svelte/store';
    import { createPresent } from '$lib/three/gift';
    import {browser} from '$app/environment';
    import { onMount } from 'svelte';

    let width = 10;
    if (browser) {
        width = window.innerWidth * 0.075 + window.innerHeight * 0.075;
    }

    let canvases: Array<HTMLCanvasElement> = new Array<HTMLCanvasElement>($recievedGifts.length);

    function updateViews(canvases: Array<HTMLCanvasElement>) {
        for (let i = 0; i < canvases.length; i++) {
            console.log(canvases[i], $recievedGifts[i].present);
            createPresent(canvases[i], $recievedGifts[i].present);
        }
    }
    onMount(() => {
        updateViews(canvases);
    });
    let currentCanvas: HTMLCanvasElement;

</script>

<script context="module" lang="ts">
    export let recievedGifts = writable([{
        present: "/smallpresent.glb",
        message: "Welcome to Gifter, a way to send gifts to your friends virtually!",
        from: "Self",
    }]);
</script>
<style>
    #parent {
        height: 70vh;
        width: 70vw;
        overflow: auto;
    }
    .gift {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 5vh;
    }

    .inlineBlock {
        display: inline-block;
    }

    .canvas {
        width: calc(7.5vw + 7.5vh);
        height: calc(7.5vw + 7.5vh);
        background-color: #628AFF;
        margin-right: 2vw;
    }
    
    h1, p, h3 {
        text-align: center;
    }
    
    hr {
        width: 80%;
    }
    .text {
        text-overflow: wrap;
        width: 60%;
    }
</style>
<div id="parent">
    <h1>Your Gifts</h1>
    <hr />

    {#each $recievedGifts as gift, i}
        <div class="gift">
            <canvas id={i.toString()} bind:this={canvases[i]} class="canvas inlineBlock" width={width} height={width}></canvas>
            
            <div class="inlineBlock text">
                <h3>From: {gift.from}</h3>
                <hr style="width: 10%"/> 
                <p>{gift.message}</p>
            </div>
        </div>
    {/each}
</div>