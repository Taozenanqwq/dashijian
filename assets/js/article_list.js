$(function() {
    const form = layui.form;
    renderForm();
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    template.defaults.imports.dateFormat = function(val) {
        const dt = new Date(val);
        let y = dt.getFullYear();
        let m = dt.getMonth() + 1;
        let d = dt.getDate();
        let h = dt.getHours();
        let mm = dt.getMinutes();
        let s = dt.getSeconds();
        return padZero(y) + '-' + padZero(m) + '-' + padZero(d) + ' ' + padZero(h) + ':' + padZero(mm) + ":" + padZero(s)
    }

    let data = getData(q)
    getArticleList(q, data);
    getClassList(data);
    // 监听表单提交时间##########################################################3
    $('#form-filter').on('submit', function(e) {
            e.preventDefault();
            let cate_id = $('#cate_id').val();
            let state = $('#state').val();
            let data = getData(q);
            data = data.filter(function(value) {
                return (value.Id == cate_id || cate_id == '') && (value.state == state || state == '')
            })
            getArticleList(q, data);
        })
        // 监听删除按钮，点击删除文章
    $('body').on('click', '.del', function() {
        let id = $(this).attr('data-id')
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/delete/:' + id,
                method: 'get',
                success: function(res) {
                    if (res.status !== 0) {
                        layer.msg('删除失败！')
                    } else {
                        layer.msg('删除成功！');
                        if ($('.del').length == 1) {
                            q.pagenum == 1 ? 1 : q.pagenum--;
                        }
                        let data = getData(q);
                        getArticleList(q, data);
                    }
                }
            })

            layer.close(index);
        });
    })


})

function getClassList(data) {
    let class_list = { val: data };
    let cate = template('cate_list', class_list);
    $('#cate_id').empty().append(cate);
    renderForm();
}

function getArticleList(q, data) {
    let art_list = { val: data };
    let html = template('art_list', art_list);
    $('#tbody').empty().append(html);
    renderPage(q, data.length, data);
}

function padZero(n) {
    return n > 9 ? n : ('0' + n)
}

function renderForm() {
    layui.use('form', function() {
        var form = layui.form; //只有执行了这一步，部分表单元素才会自动修饰成功
        form.render();
    });
}

function getData(q) {
    let s;
    $.ajax({
        url: '/my/article/list',
        method: 'get',
        async: false,
        data: q,
        success: function(res) {
            if (res.status !== 0) {
                layer.msg('获取文章列表失败！')
            } else {
                s = [{
                        "Id": 1,
                        "title": "abab",
                        "pub_date": "2020-01-03 12:19:57.690",
                        "state": "已发布",
                        "cate_name": "最新"
                    },
                    {
                        "Id": 2,
                        "title": "666",
                        "pub_date": "2020-01-03 12:20:19.817",
                        "state": "已发布",
                        "cate_name": "股市"
                    }, {
                        "Id": 2,
                        "title": "666",
                        "pub_date": "2020-01-03 12:20:19.817",
                        "state": "已发布",
                        "cate_name": "股市"
                    }, {
                        "Id": 2,
                        "title": "666",
                        "pub_date": "2020-01-03 12:20:19.817",
                        "state": "已发布",
                        "cate_name": "股市"
                    }, {
                        "Id": 2,
                        "title": "666",
                        "pub_date": "2020-01-03 12:20:19.817",
                        "state": "已发布",
                        "cate_name": "股市"
                    }, {
                        "Id": 2,
                        "title": "666",
                        "pub_date": "2020-01-03 12:20:19.817",
                        "state": "已发布",
                        "cate_name": "股市"
                    }, {
                        "Id": 2,
                        "title": "666",
                        "pub_date": "2020-01-03 12:20:19.817",
                        "state": "已发布",
                        "cate_name": "股市"
                    }, {
                        "Id": 2,
                        "title": "666",
                        "pub_date": "2020-01-03 12:20:19.817",
                        "state": "已发布",
                        "cate_name": "股市"
                    }, {
                        "Id": 2,
                        "title": "666",
                        "pub_date": "2020-01-03 12:20:19.817",
                        "state": "已发布",
                        "cate_name": "股市"
                    }, {
                        "Id": 2,
                        "title": "666",
                        "pub_date": "2020-01-03 12:20:19.817",
                        "state": "已发布",
                        "cate_name": "股市"
                    },

                ]

            }
        }
    })
    return s

}

function renderPage(q, total, data) {
    layui.use('laypage', function() {
        var laypage = layui.laypage;

        //执行一个laypage实例
        laypage.render({
            elem: 'test1' //注意，这里的 test1 是 ID，不用加 # 号
                ,
            count: total, //数据总数，从服务端得到
            limit: q.pagesize,
            curr: q.pagenum,
            limits: [2, 5, 10],
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            jump: function(obj, first) {
                if (!first) {
                    q.pagenum = obj.curr;
                    q.pagesize = obj.limit
                    console.log(q);
                    getData(q);
                    getArticleList(q, data);
                }
            }
        });
    });
}