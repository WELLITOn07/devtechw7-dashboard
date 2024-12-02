<template>
    <form @submit.prevent="handleSave" class="application-form w7-padding">
        <h3 class="form__title w7-subtitle montserrat-medium">Application Form</h3>
        <div v-for="(application, index) in formData" :key="index" class="form__section">
            <div class="form__group">
                <label for="name" class="form__label">Name</label>
                <input type="text" id="name" v-model="application.name" class="form__input"
                    placeholder="Enter Application Name" />
            </div>
            <div class="form__group">
                <label for="description" class="form__label">Description</label>
                <textarea id="description" v-model="application.description" class="form__input form__textarea"
                    placeholder="Enter Description"></textarea>
            </div>
            <div class="form__group">
                <label for="controllers" class="form__label">Controllers</label>
                <input type="text" id="controllers" v-model="controllersStrings[index]" class="form__input"
                    placeholder="Comma-separated Controllers" />
            </div>
            <div class="form__group">
                <label for="allowedRoles" class="form__label">Allowed Roles</label>
                <input type="text" id="allowedRoles" v-model="allowedRolesStrings[index]" class="form__input"
                    placeholder="Comma-separated Allowed Roles" />
            </div>
        </div>
        <button type="submit" class="form__button btn w7-padding">Save</button>
    </form>
</template>

<script lang="ts">
import { Application } from "@/models/application.model";
import { defineComponent, PropType } from "vue";

export default defineComponent({
    name: "ApplicationForm",
    props: {
        data: {
            type: Object as PropType<{ data: Application[] }>,
            required: true,
        },
    },
    data() {
        return {
            formData: JSON.parse(JSON.stringify(this.data.data)), // Clona os dados para edição
            controllersStrings: this.data.data.map((app) =>
                app.controllers.join(", ")
            ),
            allowedRolesStrings: this.data.data.map((app) =>
                app.allowedRoles.join(", ")
            ),
        };
    },
    methods: {
        handleSave() {
            // Atualiza controllers e allowedRoles antes de enviar
            this.$emit("save", this.formData);
        },
    },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.application-form {
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: $oxford-blue;
    border-radius: 8px;
    padding: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);

    .form__title {
        color: $mikado-yellow;
        margin-bottom: 12px;
    }

    .form__section {
        display: flex;
        flex-direction: column;
        gap: 16px;
        padding: 16px;
        border: 1px solid $yale-blue;
        border-radius: 8px;
        background-color: $rich-black;
    }

    .form__group {
        display: flex;
        flex-direction: column;
        gap: 8px;

        .form__label {
            font-size: 14px;
            font-weight: bold;
            color: $white;
        }

        .form__input {
            width: 100%;
            padding: 10px;
            border-radius: 4px;
            border: 1px solid $yale-blue;
            background-color: $rich-black;
            color: $white;

            &.form__textarea {
                height: 80px;
                resize: none;
            }
        }
    }

    .form__button {
        background-color: $mikado-yellow;
        color: $rich-black;
        border: none;
        cursor: pointer;
        font-weight: bold;
        transition: background-color 0.2s;

        &:hover {
            background-color: $gold;
        }
    }
}
</style>
