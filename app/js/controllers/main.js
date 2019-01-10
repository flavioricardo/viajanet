var app = angular.module('httpApp', []);

app.controller('httpController', function($scope, $http){
    $scope.obj = {};
    $scope.obj.data = [];

    $scope.hideAutocompleteOrigem = true;
    $scope.hideAutocompleteDestino = true;

    $http({
        method: 'GET',
        //url: 'sao.json'
        url: 'https://www.viajanet.com.br/resources/api/Autocomplete/sao',
    }).then(function successCallback(sao) {
        if (typeof sao.data == 'object') {
            if (sao.data.Locations.length > 0) {
                angular.forEach(sao.data.Locations, function(location) {
                    $scope.obj.data.push(location.Name);
                });
            }
        } else {
            var x2js = new X2JS();
            var response = x2js.xml_str2json(sao.data);

            angular.forEach(response.AutocompleteResponse.Locations, function(location) {
                angular.forEach(location, function(l) {
                    $scope.obj.data.push(l.Name);
                });
            });
        }
    }, function errorCallback(response) {
        console.log(response);
    });

    $scope.completeOrigem = function(string) {
        var output = [];
        if (string.length >= 3) {
            $scope.hideAutocompleteOrigem = false;
            angular.forEach($scope.obj.data , function(locationOrigem) {
                if (locationOrigem.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(locationOrigem);
                }
            });
        }
        $scope.filterOrigens = output;
    };

    $scope.completeDestino = function(string) {
        var output = [];
        if (string.length >= 3) {
            $scope.hideAutocompleteDestino = false;
            angular.forEach($scope.obj.data , function(locationDestino) {
                if (locationDestino.toLowerCase().indexOf(string.toLowerCase()) >= 0) {
                    output.push(locationDestino);
                }
            });
        }
        $scope.filterDestinos = output;
    };

    $scope.hideAutoOrigem = function(status) {
        $scope.hideAutocompleteOrigem = status;
    }

    $scope.hideAutoDestino = function(status) {
        $scope.hideAutocompleteDestino = status;
    }
});