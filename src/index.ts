
import { TwsReader } from "./reader";

export function read(buffer: ArrayBuffer) {
  const reader = new TwsReader(buffer);
  const rootNode = reader.readAll();
  return rootNode;
}
