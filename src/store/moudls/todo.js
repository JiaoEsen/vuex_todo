import storage from "../../assets/js/localstorage";
import {
    INPUT_CHANGE,
    INIT_LIST,
    ADD_ITEM,
    DEL_ITEM,
    IS_DONE,
    CHANGE_OPTION_KEY,
    CLEAR_TODO
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
        console.log(state);
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
    }
};


export default {
    namespaced: true,
    state,
    getters,
    mutations
}