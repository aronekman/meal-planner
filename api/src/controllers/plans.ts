import { RequestHandler } from 'express';

import Plan from '../models/Plan.js';
import { verifyDatetime } from '../utils/timestring.js';

export const getPlan: RequestHandler = async (req, res) => {
  const queryDateValue = req.query.date;
  if (!queryDateValue) {
    return res.status(404).json({ error: 'Query not found' });
  }
  if (typeof queryDateValue !== 'string') {
    return res.status(400).json({ error: 'Invalid date' });
  }
  const queryDate = new Date(queryDateValue);
  if (!verifyDatetime(queryDate)) {
    return res.status(400).json({ error: 'Invalid date' });
  }
  const plan = await Plan.findOne({ user: req.user?._id, date: queryDate }).populate('meals.recipe');
  if (!plan) {
    const newPlan = await Plan.create({
      user: req.user?._id,
      date: queryDate,
      meals: []
    });
    return res.status(200).send(newPlan);
  }
  plan.meals.sort((meal1, meal2) => {
    return meal1.time_slot < meal2.time_slot ? -1 : meal1.time_slot > meal2.time_slot ? 1 : 0;
  });
  res.status(200).send(plan);
};

export const addMeal: RequestHandler = async (req, res) => {
  const id = req.query.id;
  if (!id) {
    return res.sendStatus(400);
  }
  try {
    const plan = await Plan.findOneAndUpdate(
      { _id: id },
      { $push: { meals: req.body.meal } },
      { sort: { 'meals.time_slot': -1 }, new: true }
    );
    if (!plan) return res.status(404).send('Plan not found');
    await plan.populate('meals.recipe');

    return res.status(201).send(plan);
  } catch (e) {
    return res.status(400).send(String(e));
  }
};

export const deleteMeal: RequestHandler = async (req, res) => {
  const planId = req.query.planId;
  const mealId = req.query.mealId;
  if (!planId || !mealId) return res.sendStatus(400);
  try {
    const plan = await Plan.findOneAndUpdate(
      { _id: planId },
      { $pull: { meals: { _id: mealId } } },
      { sort: { 'meals.time_slot': -1 }, new: true }
    );
    if (!plan) return res.status(404).send('Plan not found');
    await plan.populate('meals.recipe');

    return res.status(201).send(plan);
  } catch (e) {
    return res.status(400).send(String(e));
  }
};
