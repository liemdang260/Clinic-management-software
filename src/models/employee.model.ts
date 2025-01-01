import { nanoid } from "nanoid";
import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasOne,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Account } from "./account.model";
import { Position } from "./position.model";

interface EmployeeAttributes {
  id: string;
  name: string;
  identityNumber: string;
  phone: string;
  gender: boolean;
  birthday: Date;
  address: string;
  position: string;
  startDate: Date;
  salary: number;
}

type EmployeeCreationAttributes = Omit<EmployeeAttributes, "id">;

@Table({
  tableName: "employees", // Define the table name
  timestamps: true, // Enable createdAt and updatedAt fields
})
export class Employee extends Model<
  EmployeeAttributes,
  EmployeeCreationAttributes
> {
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
    unique: true, // Ensure identity number is unique
  })
  identityNumber!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  gender!: boolean;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthday!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  startDate!: Date;

  @Column({
    type: DataType.DECIMAL(10, 2), // for salary with decimal precision
    allowNull: false,
  })
  salary!: number;

  @ForeignKey(() => Position) // Foreign key to Position
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  positionId!: string; // Foreign key to Position

  @BelongsTo(() => Position) // Employee belongs to one Position
  position!: Position;

  @BeforeCreate
  static generateId(instance: Employee) {
    instance.id = nanoid(); // Assign a Nano ID
  }
}
