const mongoose = require('mongoose');

const FormSubmissionSchema = new mongoose.Schema({
  formId: { type: mongoose.Schema.Types.ObjectId, ref: 'DynamicForm', required: true },
  formName: { type: String, default: '' },
  data: { type: mongoose.Schema.Types.Mixed, required: true }, // Stores all field values as key-value pairs
  status: { type: String, enum: ['New', 'Reviewed', 'Replied'], default: 'New' }
}, { timestamps: true });

module.exports = mongoose.models.FormSubmission || mongoose.model('FormSubmission', FormSubmissionSchema);
