import $ from "jquery";
import { fetchNoteService, updateNoteService } from "../services/NoteService";
import ApiProvider from "../providers/ApiProvider";
import { dayJsWrapped, setLoading, toast } from "../utils/utils";

class NoteEditor extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const id = $(this).attr("note-id");
    this._id = id;
    this._fetcher = fetchNoteService(ApiProvider(), id);
    this._data = [];
    this.fetchData();
  }

  async fetchData() {
    try {
      const { data } = await this._fetcher();
      this._data = data;
      this.render();
    } catch (error) {
      //
    }
  }

  async saveData() {
    setLoading(true);
    try {
      const id = this._id;
      const title = $(`#title-${this._id}`).val();
      const content = $(`#content-${this._id}`).val();
      const { data } = await updateNoteService(
        ApiProvider(),
        id,
        title,
        content
      );
      this.updateLocalData(data);
      toast.success("Note Successfully Saved!");
    } catch (error) {
      toast.error("Saving Note Error");
    }
    this.fetchData();
    setLoading(false);
  }

  formatDate(date) {
    return dayJsWrapped(date).format("D MMM YYYY H:mm:ss");
  }

  updateLocalData(data) {
    this._data = data;
    $(`#updated-${this._id}`).html(this.formatDate(data.updatedAt));
    this.fillContent(data.title, data.content);
  }

  fillContent(title, content) {
    $(`#title-${this._id}`).val(title);
    $(`#content-${this._id}`).val(content);
  }

  render() {
    if (this._data === null) {
      this.innerHTML = `
        <p>No Notes Found!</p>
      `;
      return;
    }
    this.innerHTML = `
    <div class="note-editor">
      <div class="note-editor-header mb-3">
        <div>
          <a class="note-editor-back" href="/" data-navigo><i class="fas fa-chevron-left"></i> Back</a>
        </div>
        <small>Last Updated: <span id="updated-${this._id}">${this.formatDate(
      this._data.updatedAt
    )}</span></small>
      </div>
      <label>TITLE</label>
      <input autocomplete="off" class="form-control mb-3" type="text" id="title-${
        this._id
      }" placeholder="Title" />
      <label>CONTENT</label>
      <textarea class="form-control" id="content-${
        this._id
      }" cols="30" rows="10" placeholder="Your note content here"></textarea>
    </div>
    <div class="note-add-button-wrapper">
      <div id="note-save-button">
          <i class="fas fa-save"></i>
      </div>
    </div>
    `;

    $("#note-save-button").on("click", () => {
      this.saveData();
    });

    this.fillContent(this._data?.title, this._data?.content);
  }
}

customElements.define("note-editor", NoteEditor);
