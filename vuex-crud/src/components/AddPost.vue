<template>
    <div>
        <div id="addForm">
            <h5>Add new Post</h5>
            <b-form v-on:submit.prevent="onSubmit">
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
                <b-button type="submit" variant="primary" style="margin-right: 10px">
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
        methods: {
            onSubmit: function () {
                this.$store.dispatch(('addPost'), {
                    title: this.title,
                    description: this.desc
                });
            }
        }
    }
</script>

<style scoped>

</style>