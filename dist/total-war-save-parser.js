(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('jdataview')) :
  typeof define === 'function' && define.amd ? define(['exports', 'jdataview'], factory) :
  (global = global || self, factory(global.sfparser = {}, global.JDataView));
}(this, function (exports, JDataView) { 'use strict';

  JDataView = JDataView && JDataView.hasOwnProperty('default') ? JDataView['default'] : JDataView;

  var TwsType;
  (function (TwsType) {
      TwsType[TwsType["INVALID"] = 0] = "INVALID";
      TwsType[TwsType["BOOL"] = 1] = "BOOL";
      TwsType[TwsType["INT8"] = 2] = "INT8";
      TwsType[TwsType["INT16"] = 3] = "INT16";
      TwsType[TwsType["INT32"] = 4] = "INT32";
      TwsType[TwsType["INT64"] = 5] = "INT64";
      TwsType[TwsType["UINT8"] = 6] = "UINT8";
      TwsType[TwsType["UINT16"] = 7] = "UINT16";
      TwsType[TwsType["UINT32"] = 8] = "UINT32";
      TwsType[TwsType["UINT64"] = 9] = "UINT64";
      TwsType[TwsType["SINGLE"] = 10] = "SINGLE";
      TwsType[TwsType["DOUBLE"] = 11] = "DOUBLE";
      TwsType[TwsType["COORD2D"] = 12] = "COORD2D";
      TwsType[TwsType["COORD3D"] = 13] = "COORD3D";
      TwsType[TwsType["UTF16"] = 14] = "UTF16";
      TwsType[TwsType["ASCII"] = 15] = "ASCII";
      TwsType[TwsType["ANGLE"] = 16] = "ANGLE";
      TwsType[TwsType["ASCII_W21"] = 33] = "ASCII_W21";
      TwsType[TwsType["ASCII_W25"] = 37] = "ASCII_W25";
      TwsType[TwsType["BOOL_ARRAY"] = 65] = "BOOL_ARRAY";
      TwsType[TwsType["INT8_ARRAY"] = 66] = "INT8_ARRAY";
      TwsType[TwsType["INT16_ARRAY"] = 67] = "INT16_ARRAY";
      TwsType[TwsType["INT32_ARRAY"] = 68] = "INT32_ARRAY";
      TwsType[TwsType["INT64_ARRAY"] = 69] = "INT64_ARRAY";
      TwsType[TwsType["UINT8_ARRAY"] = 70] = "UINT8_ARRAY";
      TwsType[TwsType["UINT16_ARRAY"] = 71] = "UINT16_ARRAY";
      TwsType[TwsType["UINT32_ARRAY"] = 72] = "UINT32_ARRAY";
      TwsType[TwsType["UINT64_ARRAY"] = 73] = "UINT64_ARRAY";
      TwsType[TwsType["SINGLE_ARRAY"] = 74] = "SINGLE_ARRAY";
      TwsType[TwsType["DOUBLE_ARRAY"] = 75] = "DOUBLE_ARRAY";
      TwsType[TwsType["COORD2D_ARRAY"] = 76] = "COORD2D_ARRAY";
      TwsType[TwsType["COORD3D_ARRAY"] = 77] = "COORD3D_ARRAY";
      TwsType[TwsType["UTF16_ARRAY"] = 78] = "UTF16_ARRAY";
      TwsType[TwsType["ASCII_ARRAY"] = 79] = "ASCII_ARRAY";
      TwsType[TwsType["ANGLE_ARRAY"] = 80] = "ANGLE_ARRAY";
      TwsType[TwsType["RECORD"] = 128] = "RECORD";
      TwsType[TwsType["RECORD_BLOCK"] = 129] = "RECORD_BLOCK";
      TwsType[TwsType["RECORD_BLOCK_ENTRY"] = -1] = "RECORD_BLOCK_ENTRY";
      TwsType[TwsType["BOOL_TRUE"] = 18] = "BOOL_TRUE";
      TwsType[TwsType["BOOL_FALSE"] = 19] = "BOOL_FALSE";
      TwsType[TwsType["UINT32_ZERO"] = 20] = "UINT32_ZERO";
      TwsType[TwsType["UINT32_ONE"] = 21] = "UINT32_ONE";
      TwsType[TwsType["UINT32_BYTE"] = 22] = "UINT32_BYTE";
      TwsType[TwsType["UINT32_SHORT"] = 23] = "UINT32_SHORT";
      TwsType[TwsType["UINT32_24BIT"] = 24] = "UINT32_24BIT";
      TwsType[TwsType["INT32_ZERO"] = 25] = "INT32_ZERO";
      TwsType[TwsType["INT32_BYTE"] = 26] = "INT32_BYTE";
      TwsType[TwsType["INT32_SHORT"] = 27] = "INT32_SHORT";
      TwsType[TwsType["INT32_24BIT"] = 28] = "INT32_24BIT";
      TwsType[TwsType["SINGLE_ZERO"] = 29] = "SINGLE_ZERO";
      TwsType[TwsType["BOOL_TRUE_ARRAY"] = 82] = "BOOL_TRUE_ARRAY";
      TwsType[TwsType["BOOL_FALSE_ARRAY"] = 83] = "BOOL_FALSE_ARRAY";
      TwsType[TwsType["UINT_ZERO_ARRAY"] = 84] = "UINT_ZERO_ARRAY";
      TwsType[TwsType["UINT_ONE_ARRAY"] = 85] = "UINT_ONE_ARRAY";
      TwsType[TwsType["UINT32_BYTE_ARRAY"] = 86] = "UINT32_BYTE_ARRAY";
      TwsType[TwsType["UINT32_SHORT_ARRAY"] = 87] = "UINT32_SHORT_ARRAY";
      TwsType[TwsType["UINT32_24BIT_ARRAY"] = 88] = "UINT32_24BIT_ARRAY";
      TwsType[TwsType["INT32_ZERO_ARRAY"] = 89] = "INT32_ZERO_ARRAY";
      TwsType[TwsType["INT32_BYTE_ARRAY"] = 90] = "INT32_BYTE_ARRAY";
      TwsType[TwsType["INT32_SHORT_ARRAY"] = 91] = "INT32_SHORT_ARRAY";
      TwsType[TwsType["INT32_24BIT_ARRAY"] = 92] = "INT32_24BIT_ARRAY";
      TwsType[TwsType["SINGLE_ZERO_ARRAY"] = 93] = "SINGLE_ZERO_ARRAY";
      TwsType[TwsType["LONG_RECORD"] = 160] = "LONG_RECORD";
      TwsType[TwsType["LONG_RECORD_BLOCK"] = 224] = "LONG_RECORD_BLOCK";
  })(TwsType || (TwsType = {}));

  // TODO: make clear to not wrap array entries
  // TODO: wrap result in ArrayNode, store typeCode, size etc.
  class ArrayNode {
      constructor(typeCode, size, data) {
          this.typeCode = typeCode;
          this.size = size;
          this.data = data;
      }
      static read(reader, typeCode) {
          switch (typeCode) {
              case TwsType.UINT32_BYTE_ARRAY:
              case TwsType.UINT32_SHORT_ARRAY:
              case TwsType.UINT32_24BIT_ARRAY:
              case TwsType.INT32_BYTE_ARRAY:
              case TwsType.INT32_SHORT_ARRAY:
              case TwsType.UINT8_ARRAY:
              case TwsType.UINT32_ARRAY:
              case TwsType.UINT64_ARRAY:
              case TwsType.ASCII_ARRAY:
              case TwsType.COORD2D_ARRAY:
              case TwsType.UINT16_ARRAY:
              case TwsType.INT8_ARRAY:
              case TwsType.SINGLE_ARRAY:
              case TwsType.BOOL_ARRAY:
              case TwsType.INT32_ARRAY:
                  return ArrayNode.readArray(reader, typeCode);
              case TwsType.INT16_ARRAY:
              case TwsType.INT64_ARRAY:
              case TwsType.DOUBLE_ARRAY:
              case TwsType.COORD3D_ARRAY:
              case TwsType.UTF16_ARRAY:
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
      static readArray(reader, typeCode) {
          const size = reader.readSize();
          const containedTypeCode = (typeCode - 0x40);
          const offset = reader.position();
          const elements = [];
          while (reader.position() < (offset + size)) {
              const node = reader.readValueNode(containedTypeCode);
              elements.push(node);
          }
          return new ArrayNode(typeCode, size, elements);
      }
  }

  class BufferNode {
      // TODO: wrap in BufferNode
      static read(reader, typeCode, size) {
          return reader.readBytes(size);
      }
  }

  class CompressedNode {
      static read(reader, compressedNode) {
          const values = compressedNode.data;
          const data = values[0].data;
          const infoNode = values[1].data;
          const size = infoNode[0];
          const decodeProperties = infoNode[1].data;
          return reader.readCompressed(decodeProperties, data, size);
      }
  }
  CompressedNode.TAG_NAME = "COMPRESSED_DATA";
  CompressedNode.INFO_TAG = "COMPRESSED_DATA_INFO";

  class Coordinate2dNode {
      constructor(typeCode, data) {
          this.typeCode = typeCode;
          this.data = data;
      }
      static read(reader, typeCode) {
          const data = [
              reader.readFloat32(),
              reader.readFloat32()
          ];
          return data;
      }
  }

  class Coordinate3dNode {
      constructor(typeCode, data) {
          this.typeCode = typeCode;
          this.data = data;
      }
      static read(reader, typeCode) {
          const data = [
              reader.readFloat32(),
              reader.readFloat32(),
              reader.readFloat32()
          ];
          return data;
      }
  }

  class OptimizedBoolNode {
      static readValue(reader, type) {
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

  class OptimizedFloatNode {
      constructor() {
      }
      static read(reader, typeCode) {
          if (typeCode === TwsType.SINGLE_ZERO) {
              return 0;
          }
          else {
              return reader.readFloat32();
          }
      }
  }

  class OptimizedIntNode {
      constructor() {
      }
      // TODO: singleByteMin
      static read(reader, typeCode, singleByteMin = false) {
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
      static readInt24(reader) {
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

  class OptimizedUintNode {
      constructor() {
      }
      // TODO: singleByteMin
      static read(reader, typeCode, singleByteMin = false) {
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
      static readUint24(reader) {
          let value = 0;
          for (let i = 0; i < 3; i++) {
              value = (value << 8) + reader.readUint8();
          }
          return value;
      }
  }

  class RecordEntryNode {
      constructor(typeCode, name, data, size) {
          this.typeCode = typeCode;
          this.name = name;
          this.data = data;
          this.size = size;
      }
      static read(reader, typeCode, name) {
          const size = reader.readSize();
          const offset = reader.position() + size;
          try {
              const data = reader.readToOffset(offset);
              return new RecordEntryNode(typeCode, name, data, size);
          }
          catch (e) {
              console.log("ERROR READING RECORD_ENTRY_NODE -> " + name);
              throw e;
          }
      }
  }

  class RecordArrayNode {
      constructor(name, size, version, typeCode, data) {
          this.name = name;
          this.size = size;
          this.version = version;
          this.typeCode = typeCode;
          this.data = data;
      }
      static read(reader, typeCode) {
          const recordInfo = reader.readRecordInfo(typeCode);
          const size = reader.readSize();
          const itemCount = reader.readSize();
          const containedNodes = [];
          for (let i = 0; i < itemCount; i++) {
              const contained = RecordEntryNode.read(reader, typeCode, `${recordInfo.name} - ${i}`);
              containedNodes.push(contained);
          }
          return new RecordArrayNode(recordInfo.name, recordInfo.version, size, typeCode, containedNodes);
      }
  }

  class RecordNode {
      constructor(typeCode, name, version, size, data) {
          this.typeCode = typeCode;
          this.name = name;
          this.version = version;
          this.size = size;
          this.data = data;
      }
      static read(reader, typeCode) {
          const recordInfo = reader.readRecordInfo(typeCode);
          try {
              const size = reader.readSize();
              // TODO: can't read child with typeCode 0x23
              const data = (recordInfo.name === "MILITARY_FORCE_TYPE_MANAGER")
                  ? [BufferNode.read(reader, typeCode, size)] // read whole node as bytes
                  : reader.readToOffset(reader.position() + size); // continue
              const node = new RecordNode(typeCode, recordInfo.name, recordInfo.version, size, data);
              if (recordInfo.name === CompressedNode.TAG_NAME) {
                  return CompressedNode.read(reader, node);
              }
              return node;
          }
          catch (e) {
              console.log("ERROR READING RECORD_NODE -> " + recordInfo.name);
              throw e;
          }
      }
  }

  class TwsHeader {
      constructor(id, unknown1, editTime) {
          this.id = id;
          this.unknown1 = unknown1;
          this.editTime = editTime;
      }
      static read(reader) {
          const id = reader.readUint32();
          const unknown1 = reader.readUint32();
          const editTime = reader.readUint32();
          return new TwsHeader(id, unknown1, editTime);
      }
  }

  const LZMA = require("lzma/src/lzma_worker.js");
  const UTF8_DECODER = new TextDecoder("utf-8");
  const UTF16_DECODER = new TextDecoder("utf-16");
  class TwsReader {
      constructor(buffer) {
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
      readAll() {
          const typeCode = this.readTypeCode();
          const rootNode = this.read(typeCode);
          return rootNode;
      }
      readToOffset(targetOffset) {
          const result = [];
          while (this.position() < targetOffset) {
              const typeCode = this.readTypeCode();
              const node = this.read(typeCode);
              result.push(node);
          }
          return result;
      }
      readRecordInfo(encoded = 0) {
          // root node (and only root node) is stored with long name/version info...
          if (this.position() === TwsReader.HEADER_LENGTH + 1 || (encoded & TwsReader.LONG_INFO) != 0) {
              const nameIndex = this.readUint16();
              const version = this.readUint8();
              return {
                  name: this.getNodeName(nameIndex),
                  version: version
              };
          }
          else {
              const version = (encoded & 31) >> 1;
              const nameIndex = ((encoded & 1) << 8) + this.readUint8();
              return {
                  name: this.getNodeName(nameIndex),
                  version: version,
              };
          }
      }
      getNodeName(nameIndex) {
          if (nameIndex > this.nodeNames.length) {
              throw new Error(`invalid node index: ${nameIndex}`);
          }
          return this.nodeNames[nameIndex];
      }
      read(typeCode) {
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
          }
          else {
              const blockBit = ((typeCode & TwsReader.BLOCK_BIT) != 0);
              if (blockBit) {
                  return RecordArrayNode.read(this, typeCode);
              }
              else {
                  return RecordNode.read(this, typeCode);
              }
          }
      }
      readNode(typeCode) {
          try {
              if (typeCode < TwsType.BOOL_ARRAY) {
                  return this.readValueNode(typeCode);
              }
              else if (typeCode < TwsType.RECORD) {
                  return ArrayNode.read(this, typeCode);
              }
              else if (typeCode === TwsType.RECORD) {
                  return RecordNode.read(this, typeCode);
              }
              else if (typeCode === TwsType.RECORD_BLOCK) {
                  throw new Error("decodeNode 'readRecordArrayNode' not implemented");
              }
              else {
                  throw new Error(`Type code ${typeCode} at ${this.position() - 1} invalid`);
              }
          }
          catch (error) {
              console.error(`Exception at (${this.position()})`, typeCode, error);
              throw error;
          }
      }
      // TODO: make clear to not wrap array values, i.e. if array then raw else wrap valueNode in DataNode
      readValueNode(typeCode, optimize = true) {
          switch (typeCode) {
              case TwsType.BOOL:
              case TwsType.BOOL_TRUE:
              case TwsType.BOOL_FALSE:
                  if (optimize) {
                      return OptimizedBoolNode.readValue(this, typeCode);
                  }
                  else {
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
                  }
                  else {
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
                  }
                  else {
                      throw new Error("Not implmented: new IntNode();");
                  }
              case TwsType.UINT64:
                  return this.readUint64();
              case TwsType.SINGLE:
              case TwsType.SINGLE_ZERO:
                  if (optimize) {
                      return OptimizedFloatNode.read(this, typeCode);
                  }
                  else {
                      throw new Error("Not implmented: new FloatNode();");
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
      readSize() {
          let read = this.readUint8();
          let result = 0;
          while ((read & 0x80) != 0) {
              result = (result << 7) + (read & 0x7f);
              read = this.readUint8();
          }
          result = (result << 7) + (read & 0x7f);
          return result;
      }
      lookupString(strings) {
          const refId = this.readInt32();
          return strings[refId];
      }
      readStringArrays() {
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
      readStringList(readString) {
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
      readInt8() { return this.dataView.getInt8(); }
      readInt16() { return this.dataView.getInt16(); }
      readInt32() { return this.dataView.getInt32(); }
      readInt64() { return this.dataView.getInt64(); }
      readUint8() { return this.dataView.getUint8(); }
      readUint16() { return this.dataView.getUint16(); }
      readUint32() { return this.dataView.getUint32(); }
      readUint64() { return this.dataView.getUint64(); }
      readFloat32() { return this.dataView.getFloat32(); }
      readTypeCode() { return this.dataView.getUint8(); }
      position() { return this.dataView.tell(); }
      seek(offset) { return this.dataView.seek(offset); }
      readBytes(length) { return this.dataView.getBytes(length); }
      readStringUtf8() {
          const length = this.dataView.getUint16();
          const buffer = new Uint8Array(this.dataView.getBytes(length));
          return UTF8_DECODER.decode(buffer);
      }
      readStringUtf16() {
          const length = this.dataView.getUint16();
          const buffer = new Uint8Array(this.dataView.getBytes(length * 2));
          return UTF16_DECODER.decode(buffer);
      }
      readCompressed(properties, data, size) {
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
  TwsReader.RECORD_BIT = 0x80; // 10000000
  TwsReader.BLOCK_BIT = 0x40; // 01000000
  TwsReader.LONG_INFO = 0x20; // 00100000
  TwsReader.HEADER_LENGTH = 16;

  function read(buffer) {
      const reader = new TwsReader(buffer);
      const rootNode = reader.readAll();
      return rootNode;
  }

  exports.read = read;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
