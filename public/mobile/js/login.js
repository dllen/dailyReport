// Generated by CoffeeScript 1.6.1
(function() {
  var LoginViewModel;

  LoginViewModel = function() {
    var self;
    self = this;
    self.userName = ko.observable('');
    self.password = ko.observable('');
    self.validUserName = ko.computed(function() {
      var un;
      un = $.trim(self.userName());
      return un.length >= 2 && un.length <= 25;
    });
    self.validPassword = ko.computed(function() {
      var pw;
      pw = $.trim(self.password());
      return pw.length >= 7 && pw.length <= 25;
    });
    self.errorTip = ko.observable('');
    self.getErrorTip = function() {
      if (!self.validUserName()) {
        return self.errorTip("用户名长度为2-25个字符");
      }
      if (!self.validPassword()) {
        return self.errorTip("密码长度为7-25个字符");
      }
      return self.errorTip("");
    };
    self.valid = ko.computed(function() {
      return self.validUserName() && self.validPassword();
    });
    self.submit = function() {
      var data, result;
      if (self.valid()) {
        data = {
          userName: $.trim(self.userName()),
          password: $.trim(self.password())
        };
        return Model.login(data, function(response) {
          if (response.state === 0) {
            return;
          }
          if (response.data === 0) {
            self.errorTip(response.message);
            $.mobile.changePage("#errorPage", {
              role: "dialog"
            });
          }
          if (response.data === 1) {
            return $.mobile.changePage("write");
          }
        });
      } else {
        if (!self.validUserName()) {
          return result = "用户名长度为2-25个字符";
        }
        if (!self.validPassword()) {
          return result = "密码长度为7-25个字符";
        }
        return $.mobile.changePage("#errorPage", {
          role: "dialog"
        });
      }
    };
    return self;
  };

  ko.applyBindings(new LoginViewModel());

}).call(this);