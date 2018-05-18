var sessionData = new UrlSearch();
sessionStorage.setItem('token',sessionData.token);
sessionStorage.setItem('code',sessionData.code);


Vue.component('scroll', {
  template: '<div class="yo-scroll"' +
  '       :class="{down:(state===0),up:(state==1),refresh:(state===2),touch:touching}"' +
  '       @touchstart="touchStart($event)"' +
  '       @touchmove="touchMove($event)"' +
  '       @touchend="touchEnd($event)"' +
  '       @scroll="(onInfinite || infiniteLoading) ? onScroll($event) : undefined">' +
  '    <section class="inner" :style="{ transform: \'translate3d(0, \' + top + \'px, 0)\' }">' +
  '      <header class="pull-refresh">' +
  '        <slot name="pull-refresh">' +
  '          <span class="down-tip">下拉更新</span>' +
  '          <span class="up-tip">松开更新</span>' +
  '          <span class="refresh-tip">更新中</span>' +
  '        </slot>' +
  '      </header>' +
  '      <slot></slot>' +
  '      <footer class="load-more">' +
  '        <slot name="load-more">' +
  '          <span v-show="infiniteLoading">加载中……</span>' +
  '          <span v-show="isEnd">没有更多了</span>' +
  '        </slot>' +
  '      </footer>' +
  '    </section>' +
  '  </div>',
  props: {
    offset: {
      type: Number,
      default: 40
    },
    isEnd: {
      type: Boolean,
      default: false
    },
    onRefresh: {
      type: Function,
      default: undefined,
      required: false
    },
    onInfinite: {
      type: Function,
      default: undefined,
      require: false
    }
  },
  data: function () {
    return {
      top: 0,
      state: 0,
      startY: 0,
      touching: false,
      infiniteLoading: false,
    }
  },
  methods: {
    touchStart: function (e) {
      this.startY = e.targetTouches[0].pageY
      this.startScroll = this.$el.scrollTop || 0
      this.touching = true
    },
    touchMove: function (e) {
      if ( this.$el.scrollTop > 0 || !this.touching) {
        return
      }
      let diff = e.targetTouches[0].pageY - this.startY - this.startScroll
      if (diff > 0) e.preventDefault()
      this.top = Math.pow(diff, 0.8) + (this.state === 2 ? this.offset : 0)

      if (this.state === 2) { // in refreshing
        return
      }
      if (this.top >= this.offset) {
        this.state = 1
      } else {
        this.state = 0
      }
    },
    touchEnd: function (e) {
      this.touching = false
      if (this.state === 2) { // in refreshing
        this.state = 2
        this.top = this.offset
        return
      }
      if (this.top >= this.offset) { // do refresh
        this.refresh()
      } else { // cancel refresh
        this.state = 0
        this.top = 0
      }
    },
    refresh: function () {
      this.state = 2
      this.top = this.offset
      this.onRefresh(this.refreshDone)
    },
    refreshDone: function () {
      this.state = 0
      this.top = 0
    },

    infinite: function () {
      this.infiniteLoading = true;
      this.onInfinite(this.infiniteDone)
    },

    infiniteDone: function () {
      this.infiniteLoading = false
    },

    onScroll: function (e) {
      if ( this.infiniteLoading) {
        return
      }
      let outerHeight = this.$el.clientHeight
      let innerHeight = this.$el.querySelector('.inner').clientHeight
      let scrollTop = this.$el.scrollTop
      let ptrHeight = this.onRefresh ? this.$el.querySelector('.pull-refresh').clientHeight : 0
      let infiniteHeight = this.$el.querySelector('.load-more').clientHeight
      let bottom = innerHeight - outerHeight - scrollTop - ptrHeight
      if (bottom < infiniteHeight) this.infinite()
    }
  }
})


var app = new Vue({
  el: '#app',
  data: {
    typeNum: 0,
    goodsList: [],
    end: false,
    goodsType: [
      '全部',
      '服务类',
      '门票卡券',
      '其它',
    ],
    params: {
      page: 1,
      limit: 7,
      type: '',
      citycode: sessionStorage.getItem('code')
    }
  },
  methods: {
    changeTips: function (name, type) {
      this.typeNum = +type;
      if (name == '全部') {
        name = ''
      }
      this.params.type = name;
      this.params.page=1;
      this.end=false;
      this.getData();
    },
    getData: function (done) {
      var self = this;
      passData({
        method: 'post',
        type: 'json',
        url: 'app/ordergoods/goodlist',
        data: self.params,
        success: function (res) {
          if(done){
            done()
          }

          if (res.code == 0) {
            if(self.params.page==1){
              self.goodsList = res.data.list;
            }else{
              self.goodsList = self.goodsList.concat(res.data.list)
            }
            if(res.data.list.length<7){
              self.end = true;
            }
          } else {
            showTips(res.msg)
          }
        }
      })
    },
    onRefresh: function (done) {
      this.params.page=1;
      this.end=false;
      this.getData(done)
    },
    onInfinite: function (done) {
      if(this.end){
        done()
        return
      }
      this.params.page++;
      this.getData(done)
    },
  },
  created: function () {
    this.params.page=1;
    this.end=false;
    this.getData()
  }
})

