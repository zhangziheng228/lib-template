import { createApp, defineComponent, h, reactive } from 'vue';
import { add } from '@/index';
const App = defineComponent({
  name: 'App',
  setup() {
    const state = reactive({
      count: 1,
    });

    return () =>
      h(
        'button',
        {
          onClick: () => {
            state.count = add(state.count, state.count);
          },
        },
        state.count
      );
  },
});

createApp(App).mount('#app');
