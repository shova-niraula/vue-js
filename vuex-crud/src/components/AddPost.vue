<template>
    <div>
        <div id="addForm">
            <h4 class="text-primary mt-3"> Add Post</h4>
            <b-form @submit="onSubmit">
                <b-form-group label="Title">
                    <b-form-input
                            id="input-1"
                            type="title"
                            required
                            placeholder="Title" v-model="title"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Description">
                    <b-textarea id="text-area1" type="description" required placeholder="Description" v-model="desc">
                    </b-textarea>
                </b-form-group>
                <b-button type="submit" variant="primary" style="margin-right: 10px" @click="onSubmit">
                    Submit
                </b-button>
                <b-button type="reset" variant="danger">Reset</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "AddPost",
        data() {
            return {
                title: '',
                desc: ''
            }
        },
        created() {
            if (this.$store.state.isAuthenticated === false) {
                this.$router.push({name: 'login'})
            }
        },
        methods: {
            onSubmit: function (event) {
                event.preventDefault();
                this.$store.dispatch(('addPost'), {
                    title: this.title,
                    description: this.desc
                });
                this.title = '';
                this.desc = '';
            }
        }
    }
</script>

<style scoped>

</style>