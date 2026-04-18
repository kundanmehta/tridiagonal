const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  label: { type: String, required: true },
  name: { type: String, required: true },
  type: { type: String, enum: ['text', 'email', 'tel', 'select', 'textarea', 'checkbox', 'number'], default: 'text' },
  required: { type: Boolean, default: false },
  placeholder: { type: String, default: '' },
  options: [{ type: String }], // For select dropdowns
  width: { type: String, enum: ['full', 'half'], default: 'full' }
}, { _id: true });

const DynamicFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  adminEmail: { type: String, default: '' },
  fields: [FieldSchema],
  submitButtonText: { type: String, default: 'Submit' },
  consentText: { type: String, default: '' },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

// Auto-generate slug from name
DynamicFormSchema.pre('validate', function() {
  if (this.name && !this.slug) {
    this.slug = this.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }
});

module.exports = mongoose.models.DynamicForm || mongoose.model('DynamicForm', DynamicFormSchema);
