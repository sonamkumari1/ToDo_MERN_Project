const { Schema, model } = require('mongoose');

const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
}, { timestamps: true });

module.exports = model('Task', TaskSchema);
