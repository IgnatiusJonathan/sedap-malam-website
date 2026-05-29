import mongoose from 'mongoose';

const PesananSchema = new mongoose.Schema({
  sumber: {
    type: String,
    required: true,
  },
  pesanan: {
    type: Array,
    required: true,
  },
  total: {
    type: Int16Array,
    required: true,
  },
  gambar: {
    type: String,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  }
});

export default mongoose.models.Item || mongoose.model('Pesanan', PesananSchema);