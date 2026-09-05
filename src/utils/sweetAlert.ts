import Swal from "sweetalert2";

export async function confirmAlert(
  title: string,
  text = "This action cannot be undone.",
) {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes, delete it",
    cancelButtonText: "Cancel",
    reverseButtons: true,
    buttonsStyling: false,

    customClass: {
      popup: "rounded-3xl",
      title: "text-2xl font-bold",
      htmlContainer: "text-sm",
      confirmButton:
        "rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white mx-1",
      cancelButton:
        "rounded-xl border border-border bg-white px-5 py-3 text-sm font-bold text-foreground mx-1",
    },
  });

  return result.isConfirmed;
}
