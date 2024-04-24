export default function useCardNavigation(emit: any, cardType: string = 'regular') {
    const onClickPrev = () => {
        console.log("prev")
        emit('prev');
      };
      
      const onClickNext = () => {
      console.log("next")
        emit('next');
    };

    const CardClickAreasVideo = defineComponent({
      name: 'CardClickAreasVideo',
    emits: ['prev', 'next'],
    setup(props, {emit}) {
      const onClickPrev1 = () => {
        emit('prev');
      }
      const onClickNext1 = () => {
        emit('next');
      }
      return () => h('div', {
      class: 'absolute top-0 left-0 grid w-full h-full grid-cols-3 opacity-50 pointer-events-none',
    }, [
      h('div', {
        class: 'w-full h-full pointer-events-auto',
        onClick: onClickPrev1,
      }),
      h('div', {
        class: 'w-full h-full pointer-events-none',
      }),
      h('div', {
        class: 'w-full h-full pointer-events-auto',
        onClick: onClickNext1,
      }),
    ]);
    },
  });
    const CardClickAreasRegular = defineComponent({
      name: 'CardClickAreasRegular',
      emits: ['prev', 'next'],
    setup(props, {emit}) {
      const onClickPrev1 = () => {
        emit('prev');
      }
      const onClickNext1 = () => {
        emit('next');
      }
      return () => h('div', {
      class: 'absolute top-0 left-0 grid w-full h-full grid-cols-2 opacity-50 pointer-events-none',
    }, [
      h('div', {
        class: 'w-full h-full pointer-events-auto',
        onClick: onClickPrev1,
      }),
      h('div', {
        class: 'w-full h-full pointer-events-auto',
        onClick: onClickNext1,
      }),
    ]);
    },
  });

    const CardClickAreas = cardType === 'video' ? CardClickAreasVideo : CardClickAreasRegular;

    return {onClickPrev, onClickNext, CardClickAreas};
}