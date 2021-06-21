// 所有的自定义指令
export const imageerror = {
  // 指令对象 会在当前的dom元素插入到节点之后执行
  inserted(dom, option) {
    dom.src = dom.src || option.value
    // 1.dom 表示当前指令作用的dom对象，dom在此时表示就是图片
    // 2.option是指令中的变量的解释，它有一个属性叫 value
    dom.onerror = function() {
      // 当图片有地址，但是地址没有加载成功的时候，会报错，触发图片的一个事件 => onerror
      // 当图片出现异常的时候，会讲指令配置的默认图片设置为该图片的内容
      dom.ser = option.value
    }
  },
  // 在赋值之后重新处理
  componentUpdated(dom, options) {
    dom.src = dom.src || options.value
  }
}
