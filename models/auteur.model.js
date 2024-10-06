import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

export const Auteur = sequelize.define('Auteur', {
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  biographie: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
});

Auteur.associate = (models) => {
  Auteur.hasMany(models.Livre, {
    foreignKey: 'auteurId',
    as: 'auteurs',
  });
};

export default Auteur;
