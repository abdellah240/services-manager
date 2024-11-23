const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

// Serve static files (CSS, JS, Images) from respective folders
app.use("/styles", express.static(path.join(__dirname, "styles")));
app.use("/scripts", express.static(path.join(__dirname, "scripts")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use("/Upload/logo", express.static(path.join(__dirname, "Upload/logo")));
app.use("/data", express.static(path.join(__dirname, "data")));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Import services router
const servicesRouter = require("./routes/services");
app.use("/api/services", servicesRouter); // Router will be used when this path is specified

//import signup router
const signUpRouter = require("./routes/account-signup");
app.use("/api/signup", signUpRouter); // Router will be used when this path is specified

//import checkout router
const checkoutRouter = require("./routes/checkout");
app.use("/api/checkout", checkoutRouter); // Router will be used when this path is specified

//import login router
const loginRouter = require("./routes/login");
app.use("/api/login", loginRouter); // Router will be used when this path is specified

// Serve HTML pages from the 'pages' folder
app.get("/", (req, res) => {
  // Serve index.html when accessing the root URL
  res.sendFile(path.join(__dirname, "pages", "index.html"));
});

// Serve any other HTML files from the 'pages' folder based on the URL
app.get("/pages/*", (req, res) => {
  const filePath = path.join(__dirname, "pages", req.url.replace("/pages", "")); // Strip '/pages' prefix from the URL

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error serving file: ${filePath}`);
      res.status(404).send("Error: Page not found");
    }
  });
});

app.get("/customer/*", (req, res) => {
  const filePath = path.join(
    __dirname,
    "customer",
    req.url.replace("/customer", "")
  ); // Strip '/pages' prefix from the URL

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error serving file: ${filePath}`);
      res.status(404).send("Error: Page not found");
    }
  });
});

app.get("/admin/*", (req, res) => {
  const filePath = path.join(__dirname, "admin", req.url.replace("/admin", "")); // Strip '/pages' prefix from the URL

  res.sendFile(filePath, (err) => {
    if (err) {
      console.error(`Error serving file: ${filePath}`);
      res.status(404).send("Error: Page not found");
    }
  });
});
// Configure Multer for file uploads
const upload = multer({ dest: "Upload/" });

// Route to handle logo uploads
//------------------------------------------------------------------------------------------
app.post("/upload", upload.single("logo"), (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    // Define the target path for the logo
    const targetPath = path.join(__dirname, "Upload/logo/current.jpeg");

    // Check if the directory exists, create if it doesn't
    const logoDir = path.dirname(targetPath);
    if (!fs.existsSync(logoDir)) {
      fs.mkdirSync(logoDir, { recursive: true });
    }

    // Move and rename the uploaded file to overwrite `current.jpeg`
    fs.rename(file.path, targetPath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Failed to save the logo.");
      }

      res.redirect("../admin/business.html");
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred during the file upload.");
  }
});
//---------------------------------------------------------------------------------------------------

app.use(bodyParser.json()); // Parse JSON data from the client

// Serve static files (like HTML)
app.use(express.static(path.join(__dirname, "public")));

app.post("/save", (req, res) => {
  const { textInput, textareaInput } = req.body;

  const dirPath = path.join(__dirname, "Upload/Webinfo");
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  const filePath = path.join(dirPath, "Title.txt");
  const filePath2 = path.join(dirPath, "Webinfo.txt");

  Promise.all([
    fs.promises.writeFile(filePath, textInput),
    fs.promises.writeFile(filePath2, textareaInput),
  ])
    .then(() => res.send("Data saved successfully!"))
    .catch((err) => {
      console.error("Error writing to files:", err);
      res.status(500).send("Failed to save data.");
    });
});
//------------------------------------------------------------------------------------------------------------------------
app.get("/load", (req, res) => {
  const titlePath = path.join(__dirname, "Upload/Webinfo/Title.txt");
  const descriptionPath = path.join(__dirname, "Upload/Webinfo/Webinfo.txt");

  // Read both files and send the data as JSON
  Promise.all([
    fs.promises.readFile(titlePath, "utf-8"),
    fs.promises.readFile(descriptionPath, "utf-8"),
  ])
    .then(([title, description]) => {
      res.json({ title: title.trim(), description: description.trim() });
    })
    .catch((err) => {
      console.error("Error reading files:", err);
      res.status(500).send("Failed to load data.");
    });
});
//-----------------------------------------------------------------------------------------------------------

const cssFiles = [
  "button.css",
  "header.css",
  "login.css",
  "menu.css",
  "nav-element.css",
  "admin.css",
  "other.css",
];

