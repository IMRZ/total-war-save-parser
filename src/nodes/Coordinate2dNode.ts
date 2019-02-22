
import { TwsReader } from "../reader";
import { DataNode } from "./DataNode";

export class Coordinate2dNode implements DataNode {
  public readonly typeCode: number;
  public readonly data: [number, number];

  constructor(
    typeCode: number,
    data: [number, number]
  ) {
    this.typeCode = typeCode;
    this.data = data;
  }

  static read(reader: TwsReader, typeCode: number): any {
    const data: [number, number] = [
      reader.readFloat32(),
      reader.readFloat32()
    ];

    return data;
  }
}
