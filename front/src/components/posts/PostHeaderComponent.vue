<template>
  <header class="post__header">
    <div class="post__header__user">
      <div class="post__header__user__pic">
        <img :src="props.imageUrl" alt="Photo de profil" />
      </div>
      <div class="post__header__user__name">
        <h2>{{ props.firstName }} {{ props.lastName }}</h2>
        <span>Posté {{ dayjs().to(dayjs(props.createdAt)) }}</span>
      </div>
    </div>
    <ToolTipComponent></ToolTipComponent>
  </header>
</template>

<script setup>
import ToolTipComponent from "./ToolTipComponent.vue";
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from "dayjs";
import "dayjs/locale/fr";
dayjs.locale("fr");
dayjs.extend(relativeTime);

const props = defineProps({
  imageUrl: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  createdAt: { type: String, required: true },
});
</script>

<style lang="scss" scoped>
.post__header {
  position: relative;
  background-color: rgb(248, 248, 248);
  display: flex;
  justify-content: space-between;
  padding: 1% 3%;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  & * {
    overflow: hidden !important;
    white-space: nowrap !important;
    text-overflow: ellipsis !important;
  }
  &__user {
    display: flex;
    max-width: 100%;
    gap: 10px;
    &__pic {
      width: 50px;
      min-width: 50px;
      height: 50px;
      border-radius: 25px;
      & img {
        width: 100%;
        height: 100%;
        border-radius: 25px;
        object-fit: cover;
      }
    }
    &__name {
      display: flex;
      flex-direction: column;
      & h2 {
        font-size: 1em;
      }
      & span {
        font-size: 1em;
      }
    }
  }
}
</style>
