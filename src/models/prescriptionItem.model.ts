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
import { Prescription } from "./prescription.model"; // Import the Prescription model

interface PrescriptionItemAttributes {
  id: string;
  prescriptionId: string; // Foreign key to Prescription
  name: string;
  number: number;
  instruction: string;
}

type PrescriptionItemCreationAttributes = Omit<
  PrescriptionItemAttributes,
  "id"
>;

@Table({
  tableName: "prescription_items", // Define the table name
  timestamps: true, // Enable createdAt and updatedAt fields
})
export class PrescriptionItem extends Model<
  PrescriptionItemAttributes,
  PrescriptionItemCreationAttributes
> {
  @PrimaryKey
  @Column({
    type: DataType.STRING, // Use STRING for Nano ID
    allowNull: false,
  })
  id!: string; // Primary key field using Nano ID

  @ForeignKey(() => Prescription) // Foreign key to Prescription
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  prescriptionId!: string; // Foreign key to Prescription

  @BelongsTo(() => Prescription) // PrescriptionItem belongs to one Prescription
  prescription!: Prescription;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  number!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  instruction!: string;

  @BeforeCreate
  static generateId(instance: PrescriptionItem) {
    instance.id = nanoid(); // Assign a Nano ID
  }
}
