document.getElementById('edit-account').addEventListener('submit', async (event) => {
    event.preventDefault();

    const previousEmail = document.getElementById('previous-email').value;
    const email = document.getElementById('new-email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const address = document.getElementById('address').value;

    const formData = {
        previousEmail,
        email,
        phone,
        password,
        address
    };

    try {
        const response = await fetch('/api/account', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert(await response.text());
            document.getElementById('edit-account').reset();
        } else {
            alert(`Error: ${await response.text()}`);
        }
    } catch {
        alert('An unexpected error occurred. Please try again.');
    }
});
