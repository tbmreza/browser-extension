<script>
  import browser from "webextension-polyfill";

  let profile = {
    darkgreen: {
      label: "",
      domains: {
        name: "",
        tld: "",
      },
    },
    chocolate: {
      label: "",
      domains: {
        name: "",
        tld: "",
      },
    },
    maroon: {
      label: "",
      domains: {
        name: "",
        tld: "",
      },
    },
    purple: {
      label: "",
      domains: {
        name: "",
        tld: "",
      },
    },
  }

  function unwrap(rule) {
    if (rule === undefined) {
      return { label: "", domains: { name: "", tld: "" } }
    }
    return rule
  }

  function as_dict(rules) {
    const darkgreen_rule = rules.find(r => r.color === "darkgreen")
    const chocolate_rule = rules.find(r => r.color === "chocolate")
    const maroon_rule = rules.find(r => r.color === "maroon")
    const purple_rule = rules.find(r => r.color === "purple")

    return {
      darkgreen: {
        label: unwrap(darkgreen_rule).label,
        domains: unwrap(darkgreen_rule).domains
      },
      chocolate: {
        label: unwrap(chocolate_rule).label,
        domains: unwrap(chocolate_rule).domains
      },
      maroon: {
        label: unwrap(maroon_rule).label,
        domains: unwrap(maroon_rule).domains
      },
      purple: {
        label: unwrap(purple_rule).label,
        domains: unwrap(purple_rule).domains
      },
    }
  }

  // TODO let subscribe jadi $
  let promise = browser.storage.local.get("match_url_profile").then((data) => {
    return as_dict(JSON.parse(data["match_url_profile"]))
  });

  function form_value(form, color) {
    let fv = { label: "", domains: "" }
    for (const [k, v] of Object.entries(form)) {
      if (k.includes(color)) {
        fv[k.toString().split("-")[1]] = v
      }
    }
    return fv
  }

  function from_domains(domains) {
    return `${domains.name}.${domains.tld}`;
  }

  function to_domains(url) {
    const domain_name = url.split(".")[0]
    return {
      name: domain_name,
      tld: url.slice(domain_name.length + 1),
    }
  }

  function as_profile(form) {
    return {
      darkgreen: {
        label: form_value(form, "darkgreen").label,
        domains: form_value(form, "darkgreen").domains,
      },
      chocolate: {
        label: form_value(form, "chocolate").label,
        domains: form_value(form, "chocolate").domains,
      },
      maroon: {
        label: form_value(form, "maroon").label,
        domains: form_value(form, "maroon").domains,
      },
      purple: {
        label: form_value(form, "purple").label,
        domains: form_value(form, "purple").domains,
      }
    }
  }

  // TODO rename to safely_set
  // TODO button to clear extension storage
  function test_set(s) {
    browser.storage.local.set({ match_url_profile: JSON.stringify(s) });
  }

  function handle_submit(e) {
    const fd = new FormData(e.target);

    const profile_form = {};
    fd.forEach((v, k) => profile_form[k] = v);

    profile = as_profile(profile_form)
    test_set(to_array(profile_form))
  }

  function to_array(form) {
    return [ 
      {
        color: "darkgreen",
        label: form_value(form, "darkgreen").label,
        domains: to_domains(form_value(form, "darkgreen").domains),
      },
      {
        color: "chocolate",
        label: form_value(form, "chocolate").label,
        domains: to_domains(form_value(form, "chocolate").domains),
      },
      {
        color: "maroon",
        label: form_value(form, "maroon").label,
        domains: to_domains(form_value(form, "maroon").domains),
      },
      {
        color: "purple",
        label: form_value(form, "purple").label,
        domains: to_domains(form_value(form, "purple").domains),
      }
    ]
  }
</script>
<style>
  button {
    margin-top: 8px;
  }
  input {
    margin-bottom: 2px;
  }

  input[name="darkgreen-label"] {
    margin-top: 8px;
    background-color: darkgreen;
    color: white;
  }
  input[name="chocolate-label"] {
    background-color: chocolate;
    color: white;
  }
  input[name="maroon-label"] {
    background-color: maroon;
    color: white;
  }
  input[name="purple-label"] {
    background-color: purple;
    color: white;
  }
</style>

<h4>Recognize these domains:</h4>
{#await promise then profile}
  <form on:submit|preventDefault={handle_submit}>
    <ul>
      <input type=text name="darkgreen-label" value={profile.darkgreen.label}>
      <input type=text name="darkgreen-domains" value={from_domains(profile.darkgreen.domains)}>
      <input type=text name="chocolate-label" value={profile.chocolate.label}>
      <input type=text name="chocolate-domains" value={from_domains(profile.chocolate.domains)}>
      <input type=text name="maroon-label" value={profile.maroon.label}>
      <input type=text name="maroon-domains" value={from_domains(profile.maroon.domains)}>
      <input type=text name="purple-label" value={profile.purple.label}>
      <input type=text name="purple-domains" value={from_domains(profile.purple.domains)}>
      <button type="submit">save</button>
    </ul>
  </form>
{/await}
<br/>

<h4>Tips:</h4>
<ul>
  <li>Click a ribbon to hide it.</li>
  <li>Right-click a ribbon to display all four.</li>
  <li>To turn off the ribbons, disable the extension.</li>
</ul>
<br/>
