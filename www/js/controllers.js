angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal,
                                ProfissionalSaudeService, $ionicPopup, $state, $window,
                                $location, $rootScope) {

  // Form data for the login modal
  $scope.loginData = {};
  $scope.error = {};
  $scope.field = "";
  $scope.erro = false;

  $scope.pageCreate = false;
  $scope.pageEyes = true;
  $rootScope.imagePerfil = {};
  ProfissionalSaudeService.profissional()
    .then(function (value) {
      $rootScope.imagePerfil = value.data.foto;
    }, function (error) {
      console.log(error);
    });

  $scope.stade = function (stadePage) {
      if (stadePage === 'c'){
        $scope.pageCreate = false;
        $scope.pageEyes = true;
      }else{
        $scope.pageCreate = true;
        $scope.pageEyes = false;
      }
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function () {

      //se for 1 é Profissional de Saúde se for 2 é Paciente
      $scope.loginData.tipoPessoa = 1;
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
        $scope.erro = true;
        $scope.error = {};
        angular.forEach(error.data, function (erroItem) {
          $scope.error[erroItem.field] = erroItem.message;
        });
      });
  };

  $scope.closer = function () {
    delete $window.sessionStorage.accesstoken;
    $location.path('/tab.login').replace();
  }
})

.controller('PlaylistsCtrl', function($scope, ionicDatePicker,
                                      $ionicPopup, ProfissionalSaudeService, $state,
                                      $ionicHistory, $stateParams) {
    $scope.profissionalSaude = {};
    $scope.dataSelecionada = "";

    $scope.erro = false;
    $scope.field = "";
    $scope.message = "";
    $scope.error = {};
    $scope.paises = [];
    $scope.profissoes = [];
    $scope.fieldCpf = 0;

    //lista de países
    ProfissionalSaudeService.paises()
      .then(function (value) {
          $scope.paises = value.data;
      }, function (error) {
          console.log(error);
      });

    //lista de profissões
    ProfissionalSaudeService.profissoes()
      .then(function (value) {
        $scope.profissoes = value.data;
      }, function (error) {
        console.log(error);
      });

    if ($stateParams.id){
      $scope.fieldCpf = 1;
      ProfissionalSaudeService.profissional()
        .then(function (value) {
          $scope.profissionalSaude = value.data;
          $scope.profissionalSaude.fone = parseInt(value.data.fone);
          $scope.profissionalSaude.cpf = parseInt(value.data.cpf);
          $scope.profissionalSaude.registro = parseInt(value.data.registro);
          $scope.profissionalSaude.rg = parseInt(value.data.rg);
          $scope.profissionalSaude.confirmPassword = value.data.senha;
          $scope.dataSelecionada = parseInt(new Date(value.data.datanascimento));

          var data = new Date($scope.profissionalSaude.datanascimento);
          var dataFormatada = ("0" + (data.getDate()+1)).substr(-2) + "/"  + ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear();
          $scope.dataSelecionada = dataFormatada;
        }, function (error) {
          console.log(error);
        });
    }

    $scope.salvar = function () {
      if ($stateParams.id){
        ProfissionalSaudeService.alterar($scope.profissionalSaude)
          .then(function (value) {
            if (value.data){
              $ionicPopup.alert({
                title: 'Sucesso!',
                template: 'Alterado com Sucesso!'
              });

              $ionicHistory.nextViewOptions({
                disableBack: true
              });

              $scope.profissionalSaude = {};
              $state.go('app.configuracoes');
            }else{
              alert('Erro na hora de cadastrar');
            }
          }, function (error) {
            $ionicPopup.alert({
              title: 'Erro!',
              template: error.statusText === '' ? 'Erro no servidor' : error.statusText
            });
            console.log(error);
            $scope.erro = true;
            $scope.error = {};
            angular.forEach(error.data, function (erroItem) {
              $scope.error[erroItem.field] = erroItem.message;
            });
          })
      }else{
        var data = new Date();
        var cpf = $scope.profissionalSaude.cpf;
        $scope.profissionalSaude.numero = data.getFullYear() + "-" + cpf + "-PR";
        ProfissionalSaudeService.salvarProfissionalSaude($scope.profissionalSaude)
          .then(function (value) {
            $ionicPopup.alert({
              title: 'Sucesso!',
              template: 'Seu cadastro com efetuado com exito'
            });
            console.log(value);
            $scope.profissionalSaude = {};
            $scope.dataSelecionada = {};
            $scope.erro = false;

            $state.go('tab.login');
          }, function (error) {
            console.log(error);
            $ionicPopup.alert({
              title: 'Erro!',
              template: error.statusText === '' ? 'Erro no servidor' : error.statusText
            });

            $scope.erro = true;
            $scope.error = {};
            angular.forEach(error.data, function (erroItem) {
              $scope.error[erroItem.field] = erroItem.message;
            });
          })
      }
    };



    $scope.openDatePiker = function () {
        var configuracao = {
          callback: function (val) {  //Mandatory
            var dataSelecionada = new Date(val);
            var dataFormatada = ("0" + dataSelecionada.getDate()).substr(-2) + "/"  + ("0" + (dataSelecionada.getMonth() + 1)).substr(-2) + "/" + dataSelecionada.getFullYear();
            $scope.dataSelecionada = dataFormatada;
            $scope.profissionalSaude.datanascimento = dataSelecionada;
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
        template: '<input type="password" ng-model="paciente.senha" placeholder="senha"> <br>' +
        '<input type="text" ng-model="paciente.descricao" placeholder="descrição">',
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
              $scope.paciente = {};
            }
          }
        ]
      });
      $scope.paciente.senha = null;
      $scope.paciente.descricao = null;
    };

    $scope.efeitoLetra = function (estadoEfeito) {
      if (estadoEfeito === 'e')
          $scope.ativo = 'efeito-letra';
      else
          $scope.ativo = 'volta-letra';
    };
})

