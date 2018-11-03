<template>
  <div id="app">
    <h1 class="title">决战双十一</h1>
    <h2>销量总计：{{saleTotal | kFormat}} ;  访客总计：{{uvTotal}}</h2>
    <transition-group name="list-complete" tag="ul" class="list">
      <li
        class="item"
        v-for="(item, index) in salesList"
        :key="index">
        <span class="name">{{item.store}}</span>
        <span class="value">销售金额：{{item.sale | kFormat}}</span>
        <span class="value">访客数：{{item.uv}}</span>
      </li>
    </transition-group>
  </div>
</template>

<script>
import Bus from './bus'

export default {
  name: 'App',

  data () {
    return {
      // 销售数据
      salesList: [],
      interval: null
    }
  },

  mounted () {
    // 每两秒钟获取一次
    clearInterval(this.interval)
    this.interval = setInterval(() => {
      this.getSalesList()
    }, 2000)
  },

  computed: {
    // 销售额汇总
    saleTotal () {
      return this.salesList.reduce((acc, item) => acc + item.sale, 0)
    },

    // 访客数汇总
    uvTotal () {
      return this.salesList.reduce((acc, item) => acc + item.uv, 0)
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
        console.log('获取返回数据', data.result)
        data.result.sort((a, b) => b.sale - a.sale)
        this.salesList = data.result
      })
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  .list {
    position: relative;
    .item {
      transition: all 1s;
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
