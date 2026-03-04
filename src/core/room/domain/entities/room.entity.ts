export class Room {
  constructor(
    private readonly id: string | null,
    private readonly name: string,
    private readonly capacity: number,
    private readonly location: string,
    private readonly createdAt: Date,
  ) {}

  static create(data: {
    id: string | null;
    name: string;
    capacity: number;
    location: string;
    createdAt: Date;
  }) {
    return new Room(
      data.id,
      data.name,
      data.capacity,
      data.location,
      data.createdAt,
    );
  }
  get toPrimitives() {
    return {
      id: this.id,
      name: this.name,
      capacity: this.capacity,
      location: this.location,
      createdAt: this.createdAt,
    };
  }
}
