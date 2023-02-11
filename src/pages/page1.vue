<script setup lang="ts">
const router = useRouter()
const value = ref({
  name: '2222222222222',
})
</script>

<template>
  <div>
    <div i-carbon-pedestrian text-4xl inline-block />
    <p>Hi</p>
    <p text-sm op50>
      <em>Dynamic route!</em>
    </p>
    <Starport port="my-id" style="height: 200px">
      <TestInput width="500px" :prop="value" />
    </Starport>
    <div>
      <button class="btn m-3 text-sm mt-8" @click="router.back()">
        Back
      </button>
    </div>
  </div>
</template>

<style scoped>
</style>
