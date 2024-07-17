const express = require("express");
const cors = require("cors");
const app = express();
const port = 5000;
const mailerRoutes = require("./routes/mailerRoutes");
app.use(express.json());
// Utilisez cors pour autoriser toutes les origines ou configurez selon vos besoins
const corsOptions = {
  origin: 'http://localhost:3000', // Autorise uniquement les requêtes de cette origine
  credentials: true, // Autorise les cookies et les données d'authentification
};

app.use(cors(corsOptions));

app.use("/mailer", mailerRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
