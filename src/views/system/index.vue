<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <div class="header-name">
            <p>社团管理</p>
          </div>
          <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
            <Router-link to="/index/userIndex">
              <span>用户管理</span>
            </Router-link>
          </MenuItem>
          <Submenu name="2">
            <template slot="title">
              <Icon type="ios-keypad"></Icon>
              社团管理
            </template>
            <MenuItem name="2-1"><Router-link to="/index/assnManage">我的社团</Router-link></MenuItem>
            <MenuItem name="2-2"><Router-link to="/index/announcementManage">社团公告管理</Router-link></MenuItem>
            <MenuItem name="2-3"><Router-link to="/index/memberManage">社团成员管理</Router-link></MenuItem>
            <MenuItem name="2-4"><Router-link to="/index/activityManage">社团活动管理</Router-link></MenuItem>
            <MenuItem name="2-5"><Router-link to="/index/departManage">社团部门管理</Router-link></MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              权限管理
            </template>
            <Router-link to="/index/identityChange">
              <MenuItem name="3-1">修改密码</MenuItem>
            </Router-link>
            <Router-link to="/index/identityChange">
              <MenuItem name="3-2">身份变更</MenuItem>
            </Router-link>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              审核管理
            </template>
            <MenuItem name="3-1">入团申请</MenuItem>
            <MenuItem name="3-1">建团申请</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar" style="display: flex">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
          <p><Router-link to="/index/web" style="color: #999">返回前端</Router-link></p>
        </Header>
        <Content :style="{margin: '12px 15px 30px', background: '#fff', padding: '25px 12px',borderRadius: '5px', border: '1px solid #dcdee2'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
export default {
  components: {
  },
  data () {
    return {
      isCollapsed: false,
    }
  },
  computed: {
    rotateIcon () {
      return [
        'menu-icon',
        this.isCollapsed ? 'rotate-icon' : ''
      ];
    },
    menuitemClasses () {
      return [
        'menu-item',
        this.isCollapsed ? 'collapsed-menu' : ''
      ]
    }
  },
  created() {

  },

  methods: {

    collapsedSider () {
      this.$refs.side1.toggleCollapse();
    }
  },

}
</script>

<style lang="less" scoped>
  .header-name {
    p {
      width: 72%;
      font-size: 19px;
      font-weight: 600;
      background-color: #2d8cf0;
      padding: 5px 28px;
      color: #fff;
      letter-spacing: 3px;
      border-radius: 10px;
      margin: 10px auto;
    }
  }
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    height: 100%;
  }
  .layout-header-bar{
    background: #fff;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
  }
  .layout-logo-left{
    width: 90%;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    margin: 15px auto;
  }
  .menu-icon{
    transition: all .3s;
  }
  .rotate-icon{
    transform: rotate(-90deg);
  }
  .menu-item span{
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width .2s ease .2s;
  }
  .menu-item i{
    transform: translateX(0px);
    transition: font-size .2s ease, transform .2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span{
    width: 0px;
    transition: width .2s ease;
  }
  .collapsed-menu i{
    transform: translateX(5px);
    transition: font-size .2s ease .2s, transform .2s ease .2s;
    vertical-align: middle;
    font-size: 22px;
  }
  .ivu-layout {
    height: 100%;
  }
  .tags {
    margin: 5px 20px 0 20px;
  }
  .ivu-layout-sider,
  .ivu-layout-sider-zero-width-trigger,
  .ivu-menu,
  .ivu-menu-dark {
    background-color: #001529;
  }
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened,
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title,
  .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu-title:hover {
    background-color: #000c17;
  }

</style>
