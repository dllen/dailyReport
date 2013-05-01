// Generated by CoffeeScript 1.6.1
(function() {
  var ShowReportsViewModel, init, validator;

  validator = new Validator();

  ShowReportsViewModel = function() {
    var self;
    self = this;
    self.reports = ko.observableArray([]);
    self.pageNum = ko.observableArray([1]);
    self.currentPage = ko.observable(1);
    self.test = ko.observable(1);
    return self;
  };

  init = function() {
    var NUMOFPAGE, data, getPageNum, gotoPage, reportvm;
    NUMOFPAGE = 4;
    reportvm = new ShowReportsViewModel();
    ko.applyBindings(reportvm);
    data = {
      page: 1,
      numOfPage: NUMOFPAGE
    };
    ReportModel.getReports(data, function(response) {
      return reportvm.reports(response.data);
    });
    getPageNum = function() {
      return ReportModel.getReportNum(function(response) {
        var pageNum, _i, _results;
        pageNum = Math.ceil(response.data / NUMOFPAGE);
        return reportvm.pageNum((function() {
          _results = [];
          for (var _i = 1; 1 <= pageNum ? _i <= pageNum : _i >= pageNum; 1 <= pageNum ? _i++ : _i--){ _results.push(_i); }
          return _results;
        }).apply(this));
      });
    };
    getPageNum();
    $("#reportList").on("click", "p.delete", function() {
      var reportId;
      reportId = $(this).attr("reportId");
      return ReportModel.deleteReport({
        reportId: reportId
      }, function(response) {
        var page, report, reports, _i, _len;
        reports = reportvm.reports();
        for (_i = 0, _len = reports.length; _i < _len; _i++) {
          report = reports[_i];
          if (report["id"] === reportId) {
            reportvm.reports.remove(report);
            if (reportvm.reports().length === 0 && reportvm.currentPage() > 1) {
              page = reportvm.currentPage() - 1;
              gotoPage(page);
            }
            getPageNum();
            return;
          }
        }
      });
    });
    $("div.pagination").on("click", "li a", function() {
      var page;
      page = $(this).text();
      page = parseInt(page);
      gotoPage(page);
      return false;
    });
    return gotoPage = function(page) {
      reportvm.currentPage(page);
      data = {
        page: page,
        numOfPage: NUMOFPAGE
      };
      return ReportModel.getReports(data, function(response) {
        return reportvm.reports(response.data);
      });
    };
  };

  init();

}).call(this);