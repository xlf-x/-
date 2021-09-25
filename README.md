# 移动端动画库封装
针对业务场景封装的特定动画库

# 使用说明
1. 基本思路，调用dl-ani对象的方法，生产对应的动画的css代码，再由使用者自己绑定到对应的元素中。
   如`document.getElementsByClassName('xxx').style = dlAni.xxx()`；
   当需要重新渲染动画时，只需要执`xxx.style = ''; setTimeout(() => {xxx.style = dlAni.xxx()})`即可；
   若要添加元素的最终状态，则在dlAni.xxx()之后，加上终态的css代码。

# 注意事项
1. 由于animation和transform不能同时生效，故添加动画的元素上不应该有transfrom属性；若确实需要，可能用一个外层元素将其包裹，在外层元素上添加transfrom，内层元素上添加动画。

# TODO


# 开发人员
+ 前端：谢凌峰