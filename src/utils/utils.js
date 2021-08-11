import dayjs from "dayjs";
import $ from "jquery";
import { nanoid } from "nanoid";

export function setLoading(status = true) {
  if (status) $("#loadingScreen").addClass("active");
  else $("#loadingScreen").removeClass("active");
}

export function setTitle(title = "", useSuffix = true) {
  let t = "Dicoding Notes";
  if (title === "") {
    document.title = t;
  } else if (useSuffix) {
    document.title = `${title} | ${t}`;
  } else {
    document.title = title;
  }
}

export function dayJsWrapped(x) {
  return dayjs(x).subtract(7, "h");
}

export const toast = {
  template: (message, theme = "primary") => {
    const id = `toast-${nanoid(8)}`;
    $(".toast-container").append(`
    <div class="toast show align-items-center text-white bg-${theme} border-0" role="alert" aria-live="assertive" aria-atomic="true" id="${id}">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
    `);
    setTimeout(() => {
      $(`#${id}`).hide(400, () => {
        $(`#${id}`).remove();
      });
    }, 2000);
  },
  success: (message) => {
    toast.template(message, "success");
  },
  error: (message) => {
    toast.template(message, "danger");
  },
  warning: (message) => {
    toast.template(message, "warning");
  },
};
