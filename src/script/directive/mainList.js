app.directive('mainList',function(){
    return {
        restrict:'E',
        replace:true,
        templateUrl:"view/template/mainList.html",
        scope: {
            data: '=',
            filterObj: '='
        }
    };
});
