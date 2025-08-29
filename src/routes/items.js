import { Router } from 'express';
import Item from '../models/Item.js';

const router = Router();

// List all items
router.get('/', async (req, res, next) => {
  try {
    const items = await Item.find().sort({ createdAt: -1 });
    res.json(items);
  } catch (err) { next(err); }
});

// Get item by id
router.get('/:id', async (req, res, next) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ error: 'Item not found' });
    res.json(item);
  } catch (err) { next(err); }
});

// Create item
router.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const created = await Item.create({ name, description });
    res.status(201).json(created);
  } catch (err) { next(err); }
});

// Update item
router.put('/:id', async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const updated = await Item.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!updated) return res.status(404).json({ error: 'Item not found' });
    res.json(updated);
  } catch (err) { next(err); }
});

// Delete item
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Item not found' });
    res.json({ ok: true });
  } catch (err) { next(err); }
});

export default router;
