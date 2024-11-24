document.getElementById('edit-account').addEventListener('submit', async (event) =>
{
    event.preventDefault();

    const previousEmail = document.getElementById('previous-email').value;
    const email = document.getElementById('new-email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    const address = document.getElementById('address').value;

    const acctUpdatedInfo = {
        previousEmail,
        email,
        phone,
        password,
        address,
    };

    try
    {
        const response = await fetch('/api/account', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(acctUpdatedInfo),
        });
        if (response.ok)
        {
            alert('Success.');
            document.getElementById('edit-account').reset();
            localStorage.setItem('Email', email || previousEmail);
        }
        if (response.status === 404)
            alert('Email does not exist.');
        ;
    } catch (error)
    {
        console.error('Error: ', error);
        alert('Error editing account');
    }
});
