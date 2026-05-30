import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  noTelp: Int16Array,
  poin: String,
});

export default mongoose.models.Item || mongoose.model('Member', MemberSchema);