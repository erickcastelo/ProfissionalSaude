angular.module('starter')
  .service('NameApi', function ($http) {
    var ip = 'http://192.168.1.115:8888';
    var url = ip+'/api/';
    var urlFoto = ip + '/img/';

    return {
      getEnderecoApi: function () {
        return url;
      },
      getEnderecoImagem: function () {
        return urlFoto;
      }
    }
  });
