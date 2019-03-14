<template>
  <div class="layout">
    <Layout>
      <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
        <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
          <div style="height: 64px;background-color:#41c8ff">

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
            <MenuItem name="2-4"><Router-link to="/index/memberManage">社团活动管理</Router-link></MenuItem>
            <MenuItem name="2-5"><Router-link to="/index/memberManage">社团部门管理</Router-link></MenuItem>
          </Submenu>
          <Submenu name="3">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              权限管理
            </template>
            <MenuItem name="3-1">Option 1</MenuItem>
            <MenuItem name="3-2">Option 2</MenuItem>
          </Submenu>
          <Submenu name="4">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>
              审核管理
            </template>
            <MenuItem name="3-1">Option 1</MenuItem>
            <MenuItem name="3-2">Option 2</MenuItem>
          </Submenu>
          <Submenu name="5">
            <template slot="title">
              <Icon type="ios-analytics"></Icon>

            </template>
            <MenuItem name="3-1">Option 1</MenuItem>
            <MenuItem name="3-2">Option 2</MenuItem>
          </Submenu>
        </Menu>
      </Sider>
      <Layout>
        <Header :style="{padding: 0}" class="layout-header-bar" style="display: flex">
          <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '0 20px'}" type="md-menu" size="24"></Icon>
          <!--<breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>-->
        </Header>
        <div class="tags">
          <Tag type="dot" closable color="primary">标签一</Tag>
        </div>
        <Content :style="{margin: '5px 10px 30px', background: '#fff', padding: '12px'}">
          <router-view></router-view>
        </Content>
      </Layout>
    </Layout>
  </div>
</template>

<script>
  import breadcrumbNav from "@/views/components/breadcrumb-nav";
export default {
  components: {
    breadcrumbNav
  },
  data () {
    return {
      isCollapsed: false
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
  methods: {

    collapsedSider () {
      this.$refs.side1.toggleCollapse();
    }
  },

}
</script>

<style scoped>
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
</style>
