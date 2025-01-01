import { nanoid } from "nanoid";
import {
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  HasMany,
  BeforeCreate,
} from "sequelize-typescript";
import { Employee } from "./employee.model"; // Import Employee model

interface PositionAttributes {
  id: string;
  name: string;
  specialty: string;
}

@Table({
  tableName: "positions", // Define the table name
  timestamps: true, // Enable createdAt and updatedAt fields
})
export class Position extends Model<PositionAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.STRING, // Use STRING for Nano ID
    allowNull: false,
  })
  id!: string; // Primary key field using Nano ID

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  specialty!: string;

  @HasMany(() => Employee) // One Position has many Employees
  employees!: Employee[];

  // Before creating a new Position, generate a Nano ID for the primary key
  @BeforeCreate
  static generateId(instance: Position) {
    instance.id = nanoid(); // Assign a Nano ID
  }
}
