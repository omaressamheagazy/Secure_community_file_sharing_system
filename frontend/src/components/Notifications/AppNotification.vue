<script setup lang="ts">
import NotificationElement from './NotificationElement.vue';
const successIcon = ` <svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM16.6667 28.3333L8.33337 20L10.6834 17.65L16.6667 23.6166L29.3167 10.9666L31.6667 13.3333L16.6667 28.3333Z" />
                        </svg>`
const genericIcon = `<svg class="w-6 h-6 text-white fill-current" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
            <slot></slot>
            <path
                d="M20 3.33331C10.8 3.33331 3.33337 10.8 3.33337 20C3.33337 29.2 10.8 36.6666 20 36.6666C29.2 36.6666 36.6667 29.2 36.6667 20C36.6667 10.8 29.2 3.33331 20 3.33331ZM21.6667 28.3333H18.3334V25H21.6667V28.3333ZM21.6667 21.6666H18.3334V11.6666H21.6667V21.6666Z" />
        </svg>`
</script>
<template>
    <NotificationGroup group="app">
        <div class="fixed inset-0 flex items-start justify-end p-6 px-4 py-6 pointer-events-none z-9999">
            <div class="w-full max-w-sm">
                <Notification v-slot="{ notifications }" enter="transform ease-out duration-300 transition"
                    enter-from="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-4"
                    enter-to="translate-y-0 opacity-100 sm:translate-x-0" leave="transition ease-in duration-500"
                    leave-from="opacity-100" leave-to="opacity-0" move="transition duration-500" move-delay="delay-300">
                    <div v-for="notification in notifications" :key="notification.id">
                        <div v-if="notification.type === 'info'"
                            class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md">
                            <NotificationElement :icon="genericIcon"  :title="notification.title" :text="notification.text"
                                color="blue-500" />

                        </div>
                        <div class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md"
                            v-if="notification.type === 'error'">
                            <NotificationElement :icon="genericIcon"   :title="notification.title" :text="notification.text" color="red" />
                        </div>

                        <div class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md"
                            v-if="notification.type === 'warning'">
                            <NotificationElement :icon="genericIcon"  :title="notification.title" :text="notification.text"
                                color="yellow-500">
                            </NotificationElement>
                        </div>
                        <div class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md"
                            v-if="notification.type === 'warning'">
                            <NotificationElement :icon="genericIcon" :title="notification.title" :text="notification.text"
                                color="yellow-500">
                            </NotificationElement>
                        </div>
                        <div class="flex w-full max-w-sm mx-auto mt-4 overflow-hidden bg-white rounded-lg shadow-md"
                            v-if="notification.type === 'success'">
                            <NotificationElement :icon="successIcon" :title="notification.title" :text="notification.text"
                                color="green-500">
                            </NotificationElement>

                        </div>

                    </div>
                </Notification>
            </div>
        </div>
    </NotificationGroup>
</template>