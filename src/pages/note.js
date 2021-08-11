import { setTitle } from "../utils/utils";
import ProtectedPage from "./ProtectedPage";

class NoteEditorPage extends ProtectedPage {
  constructor(id) {
    super();
    this._id = id;
    this.render();
  }

  render() {
    if (!this._user) return;
    setTitle("Note Editor");
    return `
      <section class="section section-normalized section-mfh">
        <div class="section-inner">
          <note-editor note-id="${this._id}"></note-editor>
        </div>
      </section>
    `;
  }
}

export default NoteEditorPage;
