<template>
    <div>
        <div v-show="editStatus">
            <EditPost></EditPost>
        </div>
        <div v-show="!editStatus">
            <AddPost></AddPost>
        </div>
        <div :key="post._id" v-for="post in posts">
            <h2>{{post.title}}</h2>
            <p>{{post.description}}</p>
            <button @click="deletePost(post._id)">Delete</button>
            <button @click="editPost">Edit</button>
        </div>
    </div>
</template>

<script>
    // import Post from "./Post";
    // import {mapGetters} from 'vuex';
    // import {mapActions} from 'vuex';

    import AddPost from "./AddPost";
    import EditPost from "./EditPost";

    export default {
        name: 'Posts',
        components: {AddPost, EditPost},
        created() {
            this.$store.dispatch('fetchPosts');
        },
        computed: {
            posts: function () {
                return this.$store.state.posts;
            },
            editStatus: function () {
                return this.$store.state.editPost;
            }
        },
        methods: {
            deletePost: function (id) {
                this.$store.dispatch(('deletePost'), id);
            },
            editPost: function () {
                this.$store.dispatch(('editPost'), true);
            }
        }

    }
</script>
