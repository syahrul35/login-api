const RolePermission = require("../../pages/role/RolePermissionModel");

const checkPermission = (feature, action) => {
    return async (req, res, next) => {
        const { roleId } = req.user; // Assumes user role is attached to req.user
        
        try {
            const permission = await RolePermission.findOne({ role: roleId, feature });
            
            if (permission && permission.permissions[action]) {
                return next();
            } else {
                return res.status(403).json({ message: "Forbidden: You don't have the necessary permissions" });
            }
        } catch (error) {
            return res.status(500).json({ message: "Error checking permissions", error });
        }
    };
};

module.exports = checkPermission;