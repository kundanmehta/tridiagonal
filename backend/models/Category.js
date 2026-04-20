const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    resourceType: {
        type: String,
        enum: ['Blog', 'Case Study', 'Publication', 'Brochure'],
        required: true
    }
}, { timestamps: true });

// Ensure unique category names per resource type
CategorySchema.index({ slug: 1, resourceType: 1 }, { unique: true });

module.exports = mongoose.model('Category', CategorySchema);
