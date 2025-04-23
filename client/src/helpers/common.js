import Swal from 'sweetalert2';

export const enumText = (text) => {
    if(text.length > 0){
        return text.charAt(0).toUpperCase() + text.slice(1);
    }
}

export const confirmDelete = async (message = "Are you sure?", title = "This action cannot be undone!") => {
  const result = await Swal.fire({
    title: title,
    text: message,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Delete',
    cancelButtonText: 'Cancel',
    reverseButtons: true,
  });

  return result.isConfirmed;
};
