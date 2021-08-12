import $ from "jquery";
import {
  createNoteService,
  deleteNoteService,
  fetchAllNotesService,
} from "../services/NoteService";
import ApiProvider from "../providers/ApiProvider";
import { setLoading, toast } from "../utils/utils";
import dayjs from "dayjs";

class NoteList extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this._fetcher = fetchAllNotesService(ApiProvider());
    this._fetcherInterval = setInterval(() => {
      this.fetchData();
    }, 10000);
    this._data = [];
    this.fetchData();
  }

  disconnectedCallback() {
    clearInterval(this._fetcherInterval);
  }

  async createNewNote() {
    setLoading(true);
    try {
      const res = await createNoteService(ApiProvider(), "untitled", "-");
      const id = res?.data?._id;
      window.location.replace(`/note/${id}`);
    } catch (error) {
      toast.error("Note Creation Failed!");
    }
    setLoading(false);
  }

  async deleteNote(id) {
    setLoading(true);
    try {
      const res = await deleteNoteService(ApiProvider(), id);
      toast.success("Note Successfully Deleted!");
    } catch (error) {
      toast.error("Deleting Note Failed!");
    }
    this.fetchData();
    setLoading(false);
  }

  async fetchData() {
    try {
      const { data } = await this._fetcher();
      let noteList = data?.data;
      noteList = await noteList.sort(
        (b, a) => dayjs(a.updatedAt) - dayjs(b.updatedAt)
      );
      this._data = noteList;
      this.render();
    } catch (error) {
      //
    }
  }

  render() {
    this.innerHTML = `
    <div class="d-flex flex-column align-items-center w-100">
      ${this._data
        .map(
          (el) =>
            `
          <div class="note-item">
            <a href="/note/${el?._id}" data-navigo>${el?.title}</a>
            <div>
              <div><i class="fas fa-trash note-item-delete text-danger" target-id="${
                el?._id
              }"></i></div>
              <span class="note-item-modified">${dayjs(el?.updatedAt)
                .subtract(7, "h")
                .format("D MMM YYYY H:mm")}</span>
            </div>
          </div>
          `
        )
        .join("")}
    </div>
    <div class="note-add-button-wrapper">
      <div id="note-add-button">
          <i class="fas fa-plus"></i>
      </div>
    </div>
    `;

    $("#note-add-button").on("click", () => {
      this.createNewNote();
    });
    $(".note-item-delete").on("click", (e) => {
      this.deleteNote($(e.target).attr("target-id"));
    });
  }
}

customElements.define("note-list", NoteList);
