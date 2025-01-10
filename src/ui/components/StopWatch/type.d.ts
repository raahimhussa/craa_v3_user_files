export type StopWatchProps = {
  initialTime?: number;
  interval?: number;
  onStart: () => void;
  onTimeout: () => void;
};
