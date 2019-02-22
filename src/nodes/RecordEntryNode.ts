
import { TwsReader } from "../reader";
import { DataNode } from "./DataNode";

export class RecordEntryNode implements DataNode {
  public readonly typeCode: number;
  public readonly name: string;
  public readonly data: DataNode[];
  public readonly size: number;

  constructor(
    typeCode: number,
    name: string,
    data: any[],
    size: number
  ) {
    this.typeCode = typeCode;
    this.name = name;
    this.data = data;
    this.size = size;
  }

  static read(reader: TwsReader, typeCode: number, name: string) {
    const size = reader.readSize();
    const offset = reader.position() + size;

    try {
      const data = reader.readToOffset(offset);

      return new RecordEntryNode(
        typeCode,
        name,
        data,
        size
      );
    } catch (e) {
      console.log("ERROR READING RECORD_ENTRY_NODE -> " + name);
      throw e;
    }
  }
}
