<!--
 * @Author: Nic
 * @Date: 2023-02-04 10:26:30
 * @LastEditTime: 2023-02-04 10:43:13
 * @LastEditors: Nic
 * @Description:
 * @FilePath: /mahjong-scorer/src/components/AvatarComponent.vue
-->
<template>
  <van-badge
    v-if="dataState.roomData.homeownerID === item.id"
    :content="
      dataState.roomData.homeownerID === item.id
        && item.id === useGetUserID()
        && item.id === dataState.roomData.bookmaker
        ? '房主 庄 我'
        : dataState.roomData.homeownerID === item.id && item.id === dataState.roomData.bookmaker
          ? '房主 庄'
          : dataState.roomData.homeownerID === item.id && item.id === useGetUserID()
            ? '房主 我'
            : '房主'
    "
  >
    <SvgIcon
      v-if="
        dataState.roomData.homeownerID === item.id
          && item.id === useGetUserID()
          && item.id === dataState.roomData.bookmaker
      "
      :name="item.avatarName"
      pl-10px
      w-70px
      h-50px
    />
    <SvgIcon v-else :name="item.avatarName" pl-10px w-70px h-50px />
  </van-badge>
  <van-badge
    v-else
    :content="
      item.id === useGetUserID() && item.id === dataState.roomData.bookmaker
        ? '庄 我'
        : item.id === useGetUserID()
          ? '我'
          : item.id === dataState.roomData.bookmaker
            ? '庄'
            : ''
    "
  >
    <SvgIcon :name="item.avatarName" pl-10px w-70px h-50px />
  </van-badge>
  <div flex flex-col justify-center m-l-2 min-w-80px max-w-80px>
    <div class="van-ellipsis">
      {{ item.nickName }}
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  dataState: {
    type: Object,
    default: null,
  },
  item: {
    type: Object,
    default: null,
  },
})
</script>

<style lang="scss" scoped></style>
