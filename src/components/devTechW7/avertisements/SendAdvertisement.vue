<template>
    <div class="send-advertisement">
        <h3 class="form__title w7-subtitle montserrat-medium">Send Advertisement</h3>
        <div class="form__group">
            <label class="form__label">Select Applications</label>
            <div class="application-list">
                <div v-for="app in applications" :key="app.id" class="application-item">
                    <input type="checkbox" :id="'app-' + app.id" v-model="selectedApplications" :value="app.id" />
                    <label :for="'app-' + app.id">{{ app.name }}</label>
                </div>
            </div>
        </div>
        <div class="form__group">
            <button type="button" class="form__button btn btn-primary" @click="sendToAll">
                Send to Selected Applications
            </button>
        </div>
        <div class="form__group">
            <label class="form__label">Send to Single Recipient</label>
            <input type="email" v-model="singleRecipient" class="form__input" placeholder="Enter recipient email" />
            <button type="button" class="form__button btn btn-success" @click="sendToSingle">
                Send to Single Recipient
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import { sendAdvertisementToAll, sendAdvertisementToSingle } from "@/services/AdvertisementService";
import { useApplicationStore } from "@/store/application";
import { defineComponent, ref } from "vue";

export default defineComponent({
    name: "SendAdvertisement",
    props: {
        advertisementId: {
            type: Number,
            required: true,
        },
    },

    setup(props) {
        const applicationStore = useApplicationStore();
        const applications = ref(applicationStore.applications);
        const selectedApplications = ref<number[]>([]);
        const singleRecipient = ref<string>("");


        const sendToAll = async () => {
            try {
                for (const appId of selectedApplications.value) {
                    await sendAdvertisementToAll(appId, props.advertisementId);
                }
                alert("Advertisement sent to all selected applications!");
            } catch (error) {
                alert("Failed to send advertisement.");
            }
        };

        const sendToSingle = async () => {
            try {
                await sendAdvertisementToSingle(singleRecipient.value, props.advertisementId);
                alert("Advertisement sent to single recipient!");
            } catch (error) {
                alert("Failed to send advertisement.");
            }
        };

        return {
            applications,
            selectedApplications,
            singleRecipient,
            sendToAll,
            sendToSingle,
        };
    },
});
</script>

<style scoped lang="scss">
@import "@/styles/_variables.scss";

.send-advertisement {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .application-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    .application-item {
        display: flex;
        align-items: center;
        gap: 8px;
    }

    .form__group {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .form__button {
        width: 100%;
        padding: 12px;
        font-size: 16px;
        border-radius: 4px;
    }
}
</style>
