document.getElementById('checkout-form').addEventListener('submit', async (event) =>
{
    event.preventDefault(); // Prevent form from refreshing the page

    // Collect form data
    const fullname = document.getElementById('fullname').value;
    const card = document.getElementById('card').value;
    const exp = document.getElementById('exp').value;
    const csv = document.getElementById('CSV').value;

    // Validate input
    if (!fullname || !card || !exp || !csv)
    {
        alert('Please fill out all fields.');
        return;
    }
    const listServices = JSON.parse(localStorage.getItem('cart')) || [];

    let noErrors = true;

    for (const service of listServices)
    {
        // Prepare data for the backend
        const formData = {
            fullname: fullname,
            client_id: parseInt(localStorage.getItem("ID")),
            date : new Date().toISOString(),
            paid: false,
            card: card,
            exp: exp,
            csv: csv,
            service_id: service.id
        };

        try
        {
            // Send data to the server using fetch
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            console.log(formData);

            if (!response.ok)
            {
                noErrors = false;
            }
        } catch (err)
        {
            console.error('Error:', err);
            noErrors = false;
        }
    }


    if (noErrors)
    {
        listServices.length = 0;
        localStorage.removeItem('cart');
        alert('Checkout completed successfully. [should redirect to bills]');

    } else
    {
        alert('An error occurred during the checkout');
    }
});
