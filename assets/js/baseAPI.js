$(function () {
    $.ajaxPrefilter((function (option) {
        let baseurl = 'http://api-breakingnews-web.itheima.net';
        option.url = baseurl + option.url

    }))
})