
import { TwsReader } from "../reader";
import { RecordNode } from "./RecordNode";

export class CompressedNode {
  public static readonly TAG_NAME = "COMPRESSED_DATA";
  public static readonly INFO_TAG = "COMPRESSED_DATA_INFO";

  static read(reader: TwsReader, compressedNode: RecordNode): RecordNode {
    const values = compressedNode.data;
    const data = values[0].data;
    const infoNode = values[1].data;
    const size = infoNode[0];
    const decodeProperties = infoNode[1].data;

    return reader.readCompressed(decodeProperties, data, size);
  }
}
