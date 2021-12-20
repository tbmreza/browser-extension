<script>
  import browser from "webextension-polyfill";

  let image = "https://images.unsplash.com/photo-1586074299757-dc655f18518c?fit=crop&w=1268&q=80";

  function change() {
    browser.storage.local.set({ background: image });
  }
</script>

<style>
  :root {
    --height: 18px;
  }
  input[type="checkbox"] {
    width: 0;
    height: 0;
    visibility: hidden;
  }
  label {
    width: calc(2 * var(--height));
    height: var(--height);
    display: block;
    background-color: gray;
    border: solid 1px darkslategray;
    border-radius: 100px;
    position: relative;
    cursor: pointer;
    transition: 0.5s;
    box-shadow: 0 0 20px #477a8550;
  }
  label::after {
    content: "";
    width: calc(0.8 * var(--height));
    height: calc(0.8 * var(--height));
    background-color: white;
    position: absolute;
    border-radius: 70px;
    top: calc(0.1 * var(--height));
    left: calc(0.1 * var(--height));
    transition: 0.2s;
  }
  input:checked + label:after {
    left: calc(100% - (calc(0.07 * var(--height))));
    transform: translateX(-100%);
  }
  input:checked + label {
    background-color: darkslategray;
    border: solid 1px black;
  }
</style>

<main>
  <input type="checkbox" name="switch" id="switch" checked>
  <label for="switch"></label>
  Image URL: <input type="text" bind:value={image} />
  <button on:click={change}>Change</button>
  <a class="github-fork-ribbon left-top" href="" data-ribbon="text on the ribbon" title="Click to hide.">yeada</a>
</main>

