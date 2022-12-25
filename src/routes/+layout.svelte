<script lang="ts">
    import "../app.css";

    import { browser } from "$app/environment";

    let turn: HTMLDivElement;
    let normalContent: HTMLDivElement;

    let turnDisplay: string = "none";

    let interval: any;

    function showContent() {
        turnDisplay = "none";
        clearInterval(interval);
    }

    function hideContent() {
        turnDisplay = "block";
    }

    if (browser) {
        interval = setInterval(checkOrientation, 100);
    }

    function checkOrientation() {
        if (screen.availHeight > screen.availWidth) {
            hideContent();
        }
        else {
            showContent();
            clearInterval(interval);
        }
    }

</script>


<style>
    #turn {
        z-index: 2;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        overflow: auto;
        background-color: white;
        border: 4px solid black;
        padding: 4px;
        width: 90vw;
        height: 90vh;
        align-items: center;
    }

    #turn > img {
        width: 100%;
        height: auto;
    }

    #turn > h1, #turn > p, #turn > button {
        text-align: center;
    }
</style>

<body>
    <div id="normalContent" bind:this={normalContent}>
        <main>
            <slot></slot>
        </main>
    </div>

    <div id="turn" bind:this={turn} style="display: {turnDisplay}">
        <h1>Please turn your device</h1>
        <p>Turn your device to landscape mode for a better viewing experience. Thank you!</p>
        <img src="/rotate_device.png" alt="rotateDevice">
        <button on:click={showContent}>
            Continue anyway
        </button>
    </div>
</body>