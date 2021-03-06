app.config(['$validationProvider',function($validationProvider){
    var expression = {
        mobile: /^1[\d]{10}$/,
        password:function(value){
            var str = value + '';
            return str.length > 5;
        },
        required: function(value){
            return !!value;
        }
    };

    var defaultMsg = {
        mobile:{
            success:'',
            error:'必须是11位手机号'
        },
        password:{
            success:'',
            error:'密码长度至少6位'
        },
        required: {
            success: '',
            error: '不能为空'
        }
    };

    $validationProvider.setExpression(expression).setDefaultMsg(defaultMsg);
}]);
