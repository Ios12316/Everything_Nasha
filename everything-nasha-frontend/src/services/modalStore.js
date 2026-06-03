import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  title: "",
  message: "",
  type: "alert", // "alert" or "confirm"
  onConfirm: null,
  onCancel: null,

  showAlert: (title, message) => set({
    isOpen: true,
    title,
    message,
    type: "alert",
    onConfirm: null,
    onCancel: null
  }),

  showConfirm: (title, message, onConfirm, onCancel = null) => set({
    isOpen: true,
    title,
    message,
    type: "confirm",
    onConfirm,
    onCancel
  }),

  closeModal: () => set({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: null,
    onCancel: null
  })
}));

export default useModalStore;
