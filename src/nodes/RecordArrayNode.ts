
import { TwsReader } from "../reader";
import { DataNode } from "./DataNode";
import { RecordEntryNode } from "./RecordEntryNode";

export class RecordArrayNode implements DataNode {
  public readonly name: string;
  public readonly size: number;
  public readonly version: number;
  public readonly typeCode: number;
  public readonly data: RecordEntryNode[];

  constructor(
    name: string,
    size: number,
    version: number,
    typeCode: number,
    data: RecordEntryNode[]
  ) {
    this.name = name;
    this.size = size;
    this.version = version;
    this.typeCode = typeCode;
    this.data = data;
  }

  static read(reader: TwsReader, typeCode: number) {
    const recordInfo = reader.readRecordInfo(typeCode);
    const size = reader.readSize();
    const itemCount = reader.readSize();
    const containedNodes = [];

    for (let i = 0; i < itemCount; i++) {
      const contained = RecordEntryNode.read(reader, typeCode, `${recordInfo.name} - ${i}`);
      containedNodes.push(contained);
    }

    return new RecordArrayNode(
      recordInfo.name,
      recordInfo.version,
      size,
      typeCode,
      containedNodes
    );
  }
}
