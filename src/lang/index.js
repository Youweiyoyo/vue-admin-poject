import Vue from 'vue'
import VueI18n from 'vue-i18n' // 引入 i8n 插件
import Cookie from 'js-cookie' // 引入 Cookie 包
import elementEN from 'element-ui/lib/locale/lang/en' // 引入 ElementUI 的英文语言包
import elementZH from 'element-ui/lib/locale/lang/zh-CN' // 引入 ElementUI 的中文语言包
import customzh from './zh' // 引入自定义中文语言包
import customen from './en' // 引入自定义英文语言包
Vue.use(VueI18n)
export default new VueI18n({
  locale: Cookie.get('language') || 'zh', // 指的是当前语言的类型,自定义的字符串,从cookie中获取语言类型 获取不到就是中文
  messages: {
    // 引入英文语言包,此时 ElementUI 已经变成英文 + 自定义语言包
    en: {
      ...elementEN,
      ...customen
    },
    // 引入中文语言包,此时 ElementUI 已经变成中文 + 自定义语言包
    zh: {
      ...elementZH,
      ...customzh
    }
  }
}) // 导出
