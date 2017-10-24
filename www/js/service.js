angular.module('starter')
  .service('ProfissionalSaudeService', function ($http, $httpParamSerializer, $ionicLoading, $window, NameApi) {
      var url = NameApi.getEnderecoApi();
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
          },

          pacientes: function () {
            return $http({
              method : 'post',
              url : url + 'paciente/list-pacientes',
              headers : {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(function (value) {
              return value;
            });
          },

          salvarFoto: function (foto) {
            return $http({
              method : 'post',
              data : $httpParamSerializer({imagem: foto}),
              url : url + 'profissional-saude/salvar-foto',
              headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
              }
            }).then(function (value) {
              return value;
            });
          },

        profissional: function () {
          return $http({
            method : 'get',
            url : url + 'profissional-saude/get-profissional',
            headers : {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function (value) {
            return value;
          });
        },

        alterar: function (profissional) {
          return $http({
            method : 'post',
            data : $httpParamSerializer(profissional),
            url : url + 'profissional-saude/alterar',
            headers : {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }).then(function (value) {
            return value;
          });
        }
      }
  });
