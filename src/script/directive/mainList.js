app.directive('mainList',['$http',function($http){
    return {
        restrict:'E',
        replace:true,
        templateUrl:"view/template/mainList.html",
        scope: {
            data: '=',
            filterObj: '=',
            isFavorite: '='
        },
        link: function($scope,$http){

            $scope.select = function(item,$event){

                // $http.post('data/favorite.json',{
                //     id: item.id,
                //     select: !item.select
                // }).then(function(res){
                //     console.log(res);
                //     item.select = !item.select;
                // },function(err){
                //     console.log(err)
                // });
                item.select = !item.select;
                $event.stopPropagation();
            };
        }
    };
}]);
