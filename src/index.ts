
import { TwsReader } from "./reader";

export function read(buffer: ArrayBuffer, headerOnly = false) {
  const reader = new TwsReader(buffer, headerOnly);
  const rootNode = reader.readAll();
  return rootNode;
}
