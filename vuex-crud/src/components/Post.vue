<template>
    <div>
        <h5>
            {{post.title}}
        </h5>
        <p>
            {{post.description}}
        </p>
    </div>

</template>

<script>
    export default {
        name: "Post",
        data() {
            return {
                post: {}
            }
        },
        created() {
            this.$store.state.posts.forEach(post => {
                if (post._id == this.$route.params.id) {
                    this.post = post;
                }
            })
        }
    }
</script>

<style scoped>

</style>