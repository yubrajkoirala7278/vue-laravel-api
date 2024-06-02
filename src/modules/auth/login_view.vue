<script setup>
import { useAuth } from "./store";
import { reactive } from "vue";

const authenticateUser = useAuth();
const data = reactive({
    'email': null,
    'password': null,
});

async function submit() {
    const response = await authenticateUser.loginUser(data);
}
</script>

<template>
    <v-form @submit.prevent="submit">
        <v-container>
            <v-row>
                <v-col cols="12" md="4">
                    <v-text-field v-model="data.email" label="Email" required></v-text-field>
                </v-col>

                <v-col cols="12" md="4">
                    <v-text-field v-model="data.password" label="Password" required></v-text-field>
                </v-col>
                <v-col cols="12" md="4">
                    <v-btn type="submit">Submit</v-btn>
                </v-col>
            </v-row>
        </v-container>
    </v-form>
</template>
