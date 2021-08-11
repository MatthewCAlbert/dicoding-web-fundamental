import { setTitle } from "../utils/utils";

class Page404 {
  constructor() {}

  render() {
    setTitle("Not Found");

    return `
      404 Not Found
    `;
  }
}

export default Page404;
