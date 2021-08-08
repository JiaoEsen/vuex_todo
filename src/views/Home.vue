<template>
  <div class="home">
    {{ list }}
    <el-header>
      <el-input
        placeholder="请输入内容"
        @input="inputChange"
        :value="inputVal"
        clearable
      >
      </el-input>
      <el-button type="primary" @click="addItem">确认</el-button>
    </el-header>
    <div class="box">
      <div v-show="list.length === 0">暂无代办</div>
      <div v-for="d in fliterListD" :key="d.id">
        <el-checkbox :value="d.done" @change="doneChange(d.id)">{{
          d.text
        }}</el-checkbox>
        <el-button
          type="danger"
          icon="el-icon-delete"
          @click="delItem(d.id)"
          circle
        ></el-button>
      </div>
    </div>
    <h3>剩余{{ doneLength }}条代办</h3>
    <el-row>
      <div @click="filterList">
        <el-button type="primary" @click.stop="filterList('all')"
          >全部</el-button
        >
        <el-button type="primary" @click.stop="filterList('true')"
          >已完成</el-button
        >
        <el-button type="primary" @click.stop="filterList('false')"
          >未完成</el-button
        >
      </div>
    </el-row>
    <el-row>
      <div>
        <el-button type="primary" @click="cleartTodo">清空代办</el-button>
      </div>
    </el-row>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import storage from "../assets/js/localstorage.js";
export default {
  data() {
    return {
      oKey: "all",
    };
  },
  watch: {
    list: {
      deep: true,
      handler() {
        storage.set("vuex_todo", this.list);
      },
    },
  },
  methods: {
    inputChange(e) {
      this.$store.commit("todo/INPUT_CHANGE", e);
    },
    addItem() {
      if (this.$store.state.inputVal === "") {
        this.$message({
          message: "内容不能为空",
          type: "warning",
        });
        return;
      }
      this.$store.commit("todo/ADD_ITEM", this.inputVal);
    },
    delItem(id) {
      this.$store.commit("todo/DEL_ITEM", id);
    },
    doneChange(id) {
      this.$store.commit("todo/IS_DONE", id);
    },
    filterList(key) {
      this.$store.commit("todo/CHANGE_OPTION_KEY", key);
    },
    cleartTodo() {
      this.$store.commit("todo/CLEAR_TODO");
    },
  },
  computed: {
    ...mapState({
      list: (state) => state.todo.list,
      inputVal: (state) => state.todo.inputVal,
    }),
    ...mapGetters("todo", {
      doneLength: "doneLength",
      fliterListD: "fliterListD",
    }),
  },
};
</script>

<style lang="sass" scoped>
.box
  padding: 50px
</style>
