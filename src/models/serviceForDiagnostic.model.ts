import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Diagnostic } from "./diagnostic.model"; // Import the Diagnostic model
import { Service } from "./service.model"; // Import the Service model

interface ServiceForDiagnosticAttributes {
  diagnosticId: string; // Foreign key to Diagnostic
  serviceId: string; // Foreign key to Service
}

@Table({
  tableName: "service_for_diagnostics", // Define the table name
  timestamps: true, // Enable createdAt and updatedAt fields
})
export class ServiceForDiagnostic extends Model<ServiceForDiagnosticAttributes> {
  @ForeignKey(() => Diagnostic) // Foreign key to Diagnostic
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  diagnosticId!: string; // Foreign key to Diagnostic

  @ForeignKey(() => Service) // Foreign key to Service
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  serviceId!: string; // Foreign key to Service
}
