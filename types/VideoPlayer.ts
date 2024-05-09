export default interface VideoPlayer {
togglePlay: () => void;
play: () => void;
pause: () => void;
computed: () => void;
convertTimeToDuration: (time: number) => void;
seekToPercentage: (percentage: number) => void;
duration: number;
percentagePlayed: number;
videoMuted: boolean;
toggleMute: () => void;
}