.controller('ConsultaCtrl', function ($scope, $http, ProfissionalSaudeService, $state, $ionicPopup) {

  $scope.consultas = [];
  $scope.myCheck = false;
  $scope.escondido = true;

  ProfissionalSaudeService.consultas().then(function (value) {
    $scope.consultas = value.data;
    console.log($scope.consultas);
    $scope.consultaVazia = $scope.consultas.length;
  }, function (error) {
    console.log(error);
  });

  $scope.verificaSolicitacao = function (situacao) {
    // if (situacao === 'p'){
    //   $ionicPopup.alert({
    //     title: 'Erro!',
    //     template: 'A situação da consulta se encontra pendente. ' +
    //     'O paciente precisa confirmar para liberar tal acesso.'
    //   });
    // }else {
    //   $scope.myCheck = true;
    //   $scope.escondido = false;
    // }
    $scope.myCheck = true;
      $scope.escondido = false;
  };

  $scope.marcaExame = function (tipo, consulta) {
      // var codigo = consulta.codigo;
      console.log(consulta);
      if (tipo === 'L'){
        $state.go('app.solicita-exame', {codigoConsulta: consulta.codigo});
      }
  }
})

.controller('ExameCtrl', function ($scope, $stateParams, ProfissionalSaudeService) {
    $scope.codigoConsulta = $stateParams.codigoConsulta;
    $scope.classificacaoExames = [];
    $scope.valueExames = [];
    $scope.values = [];

    ProfissionalSaudeService.examesLaboratoriais()
      .then(function (value) {
        $scope.exames = value.data;
        console.log($scope.exames);
      }, function (error) {
        console.log(error);
      });

    $scope.estadoCheckBox = function (checked, numeroExame) {
      if (checked){
        var data = new Date();
        var dataFormatada = ("0" + data.getDate()).substr(-2) + "/"  +
          ("0" + (data.getMonth() + 1)).substr(-2) + "/" + data.getFullYear() +
        " " + data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
        var exames = JSON.stringify([
          {
            numeroexamelaboratorial: numeroExame,
            codigoconsulta: $scope.codigoConsulta,
            datacriacao: dataFormatada
          }]);

        $scope.values.push(exames);
      }else{
        var index = $scope.values.indexOf(checked);
        $scope.values.splice(index, 1);
      }
    };

    $scope.solicitarExame = function () {
      var array = [];

      $scope.values.forEach(function (item) {
        var object = item.substring(1, item.length - 1);
        array.push(angular.fromJson(object));
      });

      ProfissionalSaudeService.solicitaExameLaboratorial(array)
        .then(function (value) {
          console.log(value);
        }, function (error) {

        });
    };
})

.controller('PacienteCtrl', function ($scope, ProfissionalSaudeService, NameApi) {

  $scope.pacientes = [];
  $scope.filtro = '';
  $scope.fotoApi = NameApi.getEnderecoImagem();

  ProfissionalSaudeService.pacientes()
    .then(function (value) {
      $scope.pacientes = value.data;
      console.log($scope.pacientes);
    }, function (error) {
      console.log(error);
    });
})

.controller('ConfiguracoesCtrl', function ($scope, $cordovaCamera, $ionicPopup,
                                           ProfissionalSaudeService, $rootScope) {

  $scope.abriImagens = function () {
    var tipo = '';
    var confirmPopup = $ionicPopup.confirm({
      title: 'Escolha uma das opções',
      template: 'Deseja acessar a câmera? (Se não acessará a galeria)'
    });

    confirmPopup.then(function(res) {
      if(res) {
        tipo = Camera.PictureSourceType.CAMERA;
      } else {
        tipo = Camera.PictureSourceType.SAVEDPHOTOALBUM;
      }
      var options = {
        quality: 80,
        destinationType: Camera.DestinationType.DATA_URL,
        sourceType: tipo,
        allowEdit: true,
        encodingType: Camera.EncodingType.JPEG,
        targetWidth: 100,
        targetHeight: 100,
        popoverOptions: CameraPopoverOptions,
        saveToPhotoAlbum: false,
        correctOrientation:true
      };

      $cordovaCamera.getPicture(options).then(function(imageData) {
        var image = "data:image/jpeg;base64," + imageData;
        ProfissionalSaudeService.salvarFoto(image)
          .then(function (value) {
            if (value.data !== null){
              $ionicPopup.alert({
                title: 'Sucesso!',
                template: 'Foto Atualizada!'
              });
              $rootScope.imagePerfil = value.data;
            }
          }, function (error) {
            $ionicPopup.alert({
              title: 'Erro!',
              template: 'O seguinte erro foi encontrado: ' + error
            });
          });
      }, function(err) {
        alert('Algo inesperado aconteceu');
      });

    });
  };
});

