$(function (){
  if (localStorage.getItem('goods')) {
    // 获取购物车数据
    var goodsArr = JSON.parse( localStorage.getItem('goods') )
    // 获取所有数据
    $.ajax({
      url: './data/goods.json',
      type: 'get',
      dataType: 'json',
      success: function (json){
        var domStr = ''
        $.each(json,function (index,item){
          $.each(goodsArr,function (i,obj){
            if (item.id === obj.id) {
              domStr += `
              <li>
                <input type="checkbox">
                <img src="${item.imgurl}" alt="">
                <h3>${item.title}</h3>
                <p>${item.price}</p>
                <i data-id="${item.id}">-</i> <span>${obj.num}</span> <u data-id="${item.id}">+</u>
                <em data-id="${item.id}">删除</em>
              </li>
              `
            }
          })
        })
        $('.list').html(domStr)
      }
    })
    // 删除商品
    $('.list').on('click','li em',function (){
      // 当前点击的商品id
      var id = $(this).attr('data-id')
      $.each(goodsArr,function (index,item){
        if (item.id === id) {
          goodsArr.splice(index,1)
          return false
        }
      })
      // 删除dom结构
      $(this).parent().remove()
      // 更新本地存储的数据
      localStorage.setItem('goods',JSON.stringify(goodsArr))
      if (goodsArr.length <= 0) {
        localStorage.removeItem('goods')
        var newLi = '<li>购物车暂无数据！</li>'
        $('.list').html(newLi)
      }
    })

    //调节价格
    $('.list').on('click','li i',function(){
      var a = $(this).next().text()
      if (a == '1') {
        return false
      }
      $(this).next().text(a-1)
      var b = $(this).next().text()
      if (b == '1') {
        $(this).css('backgroundColor','red')
      }
      var id = $(this).attr('data-id')
      $.each(goodsArr,function (index,item){
        if (item.id === id) {
          item.num--
          return false
        }
      })
      localStorage.setItem('goods', JSON.stringify(goodsArr) )
    })
    $('.list').on('click','li u',function(){
      var a = $(this).prev().text()
      $(this).prev().text(parseInt(a)+1)
      var b = $(this).prev().text()
      if (b !== '1') {
        $(this).prev().prev().css('backgroundColor','')
      }
      var id = $(this).attr('data-id')
      $.each(goodsArr,function (index,item){
        if (item.id === id) {
          item.num++
          return false
        }
      })
      localStorage.setItem('goods', JSON.stringify(goodsArr) )
    })

  } else {
    var newLi = '<li>购物车暂无数据！</li>'
    $('.list').html(newLi)
  }
})
