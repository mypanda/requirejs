### requireJS

### 作用
* 模块化编程，使用就调用
* 异步加载不影响页面加载

### guide

* 加载requrejs文件，和配置文件

```
第一
<script data-main="main" src="require.js"></script>

第二种
<script src="require.js"></script>
<script src="main.js"></script>

```

* 配置文件

```

require.config({
    // 根路径,新版本可以不写后面的斜线
    baseUrl:'lib'
    paths:{
        'jquery':'jquery.min',
        'angular':'angular.min'
    }
})

```

* 定义标准模块

```
app/util.js

define([],function(){
    return {
        show:function(){
            alert('define show methods')
        },
        message:function(){
            alert('message')
        }
    }
})

使用
<script>
    // 写路径
    require(['../app/util'],function(util){
        util.show()
    })
</script>

```
```

依赖jquery
app/util.js 第一种
define(['jquery'],function($){
    return {
        change:function(){
            $('body').css({backgroundColor:'red'})
        }
    }
})

第二种
define([],function(){
    return {
        change:function(){
            require(['jquery'],function($){
                $('body').css({backgroundColor:'red'})
            })
        }
    }
})

```

* 非标转模块转标准模块

```

// common.js

function modal(){
    alert('modal panel')
}
function success(){
    alert('success panel')
}


require.config({
    baseUrl:'lib'
    paths:{
        common:'common'
    },
    shim:{
        common:{
            // exports:'modal'
            init:function(){
                return {
                    // 后面一个是全局变量
                    modal:modal,
                    success:success
                }
            }
        }
    }
})

 require(['common'], function (a) {
     // 就可以运行，一个函数
     // a()

     // 多个函数使用对象
     a.modal()
     a.success()
})
```

* 模块的依赖

```

// 依赖关系，依赖css
require.config({
    baseUrl:'lib'
    paths:{
        'css':'css.min',
        'jquery':'jquery.min',
        'angular':'angular.min',
        'bootstrap':'bootstrap.min'
    },
    shim:{
        'bootstrap':{
            'deps':['jquery','css!../css/bootstrap.min.css]
        }
    }
})


```

### 补充

* js顺序加载的集中书写方式

```
1 从文件加载

<script data-main="main" src="require.js"></script>

<script>
    // 这里根据baseUrl设置
    require(['lib/jquery','lib/angular.min'], function () {
        $('body').css({ backgroundColor: 'red' })
    })
</script>


2 和配置文件放一块
require.config({

})
require(['lib/jquery','lib/angular.min'], function () {
    $('body').css({ backgroundColor: 'red' })
})

3 顺序执行
<script src="require.js"></script>
<script src="main.js"></script>

<script>
    require(['lib/jquery','lib/angular.min'], function () {
        $('body').css({ backgroundColor: 'red' })
    })
</script>
```