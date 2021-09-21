# 移动端动画库封装
针对业务场景封装的特定动画库

# 使用说明
1. 基本思路，调用dl-ani对象的方法，生产对应的动画的css代码，再由使用者自己绑定到对应的元素中。
   如`document.getElementsByClassName('xxx').style = dl_ani.xxx()`；
   当需要重新渲染动画时，只需要执`xxx.style = ''; setTimeout(() => {xxx.style = dl_ani.xxx()})`即可

# TODO
+ 抽奖转盘
+ 摇一摇
+ 图片弹出特效
+ 呼吸
+ 上下往复移动

# 开发人员
+ 前端：谢凌峰