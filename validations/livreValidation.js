import Joi from 'joi';

// Schéma pour validation POST (tous les champs sont requis)
const postSchema = Joi.object({
  titre: Joi.string().required().min(3).messages({
    'string.empty': 'Le titre est requis.',
    'any.required': 'Le champ "titre" est obligatoire.',
  }),
  email: Joi.string().email().required().messages({
    'string.empty': 'L\'email est requis.',
    'string.email': 'L\'email doit être valide.',
    'any.required': 'Le champ "email" est obligatoire.',
  }),
  annee: Joi.number().integer().min(1900).max(new Date().getFullYear()).messages({
    'number.base': 'L\'année doit être un nombre.',
    'number.integer': 'L\'année doit être un entier.',
    'number.min': 'L\'année doit être supérieure ou égale à 1900.',
    'number.max': `L'année ne peut pas être supérieure à ${new Date().getFullYear()}.`,
    'any.required': 'Le champ "année" est obligatoire.',
  }),
  password: Joi.string().min(8).required().messages({
    'string.empty': 'Le mot de passe est requis',
    'string.password': 'Le mot de passe doit être valide',
    'any.required': 'Le champ "password" est obligatoire.'
  })
});

// Schéma pour validation PUT (champs facultatifs mais validés s'ils sont présents)
const putSchema = Joi.object({
  titre: Joi.string().optional(),
  email: Joi.string().optional(),
  annee: Joi.integer().optional()
});

export const livreValidationSchema = (req, res, next) => {
  let schema;

  if (req.method === 'POST') {
    schema = postSchema;
  } else if (req.method === 'PUT') {
    schema = putSchema;
  }

  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    next();
  }
};
