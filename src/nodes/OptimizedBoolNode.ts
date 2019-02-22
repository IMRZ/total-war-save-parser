
import { TwsReader } from "../reader";
import { TwsType } from "../TwsType";
export class OptimizedBoolNode {

  public static readValue(reader: TwsReader, type: TwsType): boolean {
    switch (type) {
      case TwsType.BOOL:
        return !!reader.readUint8();
      case TwsType.BOOL_TRUE:
        return true;
      case TwsType.BOOL_FALSE:
        return false;
      default:
        throw Error("OptimizedBoolNode#readValue invalid type!");
    }
  }
}
