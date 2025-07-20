import { DataTypes, Model, Sequelize } from "sequelize";

export class Note extends Model {
  public id!: number;
  public title!: string;
  public content!: string;
  public createdAt!: Date;
}

export function initNoteModel(sequelize: Sequelize) {
  Note.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: "Note",
      tableName: "Notes",
      timestamps: false,
    }
  );
}
