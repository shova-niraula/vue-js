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
        editPostRec: {},
        posts: []
    },
    mutations: {
        /**
         * Fetch post mutation
         * @param state
         * @param posts
         */
        fetchPosts: (state, posts) => {
            state.posts = posts;
        },
        /**
         * Edit post mutation
         * @param state
         * @param rec
         */
        editPost(state, rec) {
            state.editPost = rec.status;
            state.editPostRec = {
                _id: rec.editRecord._id,
                title: rec.editRecord.title,
                description: rec.editRecord.description
            };

        },
        /**
         * Add new post mutation
         * @param state
         * @param data
         */
        addPost(state, data) {
            state.posts = [...state.posts, data];
        },
        /**
         * Delete new post mutation
         * @param state
         * @param id
         */
        deletePost(state, id) {
            state.posts = state.posts.filter((post) => {
                return post._id !== id;
            })
        },
        /**
         * Update post mutation
         * @param state
         */
        saveEditedRecord(state) {
            let updatedArr = [];
            state.posts.forEach((post) => {
                if (post._id === state.editPostRec._id) {
                    post.title = state.editPostRec.title;
                    post.description = state.editPostRec.description;
                }
                updatedArr.push(post);
            })
            state.posts = updatedArr;
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
        editPost(context, status, editPostRec) {
            context.commit('editPost', status, editPostRec);
        },
        /**
         * Add new post action
         * @param context
         * @param data
         */
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
        /**
         * Record update action
         * @param context
         */
        saveEditedRecord(context) {

            let data = JSON.stringify({
                _id: this.state.editPostRec._id,
                title: this.state.editPostRec.title,
                description: this.state.editPostRec.description
            })
            axios.put(url, data, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            ).then(res => {
                if (res) {
                    context.commit('saveEditedRecord');
                }
            })
        },
        /**
         * Delete action
         * @param context
         * @param id
         */
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
