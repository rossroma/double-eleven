// ==UserScript==
// @name         handlePageChange
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  shows how to use babel compiler
// @author       rossroma
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/6.18.2/babel.js
// @require      https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/6.16.0/polyfill.js
// @include      https://sycm.taobao.com/portal/home.htm
// @require      https://code.jquery.com/jquery-2.1.4.min.js
// @run-at       document-end
// @match        <$URL$>
// ==/UserScript==

// 监听价格变动
var handleSaleChange = (function () {
  var changeNum = '0'
  return {
    init () {
      console.log('查询销售额')
      const newSale = $('#liveSurvey .payAmt .index-value').text()
      const uv = $('.uv .index-name .index-value').text()
      if (changeNum !== newSale + uv) {
        handleSaleChange.emitData(newSale,  uv)
        changeNum = newSale + uv
      }
      setTimeout(handleSaleChange.init, 2000)
    },
    emitData (newSale, uv) {
      console.log('价格变更:', `当前销售额：${newSale}`, `访客数：${uv}`)
      const storeName = $('.ebase-Selector__title').text().trim()
      const img = new Image()
      img.src = `http://192.168.40.192/pageData/taobao?store=${storeName}&sale=${newSale}&uv=${uv}`
    }
  }
})()
setTimeout(() => {
  // 开始执行方法
  handleSaleChange.init()
}, 7000)