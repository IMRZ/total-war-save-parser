
import { TwsReader } from "../reader";

export class BufferNode {

  // TODO: wrap in BufferNode
  static read(reader: TwsReader, typeCode: number, size: number) {
    return reader.readBytes(size);
  }
}
