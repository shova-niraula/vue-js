<template>
    <div>
        <h3> Edit Post</h3>
        <div id="addForm">
            <b-form v-on:submit.prevent="onSubmit">
                <b-form-group label="Title">
                    <b-form-input
                            id="input-1"
                            type="title"
                            required
                            placeholder="Title"
                    ></b-form-input>
                </b-form-group>
                <b-form-group label="Description">
                    <b-textarea id="text-area1" type="description" required placeholder="Description">
                    </b-textarea>
                </b-form-group>
                <b-button type="submit" variant="primary" style="margin-right: 10px">
                    Submit
                </b-button>
                <b-button type="reset" variant="danger" @click="hideEditForm">Cancel</b-button>
            </b-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "EditPost",
        methods: {
            hideEditForm: function () {
                this.$store.dispatch(('editPost'), false);
            }
        }
    }
</script>

<style scoped>

</style>