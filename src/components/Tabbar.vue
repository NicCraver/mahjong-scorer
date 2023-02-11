<template>
  <div class="tabs" bg-white dark-bg-dark>
    <!-- TAB 1 -->
    <input id="tab-01" type="radio" name="tab" checked @click="go($event, '/')">
    <label for="tab-01">
      <div class="icon">
        <span class="detail" />
        <span class="glass" />
        <span class="background" />
      </div>
    </label>
    <!-- TAB 2 -->
    <input id="tab-02" type="radio" name="tab" @click="go($event, '/datas')">
    <label for="tab-02">
      <div class="icon">
        <span class="detail" />
        <span class="glass" />
        <span class="background" />
      </div>
    </label>
    <!-- TAB 3 -->
    <input id="tab-03" type="radio" name="tab" @click="go($event, '/my')">
    <label for="tab-03">
      <div class="icon">
        <span class="detail" />
        <span class="glass" />
        <span class="background" />
      </div>
    </label>
  </div>

  <!-- SVG -->
  <svg xmlns="http://www.w3.org/2000/svg" height="0" width="0">
    <clipPath id="path-icon-01">
      <path
        d="M25.182 26.601A4.844 4.844 0 0121.762 28H4.838C2.166 28 0 25.85 0 23.197V11.014A3.464 3.464 0 011.354 8.35l9.125-7.305a4.336 4.336 0 015.529-.1l9.338 7.405a3.462 3.462 0 011.254 2.663v12.195c0 1.273-.51 2.493-1.418 3.392z"
      />
    </clipPath>
    <clipPath id="path-detail-01">
      <rect width="11.657" height="2.743" x="7.2" y="20.914" rx="1.371" />
    </clipPath>
    <clipPath id="path-icon-02">
      <path
        d="M20.076 0H7.938C3.192 0 0 3.332 0 8.288v11.438C0 24.668 3.192 28 7.938 28h12.138C24.822 28 28 24.668 28 19.726V8.288C28 3.332 24.822 0 20.076 0z"
      />
    </clipPath>
    <clipPath id="path-detail-02">
      <path
        d="M21.325 11.52l-4.001 5.164a1.034 1.034 0 01-1.478.184l-3.84-3.012-3.46 4.475a1.035 1.035 0 01-1.908-.603 1.007 1.007 0 01.222-.639l4.136-5.335a1.035 1.035 0 011.465-.197l3.841 3.024 3.373-4.339a1.022 1.022 0 011.453-.209c.452.354.54 1.003.197 1.463v.025z"
      />
    </clipPath>
    <clipPath id="path-icon-03">
      <path d="M28 14c0 7.732-6.268 14-14 14S0 21.732 0 14C0 6.27 6.268 0 14 0s14 6.27 14 14z" />
    </clipPath>
    <clipPath id="path-detail-03">
      <path
        d="M19.404 9.044l-2.268 7.168a.912.912 0 01-.616.617l-7.14 2.239c-.476.155-.938-.308-.784-.784l2.24-7.182a.935.935 0 01.616-.616l7.168-2.24a.629.629 0 01.784.798"
      />
    </clipPath>
  </svg>
</template>

<script setup>
const router = useRouter()
const route = useRoute()
const go = (e, path) => {
  if (e.target.checked)
    router.push(path)
}

watch(
  () => route.path,
  (newValue, oldValue) => {
    nextTick(() => {
      switch (route.path) {
        case '/':
          document.getElementById('tab-01').checked = true
          break
        case '/datas':
          document.getElementById('tab-02').checked = true
          break
        case '/my':
          document.getElementById('tab-03').checked = true
          break

        default:
          break
      }
    })
  },
)
</script>

<style lang="scss" scoped>
$icon-01: #348afe;
$icon-02: #ae7bfb;
$icon-03: #f9599f;
$icon-04: #f6695f;
$inactive: #e5e8ef;

