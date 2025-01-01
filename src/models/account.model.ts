import { nanoid } from "nanoid";
import {
  BeforeCreate,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Employee } from "./employee.model";

interface AccountAttributes {
  id: string;
  username: string;
  password: string;
  isActive: boolean;
  role: string;
}

@Table({
  tableName: "employees", // Define the table name
  timestamps: true, // Enable createdAt and updatedAt fields
})
export class Account extends Model<AccountAttributes> {
  @PrimaryKey
  @Column({
    type: DataType.STRING, // Use STRING for Nano ID
    allowNull: false,
  })
  id!: string; // Primary key field using Nano ID

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true, // Ensure username is unique
  })
  username!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: true, // Default value for isActive
  })
  isActive!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role!: string;

  @ForeignKey(() => Employee) // Foreign key to Employee
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  employeeId!: string;

  @BelongsTo(() => Employee) // Account belongs to an Employee
  employee!: Employee;

  @BeforeCreate
  static generateId(instance: Account) {
    instance.id = nanoid(); // Assign a Nano ID
  }
}
