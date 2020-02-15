import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(Vuex);
let url = 'https://arun-express-api.herokuapp.com/posts';

export const store = new Vuex.Store({
    state: {
        editPost: false,
        posts: []
    },
    mutations: {
        fetchPosts: (state, posts) => {
            state.posts = posts;
        },
        editPost(state, status) {
            state.editPost = status;
        },
        addPost(state, data) {
            state.posts = [...state.posts, data];
        },
        deletePost(state, id) {
            state.posts = state.posts.filter((post) => {
                return post._id !== id;
            })
        }
    },
    actions: {
        /**
         * Initial API call to fetch data
         * @param context
         */
        fetchPosts(context) {
            Vue.axios.get(url)
                .then(res => {
                    context.commit('fetchPosts', res.data);
                });
        },
        /**
         * Trigger edit state change
         * @param context
         */
        editPost(context, status) {
            context.commit('editPost', status);
        },
        addPost(context, data) {
            data = JSON.stringify(data)
            Vue.axios.post(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then(res => {
                if (res) {
                    context.commit('addPost', res.data.record);
                }
            })
        },
        deletePost(context, id) {
            Vue.axios.delete(url, {
                    data: {
                        _id: id
                    }
                }
            ).then(res => {
                if (res) {
                    context.commit('deletePost', id);
                }
            });

        }
    }
});
