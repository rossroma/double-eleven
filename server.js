const compression = require('compression')
const express = require('express')
const app = module.exports = express()
const bodyParser = require('body-parser')

app.use(bodyParser.json())
app.use(compression({filter: shouldCompress}))
app.use(express.static(__dirname + '/dist/'))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }
  // fallback to standard filter function
  return compression.filter(req, res)
}

// 京东店铺数据
let jdData = []

// 淘宝店铺数据
let tbData = []

// 存储数据
function saveSales (title, payAmt, uv) {
  // 格式化销售数据
  payAmt = Number(payAmt.replace(/,/g, ''))

  console.log(title, uv)
  // 格式化UV
  uv = Number(uv.replace(/,/g, ''))
  const index = jdData.findIndex(item => item.title === title)
  console.log(index, title)
  if (index > -1) {
    jdData[index].payAmt = payAmt
    jdData[index].uv = uv
  } else {
    jdData.push({
      title,
      payAmt,
      uv
    })
  }
}

// 设置响应头
app.all('*', function (req, res, next) {
  res.header('content-type', 'application/json;charset=utf-8')
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

// 获取淘宝数据
app.get('/pageData/taobao', function (req, res, next) {
  // 拼接url
  const query = req.query // 所有参数
  console.log('获取淘宝参数', query)
  // 存储数据
  // saveSales(query.store, query.sale || '0', query.uv || '0')
  res.end()
})

// 获取淘宝多店铺数据
app.get('/pageData/taobao2', function (req, res, next) {
  // 拼接url
  const query = req.query // 所有参数
  const params = decodeURIComponent(query.storeData)

  // console.log('获取淘宝多店铺参数', JSON.parse(params))
  // 存储数据
  tbData = JSON.parse(params)
  res.end()
})

// 获取京东数据
app.get('/pageData/jingdong', function (req, res, next) {
  // 拼接url
  const query = req.query // 所有参数
  console.log('获取京东参数', query)
  // 存储数据
  saveSales(query.store, query.sale || '0', query.uv || '0')
  res.end()
})

// 返回销售数据
app.get('/getSalesList', function (req, res, next) {
  let result = {
    code: 1,
    msg: '查询成功',
    jingdong: jdData,
    taobao: tbData
  }
  res.end(JSON.stringify(result))
})

const server = app.listen(80, function () {
  const host = server.address().address
  const port = server.address().port
  console.log('启动服务，访问地址为 http://%s:%s', host, port)
})
