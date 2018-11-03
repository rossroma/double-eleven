// 监听价格变动
var handleSaleChange = (function () {
  var changeNum = 0
  return {
    init() {
      console.log('查询销售额')
      
      $.get('https://sz.jd.com/realtime/getRealtimeData.ajax', (data, status) => {
        var result = JSON.parse(data)
        var newSale = result.content.OrdAmt.summary.value
        var uv = result.content.UV.value
        if (changeNum !== newSale + uv) {
          handleSaleChange.emitData(newSale, uv)
          changeNum = newSale + uv
        }
        setTimeout(handleSaleChange.init, 2000)
      })
    },
    emitData(newSale, uv) {
      console.log('价格变更:', `当前销售额：${newSale}`, `访客数：${uv}`)
      const storeName = $('.shop-name a').text().trim()
      const img = new Image()
      img.src = `http://192.168.31.184/pageData/jingdong?store=${storeName}&sale=${newSale}&uv=${uv}`
    }
  }
})()
setTimeout(() => {
  // 开始执行方法
  handleSaleChange.init()
}, 7000)