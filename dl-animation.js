/**
 * 基本思路，调用dl-ani对象的方法，生产对应的动画的css代码，再由使用者自己绑定到对应的元素中
 * 如 document.getElementsByClassName('xxx').style = dlAni.xxx()，当需要重新渲染动画时，只需要执行``xxx.style = ''; setTimeout(() => {xxx.style = dlAni.xxx()})``即可
 * 目前支持的动画：
 * 1、左右摇动（shake）
 * 2、上下往复移动（upDown）
 * 3、弹出（popup）
 * 4、呼吸效果（breathe）
 * 5、闪烁（twinkle）
 * 6、旋转（rotate）
 * 7、平移（tranlation）
 * 8、淡入（fadeIn）
 * 9、淡出（fadeOut）
 */
/**
 * range:幅度，单位为%，range为1则幅度为1%
 * distance:长度为2的数组，[distanceX, distanceY]，单位为px
 * deg:旋转的角度，360为1圈
 * 
 * duration:一个周期的持续时间，单位为秒
 * delay:延时开始时间，单位为秒
 * times:动画执行次数
 * mode:动画的速度曲线，ease：（逐渐变慢）、linear：（匀速）、ease-in：(加速)、ease-out：（减速）、ease-in-out：（加速然后减速）
 */
/**
 * TODO:
 */

const dlAni = {
    shake: null, // 左右摇动
    upDown: null, // 上下移动
    popup: null, // 弹出
    breathe: null, // 呼吸效果
    twinkle: null, // 闪烁
    rotate: null, // 旋转，可用于抽奖转盘等
    translation: null, // 平移
    fadeIn: null, // 淡入
    fadeOut: null, // 淡出
}

// 左右摇动
dlAni.shake = function(range = 5, duration = 1, delay = 0, times = 2, mode = 'linear') {
    let unit = range / 100 * 360
    // 添加keyframe
    const style = document.createElement('style')
    style.innerHTML = `
        @-webkit-keyframes shake-lr{ 
            0% {
                transform: rotate(0deg);
            }
            25% {
                transform: rotate(${unit}deg);
            }
            75% {
                transform: rotate(${-unit}deg);
            }
            50%,100% {
                transform: rotate(0deg);
            }
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)
    // 供绑定到元素上的css语句
    return `-webkit-animation: shake-lr ${duration}s ${delay}s ${mode} ${times};`
}
// 上下往复移动
dlAni.upDown = function(range = 10, duration = 1, delay = 0, times = 'infinite', mode = 'linear') {
    // 添加keyframe
    const style = document.createElement('style')
    style.innerHTML = `
        @-webkit-keyframes up-down{ 
            0%,50%,100% {
                transform: translateY(0%);
            }
            25% {
                transform: translateY(${range}%);
            }
            75% {
                transform: translateY(${-range}%);
            }
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)
    // 供绑定到元素上的css语句
    return `-webkit-animation: up-down ${duration}s ${delay}s ${mode} ${times};`
}
// 弹出
dlAni.popup = function(range = 10, duration = 1, delay = 0, times = 1, mode = 'linear') {
    // 添加keyframe
    const style = document.createElement('style')
    style.innerHTML = `
        @-webkit-keyframes popup {
            0% {
                transform: scale(0);
            } 
            100% {
                transform: scale(1);
            }
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)
    // 供绑定到元素上的css语句
    return `-webkit-animation: popup ${duration}s ${delay}s ${mode} ${times};`
}
// 呼吸效果
dlAni.breathe = function(range = 10, duration = 2, delay = 0, times = 'infinite', mode = 'linear') {
    let unit = range / 100
    // 添加keyframe
    const style = document.createElement('style')
    style.innerHTML = `
        @-webkit-keyframes breathe {
            0%, 50%, 100% {
                transform: scale(1);
            }
            25% {
                transform: scale(${1 + unit});
            }
            75% {
                transform: scale(${1 - unit});
            }
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)
    // 供绑定到元素上的css语句
    return `-webkit-animation: breathe ${duration}s ${delay}s ${mode} ${times};`
}
// 闪烁效果
dlAni.twinkle = function(params = [20, 0.2, 0.4], duration = 2, delay = 0, times = 'infinite', mode = 'linear') {
    let [range, minOpacity, maxOpacity] = params
    let unit = range / 100
    // 添加keyframe
    const style = document.createElement('style')
    style.innerHTML = `
        @-webkit-keyframes twinkle {
            0% {
                transform: scale(1);
                opacity: ${maxOpacity};
            }
            25% {
                transform: scale(${1 + unit});
                opacity: ${minOpacity};
            }
            50% {
                transform: scale(1);
                opacity: ${maxOpacity};
            }
            100% {
                transform: scale(${1 - unit});
                opacity: ${minOpacity};
            }
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)
    // 供绑定到元素上的css语句
    return `-webkit-animation: twinkle ${duration}s ${delay}s ${mode} ${times};`
}
// 旋转效果
dlAni.rotate = function(deg = 360, duration = 1, delay = 0, times = 1, mode = 'ease-in-out') {
    // 添加keyframe
    const style = document.createElement('style')
    duration = deg / 360 * duration
    style.innerHTML = `
        @-webkit-keyframes rotate{ 
            0% {
                transform: rotate(${0}deg);
            }
            100% {
                transform: rotate(${deg}deg);
            }
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)
    // 供绑定到元素上的css语句
    return `
        -webkit-animation: rotate ${duration}s ${delay}s ${mode} ${times};
        transform: rotate(${deg % 360}deg);
    `
}
// 平移
dlAni.translation = function(distance = [50, 0], duration = 1, delay = 0, times = 1, mode = 'linear') {
    let [distanceX, distanceY] = distance
    // 添加keyframe
    const style = document.createElement('style')
    style.innerHTML = `
        @-webkit-keyframes translation{ 
            0% {
                transform: translate(0px, 0px);
            }
            100% {
                transform: translate(${distanceX}px, ${distanceY}px);
            }
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)
    // 供绑定到元素上的css语句
    return `-webkit-animation: translation ${duration}s ${delay}s ${mode} ${times};
            transform: translate(${distanceX}px, ${distanceY}px);`
}
// 淡入
dlAni.fadeIn = function(range = 10, duration = 1, delay = 0, times = 1, mode = 'linear') {
    // 添加keyframe
    const style = document.createElement('style')
    style.innerHTML = `
        @-webkit-keyframes fadeIn {
            0% {
                opacity: 0;
            } 
            100% {
                opacity: 1;
            }
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)
    // 供绑定到元素上的css语句
    return `-webkit-animation: fadeIn ${duration}s ${delay}s ${mode} ${times};`
}
// 淡出
dlAni.fadeOut = function(range = 10, duration = 1, delay = 0, times = 1, mode = 'linear') {
    // 添加keyframe
    const style = document.createElement('style')
    style.innerHTML = `
        @-webkit-keyframes fadeOut {
            0% {
                opacity: 1;
            } 
            100% {
                opacity: 0;
            }
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)
    // 供绑定到元素上的css语句
    return `-webkit-animation: fadeOut ${duration}s ${delay}s ${mode} ${times};opacity: 0;`
}

export default dlAni