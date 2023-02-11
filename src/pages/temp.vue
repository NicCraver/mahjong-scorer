<script setup lang="ts">
const name = $ref('')

const router = useRouter()
const go = () => {
  router.push('/page1')
}
</script>

<template>
  <div class="home" h-screen text="white-700 dark:white-200">
    <main>
      <div i-carbon-campsite text-4xl inline-block p="x-4 y-10" />
      <!-- <Footer /> -->
    </main>
    <footer>
      <div class="footer-inner">
        <div flex justify-between p-l-10 p-r-10>
          <div>1</div>
          <div class="middle" bg-white-100>
            1
          </div>
          <div>1</div>
        </div>
      </div>
      <div class="footer-banyuan" />
      <div class="footer-mark" />
      <!-- <div class="footer-inner">
        12
      </div> -->
    </footer>
  </div>
  <!-- <div relative h-screen bg-blue-100>
    <div i-carbon-campsite text-4xl inline-block p="x-4 y-10" />
    <p>
      <a rel="noreferrer" href="https://github.com/antfu/vitesse-lite" target="_blank"> Vitesse Lite </a>
    </p>

    <div py-4 />
    <Starport port="my-id" style="height: 100px">
      <TestInput width="400px" />
    </Starport>

    <div>
      <button class="m-3 text-sm btn" @click="go">
        Go
      </button>
    </div>
    <Footer />
    <div absabsolute bottom-0 h-25 bg-white-100 w-screen text="black">
      124
    </div>
  </div> -->
</template>

<style scoped>
.home {
  /* height: 100vh;
  width: 100%;
  position: relative; */
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: #0b0b0b;
}
main {
  flex: 1;
}
footer {
  width: 100%;
  position: fixed;
  bottom: 50px;
  line-height: 160px;
  height: 160px;
  /* z-index: 2; */
  box-sizing: border-box;
  padding: 30px;
}
.footer-inner {
  position: relative;
  width: 100%;
  height: 150px;
  border-radius: 45px;
  backdrop-filter: saturate(60%) blur(4px);
  background: rgba(36, 36, 36, 0.4);
  z-index: 20;
}
.middle {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  line-height: 50px;
  background: #3c6aed;
  filter: drop-shadow(0 0 4px #3c6aed);
  /* background: rgba(36, 36, 36, 0.4); */
  /* backdrop-filter: saturate(50%) blur(10px); */
  /* background: rgb(60, 106, 237, 0.4); */
  margin-top: -30px;
}
.footer-banyuan {
  justify-content: space-between;
  position: absolute;
  top: -12px;
  right: 0;
  left: 0;
  margin: 0 auto;
  /* height: 200px;
  width: 200px;
  border-radius: 200px 200px 0 0;
  clip: rect(0 0 50px 50px);
  line-height: 50px; */
  /* border-radius: 200px 200px 0 0; */
  backdrop-filter: saturate(60%) blur(4px);
  background: rgba(36, 36, 36, 0.4);
  width: 140px;
  height: 70px;
  border-radius: 70px 70px 0 0;
  line-height: 70px;
}
.footer-mark {
  /* backdrop-filter: saturate(50%) blur(8px);
  background: rgba(141, 223, 19, 0.7); */
  z-index: 1;
  background: #08ff2d;
  height: 42px;
  width: 70px;
  position: absolute;
  bottom: -30px;
  left: 70px;
  border-radius: 14px;
}
</style>
