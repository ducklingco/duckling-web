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
    console.log(event.type);
    player.setPlaying(true);
    playing.value = true;
  };
  
  const onPlayerPause = ({ event, player }: EventPlayerParams) => {
    console.log(event.type);
    player.setPlaying(false);
    playing.value = false;
  };
  
  const onPlayerEnded = ({ event, player }: EventPlayerParams) => {
    console.log(event.type);
    player.setPlaying(false);
  };
  
  const onPlayerLoadeddata = ({ event }: EventParams) => {
    console.log(event.type);
  };
  
  const onPlayerWaiting = ({ event }: EventParams) => {
    console.log(event.type);
  };
  
  const onPlayerPlaying = ({ event }: EventParams) => {
    console.log(event.type);
  };
  
  const onPlayerTimeupdate = ({ event }: EventParams) => {
    time.value = event.target.currentTime;
    console.log({ event: event.type, time: event.target.currentTime });
  };
  
  const onPlayerCanplay = ({ event }: EventParams) => {
    console.log(event.type);
  };
  
  const onPlayerCanplaythrough = ({ event }: EventParams) => {
    console.log(event.type);
  };
  
  const playerStateChanged = ({ event }: EventParams) => {
    console.log(event.type);
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