<script setup lang="ts">
    import { ref } from "vue";
    const msg = ref("Here's another page")
</script>

<template>
    <div class="example">
        <h1>{{ msg }}</h1>
    </div>
</template>

<style>
@media (min-width: 1024px) {
    .example {
        min-height: 100vh;
        display: flex;
        align-items: center;
    }
}
</style>