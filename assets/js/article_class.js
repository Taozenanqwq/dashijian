$(function() {
    getArticles();
    let index;
    $('#add').on('click', function() {
        index = layer.open({
            type: 1,
            area: ['400px',
                '250px'
            ],
            title: '添加图书分类',
            content: `<form class="layui-form" action='' id="form-add"> 
            <div class="layui-form-item">
            <label class="layui-form-label">分类名称</label>
            <div class="layui-input-inline">
                <input type="text" name="name" lay-verify="required"  placeholder="请输入分类名称" autocomplete="off" class="layui-input">
    
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">分类别名</label>
            <div class="layui-input-inline">
                <input type="text" name="alias" lay-verify="required" placeholder="请输入分类别名" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
        <div class="layui-input-block">
          <button class="layui-btn" lay-submit lay-filter="formDemo" id="submit">立即提交</button>
          <button type="button" class="layui-btn layui-btn-primary cancel" id="cancel">取消</button>
        </div>
      </div>

        </form>`
        });

    })
    $('body').on('click', '.cancel', function() {
        layer.close(index);
    })
    $('body').on('click', '#submit', function(e) {
            e.preventDefault();
            $.ajax({
                url: '/my/article/addcates',
                method: 'post',
                data: $('#form-add').serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        layer.msg('添加失败！')
                    }
                    layer.msg('添加成功！')
                    getArticles();
                    layer.close(index);
                }
            })
        })
        // #################################################编辑###########################################
    $('body').on('click', '.edit', function() {
        index = layer.open({
            type: 1,
            area: ['400px',
                '250px'
            ],
            title: '修改图书分类',
            content: $('#editlayer').html()
        });
        let id = $(this).parent().prevAll()[1].dataset.id
        $('#id').val(id);
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    layer.msg('error！');
                }
                let showdata = res.data.filter(function(value) {
                    return value.Id == id
                })
                $('#editName').val(showdata[0].name);
                $('#editAlias').val(showdata[0].alias);
            }
        })
    })
    $('body').on('click', '#editsubmit', function(e) {
            e.preventDefault();
            $.ajax({
                url: '/my/article/updatecate',
                method: 'post',
                data: $('#form-edit').serialize(),
                success: function(res) {
                    if (res.status !== 0) {
                        layer.msg('更新失败！')
                    }
                    layer.msg('更新成功!');
                    layer.close(index);
                    getArticles();
                }
            })
        })
        // ##########################删除###############################
    $('body').on('click', '.del', function() {
        let id = $(this).parent().prevAll()[1].dataset.id
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                url: '/my/article/deletecate/:' + id,
                method: 'get',
                success: function(res) {
                    if (res.status !== 0) {
                        layer.msg('删除失败！')
                        console.log(res.message);
                    } else {
                        layer.msg('删除成功！')
                        getArticles();
                    }

                }
            })
            layer.close(index);
        });

    })
})





function getArticles() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function(res) {
            if (res.status !== 0) {
                layer.msg('获取文章分类失败！');
            }
            let articles = { val: res.data };
            let content = template('article_class', articles);
            $('#content').empty().append(content);
        }
    })
}