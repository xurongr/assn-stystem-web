<template>
    <div class="webIndex">
      <div class="c-tips">
        <Card :bordered="false">
          <p slot="title" style="font-size: 18px;">社团成立申请所需材料</p>
          <p>1、面向校里的申请书 <span>（要写明成立的必要性、意义......）；</span></p>
          <p>2、面向院里的申请书 <span>（例：申请挂名于**院。需要院里的盖章）；</span></p>
          <p>3、社团章程 <span>（必须标明遵守宁德师范学院学生社团管理条例、宁德师范学院规章制度；
            服从宁德师范学院校团委、学生社团联合会的领导；社团组织成员换届参选资格及选举过程、结果接受学生社团联合会监督和审核）；</span></p>
          <p>4、填写社团成立申请表、社团登记表 <span>（均需盖章）；</span></p>
          <p>5、指导老师和申请人的个人简历；</p>
          <p>6、社团成员不少于20人，并附上具体名单；</p>
          <p>7、材料放在文件夹里，形成正式文件。</p>
          <p>8、联系社团负责人，将材料发给学校社团管理员。<span style="font-size: 18px">QQ群：1004956347</span></p>
        </Card>
      </div>
      <Divider />
      <div class="upload-file">
        <Card :bordered="false">
          <p slot="title" style="font-size: 18px;">宁德师院学生社团登记表</p>
          <p>
            http://localhost:8082/upload_tmp/2019-04-14/doc/1555177703832-社团登记表 （模板）.doc
            <a href="http://localhost:8082/upload_tmp/2019-04-14/doc/1555177703832-社团登记表 （模板）.doc" style="padding-left: 10px">
              <Button type="error">点此下载社团登记表（模板）</Button>
            </a>
          </p>
          <p>
            http://localhost:8082/upload_tmp/2019-04-14/doc/1555177695857-社团登记表.doc
            <a href="http://localhost:8082/upload_tmp/2019-04-14/doc/1555177695857-社团登记表.doc" style="padding-left: 10px">
              <Button type="info">点此下载社团登记表（空白版）</Button>
            </a>
          </p>
          <p>
            http://localhost:8082/upload_tmp/2019-04-14/doc/1555177684144-社团申请表.doc
            <a href="http://localhost:8082/upload_tmp/2019-04-14/doc/1555177684144-社团申请表.doc" style="padding-left: 10px">
              <Button type="info">点此下载社团申请表（空白版）</Button>
            </a>
          </p>
        </Card>
      </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {}
        },

        methods: {}
    }
</script>

<style lang="less" scoped>
  .webIndex {
    width: 75%;
    margin: 10px auto;
    text-align: left;
    .c-tips {
      background:#eee;padding: 20px;
      p {
        font-size: 15px;
        line-height: 25px;
        span {
          color: red;
        }
      }
    }
    .upload-file {
      background:#eee;padding: 20px;
      p {
        font-size: 15px;
        line-height: 25px;
        margin-bottom: 10px;
      }
    }
  }
</style>
