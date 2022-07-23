import ReactDOMServer from "react-dom/server";
import { App } from "./App";

import { myRandom } from "package";

export function render(url, context) {
  console.log("myRandom()", myRandom());
  return ReactDOMServer.renderToString(<App />);
}
