
// 监听价格变动
var handleSaleChange = (function () {
  var changeNum = 0
  return {
    init() {
      console.log('查询销售额')
      let timeStamp = (new Date()).getTime()
      fetch(`https://sycm.taobao.com/ipoll/datawar/getBranchAmtAndFlow.json?limit=30&token=290aec8af&_=${timeStamp}`)
      .then(response => {
        if (response.status !== 200) {
          console.log('请求失败')
          return
        }
        response.json().then(result => {
          const storeData = result.data.data
          const params = encodeURIComponent(JSON.stringify(storeData))
          handleSaleChange.emitData(params)
        })
      })

      setTimeout(handleSaleChange.init, 20000);
    },
    emitData(params) {
      const img = new Image()
      img.src = `http://192.168.31.184/pageData/taobao2?storeData=${params}`
    }
  }
})()
setTimeout(() => {
    // 开始执行方法
    handleSaleChange.init()
  }, 7000)