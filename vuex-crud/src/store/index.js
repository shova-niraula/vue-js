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
        posts: [],
        filterPosts: [],
        searchText: ''
    },
    mutations: {
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
