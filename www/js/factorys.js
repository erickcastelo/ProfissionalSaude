angular.module('starter')
  .factory('authInterceptor', function ($q, $window, $location) {
      return {
          request: function (config) {
              if ($window.sessionStorage.accesstoken){
                  config.headers.Authorization = 'Bearer ' + $window.sessionStorage.accesstoken;
                  //config.headers["Content-Type"] = 'application/x-www-form-urlencoded';
              }

              return config;
          },
          responseError : function (rejection) {
              if (rejection.status === 401){
                  $location.path('/tab.login').replace();
              }
              return $q.reject(rejection);
          }
      }
  });
