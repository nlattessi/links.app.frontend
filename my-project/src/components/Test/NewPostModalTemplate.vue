<template>
    <modal-template :show.sync="show" :on-close="close">
        <div class="modal-header">
            <h3>New Post</h3>
        </div>

        <div class="modal-body">
            <label class="form-label">
                Title
                <input v-model="title" class="form-control">
            </label>
            <label class="form-label">
                Body
                <textarea v-model="body" rows="5" class="form-control"></textarea>
            </label>
        </div>

        <div class="modal-footer text-right">
            <button class="modal-default-button" @click="savePost()">
                Save
            </button>
        </div>
    </modal-template>
</template>

<script>
    import ModalTemplate from './ModalTemplate.vue';
    export default {
        components: { ModalTemplate },
        props: ['show'],
        data: function () {
            return {
                title: '',
                body: ''
            };
        },
        methods: {
            close: function () {
                console.log('close');
                this.show = false;
                this.title = '';
                this.body = '';
            },
            savePost: function () {
                // Insert AJAX call here...
                this.close();
            }
        }
    }
</script>