
const LZMA = require("lzma/src/lzma_worker.js");

import JDataView from "jdataview";
import { TwsType } from "../TwsType";
import {
  ArrayNode,
  RecordNode,
  RecordArrayNode,
  OptimizedBoolNode,
  OptimizedUintNode,
  OptimizedIntNode,
  OptimizedFloatNode,
  Coordinate2dNode,
  Coordinate3dNode,
  RecordInfo,
  TwsHeader
} from "../nodes";

const UTF8_DECODER = new TextDecoder("utf-8");
const UTF16_DECODER = new TextDecoder("utf-16");

export class TwsReader {
  public static readonly RECORD_BIT = 0x80; // 10000000
  public static readonly BLOCK_BIT = 0x40;  // 01000000
  public static readonly LONG_INFO = 0x20; // 00100000
  public static readonly HEADER_LENGTH = 16;

  public readonly dataView: JDataView;
  public readonly header: TwsHeader;
  public readonly nodeNames: string[];
  public readonly utf16Strings: string[];
  public readonly asciiStrings: string[];

  constructor(buffer: ArrayBuffer) {
    this.dataView = new JDataView(new Int8Array(buffer), 0, buffer.byteLength, true);

    this.header = TwsHeader.read(this);

    if (this.header.id !== 0xABCA) {
      throw new Error(`header.id '${this.header.id.toString(16)}' is not supported!`);
    }

    const stringValues = this.readStringArrays();
    this.nodeNames = stringValues.nodeNames;
    this.utf16Strings = stringValues.utf16Strings;
    this.asciiStrings = stringValues.asciiStrings;
  }

  public readAll(): any {
    const typeCode = this.readTypeCode();
    const rootNode = this.read(typeCode);

    return rootNode;
  }

  public readToOffset(targetOffset: number) {
    const result = [];

    while (this.position() < targetOffset) {
      const typeCode = this.readTypeCode();
      const node = this.read(typeCode);
      result.push(node);
    }

    return result;
  }

  public readRecordInfo(encoded: number = 0): RecordInfo {
    // root node (and only root node) is stored with long name/version info...
    if (this.position() === TwsReader.HEADER_LENGTH + 1 || (encoded & TwsReader.LONG_INFO) != 0) {
      const nameIndex = this.readUint16();
      const version = this.readUint8();
      return {
        name: this.getNodeName(nameIndex),
        version: version
      };
    } else {
      const version = (encoded & 31) >> 1;
      const nameIndex = ((encoded & 1) << 8) + this.readUint8();
      return {
        name: this.getNodeName(nameIndex),
        version: version,
      }
    }
  }

  private getNodeName(nameIndex: number): string {
    if (nameIndex > this.nodeNames.length) {
      throw new Error(`invalid node index: ${nameIndex}`);
    }
    return this.nodeNames[nameIndex];
  }

  public read(typeCode: number): any {
    const recordBit = (typeCode & TwsReader.RECORD_BIT);

    if (recordBit == 0 || this.position() === TwsReader.HEADER_LENGTH + 1) {
      switch (typeCode) {
        case TwsType.INT32_ZERO:
        case TwsType.INT32_BYTE:
        case TwsType.INT32_SHORT:
        case TwsType.INT32_24BIT:
        case TwsType.INT32:
          return OptimizedIntNode.read(this, typeCode);
        default:
          return this.readNode(typeCode);
      }
    } else {
      const blockBit = ((typeCode & TwsReader.BLOCK_BIT) != 0);
      if (blockBit) {
        return RecordArrayNode.read(this, typeCode);
      } else {
        return RecordNode.read(this, typeCode);
      }
    }
  }

  private readNode(typeCode: number): any {
    try {
      if (typeCode < TwsType.BOOL_ARRAY) {
        return this.readValueNode(typeCode);
      } else if (typeCode < TwsType.RECORD) {
        return ArrayNode.read(this, typeCode);
      } else if (typeCode === TwsType.RECORD) {
        return RecordNode.read(this, typeCode);
      } else if (typeCode === TwsType.RECORD_BLOCK) {
        throw new Error("decodeNode 'readRecordArrayNode' not implemented");
      } else {
        throw new Error(`Type code ${typeCode} at ${this.position() - 1} invalid`);
      }
    } catch (error) {
      console.error(`Exception at (${this.position()})`, typeCode, error);
      throw error;
    }
  }

