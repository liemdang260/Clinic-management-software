import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Employee } from "./employee.model"; // Import the Employee model (doctor)
import { Patient } from "./patient.model"; // Import the Patient model

export interface AppointmentAttributes {
  id: string; // Primary key for Appointment
  doctorId: string; // Foreign key to Employee (Doctor)
  timestamp: Date; // Appointment timestamp
  patientId: string; // Foreign key to Patient
  type: string; // Type of appointment (e.g., regular, follow-up)
  status: string; // Status of the appointment (e.g., scheduled, completed, cancelled)
  createdAt: Date; // Creation timestamp
  updatedAt: Date; // Update timestamp
}

export type AppointmentCreationAttributes = Omit<
  AppointmentAttributes,
  "id" | "createdAt" | "updatedAt"
>;

@Table({
  tableName: "appointments", // Table name for appointments
  timestamps: true,
})
export class Appointment extends Model<
  AppointmentAttributes,
  AppointmentCreationAttributes
> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id!: string; // Primary key for Appointment

  @ForeignKey(() => Employee) // Foreign key to Employee (Doctor)
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  doctorId!: string; // Foreign key to Employee (Doctor)

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  timestamp!: Date; // Appointment timestamp

  @ForeignKey(() => Patient) // Foreign key to Patient
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  patientId!: string; // Foreign key to Patient

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: string; // Type of appointment (e.g., regular, follow-up)

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string; // Status of the appointment (e.g., scheduled, completed, cancelled)
}
