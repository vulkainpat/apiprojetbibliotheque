import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

export const Livre = sequelize.define('Livre', {
  titre: {
    type: DataTypes.STRING,
  },
  auteurId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Auteurs',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  annee: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      isInt:true,
      min: 1900,
      max: new Date().getFullYear()
    }
  },
  genre: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
});

Livre.associate = (models) => {
  Livre.belongsTo(models.Auteur, {
    foreignKey: 'auteurId',
    as: 'auteur'
  });
};

export default Livre;
