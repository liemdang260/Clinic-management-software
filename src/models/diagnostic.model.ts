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
import { Patient } from "./patient.model"; // Import the Patient model
import { Employee } from "./employee.model"; // Import the Employee model
import { Prescription } from "./prescription.model"; // Import the Prescription model

interface DiagnosticAttributes {
  id: string;
  patientId: string; // Foreign key to Patient
  doctorId: string; // Foreign key to Employee (doctor)
  symptom?: string;
  prescription?: string; // Foreign key to Prescription
  fee?: number;
  reExamination?: Date;
  note?: string;
  receptionist?: string; // Foreign key to Employee (receptionist)
  status?: string;
  bloodPressure?: number;
  pulse?: number;
  diagnostic?: string;
  temperature?: number;
  createdAt: Date;
  updatedAt: Date;
}

export type DiagnosticCreationAttributes = Omit<
  DiagnosticAttributes,
  "id" | "updatedAt"
>;

@Table({
  tableName: "diagnostics", // Define the table name
  timestamps: true, // Enable createdAt and updatedAt fields
})
export class Diagnostic extends Model<
  DiagnosticAttributes,
  DiagnosticCreationAttributes
> {
  @PrimaryKey
  @Column({
    type: DataType.STRING, // Use STRING for Nano ID
    allowNull: false,
  })
  id!: string; // Primary key field using Nano ID

  @ForeignKey(() => Patient) // Foreign key to Patient
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  patientId!: string; // Foreign key to Patient

  @BelongsTo(() => Patient)
  patient!: Patient;

  @ForeignKey(() => Employee) // Foreign key to Employee (doctor)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  doctorId!: string; // Foreign key to Employee (doctor)

  @BelongsTo(() => Employee)
  doctor!: Employee;

  @ForeignKey(() => Prescription) // Foreign key to Prescription
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  prescription!: string; // Foreign key to Prescription

  @BelongsTo(() => Prescription)
  prescriptionObj!: Prescription;

  @ForeignKey(() => Employee) // Foreign key to Employee (receptionist)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  receptionist!: string; // Foreign key to Employee (receptionist)

  @BelongsTo(() => Employee)
  receptionistObj!: Employee;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  symptom!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  fee!: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  reExamination!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  note!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  bloodPressure!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  pulse!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  diagnostic!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  temperature!: number;

  @BeforeCreate
  static generateId(instance: Diagnostic) {
    instance.id = nanoid(); // Assign a Nano ID
  }
}
