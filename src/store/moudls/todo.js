// import axios from "axios";
// import axios from "axios";
import axios from "axios";
import storage from "../../assets/js/localstorage";
import {
    INPUT_CHANGE,
    INIT_LIST,
    ADD_ITEM,
    DEL_ITEM,
    IS_DONE,
    CHANGE_OPTION_KEY,
    CLEAR_TODO,
    GET_LIST
} from "../type/mutations-type.js";

const state = {
    inputVal: '',
    list: storage.get('vuex_todo'),
    todoId: 0,
    optionKey: 'all'
};


const getters = {
    doneLength: state => {
        return state.list.filter(i => !i.done).length;
    },
    fliterListD: (state) => {
        if (state.optionKey === 'all') {
            return state.list
        }
        if (state.optionKey === 'true') {
            return state.list.filter(i => i.done);
        }
        if (state.optionKey === 'false') {
            return state.list.filter(i => !i.done);
        }
        return state.list;
    }
};

const mutations = {
    // [INIT_LIST] (state, val) {
    //     console.log(state, val);
    //     axios.get();
    // },
    [INPUT_CHANGE](state, val) {
        state.inputVal = val;
    },
    [INIT_LIST](state, list) {
        state.list = list;
    },
    // 添加一条代办
    [ADD_ITEM](state, text) {
        const obj = {
            id: +new Date(),
            text: text,
            done: false
        };
        state.list.push(obj);
        state.todoId += 1;
        state.inputVal = '';
    },
    // 删除一条代办
    [DEL_ITEM](state, id) {
        const _index = state.list.findIndex(i => i.id === id);
        state.list.splice(_index, 1);
    },
    // 完成一条代办
    [IS_DONE](state, id) {
        const _index = state.list.findIndex(i => i.id === id);
        state.list[_index].done = !state.list[_index].done;
    },
    [CHANGE_OPTION_KEY](state, key) {
        state.optionKey = key;
    },
    [CLEAR_TODO](state) {
        state.list = []
    },
    [GET_LIST](){

    }
};

const actions  = {
    // console.log(axios);
    getList({ commit }) {
        console.log(1);
        axios.get('http://127.0.0.1:8888/list').then((res) => {
            console.log(res);
        });
        commit('INIT_LIST', []);
    }
}


export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}

/* 
    地三鲜盖饭
    红烧鸡块盖饭
*/