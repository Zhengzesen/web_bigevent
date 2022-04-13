//每次调用请求时，调用函数
$.ajaxPrefilter(function(options){
    options.url='http://www.liulongbin.top:3007'+options.url
})