<template>
  <nav v-if="fetched && answers.length">
    <button
      class="bg-light rounded-full outline-none font-extrabold shadow-center py-1 px-2 top-10 left-5 text-3xl z-10 duration-250 fixed material-icons dark:bg-dark hover:bg-green-300 hover:text-dark focus:outline-none active:bg-green-400"
      @click="resetAnswers"
    >
      arrow_back
    </button>
  </nav>

  <nav>
    <button
      class="bg-light rounded-full font-extrabold shadow-center py-1 px-2 top-10 right-5 text-3xl z-10 duration-250 fixed material-icons dark:bg-dark hover:bg-green-300 hover:text-dark outline-none focus:outline-none active:bg-green-400"
      @click="showSettings = true"
    >
      settings
    </button>
  </nav>

  <app-settings :show="showSettings" @close="showSettings = false" />

  <loading-spinner
    :check="!!answers.length"
    :errorMessage="errors.fetching"
    errorTitle="Failed fetching answers"
    :fetched="fetched"
    :fetching="fetching"
  />

  <app-donates v-if="!fetching && !fetched && !answers.length" />

  <image-zoom :zoomedImage="zoomedImage" @close="zoomedImage = ''" />

  <transition name="fade">
    <div
      v-if="!fetched || !answers.length"
      class="flex mx-auto my-10 max-w-150 transform w-11/12 items-center"
    >
      <div
        v-if="errors.pin"
        class="bg-light rounded-bl-none rounded-xl flex shadow-center p-3 transform right-0 -translate-y-20 items-center absolute dark:bg-dark"
      >
        <h1 class="font-extrabold mx-3 text-3xl text-red-500">!</h1>
        {{ errors.pin }}
      </div>
      <input
        class="outline-none rounded-l-3xl h-15 shadow-center w-full p-3 duration-250"
        :class="{
          'bg-light dark:bg-dark': !errors.pin,
          'bg-red-500': errors.pin,
        }"
        type="text"
        placeholder="Pin"
        v-model="pin"
      />
      <input
        class="outline-none bg-green-400 rounded-r-3xl h-15 shadow-center text-dark p-3 duration-250 hover:bg-green-300 active:bg-green-400 disabled:bg-red-300"
        :disabled="!!errors.pin"
        type="submit"
        value="Submit"
        @click="getAnswers"
      />
    </div>
  </transition>

  <div
    class="mx-auto max-w-350 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    <app-answers :answers="answers" />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, watch } from "vue";
import { Answer, FormattedAnswer, FormattedObject } from "../assets/types";
import AppDonates from "../components/AppDonates.vue";
import AppSettings from "../components/AppSettings.vue";
import ImageZoom from "../components/ImageZoom.vue";
import LoadingSpinner from "../components/LoadingSpinner.vue";
import AppAnswers from "../components/QuizAnswers.vue";
import { useSettingsStore } from "../stores/settings";

export default defineComponent({
  components: {
    AppDonates,
    AppAnswers,
    AppSettings,
    LoadingSpinner,
    ImageZoom,
  },
  setup() {
    const pin = ref("");

    const errors = ref({
      fetching: "",
      pin: "",
    });

    const fetching = ref(false);
    const fetched = ref(false);
    const fetchedAnswers = ref([]);

    const zoomedImage = ref("");

    const showSettings = ref(false);

    const settingsStore = useSettingsStore();

    document.addEventListener("click", (e) => {
      const element = e.target as HTMLElement | null;
      if (
        element?.nodeName === "IMG" &&
        element?.classList.contains("zoomable-img")
      )
        zoomedImage.value = (element as HTMLImageElement).src;
    });

    const resetAnswers = () => {
      fetching.value = false;
      fetched.value = false;
      fetchedAnswers.value = [];
    };

    const getAnswers = async () => {
      fetching.value = true;
      fetched.value = false;
      fetchedAnswers.value = [];

      const json = await await fetch(
        pin.value.length ? `/api/hack?pin=${pin.value}` : `/api/answers`
      )
        .then((r) => r.json())
        .catch((error) => ({ error }));

      fetching.value = false;
      fetched.value = true;

      if (!json.ok || !json.answers) {
        errors.value.fetching = json.message || json.error || "";
        console.error(json.message || json.error || "");
        fetchedAnswers.value = [];
        return;
      }

      fetchedAnswers.value = json.answers;
    };

    watch(pin, (value) => {
      if (value && /[^0-9]/.test(value)) {
        errors.value.pin = "PIN should only contain numbers";
        return;
      }
      errors.value.pin = "";
    });

    const answers = computed(() => {
      let value: FormattedAnswer[] = [];
      try {
        value = fetchedAnswers.value.map(getQuestionData);
      } catch (err: unknown) {
        fetching.value = false;
        fetched.value = true;
        console.error(err);
        errors.value.fetching = String(err);
      }
      return value;
    });

    const getQuestionData = (answerData: Answer) => {
      const type = answerData.type;

      const question: FormattedObject = {
        text: answerData.structure.query.text,
        image: answerData.structure.query.media?.length
          ? answerData.structure.query.media[0].url
          : "",
      };

      const hasCorrectAnswer = !!(
        answerData.structure.settings &&
        answerData.structure.settings.hasCorrectAnswer
      );

      const answerOptions = answerData.answer.options;
      const options = answerOptions || answerData.structure.options;
      const answer = answerData.answer.answer;

      const answers: FormattedObject[] = [];

      if (hasCorrectAnswer || settingsStore.forceShowingAnswers) {
        const format = (answerIndex: any) => {
          const formatted = options[answerIndex];
          const { text, math, hasMath, media } = formatted;

          let image = "";
          if (media?.length) image = media[0].url;

          const answer = {
            text: text ? text : hasMath ? math.latex.join("<br />") : "",
            image: image || "",
          };

          if (answer.text || answer.image) answers.push(answer);
        };

        if (Array.isArray(answer)) answer.forEach(format);
        if (typeof answer === "number") format(answer);
        if (answerOptions !== null) for (let i in answerOptions) format(i);

        if (!answers.length)
          answers.push({
            text: "No answers have been found for this question",
            image: "",
          });
      } else {
        answers.push({
          text: "This question has no correct answers",
          image: "",
        });
      }

      return {
        type,
        question,
        answers,
      } as FormattedAnswer;
    };

    return {
      pin,
      answers,
      fetching,
      showSettings,
      fetched,
      fetchedAnswers,
      getAnswers,
      resetAnswers,
      zoomedImage,
      errors,
    };
  },
});
</script>
