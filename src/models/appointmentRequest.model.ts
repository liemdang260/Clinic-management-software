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

interface AppointmentRequestAttributes {
  id: string; // Primary key
  patientName: string; // Name of the patient
  identityNumber: string; // Patient's identity number
  phone: string; // Patient's phone number
  gender: boolean; // Patient's gender
  birthday: Date; // Patient's birthday
  address: string; // Patient's address
  doctorId: string; // Foreign key to Employee (Doctor)
  time: Date; // Time for the appointment
  status: string; // Status of the appointment request (e.g., pending, confirmed)
  patientId: string; // Foreign key to Patient
}

@Table({
  tableName: "appointment_requests", // Table name
  timestamps: true, // Enable createdAt and updatedAt fields
})
export class AppointmentRequest extends Model<AppointmentRequestAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  id!: string; // Primary key for AppointmentRequest

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  patientName!: string; // Name of the patient

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  identityNumber!: string; // Patient's identity number

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone!: string; // Patient's phone number

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  gender!: boolean; // Patient's gender (true or false)

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  birthday!: Date; // Patient's birthday

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  address!: string; // Patient's address

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
  time!: Date; // Appointment time

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  status!: string; // Status of the appointment request (e.g., pending, confirmed)

  @ForeignKey(() => Patient) // Foreign key to Patient
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  patientId!: string; // Foreign key to Patient
}
