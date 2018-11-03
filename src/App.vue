<template>
  <div id="app">
    <header class="head">
      <h1 class="title">决战双十一</h1>
      <h2>销量总计：{{saleTotal | kFormat}} ;  访客总计：{{uvTotal}}</h2>
    </header>

    <section class="content">
      <div class="part-item">
        <h2 class="sub-title">天猫数据</h2>
        <transition-group name="list-complete" tag="ul" class="list">
          <li class="item" key="first">
            <span class="avatar"></span>
            <span class="name">店铺名</span>
            <span class="pay">销售额</span>
            <span class="uv">访客数</span>
          </li>
          <li
            class="item"
            v-for="(item, index) in tbList"
            :key="index">
            <span class="avatar">
              <img :src="item.pictureUrl" alt="">
            </span>
            <span class="name">{{item.title}}</span>
            <span class="pay">{{item.payAmt}}</span>
            <span class="uv">{{item.uv}}</span>
          </li>
        </transition-group>
      </div>

      <div class="part-item">
        <h2 class="sub-title">京东</h2>
        <transition-group name="list-complete" tag="ul" class="list">
          <li class="item" key="first">
            <span class="name">店铺名</span>
            <span class="pay">销售额</span>
            <span class="uv">访客数</span>
          </li>
          <li
            class="item"
            v-for="(item, index) in jdList"
            :key="index">
            <span class="name">{{item.title}}</span>
            <span class="pay">{{item.payAmt}}</span>
            <span class="uv">{{item.uv}}</span>
          </li>
        </transition-group>
      </div>
    </section>
  </div>
</template>

<script>
import Bus from './bus'

export default {
  name: 'App',

  data () {
    return {
      // 京东数据
      jdList: [],
      // 淘宝数据
      tbList: [],
      interval: null
    }
  },

  mounted () {
    // 每两秒钟获取一次
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.getSalesList()
    }, 5000)
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
      const re = /(?=(?!(\b))(\d{3})+$)/g
      return numStr.replace(re, ',')
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
    }
  }
}
</script>

<style lang="less" scoped>
* {
  padding: 0;
  margin: 0;
  border: 0;
  list-style: none;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
  .head {
    text-align: center;
  }
  .content {
    width: 1000px;
    position: relative;
    display: flex;
    margin: 40px auto 0;
    .part-item {
      flex: 1 1 auto;
    }
  }
  .list {
    position: relative;
    .item {
      transition: all 1s;
      line-height: 40px;
      padding-bottom: 20px;
      span {
        display: inline-block;
        vertical-align: top;
      }
      .avatar {
        width: 40px;
        height: 40px;
        margin-right: 20px;
        img {
          vertical-align: top;
          width: 100%;
          height: 100%;
        }
      }
      .name {
        width: 200px;
      }
      .pay {
        width: 120px;
      }
      .uv {
        width: 100px;
      }
    }
    .list-complete-enter, .list-complete-leave-to {
      opacity: 0;
      transform: translateY(30px);
    }
    .list-complete-leave-active {
      position: absolute;
    }
  }
}
</style>