  // TODO: make clear to not wrap array values, i.e. if array then raw else wrap valueNode in DataNode
  public readValueNode(typeCode: TwsType, optimize: boolean = true): any {
    switch (typeCode) {
      case TwsType.BOOL:
      case TwsType.BOOL_TRUE:
      case TwsType.BOOL_FALSE:
        if (optimize) {
          return OptimizedBoolNode.readValue(this, typeCode);
        } else {
          throw new Error("Not implmented: new BoolNode();");
        }
      case TwsType.INT8:
        return this.readInt8();
      case TwsType.INT16:
        return this.readInt16();
      case TwsType.UINT32:
      case TwsType.UINT32_ZERO:
      case TwsType.UINT32_ONE:
      case TwsType.UINT32_BYTE:
      case TwsType.UINT32_SHORT:
      case TwsType.UINT32_24BIT:
        if (optimize) {
          return OptimizedUintNode.read(this, typeCode);
        } else {
          throw new Error("Not implmented: new IntNode();");
        }
      case TwsType.INT64:
        return this.readInt64();
      case TwsType.UINT8:
        return this.readUint8();
      case TwsType.UINT16:
        return this.readUint16();
      case TwsType.UINT32:
      case TwsType.INT32:
      case TwsType.INT32_ZERO:
      case TwsType.INT32_BYTE:
      case TwsType.INT32_SHORT:
      case TwsType.INT32_24BIT:
        if (optimize) {
          return OptimizedIntNode.read(this, typeCode);
        } else {
          throw new Error("Not implmented: new IntNode();");
        }
      case TwsType.UINT64:
        return this.readUint64();
      case TwsType.SINGLE:
      case TwsType.SINGLE_ZERO:
        if (optimize) {
          return OptimizedFloatNode.read(this, typeCode);
        } else {
          throw new Error("Not implmented: new FloatNode();")
        }
      case TwsType.DOUBLE:
        throw new Error("Not implemented: SfType.DOUBLE");
      case TwsType.COORD2D:
        return Coordinate2dNode.read(this, typeCode);
      case TwsType.COORD3D:
        return Coordinate3dNode.read(this, typeCode);
      case TwsType.UTF16:
        return this.lookupString(this.utf16Strings);
      case TwsType.ASCII:
      case TwsType.ASCII_W21:
      case TwsType.ASCII_W25:
        return this.lookupString(this.asciiStrings);
      case TwsType.ANGLE:
        return this.readUint16();
      default:
        throw new Error(`Invalid type code ${typeCode.toString(16)}`);
    }
  }

  public readSize(): number {
    let read = this.readUint8();
    let result = 0;
    while((read & 0x80) != 0) {
      result = (result << 7) + (read & 0x7f);
      read = this.readUint8();
    }
    result = (result << 7) + (read & 0x7f);
    return result;
  }

  private lookupString(strings: string[]): string {
    const refId = this.readInt32();
    return strings[refId];
  }

  private readStringArrays(): any {
    const nodeNamesOffset = this.readUint32();
    const restorePosition = this.position();

    this.seek(nodeNamesOffset);

    const nodeNamesLength = this.readInt16();
    const nodeNames = new Array(nodeNamesLength).fill(null).map(() => this.readStringUtf8());

    const utf16Strings = this.readStringList(this.readStringUtf16.bind(this));
    const asciiStrings = this.readStringList(this.readStringUtf8.bind(this));

    this.seek(restorePosition);

    return {
      nodeNames,
      utf16Strings,
      asciiStrings
    };
  }

  private readStringList(readString: Function): string[] {
    const count = this.readInt32();
    const result = [];

    for (let i = 0; i < count; i++) {
      const str = readString();
      const ref = this.readUint32();
      result[ref] = str;
    }

    return result;
  }

  // TODO: minize exposure external dependencies
  public readInt8(): number { return this.dataView.getInt8(); }
  public readInt16(): number { return this.dataView.getInt16(); }
  public readInt32(): number { return this.dataView.getInt32(); }
  public readInt64(): number { return this.dataView.getInt64(); }
  public readUint8(): number { return this.dataView.getUint8(); }
  public readUint16(): number { return this.dataView.getUint16(); }
  public readUint32(): number { return this.dataView.getUint32(); }
  public readUint64(): number { return this.dataView.getUint64(); }
  public readFloat32(): number { return this.dataView.getFloat32(); }

  public readTypeCode(): number { return this.dataView.getUint8(); }
  public position(): number { return this.dataView.tell(); }
  public seek(offset: number): void { return this.dataView.seek(offset); }
  public readBytes(length: number): number[] { return this.dataView.getBytes(length); }

  public readStringUtf8(): string {
    const length = this.dataView.getUint16();
    const buffer = new Uint8Array(this.dataView.getBytes(length));
    return UTF8_DECODER.decode(buffer);
  }

  public readStringUtf16(): string {
    const length = this.dataView.getUint16();
    const buffer = new Uint8Array(this.dataView.getBytes(length * 2));
    return UTF16_DECODER.decode(buffer);
  }

  public readCompressed(properties: number[], data: number[], size: number): RecordNode {
    const sizeAsBytes = [
      size & 0xFF,
      (size >> 8) & 0xFF,
      (size >> 16) & 0xFF,
      (size >> 24) & 0xFF,
      0, 0, 0, 0
    ];

    const compressed = properties.concat(sizeAsBytes).concat(data);
    const bytes = LZMA.LZMA_WORKER.decompress(compressed);

    return new TwsReader(bytes).readAll();
  }
}