.tabs {
  --background: #fff;
  --width: 100%;
  --height: 75px;
  --border-radius: var(--height);
  // background: var(--background);
  width: var(--width);
  height: var(--height);
  position: relative;
  border-radius: var(--border-radius);
  box-shadow: 0 10px 30px rgba($inactive, 20%);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 15px;
  box-sizing: border-box;
  label {
    -webkit-tap-highlight-color: transparent;
    width: 28px;
    height: 28px;
    cursor: pointer;
    position: relative;
    display: flex;
    justify-content: space-around;
    align-items: center;
    .icon {
      width: 100%;
      height: 100%;
      position: relative;
      .detail,
      .glass,
      .background {
        position: absolute;
        width: 100%;
        height: 100%;
      }
      .detail {
        z-index: 2;
        filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0));
        transition: filter 0.3s ease;
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0;
          background: linear-gradient(to right, darken($inactive, 10%) 30%, darken($inactive, 25%) 70%);
          transition: background 0.3s ease;
        }
      }
      .glass {
        z-index: 1;
        &::before {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          background: $inactive;
          backdrop-filter: blur(0px);
          left: 0;
        }
        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 100%;
          filter: blur(4px);
          opacity: 0;
          z-index: 1;
          left: 0;
        }
      }
      .background {
        z-index: 0;
        opacity: 0;
        transform-origin: 100% 100%;
        transform: translate(var(--x, 0), var(--y, 0)) rotate(var(--z, 0));
        transition: transform 0.3s cubic-bezier(0.38, -0.12, 0.15, 1.65);
      }
    }
    @for $icon from 1 through 3 {
      &:nth-of-type(#{$icon}) {
        .icon {
          .glass,
          .glass::after,
          .background {
            clip-path: url(#path-icon-0+$icon);
          }
        }
      }
    }
    @for $detail from 1 through 3 {
      &:nth-of-type(#{$detail}) {
        .icon {
          .detail {
            &::after {
              clip-path: url(#path-detail-0+$detail);
            }
          }
        }
      }
    }
  }
  input {
    display: none;
    &:checked {
      + label {
        .icon {
          .detail {
            filter: drop-shadow(2px 2px 2px rgba(#555, 0.3));
            &::after {
              background: linear-gradient(to right, rgba(#fff, 0.2) 30%, rgba(#fff, 1) 70%);
            }
          }
          .glass {
            &::before {
              background: rgba(#fff, 0.3);
              backdrop-filter: blur(2px);
            }
            &::after {
              opacity: 1;
              filter: blur(4px);
            }
          }
          .background {
            --x: 4px;
            --y: -4px;
            --z: 15deg;
            opacity: 1;
          }
        }
        &:nth-of-type(4n-3) {
          .icon {
            .glass {
              &::after {
                background: rgba($icon-01, 50%);
              }
            }
            .background {
              background: radial-gradient(circle, $icon-01 0%, lighten($icon-01, 12%) 100%);
            }
          }
        }
        &:nth-of-type(4n-2) {
          .icon {
            .glass {
              &::after {
                background: rgba($icon-02, 50%);
              }
            }
            .background {
              background: radial-gradient(circle, $icon-02 0%, lighten($icon-02, 12%) 100%);
            }
          }
        }
        &:nth-of-type(4n-1) {
          .icon {
            .glass {
              &::after {
                background: rgba($icon-03, 50%);
              }
            }
            .background {
              background: radial-gradient(circle, $icon-03 0%, lighten($icon-03, 12%) 100%);
            }
          }
        }
        &:nth-of-type(4n) {
          .icon {
            .glass {
              &::after {
                background: rgba($icon-04, 50%);
              }
            }
            .background {
              background: radial-gradient(circle, $icon-04 0%, lighten($icon-04, 12%) 100%);
            }
          }
        }
      }
    }
  }
}

//--- ## BASIC #############
// body {
//   background: #e8ebf3;
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   .socials {
//     position: fixed;
//     display: block;
//     left: 20px;
//     bottom: 20px;
//     > a {
//       display: block;
//       width: 30px;
//       opacity: 0.2;
//       transform: scale(var(--scale, 0.8));
//       transition: transform 0.5s cubic-bezier(0.38, -0.12, 0.24, 1.91);
//       &:hover {
//         --scale: 1;
//       }
//     }
//   }
// }
</style>
