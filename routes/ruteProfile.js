// Generated by CoffeeScript 1.6.1
(function() {
  var admin, department, user;

  user = require('../controlers/userCtr');

  department = require('../controlers/departmentCtr');

  admin = require('../controlers/adminCtr');

  exports.createRutes = function(app) {
    app.get('/login', user.loginIndex);
    app.post('/login', user.login);
    app.post('/admin/createuser', user.createUser);
    app.post('/admin/removeuser', user.removeUser);
    app.get('/admin/getallusers', user.getAllUsers);
    app.get('/admin', admin.index);
    app.get('/admin/users', admin.usersIndex);
    app.post('/admin/createdepartment', department.createDepartment);
    app.get('/admin/alldepartments', department.getAllDepartments);
    app.post('/admin/removedepartment', department.removeDepartment);
    return app.post('/admin/updatedepartment', department.updateDepartment);
  };

}).call(this);
