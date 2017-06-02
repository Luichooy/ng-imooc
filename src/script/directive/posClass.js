app.directive('posClass',[function(){
    return {
        restrict: 'E',
        replace: true,
        templateUrl: 'view/template/posClass.html',
        link: function($scope){
            $scope.showPositionList = function(index){
                $scope.isActive = index;

                $scope.positionList = $scope.company.positionClass[index].positionList;
            };

            //此时$scope对象中的company属性还没有建立起来，因此通过$watch来检测$scope.company。
            $scope.$watch('company',function(newVal,oldVal){
                console.log(newVal);
                if(newVal){
                    $scope.showPositionList(0);
                }
            });
        }
    };
}]);
