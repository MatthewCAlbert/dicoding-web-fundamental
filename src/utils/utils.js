import $ from "jquery";

export function setLoading(status = true) {
  if (status) $("#loadingScreen").show(200);
  else $("#loadingScreen").hide(200);
}

export function setTitle(title) {
  window.title = title;
}
