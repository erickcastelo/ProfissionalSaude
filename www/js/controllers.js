angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal,
                                ProfissionalSaudeService, $ionicPopup, $state, $window, $location) {

  // Form data for the login modal
  $scope.loginData = {};

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {
      ProfissionalSaudeService.login($scope.loginData).then(function (value) {
        $window.sessionStorage.accesstoken = value.data.accesstoken;
        console.log($window.sessionStorage.accesstoken);
        $state.go('app.search');
      }).catch(function (error) {
        var erros = "";
        angular.forEach(error.data, function (erro) {
            erros = erro.message + " ; ";
        });
        $ionicPopup.alert({
          title: 'Erro!',
          template: 'O seguinte(s) erro(s) foi(ram) encontrado(s): ' + erros
        });
        console.log(error);
      });
  };

  $scope.closer = function () {
    delete $window.sessionStorage.accesstoken;
    $location.path('/tab.login').replace();
  }
})

.controller('PlaylistsCtrl', function($scope, ionicDatePicker,
                                      $ionicPopup, ProfissionalSaudeService) {
    $scope.profissionalSaude = {};
    $scope.dataSelecionada = "";

    $scope.cadastrar = function () {
        ProfissionalSaudeService.salvarProfissionalSaude($scope.profissionalSaude)
          .then(function (value) {
              $ionicPopup.alert({
                title: 'Sucesso!',
                template: 'Seu cadastro com efetuado com exito'
              });
              console.log(value);
          }, function (error) {
              console.log(error);
              $ionicPopup.alert({
                title: 'Erro!',
                template: 'Erro no servidor'
              });
          })
    };

    $scope.openDatePiker = function () {
        var configuracao = {
          callback: function (val) {  //Mandatory
            var dataSelecionada = new Date(val);
            var dataFormatada = ("0" + dataSelecionada.getDate()).substr(-2) + "/"  + ("0" + (dataSelecionada.getMonth() + 1)).substr(-2) + "/" + dataSelecionada.getFullYear();
            $scope.dataSelecionada = dataFormatada;
            $scope.profissionalSaude.dtNascimento = dataSelecionada;
          },
          closeLabel: 'Fechar',
          weeksList : ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'],
          monthsList: ["Jan", "Fev", "Março", "Abril", "Maio", "Junho", "Julho", "Agos",
            "Setem", "Outr", "Nov", "Dez"]
        };
        ionicDatePicker.openDatePicker(configuracao);
    }
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('ConsultaController', function($scope, $stateParams, $ionicPopup,
                                           ProfissionalSaudeService) {
    $scope.paciente = {};

    $scope.finalizarConsulta = function () {
      var myPopup = $ionicPopup.show({
        template: '<input type="password" ng-model="paciente.senha">',
        title: 'Entre com sua senha',
        subTitle: 'Por favor, para melhor segurança coloque sua senha',
        scope: $scope,
        buttons: [
          { text: 'Cancelar' },
          {
            text: '<b>OK</b>',
            type: 'button-positive',
            onTap: function(e) {
                ProfissionalSaudeService.validaSenha($scope.paciente).then(function (value) {
                  switch (value.data) {
                    case 0:
                      alert('Senha não Confere');
                      break;
                    case 1:
                      alert('Cpf Inválido');
                      break;
                    case 2:
                      alert('Consulta Realizada com sucesso!');
                      break;
                    case 3:
                      alert('Erro na hora de realizar a consulta');
                      break;
                    case 4:
                      alert('CPF inválido');
                      break;
                  }
                  console.log(value);

                }, function (error) {
                  console.log(error);
                });

            }
          }
        ]
      });
    };
})

.controller('ConsultaCtrl', function ($scope, $http, ProfissionalSaudeService) {

  $scope.consultas = [];

  ProfissionalSaudeService.consultas().then(function (value) {
      //$scope.consultas = value
    $scope.consultas = value.data;
  }, function (error) {
    console.log(error);
  });
});
