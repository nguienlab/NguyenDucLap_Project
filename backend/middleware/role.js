// Grant access to specific roles
exports.authorize = (...roles) => {
    return (req, res, next) => {
      if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({
          success: false,
          message: `User role '${req.user ? req.user.role : 'none'}' is not authorized to access this route`,
        });
      }
      next();
    };
  };
  
  // Grant access to user with specific permissions (for 'user' role)
  exports.checkPermission = (permission) => {
    return (req, res, next) => {
      // If user is admin, they can do anything
      if (req.user.role === 'admin') {
        return next();
      }
  
      // If user is a standard 'user', check their specific permissions
      if (req.user.role === 'user' && req.user.permissions[permission]) {
        return next();
      }
      
      return res.status(403).json({
          success: false,
          message: `User does not have the '${permission}' permission.`
      });
    }
  }
  