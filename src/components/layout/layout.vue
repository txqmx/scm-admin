<template>
  <div class="app" v-loading="loading">
    <el-container>
      <el-header class="app-header" v-if="!outVisit">
        <div class="app-header-title">
          <a href="/#/">{{projectName}}</a>
        </div>
        <div class="app-header-userinfo">
          <div class="name">{{userName.substr(0 - 2)}}</div>
          <div>[{{roleName}}]</div>
          <div class="city" v-if="citySwitch">
            <el-dropdown trigger="click" :hide-on-click="false">
                        <span class="el-dropdown-link" style="color:#fff">
                            {{currentCityName}}
                            <i class="el-icon-caret-bottom el-icon--right"></i>
                        </span>
              <el-dropdown-menu slot="dropdown" ref="citySelect" class="user-citylist">
                <el-dropdown-item>
                  <el-input v-model="cityQueryStr" size="small" placeholder="搜索城市"></el-input>
                </el-dropdown-item>
                <el-dropdown-item
                  :key="city.id"
                  v-for="city in cityList"
                  @click.native="switchCity(city.id)"
                >{{city.name}}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <a href="javascript:void(0)" @click="logout">退出</a>
        </div>
      </el-header>
      <el-container class="app-body" :class="{'out-visit':outVisit}">
        <el-aside class="app-aside" v-if="!outVisit">
          <el-menu
            style="margin-top: 9px"
            :default-active="activeName"
            background-color="#444E4F"
            text-color="#fff"
            active-text-color="#00BF6C"
            :unique-opened="true">
            <template v-for="(menuItem,index) in authRouterConfig">
              <div v-if="menuItem.isAuth && menuItem.inNav" :key="index">
                <el-submenu v-if="menuItem.children" :index="menuItem.name+ index">
                  <template slot="title">{{menuItem.title}}</template>
                  <el-menu-item
                    v-for="(subMenu,subInx) of menuItem.children"
                    :key="subInx"
                    :index="subMenu.name"
                    @click="toRoute(subMenu)">
                    <span slot="title">{{subMenu.title}}</span>
                  </el-menu-item>
                </el-submenu>
                <el-menu-item
                  v-else
                  :index="menuItem.name"
                  @click="toRoute(menuItem)">
                  <span slot="title">{{menuItem.title}}</span>
                </el-menu-item>
              </div>
            </template>
          </el-menu>
        </el-aside>
        <el-main class="app-main" :class="{'out-visit':outVisit}">
          <transition name="fade-transform"
                      mode="out-in">
            <router-view/>
          </transition>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
import config from '@/config/viewConfig'
export default {
  name: 'layout1',
  data () {
    return {
      activeName: '',
      loading: false,
      outVisit: false,
      projectName: config.projectName,
      citySwitch: config.citySwitch,
      cityQueryStr: ''
    }
  },
  computed: {
    ...mapState([
      'userName',
      'roleName',
      'currentCityName',
      'allCityList'
    ]),
    ...mapGetters([
      'authRouterConfig'
    ]),
    cityList () {
      const queryStr = this.cityQueryStr
      if (!queryStr) {
        return this.$store.state.allCityList
      } else {
        return this.$store.state.allCityList.filter(cityItem => {
          return cityItem.name.indexOf(queryStr) !== -1
        })
      }
    }
  },
  created () {
    this.outVisit = document.location.href.includes('out_visit=true')
    const currentRoute = this.$route
    this.unRegisterAfterEachFn = this.$router.afterEach(to => {
      this.navToRoute(to)
    })
    this.navToRoute(currentRoute)
  },
  methods: {
    navToRoute (currentRoute) {
      if (currentRoute) {
        this.activeName = currentRoute.name
      }
    },
    toRoute (subMenu) {
      if (subMenu.meta && subMenu.meta.href) {
        location.href = subMenu.meta.href
      }
      const toRoutePath = subMenu.path
      if (toRoutePath) {
        this.$router.push({ path: toRoutePath })
      }
    },
    hideLoading () {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.loading = false
          resolve()
        }, 1000)
      })
    },
    // 退出登录
    logout () {
      this.loading = true
      this.$store
        .dispatch('logOut')
        .then(res => {
          const data = res.data
          document.location.href = data
        })
        .catch(err => {
          console.log(err)
          this.hideLoading().then(() => {
            this.$message.error('退出系统错误')
          })
        })
    },
    // 切换城市
    switchCity (cityId) {
      this.loading = true
      const cityListEl = this.$refs.citySelect && this.$refs.citySelect.$el
      if (cityListEl) {
        cityListEl.style.display = 'none'
      }
      this.$store
        .dispatch('switchCity', cityId)
        .then(() => {
          this.hideLoading().then(() => {
            document.location.reload()
          })
        })
        .catch(err => {
          console.log(err)
          this.$message.error('切换城市错误')
          this.hideLoading()
        })
    }
  },
  destroyed () {
    if (this.unRegisterAfterEachFn) {
      this.unRegisterAfterEachFn()
    }
  }
}
</script>

<style lang="scss">
@import "styles/_mixins.scss";
.app{
  width: 100%;
  height: 100%;
  overflow: hidden;
  &-header{
    user-select: none;
    height: 60px;
    background-color: #01C675;
    padding: 0 20px;
    color: #fff;
    line-height: 60px;
    display: flex;
    a {
      text-decoration: none;
      color: #fff;
    }
    &-title {
      flex: 0 0 auto;
      font-size: 20px;
      margin-left: 15px;
    }
    &-userinfo {
      flex: 1;
      text-align: right;
      font-size: 14px;
      > div {
        display: inline-block;
        margin-right: 20px;
      }
      .name {
        cursor: pointer;
        line-height: 50px;
        text-align: center;
        font-size: 16px;
        width: 50px;
        height: 50px;
        background-color: #fff;
        border-radius: 50%;
        color: #01C675;
        &:hover {
          transform: scale(1.1);
        }
      }
    }
   }
  &-body {
    @include fixed($top: 60px);
    &.out-visit {
      top: 0;
    }
  }
  &-aside{
    @include absolute($right: auto);
    width: 200px !important;
    background: #444E4F;
    overflow-y: auto;
    .el-menu {
      border-right: none;
      .el-menu-item{
        background: transparent !important;
        height: 36px;
        line-height: 36px;
      }
      .el-menu-item:hover{
        color: #33d190 !important;
      }
      .el-submenu__title{
        height: 36px;
        line-height: 36px;
        margin-top: 5px;
        i{
          color: #FFFFFF;
        }
      }
      .el-submenu__title:hover{
        background-color: #33D190 !important;
      }
      .is-opened{
        .el-menu{
          background:#585f60 !important;
        }
      }
    }
    .el-menu--inline{
      .el-menu-item{
        font-size: 13px;
      }
    }
  }
  &-main {
    @include absolute($left: 200px);
    padding: 20px;
    overflow: auto;
    &.out-visit {
      left: 0;
      padding: 0;
    }
  }
}
</style>
