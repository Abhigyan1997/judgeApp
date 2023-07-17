const jwt=require('jsonwebtoken');

// Middleware for user authentication
const authenticate=(req, res, next) =>{
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  
    try {
      // Verify the JWT token
      const decodedToken = jwt.verify(token, 'secret_key');
      req.user = decodedToken;
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }

  module.exports={authenticate:authenticate}