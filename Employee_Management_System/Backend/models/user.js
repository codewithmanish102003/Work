const mongoose = require('mongoose');

if (!mongoose.models.User) {
  // Define Task Schema
  const TaskSchema = new mongoose.Schema({
    active: { type: Boolean, default: false },
    newTask: { type: Boolean, default: false },
    completed: { type: Boolean, default: false },
    failed: { type: Boolean, default: false },
    taskTitle: { type: String, required: true },
    taskDescription: { type: String, required: true },
    taskDate: { type: Date, required: true },
    category: { type: String, required: true },
  });

  // Define Task Counts Schema
  const TaskCountsSchema = new mongoose.Schema({
    active: { type: Number, default: 0 },
    newTask: { type: Number, default: 0 },
    completed: { type: Number, default: 0 },
    failed: { type: Number, default: 0 }
  });

  // Define User Schema
  const UserSchema = new mongoose.Schema({
    otp: { type: String },
    otpExpires: { type: Date },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstname: { type: String, required: true },
    role: { type: String, enum: ['admin', 'employee'], required: true }, // Add role field
    tasks: [TaskSchema],
    taskCounts: TaskCountsSchema
  });

  mongoose.model('User', UserSchema);
}

module.exports = mongoose.model('User');