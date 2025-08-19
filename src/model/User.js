// models/index.js
import mongoose from "mongoose";

// 1. User Schema
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    preference: {
        type: String,
        enum: ['veg', 'non-veg', 'vegan'],
        default: 'veg'
    },
    password: {
        type: String,
        required: true
    },
    verificationCode: {
        type: String
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    // Orders
    orders: [{
        items: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: 1
            },
            price: {
                type: Number,
                required: true
            },
            unit: {
                type: String,
                required: true
            }
        }],
        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },
        shippingAddress: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            zipCode: {
                type: String,
                required: true
            },
            country: {
                type: String,
                required: true
            }
        },
        paymentMethod: {
            type: String,
            required: true,
            enum: ['credit_card', 'debit_card', 'upi', 'net_banking', 'cash_on_delivery']
        },
        paymentStatus: {
            type: String,
            required: true,
            enum: ['pending', 'completed', 'failed'],
            default: 'pending'
        },
        orderStatus: {
            type: String,
            required: true,
            enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'],
            default: 'pending'
        },
        deliveryDate: Date,
        notes: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    // Product interactions
    viewedProducts: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        viewCount: {
            type: Number,
            default: 1
        },
        lastViewed: {
            type: Date,
            default: Date.now
        }
    }],
    purchasedProducts: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        purchaseCount: {
            type: Number,
            default: 1
        },
        lastPurchased: {
            type: Date,
            default: Date.now
        }
    }],
    favoriteCategories: [{
        category: {
            type: String,
            required: true
        },
        weight: {
            type: Number,
            default: 1
        }
    }],
    searchHistory: [{
        query: {
            type: String,
            required: true
        },
        timestamp: {
            type: Date,
            default: Date.now
        }
    }],
    cartHistory: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product'
        },
        addedToCart: {
            type: Date,
            default: Date.now
        }
    }],
    preferences: {
        priceRange: {
            min: Number,
            max: Number
        },
        preferredBrands: [String],
        dietaryRestrictions: [String],
        preferredDeliveryTime: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
