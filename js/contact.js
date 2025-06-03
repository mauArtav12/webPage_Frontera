const form = document.getElementById('contactForm');
const feedback = document.getElementById('formFeedback');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  // Limpia mensajes de error
  const errorMessages = form.querySelectorAll('.error-message');
  errorMessages.forEach(span => span.textContent = '');

  let valid = true;
   
   // Validar nombre
  const name = form.name;
   
  if (!name.value.trim() || name.value.trim().length < 3) {
    showError(name, 'Por favor, ingresa tu nombre completo (mínimo 3 caracteres).');
    valid = false;
  }
  
  // Validar email
  const email = form.email;

  if (!email.value.trim() || !validateEmail(email.value.trim())) {
    showError(email, 'Por favor, ingresa un correo electrónico válido.');
    valid = false;
  }
  
  // Validar mensaje
  const message = form.message;

  if (!message.value.trim() || message.value.trim().length < 10) {
    showError(message, 'Por favor, escribe un mensaje de al menos 10 caracteres.');
    valid = false;
  }
  
  if (valid) {
    // Aquí podrías integrar envío real (fetch a backend o API)
    feedback.textContent = '¡Gracias por contactarnos! Responderemos pronto.';
    feedback.style.color = 'green';
    form.reset();
  } else {
    feedback.textContent = '';
  }
});

function showError(input, message) {
  const errorSpan = input.parentElement.querySelector('.error-message');
  errorSpan.textContent = message;
}

function validateEmail(email) {
  // Validación simple de email
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}