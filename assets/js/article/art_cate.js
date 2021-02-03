$(function() {
    var layer = layui.layer
    var form = layui.form
    initArtCateList()
        // 获取文章分类列表数据
    function initArtCateList() {
        $.ajax({
            type: "GET",
            url: "/my/article/cates",
            success: function(res) {

                var htmlStr = template('tpl_table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var indexAdd = null
    $('#btnAddCate').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '添加文章分类',
            content: $('#dialog_add').html()
        });

    });
    var indexEdit = null
    $('tbody').on('click', '#btn_edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '300px'],
            title: '修改文章分类',
            content: $('#dialog_edit').html()
        });
        var id = $(this).attr('data-id')
        $.ajax({
            type: "GET",
            url: '/my/article/cates/' + id,
            success: function(res) {
                form.val('form_edit', res.data)
            }
        })
    })
    $('tbody').on('click', '#btn_delete', function() {
        var id = $(this).attr('data-id')

        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                type: "GET",
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章分类失败！')
                    }
                    initArtCateList()
                    layer.msg('删除文章分类成功！')

                }
            })
            layer.close(index);
        });


    })
    $('body').on('submit', '#form_add', function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('添加文章分类失败！')
                }
                initArtCateList()
                layer.msg('添加文章分类成功！')
                layer.close(indexAdd)
            }
        })
    })

    $('body').on('submit', '#form_edit', function(e) {
        e.preventDefault()
        $.ajax({
            type: "POST",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('更新文章分类失败！')
                }
                initArtCateList()
                layer.msg('更新文章分类成功！')
                layer.close(indexEdit)
                initArtCateList()
            }
        })
    })
})