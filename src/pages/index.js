import { setTitle } from "../utils/utils";

class IndexPage {
  constructor() {}

  render() {
    setTitle("Dicoding Notes");
    return `
      <h1>Hello World</h1>
    `;
  }
}

export default IndexPage;
