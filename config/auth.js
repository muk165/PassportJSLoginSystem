module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
       // console.log(req.isAuthenticated());
        return next();
      }
      //console.log(req.isAuthenticated());
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      
      console.log(req.isAuthenticated());
      res.redirect('/dashboard');      
    }
  };
  