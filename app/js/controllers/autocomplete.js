var myApp = angular.module("myApp", []);
myApp.controller("myWeatherContrl", function($scope, weatherService) {
  $scope.title = "Weather App";

  $scope.obj = {};
  $scope.obj.data = [];
  weatherService.getCities().then(function(response) {
    angular.forEach(response.data, function(state) {

      angular.forEach(state, function(city) {

        if (typeof city === "string") {
          $scope.obj.data .push(city);
        }
      });
    });

    console.log("Say Hi", $scope.data);
  })

  $scope.complete = function(string) {
    var output = [];
    if (string.length >= 3) {
      angular.forEach($scope.obj.data , function(city) {
        if (city.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
          output.push(city);
        }
      });
    }
    $scope.filterCity = output;
  };
  $scope.fillTextbox = function(string) {
    $scope.city = string;
    $scope.hidethis = true;
  };
});
myApp.service("weatherService", ['$http', '$q', function($http, $q) {
  return {
    getCities: function() {
      return $http.get('https://api.myjson.com/bins/pufq5');
    }
  };
}]);