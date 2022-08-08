import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'users', timestamps: false })
export class User extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  id?: number;

  @Column({ type: DataType.STRING })
  name: string;

  @Column({ unique: true, allowNull: true, type: DataType.STRING })
  email: string;

  @Column({ allowNull: false, type: DataType.STRING })
  password: string;
}
