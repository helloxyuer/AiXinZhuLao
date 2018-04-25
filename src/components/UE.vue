<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UE',
    data () {
      return {
        editor: null,
        isready:false
      }
    },
    props: {
      defaultMsg: {
        type: String
      },
      config: {
        type: Object
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.isready = true;
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      }
    },
    watch: {
      defaultMsg: {
        handler(newValue, oldValue) {
          const _this = this;
          if(_this.isready){
            _this.editor.setContent(_this.defaultMsg);
          }
        }
      },
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
