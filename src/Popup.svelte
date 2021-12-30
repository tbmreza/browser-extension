<script>
  import browser from "webextension-polyfill";

  // TODO input fields
  // const bg_colors = ["darkgreen", "chocolate", "maroon", "purple"]

  function save() {
    const profile = JSON.parse("[{\"label\":\"LOCALHOST\",\"color\":\"darkgreen\",\"domains\":{\"name\":\"dmp\",\"tld\":\"loc\"}},{\"label\":\"STAGING\",\"color\":\"chocolate\",\"domains\":{\"name\":\"mataharibiz\",\"tld\":\"com\"}},{\"label\":\"PRE-STAGING\",\"color\":\"maroon\",\"domains\":{\"name\":\"mbizmarket\",\"tld\":\"dev\"}},{\"label\":\"UAT\",\"color\":\"purple\",\"domains\":{\"name\":\"mbizmarket\",\"tld\":\"my.id\"}}]");
    browser.storage.local.set({ match_url_profile: JSON.stringify(profile) });
  }

  const profile = [
    {
      label: "LOCALHOST",
      color: "darkgreen",
      domains: { name: "dmp", tld: "loc" },
    },
    {
      label: "STAGING",
      color: "chocolate",
      domains: { name: "mataharibiz", tld: "com" },
    },
    {
      label: "PRE-STAGING",
      color: "maroon",
      domains: { name: "mbizmarket", tld: "dev" },
    },
    {
      label: "UAT",
      color: "purple",
      domains: { name: "mbizmarket", tld: "my.id" },
    },
  ];
</script>

<button on:click={save}>save</button>

<h4>Recognize these URL patterns:</h4>
<ul>
  <li>darkgreen</li>
  <li>chocolate</li>
  <li>maroon</li>
  <li>purple</li>
</ul>
<br/>

<h4>Tips:</h4>
<ul>
  <li>Click a ribbon to hide it.</li>
  <li>Right-click a ribbon to display all four.</li>
  <li>To turn off the ribbons, disable the extension.</li>
</ul>
<br/>
