/*
 * @Author: kai.yang
 * @Date: 2018-11-05 13:49:46
 * @LastEditors: kai.yang
 * @LastEditTime: 2018-11-08 00:16:44
 * @Description: 倒计时组件
 */
<template>
  <div class="count-down">
    <div class="count-tips">距离2018.11.11开启 仅剩</div>
    <div class="count-area">
      <div class="time">
        <transition name="time">
          <span class="time-item" v-for="hour in hours" :key="hour">{{hour}}</span>
        </transition>
      </div>
      <span class="text">小时</span>
      <div class="time">
        <transition name="time">
          <span class="time-item" v-for="miniute in miniutes" :key="miniute">{{miniute}}</span>
        </transition>
      </div>
      <span class="text">分</span>
      <div class="time">
        <transition name="time">
          <span class="time-item" v-for="second in seconds" :key="second">{{second}}</span>
        </transition>
      </div>
      <span class="text">秒</span>
    </div>
  </div>
</template>

<script>
let t
export default {
  name: 'CountDown',

  data () {
    return {
      // 倒计时结束时间
      endTime: new Date(2018, 10, 9),
      hours: ['00'],
      miniutes: ['00'],
      seconds: ['00']
    }
  },

  mounted () {
    t = setInterval(this.init, 500)
  },

  methods: {
    // 初始化
    init () {
      // 当前时间
      const date = new Date()
      // 时间差
      const timePeriod = Math.floor((this.endTime - date) / 1000)
      const hours = this.timeFormat(Math.floor(timePeriod / 3600))
      const miniutes = this.timeFormat(Math.floor((timePeriod % 3600) / 60))
      const seconds = this.timeFormat(Math.floor((timePeriod % 60)))

      // 更新数据
      this.hours.splice(0, 1, hours)
      this.miniutes.splice(0, 1, miniutes)
      this.seconds.splice(0, 1, seconds)

      // 当数值全为0时，清除倒计时，并关闭窗口
      if (hours === miniutes && miniutes === seconds) {
        console.log('倒计时结束')
        clearInterval(t)
        this.$emit('close')
      }
    },

    // 将时间格式化
    timeFormat (num) {
      return ('0' + num).substr(-2)
    }
  }
}
</script>

<style lang="less" scoped>
  .count-down {
    position: fixed;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    background: url('../assets/images/WechatIMG49.png') no-repeat center center;
    background-size: 100% 100%;
    z-index: 999;
    .count-tips {
      width: 30rem;
      text-align: center;
      margin: 16rem auto 0;
      color: #f5f5f5;
      font-size: 1rem;
    }
    .count-area {
      position: absolute;
      width: 38rem;
      height: 15rem;
      left: 50%;
      top: 18rem;
      margin-left: -19rem;
      text-align: center;
      .time {
        position: relative;
        display: inline-block;
        vertical-align: bottom;
        width: 8.2rem;
        height: 7.5rem;
        line-height: 1;
        .time-item {
          position: absolute;
          opacity: 1;
          left: 1rem;
          font-family: 'LcdD', 'Cochin';
          color: rgb(249, 217, 148);
          font-size: 7.4rem
        }
        .time-enter-active, .time-leave-active {
          transition: all .5s;
        }
        .time-leave-active {
          transform: translateY(4rem);
        }
        .time-enter {
          transform: translateY(-4rem);
        }
        .time-enter, .time-leave-to {
          opacity: 0;
        }
      }
      .text {
        display: inline-block;
        vertical-align: bottom;
        line-height: 2;
        font-size: 1rem;
        color: #f9f9f9;
        font-style: italic;
      }
    }
  }
</style>
