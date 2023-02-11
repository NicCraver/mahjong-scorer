<template>
  <div class="section" mt-10>
    <div class="container">
      <div class="row full-height justify-content-center">
        <div class="col-12 text-center align-self-center">
          <div class="section pt-sm-2 text-center">
            <input
              id="reg-log"
              v-model="checkbox"
              class="checkbox"
              type="checkbox"
              name="reg-log"
            >
            <!-- <label for="reg-log" /> -->
            <div class="card-3d-wrap mx-auto" :style="!checkbox ? 'height: 380px;' : 'height: 550px;'">
              <div class="card-3d-wrapper">
                <div
                  class="card-front" bg-white dark:bg-dark
                  rounded-xl
                  shadow-md
                  space-y-2
                >
                  <div class="center-wrap">
                    <div class="section text-center">
                      <slot name="login" />
                    </div>
                  </div>
                </div>
                <div
                  class="card-back" bg-white dark:bg-dark
                  rounded-xl
                  shadow-md
                  space-y-2
                >
                  <div class="center-wrap">
                    <div class="section text-center">
                      <slot name="signup" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
let checkbox = $ref(false)
const checkboxChange = () => {
  checkbox = !checkbox
}
defineExpose({ checkboxChange })
</script>

<style lang="scss" scoped>
.checkbox {
  opacity: 0 !important;
  display: none !important;
}
.link {
  color: #c4c3ca;
}
.link:hover {
  color: #ffeba7;
}
.section {
  position: relative;
  width: 100%;
  display: block;
}
[type='checkbox']:checked,
[type='checkbox']:not(:checked) {
  position: absolute;
  left: -9999px;
}
.checkbox:checked + label,
.checkbox:not(:checked) + label {
  position: relative;
  display: block;
  text-align: center;
  width: 60px;
  height: 16px;
  border-radius: 8px;
  padding: 0;
  margin: 10px auto;
  cursor: pointer;
  background-color: #ffeba7;
}
.checkbox:checked + label:before,
.checkbox:not(:checked) + label:before {
  position: absolute;
  display: block;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  color: #ffeba7;
  background-color: #102770;
  font-family: 'unicons';
  content: '\eb4f';
  z-index: 20;
  top: -10px;
  left: -10px;
  line-height: 36px;
  text-align: center;
  font-size: 24px;
  transition: all 0.5s ease;
}
.checkbox:checked + label:before {
  transform: translateX(44px) rotate(-270deg);
}

.card-3d-wrap {
  position: relative;
  width: 90%;
  // height: 400px;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  perspective: 800px;
  transition: height 0.3s ease;
}
.card-3d-wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  transition: all 500ms ease-out;
}
.card-front,
.card-back {
  width: 100%;
  height: 100%;
  background-position: bottom center;
  background-repeat: no-repeat;
  background-size: 300%;
  position: absolute;
  left: 0;
  top: 0;
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  -webkit-backface-visibility: hidden;
  -moz-backface-visibility: hidden;
  -o-backface-visibility: hidden;
  backface-visibility: hidden;
}
.card-back {
  transform: rotateY(180deg);
}
.checkbox:checked ~ .card-3d-wrap .card-3d-wrapper {
  transform: rotateY(180deg);
}
.center-wrap {
  position: absolute;
  width: 100%;
  left: 0;
  z-index: 20;
  display: block;
}
</style>
