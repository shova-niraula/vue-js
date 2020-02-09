<template>
    <div id="app" class="container">
        <h2 align="center">CRUD Operation using Vue JS</h2>
        <div v-show="!isEditPost">
            <AddPost v-on:addPost="addPost"></AddPost>
        </div>
        <div v-show="isEditPost">
            <EditPost v-bind:editPost="editPost" v-on:updatePost="updatePost"
                      v-on:cancelUpdate="cancelUpdate"></EditPost>
        </div>
        <Posts v-bind:posts="posts" v-bind="isEditPost" v-on:deletePost="deletePost"
               v-on:setEditStatus="setEditStatus"></Posts>
    </div>
</template>

<script>
    import Posts from './components/Posts'
    import axios from 'axios'
    import AddPost from "./components/AddPost";
    import EditPost from "./components/EditPost";
    import 'bootstrap/dist/css/bootstrap.css'
    import 'bootstrap-vue/dist/bootstrap-vue.css'

    let url = 'https://arun-express-api.herokuapp.com/posts';
    export default {
        name: "app",
        components: {
            EditPost,
            AddPost,
            Posts
        },
        data() {
            return {
                posts: this.posts,
                isEditPost: false,
                editPost: {
                    _id: '',
                    title: '',
                    description: ''
                }
            }
        },
        created: function () {
            this.fetchPosts();
        },
        methods: {
            setEditStatus: function (editPost) {
                this.isEditPost = true;
                this.editPost = editPost
            },
            cancelUpdate: function () {
                this.isEditPost = false;
                this.editPost = {
                    _id: '',
                    title: '',
                    description: ''
                }
            },
            updatePost: function (updatedPost) {
                let data = JSON.stringify({
                    _id: updatedPost._id,
                    title: updatedPost.title,
                    description: updatedPost.description
                })
                axios.put(url, data, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                ).then(res => {
                    if (res) {
                        this.fetchPosts();
                        this.cancelUpdate();
                    }
                })
            },
            fetchPosts: function () {
                axios.get(url)
                    .then(res => {
                        this.posts = res.data
                    });
            },
            addPost: function (title, desc) {
                let data = JSON.stringify({
                    title: title,
                    description: desc
                })
                axios.post(url, data, {
                        headers: {
                            'Content-Type': 'application/json',
                        }
                    }
                ).then(res => {
                    if (res) {
                        this.fetchPosts();
                    }
                })
            },
            deletePost: function (id) {
                axios.delete(url, {
                        data: {
                            _id: id
                        }
                    }
                ).then(res => {
                    if (res) {
                        this.posts = this.posts.filter((post) => {
                            return post._id !== id;
                        })
                    }
                });

            }
        }
    }

</script>
<style>
    [v-cloak] {
        display: none;
    }

    .container {
        margin-bottom:20px;
    }
</style>