// Route to update the CSS files
app.post("/update-css", (req, res) => {
  const { color } = req.body;
  if (!color) {
    return res.status(400).send("No color provided.");
  }

  // Define the placeholder or variable to replace in the CSS files
  const placeholder = "--shade1";
  const placeholder1 = "--shade2";
  const placeholder2 = "--shade3";

  Promise.all(
    cssFiles.map(
      (file) =>
        new Promise((resolve, reject) => {
          const filePath = path.join(__dirname, "styles", file); // Adjusted for the 'styles' folder

          // Read the CSS file
          fs.readFile(filePath, "utf8", (err, data) => {
            if (err) return reject(err);

            let updatedCSS;
            if (color === "red") {
              updatedCSS = data
                .replace(
                  new RegExp(`${placeholder}:\\s*[^;]+;`, "g"),
                  `${placeholder}: rgb(80,16,16);`
                )
                .replace(
                  new RegExp(`${placeholder1}:\\s*[^;]+;`, "g"),
                  `${placeholder1}: rgb(119,24,24);`
                )
                .replace(
                  new RegExp(`${placeholder2}:\\s*[^;]+;`, "g"),
                  `${placeholder2}: rgb(170,34,34);`
                );
            } else if (color === "green") {
              updatedCSS = data
                .replace(
                  new RegExp(`${placeholder}:\\s*[^;]+;`, "g"),
                  `${placeholder}: rgb(16,80,16);`
                )
                .replace(
                  new RegExp(`${placeholder1}:\\s*[^;]+;`, "g"),
                  `${placeholder1}: rgb(24,119,24);`
                )
                .replace(
                  new RegExp(`${placeholder2}:\\s*[^;]+;`, "g"),
                  `${placeholder2}: rgb(34,170,34);`
                );
            } else if (color === "brown") {
              updatedCSS = data
                .replace(
                  new RegExp(`${placeholder}:\\s*[^;]+;`, "g"),
                  `${placeholder}: rgb(56,37,19);`
                )
                .replace(
                  new RegExp(`${placeholder1}:\\s*[^;]+;`, "g"),
                  `${placeholder1}: rgb(84,56,28);`
                )
                .replace(
                  new RegExp(`${placeholder2}:\\s*[^;]+;`, "g"),
                  `${placeholder2}: rgb(119,79,40);`
                );
            } else if (color === "blue") {
              updatedCSS = data
                .replace(
                  new RegExp(`${placeholder}:\\s*[^;]+;`, "g"),
                  `${placeholder}: rgb(7,7,98);`
                )
                .replace(
                  new RegExp(`${placeholder1}:\\s*[^;]+;`, "g"),
                  `${placeholder1}: rgb(12,12,143);`
                )
                .replace(
                  new RegExp(`${placeholder2}:\\s*[^;]+;`, "g"),
                  `${placeholder2}: rgb(23,23,192);`
                );
            } else {
              return reject("Invalid color selection");
            }
            // Write the updated CSS back to the file
            fs.writeFile(filePath, updatedCSS, "utf8", (err) => {
              if (err) return reject(err);
              resolve();
            });
          });
        })
    )
  )
    .then(() => res.send("CSS files updated successfully."))
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating CSS files.");
    });
});
//----------------------------------------------------------------------------------------
const configPath = "./Config.json";
const bcrypt = require("bcryptjs");
function loadConfig() {
  try {
    const rawData = fs.readFileSync(configPath, "utf8");
    return JSON.parse(rawData);
  } catch (err) {
    console.error("Error reading configuration file:", err);
    return null;
  }
}

const config = loadConfig();

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  storedHashedPassword = config.admin.passwordHash;
  UserName = config.admin.username;
  const isMatch =
    (await bcrypt.compare(password, storedHashedPassword)) &&
    username === UserName;

  if (isMatch) {
    res.send("Login successful");
  } else {
    res.status(401).send("Invalid credentials");
  }
});
//-----------------------------------------------------------------------

app.post("/change-credentials", async (req, res) => {
  const { currentPassword, newEmail, newPassword } = req.body;

  // Fetch the current email and password hash from the database
  const storedEmail = config.admin.username; // Example: Fetch current email from config or DB
  const storedHashedPassword = config.admin.passwordHash; // Example: Fetch current password hash

  // Check if the new email is the same as the current email
  if (newEmail === storedEmail) {
    return res
      .status(400)
      .send("New email cannot be the same as the current email.");
  }

  // Check if the new password is the same as the current password
  const isMatch = await bcrypt.compare(currentPassword, storedHashedPassword);
  if (!isMatch) {
    return res.status(401).send("Current password is incorrect.");
  }

  if (newPassword === currentPassword) {
    return res
      .status(400)
      .send("New password cannot be the same as the current password.");
  }

  // Hash the new password if it's different from the current one
  const newHashedPassword = await bcrypt.hash(newPassword, 12);

  // Update the database with new email and hashed password (you can implement your own logic)

  config.admin.username = newEmail;
  config.admin.passwordHash = newHashedPassword;

  fs.writeFile(
    configPath,
    JSON.stringify(config, null, 2),
    "utf8",
    (writeErr) => {
      if (writeErr) {
        return res.status(500).send("Error writing data to file.");
      }

      res.send("Credentials updated successfully.");
    }
  );
});
//----------------------------------------------------------------------------------------------------------
// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
