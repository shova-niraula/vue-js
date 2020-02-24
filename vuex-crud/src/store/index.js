import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
Vue.use(Vuex);
/**
 * API URI
 */
let url = 'http://localhost:3000/posts';
let userUri = 'http://localhost:3000/user';

export const store = new Vuex.Store({
    state: {
        editPost: false,
        editPostRec: {},
        posts: [],
        filterPosts: [],
        searchText: '',
        spinner: true,
        token: '',
        isAuthenticated: false
    },
    mutations: {
        /**
         * @param state
         * @param data
         */
        saveToken: (state, data) => {
            state.isAuthenticated = true;
            state.token = data.token;
            localStorage.setItem('token', data.token);
        },
        /**
         * Fetch post mutation
         * @param state
         * @param posts
         */
        fetchPosts: (state, posts) => {
            state.posts = posts;
            if (state.filterPosts.length === 0) {
                state.filterPosts = posts;
            }
            // call filter
            store.commit('fetchFilterPosts');
            state.spinner = false;
        },
        fetchFilterPosts: (state) => {
            if (!state.searchText) {
                state.filterPosts = state.posts;
            } else {
                state.filterPosts = state.posts.filter(post => {
                    return post.title.toLowerCase().indexOf(state.searchText) !== -1 ||
                        post.description.toLowerCase().indexOf(state.searchText) !== -1;
                })
            }
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

    },
    actions: {
        addUser(context, data) {
            Vue.axios.post(userUri + "/add", data).then(res => {
                if (res) {
                    if (res.status === 200) {
                        return res.data;
                    }
                }
            })
        },

        /**
         * Login should be async await.
         * @param context
         * @param username
         * @param password
         */
        async findUser(context, data) {
            await Vue.axios.post(userUri + "/find", data)
                .then(res => {
                    context.commit('saveToken', res.data);
                });
        },
        /**
         * Initial API call to fetch data
         * @param context
         */
        fetchPosts(context) {
            context.state.spinner = true;
            Vue.axios.get(url, {headers: {authorization: `Bearer ${context.state.token}`}})
                .then(res => {
                    context.commit('fetchPosts', res.data);
                })
                .catch((err) => {
                    console.log(err)
                })
            ;
        },
        /**
         * Filter record action
         * @param context
         * @param searchText
         */
        fetchFilterPosts(context) {
            context.commit('fetchFilterPosts');
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
                        authorization: `Bearer ${context.state.token}`
                    }
                }
            ).then(res => {
                if (res) {
                    context.dispatch('fetchPosts').then(r => {
                        console.log(r);
                    });


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
                        authorization: `Bearer ${context.state.token}`
                    }
                }
            ).then(res => {
                if (res) {
                    context.dispatch('fetchPosts').then(r => {
                        console.log(r);
                    });
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
                    headers: {
                        'Content-Type': 'application/json',
                        authorization: `Bearer ${context.state.token}`
                    },
                    data: {
                        _id: id
                    }
                }
            ).then(res => {
                if (res) {
                    context.dispatch('fetchPosts').then(r => {
                        console.log(r);
                    });
                }
            });
        }
    }
});
