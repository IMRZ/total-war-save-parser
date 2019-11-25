import { TwsReader } from "../reader";

export class Type26 {
  static read(reader: TwsReader) {
    const firstByte = reader.readUint8();

    if (firstByte === 16) {
      return reader.readBytes(16);
    } else if (firstByte === 8) {
      return reader.readBytes(8);
    } else {
      return reader.readBytes(7);
    }
  }
}
