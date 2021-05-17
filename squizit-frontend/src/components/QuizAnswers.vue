<template>
  <transition-group name="fade">
    <div
      class="rounded-xl m-3 shadow-center p-3"
      v-for="(answer, index) in answers"
      :key="index"
    >
      <div>
        <p>Question:</p>
        <div
          class="bg-dark dark:bg-light !bg-opacity-5 rounded-xl p-3 flex items-center justify-center"
        >
          <img
            class="rounded-xl mr-2 filter-drop-shadow max-h-20 zoomable-img"
            v-if="answer.question.image"
            :src="answer.question.image"
          />
          <p
            v-if="answer.question.text"
            class="font-bold text-center"
            v-html="answer.question.text"
          />
        </div>
      </div>

      <div class="mt-5">
        <p>Answer{{ answer.answers.length > 1 ? "s" : "" }}:</p>
        <div
          class="bg-dark dark:bg-light !bg-opacity-10 rounded-xl m-1 text-left p-2"
          v-for="(formattedAnswer, index) in answer.answers"
          :key="index"
        >
          <p
            class="break-words"
            v-if="formattedAnswer.text"
            v-html="formattedAnswer.text"
          ></p>
          <img
            class="mx-auto rounded-xl filter-drop-shadow max-h-20 zoomable-img"
            v-if="formattedAnswer.image"
            :src="formattedAnswer.image"
          />
        </div>
      </div>
    </div>
  </transition-group>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { FormattedAnswer } from "../assets/types";

export default defineComponent({
  props: {
    answers: {
      type: Array as PropType<FormattedAnswer[]>,
      default: [],
    },
  },
});
</script>

<style scoped>
.zoomable-img {
  cursor: zoom-in;
}
</style>
