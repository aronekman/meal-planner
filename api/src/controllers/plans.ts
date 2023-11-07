import { RequestHandler } from 'express';

import Plan from '../models/Plan';
import { extractTime, verifyDatetime } from '../utils/timestring';

export const getPlan : RequestHandler = async (req, res) => {
  const queryDateValue = req.query.date;
  if (!queryDateValue) {
    return res.status(404).json({ error: 'Query not found' });
  }
  if ( typeof queryDateValue !== 'string' ) {
    return res.status(400).json({ error: 'Invalid date' });
  }
  const queryDate = new Date(parseInt(queryDateValue));
  if (!verifyDatetime(queryDate)) {
    return res.status(400).json({ error: 'Invalid date' });
  }
  const plan = await Plan.findOne({ user : req.user?._id, date : queryDate }).populate('meals.recipe');
  if (!plan) {
    const newPlan = await Plan.create({
      user : req.user?._id,
      date : queryDate,
      meals : []
    });
    return res.status(200).send(newPlan);
  }
  plan.meals.sort((meal1, meal2) => {
    return ((meal1.time_slot < meal2.time_slot) ? -1 : ((meal1.time_slot > meal2.time_slot) ? 1 : 0));
  });
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
  const queryDate = new Date(parseInt(queryDateValue));
  if (!verifyDatetime(queryDate)) {
    return res.status(400).json({ error: 'Invalid date' });
  }
  const updatedMeals = req.body.meals || [];
  for (let i = 0; i < updatedMeals.length; i ++) {
    const meal = updatedMeals[i];
    const mealTime = extractTime(meal.time_slot);
    if (!mealTime) {
      return res.status(400).json({ error : 'Invalid time' });
    }
    const dateTime = new Date(queryDate.valueOf());
    dateTime.setHours(mealTime.hour);
    dateTime.setMinutes(mealTime.minute);
    meal.time_slot = dateTime;
  }
  const updatedPlan = await Plan.findOneAndUpdate(
    { user : req.user?._id, date : queryDate },
    { user : req.user?._id,
      date : queryDate,
      ...req.body },
    { new: true }
  );
  res.status(201).send(updatedPlan);
};