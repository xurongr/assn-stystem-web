<template>
    <div>
      <div class="search-user">
        <Steps :current="1">
          <Step title="按条件查找用户" icon="md-search"></Step><Icon type="md-search" />
          <Step title="点击添加成员" icon="md-add"></Step>
          <Step title="确认添加" icon="md-checkmark"></Step>
        </Steps>
        <Row>
          <Col span="3">
            按照：
            <Select v-model="sortValue" style="width:140px">
              <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
            </Select>
          <Icon type="md-arrow-forward" />
          </Col>
          <Col span="5">
            <Input search enter-button="查找" placeholder="输入要查找的内容" />
          </Col>
        </Row>
      </div>
      <div class="seach-info">
        <Table border ref="selection" :columns="columns4" :data="userInfo"></Table>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              sortList: [
                {
                  value: 'name',
                  label: '姓名'
                },
                {
                  value: 'userName',
                  label: '用户名（学号）'
                },
              ],    //查找条件
              sortValue: '',
              columns4: [
                {
                  title: '用户名',
                  key: 'userName'
                },
                {
                  title: '姓名',
                  key: 'name'
                },
                {
                  title: '性别',
                  key: 'sex'
                },
                {
                  title: '年级',
                  key: 'grade'
                },
                {
                  title: '专业',
                  key: 'major'
                },
                {
                  title: '联系方式',
                  key: 'telNumber'
                },
                {
                  title: '操作',
                  key: 'action',
                  width: 200,
                  align: 'center',
                  render: (h, params) => {
                    return h('div', [
                      h('Button', {
                        props: {
                          type: 'error',
                          size: 'small'
                        },
                        on: {
                          click: () => {
                            console.log('--paramas.row--', params.row)
                          }
                        }
                      }, '添加社员')
                    ]);
                  }
                }
              ],
            }
        },

        created() {

        },

        methods: {},
    }
</script>

<style lang="less" scoped>
.search-user {

}
</style>
