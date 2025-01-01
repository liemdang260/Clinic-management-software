import { nanoid } from "nanoid";
import {
  BeforeCreate,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

export interface PatientAttributes {
  id: string;
  name: string;
  identityNumber: string;
  phone: string;
  gender: boolean;
  birthday: Date;
  address: string;
  occupation?: string;
}

export type PatientCreationAttributes = Omit<PatientAttributes, "id">;
@Table({
  tableName: "patients", // Define the table name
  timestamps: true, // Enable createdAt and updatedAt fields
})
export class Patient extends Model<
  PatientAttributes,
  PatientCreationAttributes
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
    type: DataType.STRING,
    allowNull: false,
  })
  occupation!: string;

  @BeforeCreate
  static generateId(instance: Patient) {
    instance.id = nanoid(); // Assign a Nano ID
  }
}
