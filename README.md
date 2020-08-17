# v-canuse
使用方法
1. npm install v-canuse
2. 引用
    import vCanuse from 'v-canuse'
    import 'v-canuse/src/css/index.css'
    Vue.use(vCanuse)

3. 使用
    <i class="el-icon-delete" v-canuse='[{canuse:!isLock,title:"被锁定,无法操作"},  {canuse:isMine(version),title:notUserFile}]' @click="delete"></i>



 v-canuse 值支持三种类型
  1. Boolen,  标识组件或者标签是否可用,true 可用不做任何操作；false不可用会置灰，cursor置为不可用的样式，title为默认的不可用提示
  2. Object，
    {canuse：true,  //是否可用
      title：''，//不可用时的提示，不填写为默认值
      el:'.className' //组件或标签的置灰子标签的 querySelector，如果为空则为组件或标签本身。其值的支持形式和 dom.querySelector 参数一致
    }
  3. Array， 数组的元素为 1（Boolen）或2（Object），会从第一个到最后一个依次判断，遇到不可用则根据这条规则进行设置。如果都为可用，则可用。