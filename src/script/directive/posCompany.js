app.directive('posCompany',[function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'view/template/posCompany.html',
        scope:{
            company: '='
        }
    };
}]);
