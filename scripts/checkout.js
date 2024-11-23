document.getElementById('checkout-form').addEventListener('submit', async (event) =>
{
    event.preventDefault(); // Prevent form from refreshing the page

    // Collect form data
    const fullname = document.getElementById('fullname').value;
    const card = document.getElementById('card').value;
    const exp = document.getElementById('exp').value;
    const csv = document.getElementById('CSV').value;

    // Validate input
    if (!fullname || !card || !exp || !CSV)
    {
        alert('Please fill out all fields.');
        return;
    }

    // Prepare data for the backend
    const formData = {
        fullname: fullname,
        card: card,
        exp: exp,
        csv: csv
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

        if (response.ok)
        {
            const result = await response.text();
            alert(result); // Notify the user of success
            document.getElementById('checkout-form').reset(); // Reset the form
        } else
        {
            const error = await response.text();
            alert(`Error: ${error}`); // Show server error
        }
    } catch (err)
    {
        console.error('Error:', err);
        alert('An unexpected error occurred. Please try again.');
    }
});
