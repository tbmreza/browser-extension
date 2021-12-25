<script>
  import Ribbon from "./Ribbon.svelte"
  import { displayed, hidden_ribbons } from "./stores"

  let hidden_ribbons_val
  hidden_ribbons.subscribe(val => hidden_ribbons_val = val)
  let hideRibbon = [0, 1, 2, 3].map(i => hidden_ribbons_val.includes(i))

  let displayed_val
  displayed.subscribe(n => displayed_val = n)
  // NOTE generalized form clickRibbon(i) {
  //   ...
  //   hideRibbon[i]
  //   ...
  //   n.concat(i)
  //   ...
  // }
  // results in runtime error. Svelte bug or am I crazy?
  function clickRibbon0() {
    if (displayed_val > 1) {
      hideRibbon[0] = true
      hidden_ribbons.update(n => n.concat(0))
      displayed.update(n => n - 1)
    }
  }
  function clickRibbon1() {
    if (displayed_val > 1) {
      hideRibbon[1] = true
      hidden_ribbons.update(n => n.concat(1))
      displayed.update(n => n - 1)
    }
  }
  function clickRibbon2() {
    if (displayed_val > 1) {
      hideRibbon[2] = true
      hidden_ribbons.update(n => n.concat(2))
      displayed.update(n => n - 1)
    }
  }
  function clickRibbon3() {
    if (displayed_val > 1) {
      hideRibbon[3] = true
      hidden_ribbons.update(n => n.concat(3))
      displayed.update(n => n - 1)
    }
  }

  function showAllFour() {
    hideRibbon = [false, false, false, false]
    hidden_ribbons.set([])
    displayed.set(4)
  }
</script>

<Ribbon placement="left-top" bind:hide={hideRibbon[0]} on:rightclick={showAllFour} on:click={clickRibbon0} />
<Ribbon placement="right-top" bind:hide={hideRibbon[1]} on:rightclick={showAllFour} on:click={clickRibbon1} />
<Ribbon placement="left-bottom" bind:hide={hideRibbon[2]} on:rightclick={showAllFour} on:click={clickRibbon2} />
<Ribbon placement="right-bottom" bind:hide={hideRibbon[3]} on:rightclick={showAllFour} on:click={clickRibbon3} />
