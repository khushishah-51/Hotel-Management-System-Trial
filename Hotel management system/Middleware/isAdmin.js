const isAdmin = (req, res, next) => {
    if (req.session && req.session.isAdmin) {
      // If session has isAdmin set to true, proceed to next middleware/route handler
      next();
    } else {
      // If not authenticated, redirect or send an error response
      res.status(403).send('Unauthorized');
    }
  };
  
  module.exports = isAdmin;
  