/**
 * 自定义组件的全局注册
 */
import pageTools from './PageTools'
import UploadExcel from './UploadExcel'
import ImageUpload from './imageUpload'
import FullScreen from './ScreenFull/'
import ThemePicker from './ThemePicker'
import LangSelect from './lang'
export default {
  // Vue 是Vue的实例对象
  install(Vue) {
    // 组件注册
    Vue.component('pageTools', pageTools)
    Vue.component('uploadExcel', UploadExcel)
    Vue.component('uploadImg', ImageUpload)
    Vue.component('ScreenFull', FullScreen)
    Vue.component('ThemePicker', ThemePicker)
    Vue.component('LangSelect', LangSelect)
  }
}
