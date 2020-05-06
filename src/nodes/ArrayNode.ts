
import { TwsReader } from "../reader";
import { TwsType } from "../TwsType";
import { DataNode } from "./DataNode";

// TODO: make clear to not wrap array entries
// TODO: wrap result in ArrayNode, store typeCode, size etc.
export class ArrayNode implements DataNode {
  public readonly typeCode: number;
  public readonly size: number;
  public readonly data: DataNode[];

  constructor(
    typeCode: number,
    size: number,
    data: DataNode[]
  ) {
    this.typeCode = typeCode;
    this.size = size;
    this.data = data;
  }

  static read(reader: TwsReader, typeCode: number): DataNode {
    switch (typeCode) {
      case TwsType.UINT32_BYTE_ARRAY:
      case TwsType.UINT32_SHORT_ARRAY:
      case TwsType.UINT32_24BIT_ARRAY:
      case TwsType.INT32_24BIT_ARRAY:
      case TwsType.INT32_BYTE_ARRAY:
      case TwsType.INT32_SHORT_ARRAY:
      case TwsType.UINT8_ARRAY:
      case TwsType.UINT32_ARRAY:
      case TwsType.UINT64_ARRAY:
      case TwsType.ASCII_ARRAY:
      case TwsType.UTF16_ARRAY:
      case TwsType.COORD2D_ARRAY:
      case TwsType.UINT16_ARRAY:
      case TwsType.INT8_ARRAY:
      case TwsType.SINGLE_ARRAY:
      case TwsType.BOOL_ARRAY:
      case TwsType.INT32_ARRAY:
      case TwsType.COORD3D_ARRAY:
        return ArrayNode.readArray(reader, typeCode);

      case TwsType.INT16_ARRAY:
      case TwsType.INT64_ARRAY:
      case TwsType.DOUBLE_ARRAY:
      case TwsType.ANGLE_ARRAY:
        // i.e. untested, need a savefile to test
        throw new Error(`Array type - Not implemented: ${typeCode}`);

      case TwsType.BOOL_TRUE_ARRAY:
      case TwsType.BOOL_FALSE_ARRAY:
      case TwsType.UINT_ZERO_ARRAY:
      case TwsType.UINT_ONE_ARRAY:
      case TwsType.INT32_ZERO_ARRAY:
      case TwsType.SINGLE_ZERO_ARRAY:
        // trying to read this should result in an infinite loop
        throw new Error(`Array ${typeCode.toString(16)} of zero-byte entries makes no sense`);
      default:
        throw new Error(`Unknown array type code ${typeCode}`);
    }
  }

  private static readArray(reader: TwsReader, typeCode: number): DataNode {
    const size = reader.readSize();
    const containedTypeCode = (typeCode - 0x40);
    const offset = reader.position();

    const elements = [];

    while (reader.position() < (offset + size)) {
      const node = reader.readValueNode(containedTypeCode);
      elements.push(node);
    }

    return new ArrayNode(
      typeCode,
      size,
      elements
    )
  }
}
