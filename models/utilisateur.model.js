import { DataTypes } from 'sequelize';
import { sequelize } from '../config/config.js';

export const Utilisateur = sequelize.define('Utilisateur', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  motDePasse: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
     type: DataTypes.STRING,
    allowNull: false
  }

}, {
  timestamps: true,
});

export default Utilisateur;
