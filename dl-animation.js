/**
 * 基本思路，调用dl-ani对象的方法，生产对应的动画的css代码，再由使用者自己绑定到对应的元素中
 * 如 document.getElementsByClassName('xxx').style = dl_ani.xxx()，当需要重新渲染动画时，只需要执行``xxx.style = ''; setTimeout(() => {xxx.style = dl_ani.xxx()})``即可
 */
/**
 * range:幅度，单位为%，range为1则幅度为1%
 * duration:一个周期的持续时间，单位为秒
 * delays:延时开始时间，单位为秒
 * times:动画执行次数
 * deg:旋转的角度，360为1圈
 */
/**
 * TODO:
 * 1、已经有同名的keyframe时的处理
 */

const dl_ani = {
    shake: null, // 左右摇动
    upDown: null, // 上下移动
    popup: null, // 弹出
    breathe: null, // 呼吸效果
    rotate: null, // 旋转，可用于抽奖转盘等
}

// 左右摇动
dl_ani.shake = function(range = 10, duration = 1, delay = 0, times = 2) {
    let unit = range / 100 * 360
    // 添加keyframe
    const style = document.createElement('style')
    style.innerHTML = `
        @-webkit-keyframes shake-lr{ 
            0% {
                transform: rotate(${0}deg);
            }
            25% {
                transform: rotate(${15 * unit}deg);
            }
            75% {
                transform: rotate(${-15 * unit}deg);
            }
            50%,100% {
                transform: rotate(0deg);
            }
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)
    // 供绑定到元素上的css语句
    return `-webkit-animation: shake-lr ${duration}s ${delay}s linear ${times};`
}
// 上下移动
dl_ani.upDown = function(range = 10, duration = 1, delay = 0, times = 'infinite') {
    // 添加keyframe
    const style = document.createElement('style')
    style.innerHTML = `
        @-webkit-keyframes up-down{ 
            0%,50%,100% {
                transform: translateY(0%);
            }
            10%,40% {
                transform: translateY(${0.5 * range}%);
            }
            25% {
                transform: translateY(${range}%);
            }
            60%,90% {
                transform: translateY(${-0.5 * range}%);
            }
            75% {
                transform: translateY(${-range}%);
            }
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)
    // 供绑定到元素上的css语句
    return `-webkit-animation: up-down ${duration}s ${delay}s linear ${times};`
}
// 弹出
dl_ani.popup = function(range = 10, duration = 1, delay = 0, times = 1) {
    // 添加keyframe
    const style = document.createElement('style')
    style.innerHTML = `
        @-webkit-keyframes popup {
            0% {
                transform: scale(0);
            } 
            10% {
                transform: scale(0.1);
            }
            20% {
                transform: scale(0.2);
            }
            30% {
                transform: scale(0.3);
            }
            40% {
                transform: scale(0.4);
            }
            50% {
                transform: scale(0.5);
            }
            60% {
                transform: scale(0.6);
            }
            70% {
                transform: scale(0.7);
            }
            80% {
                transform: scale(0.8);
            }
            90% {
                transform: scale(0.9);
            }
            100% {
                transform: scale(1);
            }
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)
    // 供绑定到元素上的css语句
    return `-webkit-animation: popup ${duration}s ${delay}s linear ${times};`
}
// 呼吸效果
dl_ani.breathe = function(range = 10, duration = 2, delay = 0, times = 'infinite') {
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
    return `-webkit-animation: breathe ${duration}s ${delay}s linear ${times};`
}
// 旋转效果
dl_ani.rotate = function(deg = 360, duration = 1, delay = 0, times = 1) {
    // 添加keyframe
    const style = document.createElement('style')
    duration = deg / 360 * duration
    style.innerHTML = `
        @-webkit-keyframes rotate{ 
            0% {
                transform: rotate(${0}deg);
            }
            25% {
                transform: rotate(${0.25 * deg}deg);
            }
            50% {
                transform: rotate(${0.5 * deg}deg);
            }
            75% {
                transform: rotate(${0.75 * deg}deg);
            }
            100% {
                transform: rotate(${deg}deg);
            }
        }
    `
    document.getElementsByTagName('head')[0].appendChild(style)
    // 供绑定到元素上的css语句
    return `
        -webkit-animation: rotate ${duration}s ${delay}s linear ${times};
        transform: rotate(${deg % 360}deg);
    `
}

export default dl_ani