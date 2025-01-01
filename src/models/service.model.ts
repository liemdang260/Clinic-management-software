import { nanoid } from "nanoid";
import {
  BeforeCreate,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";

interface ServiceAttributes {
  id: string;
  name: string;
  fee: number;
}

@Table({
  tableName: "services", // Define the table name
  timestamps: true, // Enable createdAt and updatedAt fields
})
export class Service extends Model<ServiceAttributes> {
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  fee!: number;

  @BeforeCreate
  static generateId(instance: Service) {
    instance.id = nanoid(); // Assign a Nano ID
  }
}
