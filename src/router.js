import Navigo from "navigo";
import IndexPage from "./pages/index";
import NotePage from "./pages/note";
import AccountPage from "./pages/account";
import Page404 from "./pages/404";

const root = document.querySelector("#root");
// const main = document.querySelector("#root main");
const router = new Navigo("/");

const renderWithLayout = (html) => {
  root.innerHTML = `<app-layout>${html}</app-layout>`;
};

router.on("/", () => {
  const page = new IndexPage();
  renderWithLayout(page.render());
});

router.on("/account", () => {
  const page = new AccountPage();
  renderWithLayout(page.render());
});

router.on("/note/:id", ({ data }) => {
  const id = data.id;
  const page = new NotePage(id);
  renderWithLayout(page.render());
});

router.on("/*", () => {
  const page = new Page404();
  root.innerHTML = page.render();
});

router.resolve();
