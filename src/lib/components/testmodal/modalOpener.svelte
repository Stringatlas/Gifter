<script>
    import Modal from './testModal.svelte'
    import { isOpen } from './testModal.svelte'
    import { fade } from 'svelte/transition'
    
    function handleClick() {
        console.log("clicked")
        openTestModal();
    }

    function openTestModal() {
        $isOpen = true;
    }

    function closeTestModal() {
        $isOpen = false;
    }
    
</script>

<Modal />

{#if $isOpen}
    <div
        class="backdrop"

        on:keyup={e => {
            if (e.key === 'Escape') {
                closeTestModal()
            }
        }}
        on:click={closeTestModal}
        transition:fade
    />
{/if}

<button on:click="{handleClick}">Open Modal</button>

<style>
    .backdrop {
      position: fixed;
      top: 0;
      bottom: 0;
      right: 0;
      left: 0;
      z-index: 0;
      background: rgba(0,0,0,0.50)
    }
</style>