import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(({ reason }) => {
  if (reason === "install") {
    // TODO figure out a sensible thing to do onInstalled
    alert("browser.runtime.onInstalled");
  }
});
