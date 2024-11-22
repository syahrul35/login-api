const mongoose = require("mongoose");

const rolePermissionSchema = new mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true
    },
    feature: {
        type: String,
        required: true
    },
    permissions: {
        create: { type: Boolean, default: false },
        read: { type: Boolean, default: false },
        update: { type: Boolean, default: false },
        delete: { type: Boolean, default: false }
    }
});

module.exports = mongoose.model("RolePermission", rolePermissionSchema);
