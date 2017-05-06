/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function () {
    var eHealth = angular.module('eHealth', []);

    eHealth.directive('toolbar', function () {
        return{restrict: 'E', templateUrl: 'partials/toolbar.html', controller: function () {
                this.tab = 0;
                this.selectTab = function (setTab) {
                    this.tab = setTab;
                };
                this.isSelected = function (tabParam) {
                    return this.tab === tabParam;
                };
            }, controllerAs: 'toolbar'};
    });

    eHealth.directive('patientInfo', function () {
        return{restrict: 'E', templateUrl: 'partials/patient-info.html', controller: 'getPacientes'};
    });
    
    eHealth.controller("getPacientes", function ($http, $scope) {
        $http.get('http://localhost:8080/pacientes/get').success(function (data, status, headers, config) {
            $scope.patients = data;
        }).error(function (data, status, headers, config) {
            //log error 
        });
    });
    
    eHealth.directive('patientForm', function () {
        return{restrict: 'E', templateUrl: 'partials/patient-form.html', controller: 'patientCtrl'};
    });
    
    eHealth.controller("patientCtrl", function ($http, $scope) {
        $scope.addPatient = function () {
            console.log('name');
            $http.post('http://localhost:8080/patients/add', JSON.stringify($scope.patient)).success(function (data, headers) {
                $scope.patient = {};
                $scope.toolbar.selectTab(2);
            });
        };
    });

})();