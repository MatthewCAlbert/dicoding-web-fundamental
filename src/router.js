import Navigo from "navigo";
import IndexPage from "./pages/index";
import AnotherPage from "./pages/another";

const root = document.querySelector("#root main");
const router = new Navigo("/");

router.on("/", function () {
  const page = new IndexPage();
  root.innerHTML = page.render();
});
router.on("/das", function () {
  const page = new AnotherPage();
  root.innerHTML = page.render();
});
router.on("/account", function () {});
router.on("/note/:id", function ({ data }) {
  console.log(data.id);
});

router.resolve();
