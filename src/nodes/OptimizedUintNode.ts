
import { TwsReader } from "../reader";
import { TwsType } from "../TwsType";

export class OptimizedUintNode {

  constructor() {

  }

  // TODO: singleByteMin
  static read(reader: TwsReader, typeCode: number, singleByteMin: boolean = false) {
    switch (typeCode) {
      case TwsType.UINT32_ZERO:
        return 0;
      case TwsType.UINT32_ONE:
        return 1;
      case TwsType.UINT32_BYTE:
        return reader.readUint8();
      case TwsType.UINT32_SHORT:
        return reader.readUint16();
      case TwsType.UINT32_24BIT:
        return OptimizedUintNode.readUint24(reader);
      case TwsType.UINT32:
        return reader.readUint32();
      default:
        return;
    }
  }

  static readUint24(reader: TwsReader): number {
    let value = 0;
    for (let i = 0; i < 3; i++) {
      value = (value << 8) + reader.readUint8();
    }
    return value;
  }
}
