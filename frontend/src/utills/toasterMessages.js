import Swal from "sweetalert2";

export const showSuccess = async (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
  });

  await Toast.fire({
    icon: "success",
    title: message,
  });
  return;
};

export const showError =async (message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 4000,
    timerProgressBar: true,
    width: 350,
  });

  await Toast.fire({
    icon: "error",
    title: message,
  });
  return;
};
