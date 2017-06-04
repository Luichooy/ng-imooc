app.directive('searchTab',[function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'view/template/searchTab.html',
        scope: {
            list: '=',
            tabClick: '&'
        },
        link: function($scope){
            $scope.activeId = $scope.list[0].id;

            $scope.clickTab = function(tab){
                $scope.activeId = tab.id;
                $scope.tabClick(tab);
            }
        }
    };
}]);
