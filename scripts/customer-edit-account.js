document.getElementById('Save Changes').addEventListener('submit',async (event)=>{

    event.preventDefault();

    // Collect form data
    const email = document.getElementById('email').value;
    const phone= document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    

    // Validate input
    if (!email || !phone || !password ){
            alert('Please fill out all fields.');
            return;
        }

       // Prepare data for the backend
       const formData = {
        email: email,
        phone: phone,
        password: password,
    };

    try
    {
        // Send data to the server using fetch
        const response = await fetch('/api/account', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok)
        {
            const result = await response.text();
            alert(result); // Notify the user of success
            document.getElementById('edit-account').reset(); // Reset the form
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
}) 