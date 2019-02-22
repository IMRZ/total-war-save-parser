
import { TwsReader } from "../reader";
import { TwsType } from "../TwsType";

export class OptimizedFloatNode {

  constructor() {

  }

  static read(reader: TwsReader, typeCode: number) {
    if (typeCode === TwsType.SINGLE_ZERO) {
      return 0;
    } else {
      return reader.readFloat32();
    }
  }
}
