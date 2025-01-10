export interface ModalButton {
  text: string;
  onClick: () => void;
}
export interface Modal {
  isVisible: boolean;
  payload: any;
  buttons: ModalButton[];
}
