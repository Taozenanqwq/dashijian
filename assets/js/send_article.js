$(function() {
    let form = layui.form;
    initEditor();
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview',
        zoomable: false,
        movable: false,
        minCropBoxWidth: 200,
        minCropBoxHeight: 200
    }



    // 3. 初始化裁剪区域
    $image.cropper(options)
    $.ajax({
        url: '/my/article/cates',
        method: 'GET',
        success: function(res) {
            let cate = [];
            $.each(res.data, function(index, value) {
                cate.push(value.name);
            })
            cate = new Set(cate);
            cate = new Array(...cate);
            cate = { val: cate };
            let html = template('cate', cate);
            $('[name="cate_id"]').append(html);
            form.render();
        }
    });
    $('#btn-chooseimage').on('click', function(e) {
        $('#coverfile').click();
    });
    $('#coverfile').on('change', function(e) {
        console.log(1);
        var file = e.target.files[0];
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })




    // 发布文章
    let sta = '发布';
    $('#caogao').on('click', function(e) {
        e.preventDefault();
        sta = '草稿';
        $('#wenzhang').submit();
    })
    $('#wenzhang').on('submit', function(e) {
        e.preventDefault();
        let fd = new FormData($('#wenzhang')[0]);
        fd.append('state', sta);
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                fd.append('cover_img', blob);
            })
        fd.forEach(function(k, v) {
            console.log(v, k);
        })
        sendArticle(fd);
    })
})

function sendArticle(fd) {
    $.ajax({
        url: '/my/article/add',
        method: 'POST',
        data: fd,
        contentType: false,
        processData: false,
        success: function(res) {
            if (res.status != 0) {
                return layer.msg('发表失败！')
            }
            layer.msg('文章发表成功！');
            location.href('./article_list.html')
        }
    })
}