<script>
  import Ribbon from "./Ribbon.svelte"
</script>

{#each ["left-top", "left-bottom", "right-top", "right-bottom"] as placement}
  <Ribbon {placement} />
{/each}

<!-- TODO interact with Popup.svelte -->
