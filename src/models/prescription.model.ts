import { nanoid } from "nanoid";
import {
  BeforeCreate,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import { Employee } from "./employee.model"; // Import the Employee model

interface PrescriptionAttributes {
  id: string;
  doctorId: string; // Foreign key to Employee
}

type PrescriptionCreationAttributes = Omit<PrescriptionAttributes, "id">;

@Table({
  tableName: "prescriptions", // Define the table name
  timestamps: true, // Enable createdAt and updatedAt fields
})
export class Prescription extends Model<
  PrescriptionAttributes,
  PrescriptionCreationAttributes
> {
  @PrimaryKey
  @Column({
    type: DataType.STRING, // Use STRING for Nano ID
    allowNull: false,
  })
  id!: string; // Primary key field using Nano ID

  @ForeignKey(() => Employee) // Foreign key to Employee (doctor)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  doctorId!: string; // Foreign key to Employee

  @BelongsTo(() => Employee) // Prescription belongs to one Employee (doctor)
  doctor!: Employee;

  @BeforeCreate
  static generateId(instance: Prescription) {
    instance.id = nanoid(); // Assign a Nano ID
  }
}
