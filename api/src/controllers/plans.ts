import { RequestHandler } from 'express';

import Plan from '../models/Plan';

export const getPlan : RequestHandler = async (req, res) => {
  const queryDateValue = req.query.date;
  if (!queryDateValue) {
    return res.status(404).json({ error: 'Query not found' });
  }
  if ( typeof queryDateValue !== 'string' ) {
    return res.status(400).json({ error: 'Invalid date' });
  }
  const queryDate = new Date(queryDateValue);
  const plan = await Plan.findOne({ user : req.user?._id, date : queryDate }).populate('meals.recipe');
  if (!plan) {
    const newPlan = await Plan.create({
      user : req.user?._id,
      date : queryDate,
      meals : []
    });
    return res.status(200).send(newPlan);
  }
  res.status(200).send(plan);
};

export const updatePlan : RequestHandler = async (req, res) => {
  const queryDateValue = req.query.date;
  if (!queryDateValue) {
    return res.status(404).json({ error: 'Query not found' });
  }
  if ( typeof queryDateValue !== 'string' ) {
    return res.status(400).json({ error: 'Invalid date' });
  }
  const queryDate = new Date(queryDateValue);
  const updatedPlan = await Plan.findOneAndUpdate(
    { user : req.user?._id, date : queryDate },
    { user : req.user?._id,
      date : queryDate,
      ...req.body },
    { new: true }
  );
  res.status(201).send(updatedPlan);
};