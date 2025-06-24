import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

// Validation for user registration
export const validateRegister = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    phone: Joi.string().allow('', null),
    timeZone: Joi.string().allow('', null)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

// Validation for user login
export const validateLogin = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

// Validation for band creation
export const validateBand = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('', null),
    logoUrl: Joi.string().uri().allow('', null)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

// Validation for rehearsal creation
export const validateRehearsal = (req: Request, res: Response, next: NextFunction) => {
  const schema = Joi.object({
    bandId: Joi.string().uuid().required(),
    venueId: Joi.string().uuid().allow(null),
    title: Joi.string().required(),
    description: Joi.string().allow('', null),
    startTime: Joi.date().iso().required(),
    endTime: Joi.date().iso().greater(Joi.ref('startTime')).required(),
    recurringPattern: Joi.object().allow(null),
    setlistIds: Joi.array().items(Joi.string().uuid()).allow(null)
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};