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
  noTelp: Number,
  poin: Number,
});

export default mongoose.models.Member || mongoose.model('Member', MemberSchema);