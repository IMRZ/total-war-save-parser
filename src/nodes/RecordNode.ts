
import { TwsReader } from "../reader";
import { CompressedNode } from "./CompressedNode";
import { BufferNode } from "./BufferNode";
import { DataNode } from "./DataNode";

export class RecordNode implements DataNode {
  public readonly typeCode: number;
  public readonly name: string;
  public readonly version: number;
  public readonly size: number;
  public readonly data: DataNode[];

  constructor(
    typeCode: number,
    name: string,
    version: number,
    size: number,
    data: DataNode[]
  ) {
    this.typeCode = typeCode;
    this.name = name;
    this.version = version;
    this.size = size;
    this.data = data;
  }

  static read(reader: TwsReader, typeCode: number): RecordNode {
    const recordInfo = reader.readRecordInfo(typeCode);

    try {
      const size =  reader.readSize();

      // TODO: can't read child with typeCode 0x23
      const data = (recordInfo.name === "MILITARY_FORCE_TYPE_MANAGER")
        ? [BufferNode.read(reader, typeCode, size)] // read whole node as bytes
        : reader.readToOffset(reader.position() + size); // continue

      const node = new RecordNode(
        typeCode,
        recordInfo.name,
        recordInfo.version,
        size,
        data
      );

      if (recordInfo.name === CompressedNode.TAG_NAME) {
        return CompressedNode.read(reader, node);
      }

      return node;
    } catch (e) {
      console.log("ERROR READING RECORD_NODE -> " + recordInfo.name);
      throw e;
    }
  }
}
