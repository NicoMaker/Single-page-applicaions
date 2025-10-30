document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registrationForm');
    const successMessage = document.getElementById('successMessage');
    const registerAgainBtn = document.getElementById('registerAgainBtn');

    // Mappatura degli input ai loro contenitori di errore
    const inputs = {
        firstName: { element: document.getElementById('firstName'), error: 'Il nome è obbligatorio.' },
        lastName: { element: document.getElementById('lastName'), error: 'Il cognome è obbligatorio.' },
        email: { element: document.getElementById('email'), error: 'Inserisci un\'email valida.' },
        password: { element: document.getElementById('password'), error: 'La password deve essere di almeno 8 caratteri.' },
        confirmPassword: { element: document.getElementById('confirmPassword'), error: 'Le password non coincidono.' }
    };

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Impedisce l'invio tradizionale del form
        let isFormValid = validateForm();

        if (isFormValid) {
            // Se il form è valido, mostra il messaggio di successo
            form.style.display = 'none';
            successMessage.style.display = 'block';
        }
    });

    registerAgainBtn.addEventListener('click', function() {
        // Nasconde il messaggio di successo e mostra di nuovo il form
        successMessage.style.display = 'none';
        form.style.display = 'block';
        form.reset(); // Resetta i valori di tutti i campi del form
    });

    function validateForm() {
        let isValid = true;
        // Resetta tutti i messaggi di errore e gli stili
        Object.values(inputs).forEach(inputInfo => {
            clearError(inputInfo.element);
        });

        // Validazione Nome
        if (inputs.firstName.element.value.trim() === '') {
            showError(inputs.firstName.element, inputs.firstName.error);
            isValid = false;
        }

        // Validazione Cognome
        if (inputs.lastName.element.value.trim() === '') {
            showError(inputs.lastName.element, inputs.lastName.error);
            isValid = false;
        }

        // Validazione Email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(inputs.email.element.value)) {
            showError(inputs.email.element, inputs.email.error);
            isValid = false;
        }

        // Validazione Password
        if (inputs.password.element.value.length < 8) {
            showError(inputs.password.element, inputs.password.error);
            isValid = false;
        }

        // Validazione Conferma Password
        if (inputs.password.element.value !== inputs.confirmPassword.element.value || inputs.confirmPassword.element.value === '') {
            showError(inputs.confirmPassword.element, inputs.confirmPassword.error);
            isValid = false;
        }

        return isValid;
    }

    function showError(inputElement, message) {
        inputElement.classList.add('invalid');
        const errorContainer = inputElement.nextElementSibling;
        errorContainer.textContent = message;
    }

    function clearError(inputElement) {
        inputElement.classList.remove('invalid');
        const errorContainer = inputElement.nextElementSibling;
        errorContainer.textContent = '';
    }
});