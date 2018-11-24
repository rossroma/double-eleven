// ==UserScript==
// @name         doubleEleven-bigScreen
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  shows how to use babel compiler
// @author       rossroma
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @include      https://sycm.taobao.com/datawar/room/daily
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @run-at       document-end
// @match        <$URL$>
// ==/UserScript==

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

      setTimeout(handleSaleChange.init, 10000);
    },
    emitData(params) {
      const img = new Image()
      img.src = `http://192.168.40.192/pageData/taobao2?storeData=${params}`
    }
  }
})()
setTimeout(() => {
    // 开始执行方法
    handleSaleChange.init()
  }, 7000)

setTimeout(() => {
  // 每小时刷新一次页面，防止token过期
  window.location.reload()
}, 3600000)