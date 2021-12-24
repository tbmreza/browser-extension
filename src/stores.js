import { writable } from "svelte/store";

// Initial value should agree with the number of falses in `bools`
// at Corners.svelte:
//
// let bools = [false, true, true, true] // 1 false
//
// export const displayed = writable(1); // initialize to 1
export const displayed = writable(1);
