
app.controller('userController',function($scope,HTTPFactory){
  $scope.users = {};

  function getData() {
    console.log('get data function firing');
    HTTPFactory.getUsers().then(function(response) {

      $scope.users = response.data;
    });
  }
  getData();

  function postData(payload) {
    HTTPFactory.postUser(payload).then(function(response) {
      console.log(response.data);
      $scope.users.push(response.data);
    });
  }

  $scope.addUser = function() {
    var payload = {
      'username': $scope.username,
      'password': $scope.password
    };
    postData(payload);
    console.log(payload);
  };
});
