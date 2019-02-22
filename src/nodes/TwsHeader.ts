
import { TwsReader } from "../reader/TwsReader";

export class TwsHeader {
  public readonly id: number;
  private readonly unknown1: number;
  public readonly editTime: number;

  constructor(
    id: number,
    unknown1: number,
    editTime: number
  ) {
    this.id = id;
    this.unknown1 = unknown1;
    this.editTime = editTime;
  }

  static read(reader: TwsReader): TwsHeader {
    const id = reader.readUint32();
    const unknown1 = reader.readUint32();
    const editTime = reader.readUint32();

    return new TwsHeader(
      id,
      unknown1,
      editTime
    );
  }
}
