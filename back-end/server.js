import express from "express";
import cors from "cors";
import { getUserByUsername } from "./app.js";

const app = express();
const port = 3001;
app.use(cors({ origin: "*", methods: ["POST", "GET"], credentials: true }));
app.use(express.json());

app.post("/sign-in", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Faltan datos" });
  }

  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    if (user.usu_password === password) {
      return res.status(200).json({
        message: "✅ Login exitoso",
        userId: user.usu_id,
        username: user.usu_nombre,
      });
    } else {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
