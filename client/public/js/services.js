app.factory('HTTPFactory', ['$http', function($http){
  var object = {};
  object.getUsers = function() {
    return $http.get('api/v1/users');
  };
   object.getUser = function(id) {
    return $http.get('api/v1/user'+id);
  };
  //post request
  object.postUser = function(payload){
    return $http.post('api/v1/users', payload);
  };

  object.deleteUser = function(id){
    return $http.delete('api/v1/user/'+id);
  };

  object.putUser = function(id){
    return $http.put('api/v1/user/'+id);
  };

  return object;
}]);
