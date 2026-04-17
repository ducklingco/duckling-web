import { ref } from 'vue';

type Event = any;

interface EventPlayerParams {
  event: Event;
  player: any;
}

interface EventParams {
  event: Event;
}

export default function usePlayer(startTime = 0) {
  const time = ref(unref(startTime));
  const playing = ref(false);
  const onPlayerPlay = ({ event, player }: {event: any, player: any}) => {
  event.target.muted = false;
  player.setPlaying(true);
  playing.value = true;
};
  
  const onPlayerPause = ({ event, player }: EventPlayerParams) => {
    player.setPlaying(false);
    playing.value = false;
  };
  
  const onPlayerEnded = ({ event, player }: EventPlayerParams) => {
    player.setPlaying(false);
  };

const onPlayerLoadeddata = (_: EventParams) => {
};
  
  const onPlayerWaiting = (_: EventParams) => {
  };
  
  const onPlayerPlaying = (_: EventParams) => {
  };
  
  const onPlayerTimeupdate = ({event }: EventParams) => {
    time.value = event.target.currentTime;
  };
  
  const onPlayerCanplay = (_: EventParams) => {
  };

  const onPlayerCanplaythrough = ({ event }: EventParams) => {
  event.target.play();
};
  
  const playerStateChanged = (_: EventParams) => {
  };
  
  return {
    time,
    playing,
    onPlayerPlay,
    onPlayerPause,
    onPlayerEnded,
    onPlayerLoadeddata,
    onPlayerWaiting,
    onPlayerPlaying,
    onPlayerTimeupdate,
    onPlayerCanplay,
    onPlayerCanplaythrough,
    playerStateChanged,
  };
}
