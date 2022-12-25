<script lang="ts">
    import { browser } from "$app/environment";
    import { createGift } from "$lib/three/gift";

    const gifts = [
        {
            path: "/images/present.jpeg",
            name: "Present",
            model: "present.glb",
        },
        {
            path: "/images/small_present.jpeg",
            name: "Small Present",
            model: "smallpresent.glb",
        },
        {
            path: "/images/medium_present.jpeg",
            name: "Medium Present",
            model: "mediumpresent.glb",
        },
        {
            path: "/images/large_present.jpeg",
            name: "Large Present",
            model: "largepresent.glb",
        },
    ]

    let canvas: HTMLCanvasElement;
    let width = 10;
    let height = 10;
    if (browser) {
        width = window.innerWidth * 0.15 + window.innerHeight * 0.15;
        height = width;
    }
</script>

<style>
    button {
        background-color: #628AFF;
        color: white;
        border: none;
        padding: 10px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        border-radius: 8px;
    }

    label {
        margin-bottom: 5px;
    }
    .field-wrap {
        margin-bottom: 5px;
    }
    .form {
        overflow: auto;
        height: 90vh;
    }

    #chooseGiftBox {
        align-items: center;
    }

    #canvas {
        margin-left: 50%;
        translate: -50%;
        background-color: #628AFF;
    }

    .imgPreview {
        width: calc(10vw + 10vh);
        height: auto;
    }

    #giftSelectParent {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        margin: 10px;
    }

    .giftSelect {
        margin: 5px;
        align-items: center;
    }
    .giftSelect > p {
        text-align: center;
    }

    .giftSelect > img:hover {
        outline: 2px solid rgb(236, 158, 23);
    }
    .giftSelect > img:focus {
        outline: 2px solid rgb(236, 158, 23);
    }
</style>

<div class="form">
    <div id="signup">   
        <h1>Send a gift to someone</h1>
        <hr />
        <form action="/" method="post">
            <div class="top-row">
                <div class="field-wrap">
                    <label for="user">
                        To User: 
                    </label>
                    <input id="user" type="text" required autocomplete="off" />
                    * set to "self" to send a gift to yourself
                </div>
                <div class="field-wrap">
                    <label for="message">
                        Message
                    </label>
                    <input id="message" type="text" required autocomplete="off" />
                </div>
            </div>
            
            <div id="chooseGiftBox">
                <h2>Click on a gift box to select it</h2>
                <div id="giftSelectParent">
                    {#each gifts as gift}
                        <div class="giftSelect">
                            <img class="imgPreview" src={gift.path
                            } alt={gift.name} on:click={() => createGift(canvas, gift.model)} />
                            <p>{gift.name}</p>
                        </div>
                    {/each}
                </div>
                <div style="text-align:center">
                    <p>Move mouse in canvas to orbit present</p>
                </div>
                <canvas id="canvas" bind:this={canvas} height={height} width={width}></canvas>
                
            </div> 

            <button type="submit" class="send"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send-fill" viewBox="0 0 16 16">
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z"/>
              </svg>Send Gift</button>
        </form>
    </div>
      
</div> <!-- /form -->