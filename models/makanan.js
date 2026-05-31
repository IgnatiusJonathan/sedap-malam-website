import mongoose from 'mongoose';

const MakananSchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  cash: {
    type: Number,
    required: true,
  },
  point: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Makanan  || mongoose.model('Makanan', MakananSchema);