var app = angular.module('httpApp', []);

app.controller('httpController', function($scope, $http){
    $scope.obj = {};
    $scope.obj.data = [];

    $http({
        method: 'GET',
        url: 'https://www.viajanet.com.br/resources/api/Autocomplete/sao',
    }).then(function successCallback(sao) {
        if (typeof sao == 'object') {
            angular.forEach(sao.data.Locations, function(location) {
                $scope.obj.data.push(location.Name);
            });
        } else {
            $scope.completing = true;

            var x2js = new X2JS();
            var response = x2js.xml_str2json(sao.data);

            angular.forEach(response.AutocompleteResponse.Locations, function(location) {
                console.log(location);
            });
        }
    }, function errorCallback(response) {
        console.log(response);
    });

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