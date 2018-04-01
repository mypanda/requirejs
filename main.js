require.config({
    baseUrl:'lib',
    paths:{
        "css":"css.min",
        "jquery":'jquery.min',
        "bootstrap":'bootstrap.min'
    },
    shim:{
        'bootstrap':{
            deps: ['jquery', 'css!../css/bootstrap.min.css','css!../css/font-awesome.min.css']
        }
    }
})