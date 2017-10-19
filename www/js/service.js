angular.module('starter')
  .service('ProfissionalSaudeService', function ($http, $httpParamSerializer, $ionicLoading, $window) {
      var url = 'http://192.168.43.240:8888/api/';
      //var token = 'Bearer' + 'u4qnlunMrSWqcyitTV06gH5C8ZlAaWar';
      return {
          salvarProfissionalSaude: function (profissionalSaude) {
            console.log(profissionalSaude);
              return $http({
                      method : 'post',
                      url : url + 'profissional-saude/inserir',
                      data: $httpParamSerializer(profissionalSaude),
                      headers : {'Content-Type': 'application/x-www-form-urlencoded'}
                    }).then(function(event){
                        return event;
                    })
          },

          validaSenha: function (senha) {
              return $http({
                      method : 'post',
                      url : url + 'consulta/criar',
                      data : $httpParamSerializer(senha),
                      headers : {
                        'Content-Type': 'application/x-www-form-urlencoded'
                      }
                    }).then(function(event){
                      return event;
                    })
          },

          login: function (dados) {
              $ionicLoading.show({
              }).then(function (result) {
                console.log("The loading indicator is now displayed");
              });

              return $http({
                method : 'post',
                url : url + 'profissional-saude/login',
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

          paises: function () {
            return $http({
              method : 'get',
              url : url + 'pais/paises',
              headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (value) {
              return value;
            });
          },

          profissoes: function () {
            return $http({
              method : 'get',
              url : url + 'profissao/profissoes',
              headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (value) {
              return value;
            });
          },

          examesLaboratoriais: function () {
            return $http({
              method : 'get',
              url : url + 'exame/exames-laboratorial',
              headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (value) {
              return value;
            });
          },

          solicitaExameLaboratorial: function (exames) {
            var codigo = {exames: exames};
            return $http({
              method : 'post',
              data : $httpParamSerializer(exames),
              url : url + 'exame/solicitar-exame',
              headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (value) {
              return value;
            });
          }
      }
  });