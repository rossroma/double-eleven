const express = require('express')
// const request = require('request')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const app = express()
app.use(bodyParser.json())
app.use(cookieParser())

// 设置响应头
app.all('*', function (req, res, next) {
  res.header('content-type', 'application/json;charset=utf-8')
  next()
})

// 显示错误信息
// function showError(error, body, res) {
//   let errorMsg
//   if (error) {
//     errorMsg = `basic error：${error}`
//   } else if (body && body.error) {
//     errorMsg = `bmob  error: ${body.error}`
//   } else {
//     return false
//   }
//   res.end(formatResponse({}, errorMsg, 10))
//   return true
// }

// // 格式化返回信息
// function formatResponse(data, msg = '操作成功！', code = 1) {
//   let result = {
//     code: code,
//     msg: msg,
//   }
//   Object.assign(result, data)
//   return JSON.stringify(result)
// }

// // 处理ajax请求
// function restful(callback, res, url, methType = 'GET', body) {
//   let options = {
//     method: methType || 'GET',
//     url: apiUrl + url,
//     headers: headerText,
//     json: true
//   }
//   if (body) {
//     options.body = body
//   }
//   request(options, function (error, response, data) {
//     if (showError(error, data, res)) return
//     callback(data)
//   })
// }

// 数据临时存储
const taobao = {}
const jigndong = {}
const totalCount = [
  {
    store: 'midea美的泽蓝专卖店',
    total: 0
  }
]

// 计算汇总信息
function computeTotal(storeName) {
  const currentItem = totalCount.find((item) => item.store === storeName)
  if (!currentItem) return

  const jdSale = jigndong[storeName] ? Number(jingdong[storeName]) : 0
  const tbSale = taobao[storeName] ? Number(taobao[storeName]) : 0
  const total = jdSale + tbSale
  if (total !== currentItem.total) {
    console.log('数据变更', total)
    currentItem.total = total
  }
}

// 获取淘宝数据
app.get('/pageData/taobao', function (req, res, next) {
  // 拼接url
  const query = req.query // 所有参数
  // TODO 去掉千位分隔符
  const sale = query.sale ? Number(query.sale) : 0
  taobao[query.store] = sale
  
  // 汇总计算
  computeTotal(query.store)
  res.end()
})

// 返回统计数据
app.get('/getStatistics', function (req, res, next) {
  let result = {
    code: 1,
    msg: '查询成功',
    result: totalCount
  }
  res.end(JSON.stringify(result))
})

module.exports = app
