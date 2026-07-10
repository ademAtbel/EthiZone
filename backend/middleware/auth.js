const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'secretkey123');
    req.user = verified;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

const verifySuperAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== 'super_admin') {
      return res.status(403).json({ message: 'Access Denied: Requires Super Admin Privileges' });
    }
    next();
  });
};

module.exports = { verifyToken, verifySuperAdmin };
