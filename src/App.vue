<template>
  <div id="app" class="app">
    <header class="head">
      <div class="title">达尔美 2018.11.11</div>
      <div class="text">全店铺累计支付金额</div>
      <div class="money">{{saleTotal | kFormat}}</div>
    </header>

    <!-- <div class="content">
      <div class="part-item">
        <ul class="list">
          <li class="item">
            <span class="name">店铺名拉拉飞机</span>
            <span class="pay">129983758.00元</span>
          </li>
          <li class="item">
            <span class="name">店铺名拉拉飞机</span>
            <span class="pay">129983758.00元</span>
          </li>
          <li class="item">
            <span class="name">店铺名拉拉飞机</span>
            <span class="pay">129983758.00元</span>
          </li>
        </ul>
      </div>
      <div class="part-item">
        <ul class="list">
          <li class="item">
            <span class="name">店铺名拉拉飞机</span>
            <span class="pay">129983758.00元</span>
          </li>
          <li class="item">
            <span class="name">店铺名拉拉飞机</span>
            <span class="pay">129983758.00元</span>
          </li>
          <li class="item">
            <span class="name">店铺名拉拉飞机</span>
            <span class="pay">129983758.00元</span>
          </li>
        </ul>
      </div>
    </div> -->

    <section class="content">
      <div class="part-item">
        <transition-group name="list-complete" tag="ul" class="list">
          <li
            class="item"
            v-for="(item, index) in tbList"
            :key="index">
            <span class="name">{{item.title}}</span>
            <span class="pay">{{item.payAmt}}</span>
          </li>
        </transition-group>
      </div>

      <div class="part-item">
        <transition-group name="list-complete" tag="ul" class="list">
          <li
            class="item"
            v-for="(item, index) in jdList"
            :key="index">
            <span class="name">{{item.title}}</span>
            <span class="pay">{{item.payAmt}}</span>
          </li>
        </transition-group>
      </div>
    </section>

    <div class="footer">
      {{currentTime}}
    </div>

    <count-down v-if="isCountDownShow" @close="isCountDownShow = false"></count-down>
  </div>
</template>

<script>
import Bus from './bus'
import CountDown from './components/count-down'
let t = null

export default {
  name: 'App',

  components: {
    CountDown
  },

  data () {
    return {
      // 京东数据
      jdList: [],
      // 淘宝数据
      tbList: [],
      interval: null,
      // 倒计时是否显示
      isCountDownShow: false,
      // 当前时间
      currentTime: '2018-11-08  00:17:41'
    }
  },

  mounted () {
    // 每两秒钟获取一次
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.getSalesList()
    }, 5000)

    this.getTimeNow()
  },

  computed: {
    // 销售额汇总
    saleTotal () {
      let tb = this.tbList.reduce((acc, item) => acc + item.payAmt, 0)
      let jd = this.jdList.reduce((acc, item) => acc + item.payAmt, 0)
      return tb + jd
    },

    // 访客数汇总
    uvTotal () {
      let tb = this.tbList.reduce((acc, item) => acc + item.uv, 0)
      let jd = this.jdList.reduce((acc, item) => acc + item.uv, 0)
      return tb + jd
    }
  },

  filters: {
    // 数字增加千分位
    kFormat (num) {
      const numStr = num.toString()
      const re = /(\d{1,3})(?=(\d{3})+(?:$|\.))/g
      return numStr.replace(re, '$1,')
    }
  },

  methods: {
    // 获取销售数据
    getSalesList () {
      Bus.get('getSalesList', (data) => {
        console.log('获取返回数据', data.jingdong, data.taobao)
        this.jdList = data.jingdong
        this.tbList = data.taobao
      })
    },

    // 将时间格式化
    timeFormat (num) {
      return ('0' + num).substr(-2)
    },

    // 获取当前时间，并显示在页面
    getTimeNow () {
      clearTimeout(t)
      const date = (new Date()).getTime()
      const localDate = new Date(date + 28800000)
      const dateStr = localDate.toISOString().substr(0, 19)
      this.currentTime = dateStr.replace('T', '  ')
      t = setTimeout(this.getTimeNow, 1000)
    }
  }
}
</script>

<style lang="less">
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
html {
  font-size: 16px;
}
@media screen and (min-width: 1200px){
  html {
    font-size: 22px;
  }
}
@media screen and (min-width:1600px){
  html {
    font-size: 30px;
  }
}
</style>

<style lang="less" scoped>
.app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
  background: url('./assets/images/WechatIMG48.png') no-repeat center center;
  background-size: 100% 100%;
  color: #ffffff;
  .head {
    text-align: center;
    .title {
      margin-top: 8.5rem;
    }
    .text {
      font-size: 0.7rem;
      margin-top: 0.4rem;
    }
    .money {
      font-family: 'LcdD', 'Cochin';
      font-size: 6.6rem;
      line-height: 1;
      color: rgb(249, 217, 148);
    }
  }
  .content {
    width: 45.1rem;
    position: relative;
    margin: 1.4rem auto 0;
    font-size: 0;
    .part-item {
      width: 50%;
      display: inline-block;
    }
    .list {
      position: relative;
      .item {
        transition: all 1s;
        line-height: 2rem;
        height: 2.2rem;
        padding: 0 3.3rem;
        overflow: hidden;
        text-align: right;
        span {
          display: inline-block;
          vertical-align: top;
        }
        .name {
          font-size: 0.7rem;
          opacity: 0.9;
          float: left;
          line-height: 2.2rem;
        }
        .pay {
          font-size: 1rem;
          font-family: 'LcdD', 'Cochin';
          color: rgb(249, 217, 148);
        }
      }
      .list-complete-enter, .list-complete-leave-to {
        opacity: 0;
        transform: translateY(1rem);
      }
      .list-complete-leave-active {
        position: absolute;
      }
    }
  }
  .footer {
    text-align: center;
    line-height: 1;
    font-size: 0.9rem;
    font-family: 'LcdD', 'Cochin';
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 1.2rem;
    opacity: 0.8;
  }
}
</style>
