export class WorkPosition {
  name: string;
  id: number;

  public static empty(): WorkPosition {
    return {name: '', id: null};
  }

  public toString(): string {
    return this.name;
  }
}
