import { setTitle } from "../utils/utils";

class AnotherPage {
  constructor() {}

  render() {
    setTitle("Dicoding Notes 3");
    return `
      <h1>Hello World aja</h1>
    `;
  }
}

export default AnotherPage;
