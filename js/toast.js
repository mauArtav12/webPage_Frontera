function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) {
    console.warn('Toast element not found in DOM.');
    return;
  }
  toast.textContent = message;
  toast.classList.add('show');
  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hidden');
  }, 3000);
}