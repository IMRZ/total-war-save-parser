
import { TwsReader } from "../reader";
import { TwsType } from "../TwsType";
export class OptimizedIntNode {

  constructor() {

  }

  // TODO: singleByteMin
  static read(reader: TwsReader, typeCode: number, singleByteMin: boolean = false) {
    switch (typeCode) {
      case TwsType.INT32_ZERO:
        return 0;
      case TwsType.INT32_BYTE:
        return reader.readInt8();
      case TwsType.INT32_SHORT:
        return reader.readInt16();
      case TwsType.INT32_24BIT:
        return OptimizedIntNode.readInt24(reader);
      case TwsType.INT32:
        return reader.readInt32();
      default:
        return;
    }
  }

  static readInt24(reader: TwsReader): number {
    let value = reader.readUint8();
    const sign = (value & 0x80) != 0;
    value = value & 0x7f;
    for (let i = 0; i < 2; i++) {
      value = (value << 8) + reader.readUint8();
    }
    if (sign) {
      value = -value;
    }
    return value;
  }
}
