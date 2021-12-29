import { writable } from "svelte/store";

// localStorage.hidden_ribbons {
const default_hidden_ribbons = [1, 2, 3]; // only show left-top

export const hidden_ribbons = writable(
  JSON.parse(
    localStorage.getItem("hidden_ribbons") ||
      JSON.stringify(default_hidden_ribbons)
  )
);

let hidden_ribbons_len = default_hidden_ribbons.length;
hidden_ribbons.subscribe((bools) => {
  hidden_ribbons_len = bools.length;
  localStorage.setItem("hidden_ribbons", JSON.stringify(bools));
});
// }

// localStorage.match_url_profile {
export const match_url_profile = writable(
  JSON.parse(localStorage.getItem("match_url_profile") || JSON.stringify([]))
);

match_url_profile.subscribe((val) => {
  localStorage.setItem("match_url_profile", JSON.stringify(val));
});
// }

export const displayed = writable(4 - hidden_ribbons_len);
