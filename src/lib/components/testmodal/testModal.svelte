<script lang="ts">
    import { fade } from 'svelte/transition'
        
    export function closeTestModal() {
        $isOpen = false;
    }

    export function openTestModal() {
        $isOpen = true;
    }
</script>

<script lang="ts" context="module">
    import { writable } from 'svelte/store';

    export let isOpen = writable(false);

</script>

{#if $isOpen}
    <div role="dialog" class="modal" transition:fade>
        <div class="contents">
            <h2>Hi</h2>
            <p>Kid</p>
            <div class="actions">
                <button on:click="{closeTestModal}">OK</button>
            </div>
        </div>
    </div>
{/if}

<style>
    .modal {
        position: fixed;
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
        /* allow click-through to backdrop */
        pointer-events: none;
    }

    .contents {
        min-width: 240px;
        border-radius: 6px;
        padding: 16px;
        background: white;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        pointer-events: auto;
    }

    h2 {
        text-align: center;
        font-size: 24px;
    }

    p {
        text-align: center;
        margin-top: 16px;
    }

    .actions {
        margin-top: 32px;
        display: flex;
        justify-content: flex-end;
    }
</style>