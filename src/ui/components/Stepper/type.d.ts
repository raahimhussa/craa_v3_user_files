export type StepItem = {
  active: boolean;
  index: number;
  _id: string;
  label: string;
  isCompleted: boolean;
  view: () => void;
};
