const express = require("express"); 
const path = require('path');
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// In-memory storage for personal data
let personalData = [];
let id = 1;

// Routes
// Root route: Documentation
app.get("/api", (req, res) => {
    res.json({
      message: "Bienvenido a la API Datos Personales",
      endpoints: {
        getPersonalData: "GET /personal-data",
        createPersonalData: "POST /personal-data",
        deletePersonalData: "DELETE /personal-data/:id",
      },
    });
  });

// Get all personal data
app.get("/personal-data", (req, res) => {
  res.json(personalData);
});

// Create a new personal data entry
app.post("/personal-data", (req, res) => {
  const { firstName, lastName, phone, email } = req.body;

  if (!firstName || !lastName || !phone || !email) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }

  const entry = { id: id++, firstName, lastName, phone, email };
  personalData.push(entry);
  res.status(201).json(entry);
});

// Delete a personal data entry
app.delete("/personal-data/:id", (req, res) => {
  const initialLength = personalData.length;
  personalData = personalData.filter((entry) => entry.id !== parseInt(req.params.id));

  if (personalData.length === initialLength) {
    return res.status(404).json({ error: "Dato personal no encontrado" });
  }
  res.status(204).send();
});

// Start the server
if (require.main === module) {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }

module.exports = app; // Exporta la app para las pruebas

  