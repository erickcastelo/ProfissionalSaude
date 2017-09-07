angular.module('starter')
  .service('ProfissionalSaudeService', function ($http, $httpParamSerializer, $ionicLoading, $window) {
      var url = 'http://192.168.1.109:8888/api/';
      //var token = 'Bearer' + 'u4qnlunMrSWqcyitTV06gH5C8ZlAaWar';
      return {
          salvarProfissionalSaude: function (profissionalSaude) {
              return $http({
                      method : 'post',
                      url : url + 'inserir',
                      data: $httpParamSerializer(profissionalSaude),
                      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function(event){
                        return event;
                    })
          },

          validaSenha: function (senha) {
              return $http({
                      method : 'post',
                      url : url + 'consulta/inserir',
                      data : $httpParamSerializer(senha),
                      headers : {
                        'Content-Type': 'application/x-www-form-urlencoded'
                        //'Authorization' : 'Bearer ' + $window.sessionStorage.accesstoken
                      }
                    }).then(function(event){
                      return event;
                    })
          },

          login: function (dados) {
              $ionicLoading.show({
                //template: 'Loading...',
              }).then(function (result) {
                console.log("The loading indicator is now displayed");
              });

              return $http({
                method : 'post',
                url : url + 'default/login',
                data : $httpParamSerializer(dados),
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
              }).then(function(event){
                return event;
              }).finally(function (error) {
                $ionicLoading.hide();
              })
          },

          consultas: function () {
              return $http({
                method : 'get',
                url : url + 'consulta/consultas',
                headers : {'Content-Type': 'application/x-www-form-urlencoded'}
              }).then(function (value) {
                return value;
              });
          },

          teste: function () {
              var teste = $window.sessionStorage.accesstoken;
             /*return $http({
                method : 'options',
                url : url + 'dashboard',
                headers : {
                  'Content-Type': 'application/json',
                  'Authorization': 'Bearer ' + teste
                }
              }).then(function(event){
                return event;
              })*/
            var config = {headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'X-Requested-With' : 'XMLHttpRequest'
            }
            };
              return $http.get(url + 'dashboard', config).success(function (data) {
                alert('ola');
              }).then(function (value) {
                return value;
              });
          }
      }
  });
