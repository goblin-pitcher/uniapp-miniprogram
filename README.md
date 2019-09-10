# uniapp-miniprogram

## uniapp微信小程序项目搭建

### 实现了vuex部分内容的持久化存储

需要持久化的文件放在store/persistent.js中，在vuex中，持久化的项定义为一个名为storage的项

当persistent.js中state里的相关项改变时，storage中的内容也会更新
支持数组通过push、pop、shift等方法改变持久化的值
persistent.js中做了对更新storage的防抖操作

state分replace和update两种，stateReplace自动生成[update+名字]的mutation方法，可通过方法直接替换对应项的值
stateUpdate对应的mutations写在mutationsUpdate中，mutationsUpdate中的方法不是直接替换值的方法
