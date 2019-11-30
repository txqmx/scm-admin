<template>
    <div class="comp-container">
        <div class="wscn-http404">
            <div class="pic-404">
                <img class="pic-404__parent" :src="notFoundImgUrl" alt="404">
                <img class="pic-404__child left" :src="cloudUrl" alt="404">
                <img class="pic-404__child mid" :src="cloudUrl" alt="404">
                <img class="pic-404__child right" :src="cloudUrl" alt="404">
            </div>
            <div class="bullshit">
                <div class="bullshit__oops">该页面不存在!</div>
                <a href="/" class="bullshit__return-home">返回首页</a>
            </div>
        </div>
    </div>
</template>
<script>
/**
 * 改为服务器地址，子项目共用404相关图片
 */
const baseUrl =
    'https://img-oss.yunshanmeicai.com/supply/supplynweb/statics/img'
export default {
  data () {
    return {
      cloudUrl: `${baseUrl}/404_cloud.png`,
      notFoundImgUrl: `${baseUrl}/404.a57b6f31.png`
    }
  }
}
</script>

<style lang="scss" scoped>
.comp-container {
    background: #f0f2f5;
    height: 100%;
    min-width: 800px;
}
.wscn-http404 {
    position: relative;
    width: 100%;
    margin: 0px auto 60px;
    padding: 0 100px;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    .pic-404 {
        flex: 0 1 auto;
        box-sizing: border-box;
        position: relative;
        float: left;
        width: 600px;
        padding: 150px 0;
        overflow: hidden;
        &__parent {
            width: 100%;
        }
        &__child {
            position: absolute;
            &.left {
                width: 80px;
                top: 17px;
                left: 220px;
                opacity: 0;
                animation-name: cloudLeft;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                animation-delay: 1s;
            }
            &.mid {
                width: 46px;
                top: 10px;
                left: 420px;
                opacity: 0;
                animation-name: cloudMid;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                animation-delay: 1.2s;
            }
            &.right {
                width: 62px;
                top: 100px;
                left: 500px;
                opacity: 0;
                animation-name: cloudRight;
                animation-duration: 2s;
                animation-timing-function: linear;
                animation-fill-mode: forwards;
                animation-delay: 1s;
            }
            @keyframes cloudLeft {
                0% {
                    top: 17px;
                    left: 220px;
                    opacity: 0;
                }
                20% {
                    top: 33px;
                    left: 188px;
                    opacity: 1;
                }
                80% {
                    top: 81px;
                    left: 92px;
                    opacity: 1;
                }
                100% {
                    top: 97px;
                    left: 60px;
                    opacity: 0;
                }
            }
            @keyframes cloudMid {
                0% {
                    top: 10px;
                    left: 420px;
                    opacity: 0;
                }
                20% {
                    top: 40px;
                    left: 360px;
                    opacity: 1;
                }
                70% {
                    top: 130px;
                    left: 180px;
                    opacity: 1;
                }
                100% {
                    top: 160px;
                    left: 120px;
                    opacity: 0;
                }
            }
            @keyframes cloudRight {
                0% {
                    top: 100px;
                    left: 500px;
                    opacity: 0;
                }
                20% {
                    top: 120px;
                    left: 460px;
                    opacity: 1;
                }
                80% {
                    top: 180px;
                    left: 340px;
                    opacity: 1;
                }
                100% {
                    top: 200px;
                    left: 300px;
                    opacity: 0;
                }
            }
        }
    }
    .bullshit {
        user-select: none;
        flex: 1 0 auto;
        position: relative;
        float: left;
        width: 175px;
        padding: 220px 0;
        overflow: hidden;
        &__oops {
            font-size: 32px;
            font-weight: bold;
            line-height: 40px;
            color: #1482f0;
            opacity: 0;
            margin-bottom: 20px;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-fill-mode: forwards;
        }
        &__headline {
            font-size: 20px;
            line-height: 24px;
            color: #1482f0;
            opacity: 0;
            margin-bottom: 10px;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-delay: 0.1s;
            animation-fill-mode: forwards;
        }
        &__info {
            font-size: 13px;
            line-height: 21px;
            color: grey;
            opacity: 0;
            margin-bottom: 30px;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-delay: 0.2s;
            animation-fill-mode: forwards;
        }
        &__return-home {
            display: block;
            float: left;
            width: 110px;
            height: 36px;
            text-decoration: none;
            background: #1482f0;
            border-radius: 100px;
            text-align: center;
            &:hover {
                background-color: #66b1ff;
            }
            color: #ffffff;
            opacity: 0;
            font-size: 14px;
            line-height: 36px;
            cursor: pointer;
            animation-name: slideUp;
            animation-duration: 0.5s;
            animation-delay: 0.3s;
            animation-fill-mode: forwards;
        }
        @keyframes slideUp {
            0% {
                transform: translateY(60px);
                opacity: 0;
            }
            100% {
                transform: translateY(0);
                opacity: 1;
            }
        }
    }
}
</style>
