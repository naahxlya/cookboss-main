import Swal from "sweetalert2";

export async function confirmDialog({
  title,
  text,
  confirmButtonText = "Sim",
  cancelButtonText = "Não",
  icon = "warning",
}) {

  const result = await Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    confirmButtonColor: "#f7a10e",
    cancelButtonColor: "#6c757d",
  });

  return result.isConfirmed;
}