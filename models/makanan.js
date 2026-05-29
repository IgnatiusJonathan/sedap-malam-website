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
  cash: {
    type: Int16Array,
    required: true,
  },
  point: {
    type: Int16Array,
    required: true,
  },
  stock: {
    type: Int16Array,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
});

export default mongoose.models.Item || mongoose.model('Makanan', MakananSchema);