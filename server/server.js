const express = require("express"); // Import express module
const app = express(); // Create an express app
const PORT = 8080; // Set the port number
const cors = require("cors"); // Import cors module to allow cross-origin requests

app.use(cors()); // Use cors to allow cross-origin requests from the client

const antelopes = require("./data/antelopes.json"); // Import antelopes data from antelopes.js file

// Endpoint to get antelopes data from an external source
// app.get("/api/antelopes", async (req, res) => {
//   const response = await fetch("https://work-sample-mk-fs.s3-us-west-2.amazonaws.com/species.json");
//   const data = await response.json();
//   res.json(data);
// });

// Endpoint to get all antelopes data
app.get("/api/all-antelopes", (req, res) => {
  // Send the antelopes data to the client
  res.json(antelopes);
});

// Endpoint to get a specific antelope by its name
app.get("/api/all-antelopes/:name", (req, res) => {
  // Get the name parameter from the URL
  const name = req.params.name;
  console.log("name", name)

  // Find the antelope with the given name
  const antelope = antelopes.find((a) => a.name === name);
  console.log("antelope", antelope)

  if (antelope) {
    // Send the antelope data to the client
    res.json(antelope);
  } else {
    // Send an error message to the client
    res.status(404).json({ message: "Antelope not found" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
