<script>
  import Ribbon from "./Ribbon.svelte"
  import { displayed } from "./stores"

  let bools = [false, true, true, true]

  function showAllFour() {
    bools = [false, false, false, false]
    displayed.set(4)
  }
</script>

<Ribbon placement="left-top" bind:hide={bools[0]} on:rightclick={showAllFour} />
<Ribbon placement="right-top" bind:hide={bools[1]} on:rightclick={showAllFour} />
<Ribbon placement="left-bottom" bind:hide={bools[2]} on:rightclick={showAllFour} />
<Ribbon placement="right-bottom" bind:hide={bools[3]} on:rightclick={showAllFour} />
