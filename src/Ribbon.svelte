<script lang="ts">
  export let placement: string
  export let hide = false
  import browser from "webextension-polyfill";
  import { createEventDispatcher } from 'svelte';

  // NOTE
  // "*://*.dmp.loc/*",
  // "*://*.mataharibiz.com/*",
  // "*://*.mbizmarket.dev/*",
  // "*://*.mbizmarket.my.id/*"

  interface DomainParts {
    sub?: string,
    name: string,
    tld: string,
  }

  interface InputRule {
    label: string,
    color: string,
    domains: DomainParts,
  }

  interface Rule {
    pattern: RegExp,
  }

  let promise = browser.storage.local.get("match_url_profile").then((data) => {
    const rule = JSON.parse(data["match_url_profile"])
      .map((rule: InputRule) => {
        return { pattern: pattern_re(rule.domains), label: rule.label, color: rule.color };
      })
      .find((rule: Rule) => rule.pattern.test(window.location.href));

    let ribbon = { label: "", color: "" }
    if (rule === undefined) {
      hide = true
    } else {
      ribbon = { label: rule.label, color: rule.color }
    }
    return ribbon
  });

  const dispatch = createEventDispatcher()

  function pattern_re(domains: DomainParts) {
    const { name, tld } = domains;
    const pattern_str = `^(?:https?:\/\/)?(?:[^.]+\.)?${name}\.${tld}(\/.*)?$`;
    return new RegExp(pattern_str, "gmi");
  }
</script>

<style>
  .github-fork-ribbon.darkgreen:before {
    background-color: darkgreen;
  }

  .github-fork-ribbon.chocolate:before {
    background-color: chocolate;
  }

  .github-fork-ribbon.maroon:before {
    background-color: maroon;
  }

  .github-fork-ribbon.purple:before {
    background-color: purple;
  }

  /*!
   * "Fork me on GitHub" CSS ribbon v0.2.3 | MIT License
   * https://github.com/simonwhitaker/github-fork-ribbon-css
  */

  .github-fork-ribbon {
    width: 12.1em;
    height: 12.1em;
    position: absolute;
    overflow: hidden;
    top: 0;
    right: 0;
    z-index: 9999;
    pointer-events: none;
    font-size: 13px;
    text-decoration: none;
    text-indent: -999999px;
    position: fixed;
  }

  .github-fork-ribbon:hover,
  .github-fork-ribbon:active {
    background-color: rgba(0, 0, 0, 0);
  }

  .github-fork-ribbon:before,
  .github-fork-ribbon:after {
    /* The right and left classes determine the side we attach our banner to */
    position: absolute;
    display: block;
    width: 15.38em;
    height: 1.54em;

    top: 3.23em;
    right: -3.23em;

    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;

    -webkit-transform: rotate(45deg);
    -moz-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -o-transform: rotate(45deg);
    transform: rotate(45deg);
  }

  .github-fork-ribbon:before {
    content: "";

    /* Add a bit of padding to give some substance outside the "stitching" */
    padding: 0.38em 0;

    /* Set the base colour */
    background-color: #000;

    /* Set a gradient: transparent black at the top to almost-transparent black at the bottom */
    background-image: -webkit-gradient(
      linear,
      left top,
      left bottom,
      from(rgba(0, 0, 0, 0)),
      to(rgba(0, 0, 0, 0.15))
    );
    background-image: -webkit-linear-gradient(
      top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.15)
    );
    background-image: -moz-linear-gradient(
      top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.15)
    );
    background-image: -ms-linear-gradient(
      top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.15)
    );
    background-image: -o-linear-gradient(
      top,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.15)
    );
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0),
      rgba(0, 0, 0, 0.15)
    );

    /* Add a drop shadow */
    -webkit-box-shadow: 0 0.15em 0.23em 0 rgba(0, 0, 0, 0.5);
    -moz-box-shadow: 0 0.15em 0.23em 0 rgba(0, 0, 0, 0.5);
    box-shadow: 0 0.15em 0.23em 0 rgba(0, 0, 0, 0.5);

    pointer-events: auto;
  }

  .github-fork-ribbon:after {
    /* Set the text from the data-ribbon attribute */
    content: attr(data-ribbon);

    /* Set the text properties */
    color: #fff;
    font: 700 1em "Helvetica Neue", Helvetica, Arial, sans-serif;
    line-height: 1.54em;
    text-decoration: none;
    text-shadow: 0 -0.08em rgba(0, 0, 0, 0.5);
    text-align: center;
    text-indent: 0;

    /* Set the layout properties */
    padding: 0.15em 0;
    margin: 0.15em 0;

    /* Add "stitching" effect */
    border-width: 0.08em 0;
    border-style: dotted;
    border-color: #fff;
    border-color: rgba(255, 255, 255, 0.7);
  }

  .github-fork-ribbon.left-top,
  .github-fork-ribbon.left-bottom {
    right: auto;
    left: 0;
  }

  .github-fork-ribbon.left-bottom,
  .github-fork-ribbon.right-bottom {
    top: auto;
    bottom: 0;
  }

  .github-fork-ribbon.left-top:before,
  .github-fork-ribbon.left-top:after,
  .github-fork-ribbon.left-bottom:before,
  .github-fork-ribbon.left-bottom:after {
    right: auto;
    left: -3.23em;
  }

  .github-fork-ribbon.left-bottom:before,
  .github-fork-ribbon.left-bottom:after,
  .github-fork-ribbon.right-bottom:before,
  .github-fork-ribbon.right-bottom:after {
    top: auto;
    bottom: 3.23em;
  }

  .github-fork-ribbon.left-top:before,
  .github-fork-ribbon.left-top:after,
  .github-fork-ribbon.right-bottom:before,
  .github-fork-ribbon.right-bottom:after {
    -webkit-transform: rotate(-45deg);
    -moz-transform: rotate(-45deg);
    -ms-transform: rotate(-45deg);
    -o-transform: rotate(-45deg);
    transform: rotate(-45deg);
  }
</style>

<!-- This isn't the `a` element's intended use (not a hyperlink to go to another page). -->
<!-- svelte-ignore a11y-missing-content -->
<!-- svelte-ignore a11y-missing-attribute -->
{#if !hide}
  {#await promise then ribbon}
    <a
      class="github-fork-ribbon {placement} {ribbon.color}"
      data-ribbon={ribbon.label}
      title="Click to hide."
      on:click={() => dispatch("click")}
      on:contextmenu|preventDefault={() => dispatch("rightclick")}>
    </a>
  {/await}
{/if}
