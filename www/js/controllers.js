angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
})

.controller('Palpites', function($scope, $http, $state) {
    $http.post('http://localhost/penca/public/mobile/cellogin/?', { us: "mdymen", pass: "3345531" })
.success(function (data) {
    $scope.time = data;
});

    $http.get('http://localhost/penca/public/mobile/celproximojogos/?')
    .success(function (data) {
        console.log(data);
        $scope.palpites = data;
    });

    $http.get('http://localhost/penca/public/mobile/cellgetcampeonatos/?')
        .success(function (data) {
            console.log("campeonatos");
            console.log(data);
            $scope.campeonatos = data;
        });

    $scope.setPalpite = function (p) {

        $state.go('app.detail', {
            mt_id: p.mt_id, tm1_logo: p.tm1_logo, tm2_logo: p.tm2_logo, t1nome: p.t1nome, t2nome: p.t2nome,
            ch_id: p.ch_id, ch_nome: p.ch_nome, mt_acumulado: p.mt_acumulado, mt_date: p.mt_date,
            mt_idround: p.mt_idround, mt_idteam1: p.mt_idteam1, mt_idteam2: p.mt_idteam2, mt_round: p.mt_round
        });
        console.log(p);

    };

    $scope.meuspalpitescampeonato = function (opcao) {
        $http.post('http://localhost/penca/public/mobile/cellbolao', {champ : opcao, rodada: '', team:''})
            .success(function (data) {
                console.log(data);
                $scope.rounds = data.rondas;
                //$scope.teams = data.teams;
                //console.log($scope.teams);
            });
    }
})

.controller('CadastroCtrl', function ($scope, $http) {

    $scope.cadastro = function () { 
        $http.post('http://localhost/penca/public/mobile/celcadastro/?', { username: $scope.user.usuario, password: $scope.user.senha, email: $scope.user.email })
            .success(function (data) {
                console.log(data);
            });
    }
})

.controller('LoginCtrl', function ($scope, $http, $state) {
    $state.go('app.list');
    $scope.login = function () {
        $http.post('http://localhost/penca/public/mobile/celloginhash/?', { us: $scope.login.usuario, pass: $scope.login.senha })
            .success(function (data) {

                 console.log(data);
                 $state.go('app.list');
         });

    }

})

.controller('JogoCtrl', function ($scope, $http, $stateParams, $state) {
    $scope.t1nome = $stateParams.t1nome;
    $scope.t2nome = $stateParams.t2nome;
    $scope.tm1_logo = $stateParams.tm1_logo;
    $scope.tm2_logo = $stateParams.tm2_logo;
    $scope.ch_nome = $stateParams.ch_nome;
    $scope.mt_date = $stateParams.mt_date;
    $scope.mt_id = $stateParams.mt_id;
    $scope.mt_idround = $stateParams.mt_idround;
    $scope.ch_id = $stateParams.ch_id;

    $scope.realizar_palpite = function (palpite, mt_id, mt_idround, ch_id) {
        $http.post('http://localhost/penca/public/mobile/cellsubmeterpalpite/?', { result1: palpite.rs_res1, result2: palpite.rs_res2, match: mt_id, round: mt_idround, champ: ch_id })
            .success(function (data) {
                $state.go('app.list');
       });
    }
})