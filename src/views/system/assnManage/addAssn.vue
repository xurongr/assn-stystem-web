<template>
    <div class="addAssn">
      <Form :model="formItem" :label-width="80">
        <FormItem label="Input">
          <Input v-model="formItem.input" placeholder="Enter something..."></Input>
        </FormItem>
        <FormItem label="Select">
          <Select v-model="formItem.select">
            <Option value="beijing">New York</Option>
            <Option value="shanghai">London</Option>
            <Option value="shenzhen">Sydney</Option>
          </Select>
        </FormItem>
        <FormItem label="创建时间">
          <Row>
            <Col span="11">
            <DatePicker type="date" placeholder="Select date" v-model="formItem.date"></DatePicker>
            </Col>
            <Col span="2" style="text-align: center"></Col>
          </Row>
        </FormItem>
        <FormItem label="招募状态">
          <RadioGroup v-model="formItem.radio">
            <Radio label="male">开启</Radio>
            <Radio label="female">关闭</Radio>
          </RadioGroup>
        </FormItem>
        <FormItem label="Slider">
          <Slider v-model="formItem.slider" range></Slider>
        </FormItem>
        <FormItem label="社团简介">
          <Input v-model="formItem.textarea" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="社团简介..."></Input>
        </FormItem>
        <FormItem>
          <Button type="primary">创建</Button>
          <Button style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
              formItem: {
                input: '',
                select: '',
                radio: 'male',
                checkbox: [],
                switch: true,
                date: '',
                time: '',
                slider: [20, 50],
                textarea: ''
              }
            }
        },

        created() {

        },

        methods: {},
    }
</script>

<style lang="less" scoped>

</style>
