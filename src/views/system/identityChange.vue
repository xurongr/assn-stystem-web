<template>
    <div>
      <!--加一个选择，更换会长还是更换部长-->
      <div class="ident-change">
        更换
        <Select v-model="identValue" style="width:150px;margin-bottom: 10px">
          <Option v-for="item in identSort" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </div>
      <div>
        <div>
          选择社团：
          <Select v-model="associationId" style="width:150px;margin-bottom: 10px">
            <Option v-for="item in sortAssnList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
        </div>
        <div>
          选择部门：
          <Select v-model="departmentId" style="width:150px;margin-bottom: 10px">
            <Option v-for="item in departList" :value="item.value" :key="item.value">{{ item.label }}</Option>
          </Select>
          <Button type="primary">获取部门成员列表</Button>
          <!--列表的操作是更换身份-->
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              assnInfo: [],
              sortAssnList: [],  //社团列表
              associationId: null,
              pageNo: 1,
              departInfo: [],
              departList: [],    //某社团下的部门列表
              departmentId: null,
              pageNo1:1,
              identValue: '',    //选择更换的身份
              identSort: [
                {
                  value: '1',
                  label:'会长'
                },
                {
                  value: '2',
                  label:'部长'
                }
              ],
            }
        },

      created() {
          this.getInfo();
          this.getDepartList();
      },

        methods: {
          //获取社团列表
          getInfo() {
            let that = this;
            let url = that.BaseConfig + '/selectAssociationAll';
            let params = {
              pageNo: that.pageNo,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                if(data.retCode ===0) {
                  that.assnInfo = that.assnInfo.concat(data.data.data);
                  if(that.assnInfo.length < data.data.total) {
                    that.pageNo++;
                    that.getInfo();
                  }
                  that.assnInfo.map(item => {
                    that.sortAssnList.push({
                      value: item.id,
                      label: item.associationName,
                    })
                  })
                } else {
                  that.$Message.error(data.retMsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

          //获取部门列表
          getDepartList() {
            let that = this;
            let url = that.BaseConfig + '/selectDepartmentAll';
            let params = {
              associationId: '',
              pageNo: that.pageNo1,
              pageSize: 10,
            };
            let data = null;
            that
              .$http(url, params, data, 'get')
              .then(res => {
                data = res.data;
                console.log('--获取部门列表--', data);
                if(data.retCode ===0) {
                  that.departInfo =that.departInfo.concat(data.data.data);
                  if(that.departInfo <data.data.total) {
                    that.pageNo1++;
                    that.getDepartList();
                  }
                  that.departInfo.map(item=> {
                    that.departList.push({
                      value: item.id,
                      label: item.departmentName,
                    })
                  })
                } else {
                  that.$Message.error(data.retsg);
                }
              })
              .catch(err => {
                that.$Message.error('请求错误');
              })
          },

        }
    }
</script>

<style lang="less" scoped>
.ident-change {
  text-align: center;
  font-size: 25px;
  letter-spacing: 1px;
}
</style>
