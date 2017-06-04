app.directive('sheet',[function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'view/template/sheet.html',
        scope: {
            data: '=',
            visible: '=',
            select: '&'
        },
        link: function($scope){
            $scope.hideSheet = function(){
                $scope.visible = false;
            };
        }
    };
}]);
