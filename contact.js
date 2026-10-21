document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('user-name');
    const emailInput = document.getElementById('user-email');
    const messageInput = document.getElementById('user-message');
    const submitBtn = document.getElementById('submit-btn');
    const statusMsg = document.getElementById('status-message');

    if (!form) return;

    const emailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    function validateForm() {
        let isValid = true;

        if (nameInput.value.trim().length < 2) {
            isValid = false;
        }

        if (!emailRegExp.test(emailInput.value.trim())) {
            isValid = false;
        }

        if (messageInput.value.trim().length < 5) {
            isValid = false;
        }

        submitBtn.disabled = !isValid;
    }

    nameInput.addEventListener('input', validateForm);
    emailInput.addEventListener('input', validateForm);
    messageInput.addEventListener('input', validateForm);

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (!submitBtn.disabled) {
            statusMsg.style.display = 'block';
            statusMsg.className = 'status-box success';
            statusMsg.textContent = `Спасибо, ${nameInput.value.trim()}! Ваше сообщение успешно отправлено.`;

            form.reset();
            submitBtn.disabled = true;
        }
    });
});