const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files (CSS, JS, Images) from respective folders
app.use('/styles', express.static(path.join(__dirname, 'styles')));
app.use('/scripts', express.static(path.join(__dirname, 'scripts')));
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/Upload/logo', express.static(path.join(__dirname, 'Upload/logo')));


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Import services router
const servicesRouter = require('./routes/services');
app.use('/api/services', servicesRouter); // Router will be used when this path is specified


// Serve HTML pages from the 'pages' folder
app.get('/', (req, res) =>
{
    // Serve index.html when accessing the root URL
    res.sendFile(path.join(__dirname, 'pages', 'index.html'));
});

// Serve any other HTML files from the 'pages' folder based on the URL
app.get('/pages/*', (req, res) =>
{
    const filePath = path.join(__dirname, 'pages', req.url.replace('/pages', '')); // Strip '/pages' prefix from the URL

    res.sendFile(filePath, (err) =>
    {
        if (err)
        {
            console.error(`Error serving file: ${filePath}`);
            res.status(404).send('Error: Page not found');
        }
    });
});

app.get('/customer/*', (req, res) =>
{
    const filePath = path.join(__dirname, 'customer', req.url.replace('/customer', '')); // Strip '/pages' prefix from the URL

    res.sendFile(filePath, (err) =>
    {
        if (err)
        {
            console.error(`Error serving file: ${filePath}`);
            res.status(404).send('Error: Page not found');
        }
    });
});

app.get('/admin/*', (req, res) =>
{
    const filePath = path.join(__dirname, 'admin', req.url.replace('/admin', '')); // Strip '/pages' prefix from the URL

    res.sendFile(filePath, (err) =>
    {
        if (err)
        {
            console.error(`Error serving file: ${filePath}`);
            res.status(404).send('Error: Page not found');
        }
    });
});
// Configure Multer for file uploads
const upload = multer({ dest: 'Upload/' });

// Route to handle logo uploads
app.post('/upload', upload.single('logo'), (req, res) =>
{
    try
    {
        const file = req.file;

        if (!file)
        {
            return res.status(400).send('No file uploaded.');
        }

        // Define the target path for the logo
        const targetPath = path.join(__dirname, 'Upload/logo/current.jpeg');

        // Check if the directory exists, create if it doesn't
        const logoDir = path.dirname(targetPath);
        if (!fs.existsSync(logoDir))
        {
            fs.mkdirSync(logoDir, { recursive: true });
        }

        // Move and rename the uploaded file to overwrite `current.jpeg`
        fs.rename(file.path, targetPath, (err) =>
        {
            if (err)
            {
                console.error(err);
                return res.status(500).send('Failed to save the logo.');
            }

            res.send(`
                <p>Logo uploaded successfully!</p>
                <p><a href="../admin/business.html">Go back to the home page</a></p>
            `);
        });
    } catch (error)
    {
        console.error(error);
        res.status(500).send('An error occurred during the file upload.');
    }
});

// Start the server
app.listen(port, () =>
{
    console.log(`Server is running on http://localhost:${port}`);
});
