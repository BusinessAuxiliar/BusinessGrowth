import express from "express";
import cors from "cors";
import {
  getUserByUsername,
  getEmpresaYSucursalByUsername,
  buscarUsuariosPorNombre,
  getEmpresaByUsername,
  getAccesoSucursalByUsuId,
} from "./app.js";

const app = express();
app.use(cors({ origin: "*", methods: ["POST", "GET"], credentials: true }));
app.use(express.json());
const port = 3001;

// app.get("/sign-in", async (req, res) => {
//   const { usu_nombre } = req.params;
//   try {
//     const empresa = await getEmpresaByUsername(usu_nombre);
//     return res.status(200).send(empresa);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({ error: "Error obteniendo empresa" });
//   }
// });

app.get("/usuario/info/:usu_nombre", async (req, res) => {
  try {
    const { usu_nombre } = req.params;
    const info = await getEmpresaYSucursalByUsername(usu_nombre);
    if (!info)
      return res.status(404).json({ message: "Usuario no encontrado" });
    res.status(200).json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.get("/usuario/sucursales/:usu_id", async (req, res) => {
  try {
    const rows = await getAccesoSucursalByUsuId(req.params.usu_id);
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener sucursales del usuario:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.get("/profile/:usu_id", async (req, res) => {
  try {
    const { usu_id } = req.params;
    const info = await getAccesoSucursalByUsuId(usu_id);
    if (!info)
      return res.status(404).json({ message: "Accesos no encontrados" });
    res.status(200).json(info);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

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

app.get("/empresa/usuarios/:emp_id", async (req, res) => {
  try {
    const empresaDelUsuario = await getEmpresaByEmpId(req.params.emp_id);
    res.status(200).send(empresaDelUsuario);
  } catch (error) {
    res.status(500).send({ error: "Error obteniendo empresa" });
  }
});

app.get("/sucursal/usuarios/:suc_id", async (req, res) => {
  try {
    const sucursalDelUsuario = await getSucursalById(req.params.suc_id);
    res.status(200).send(sucursalDelUsuario);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error obteniendo sucursal" });
  }
});

app.get("/profile/buscar/:nombre", async (req, res) => {
  const nombre = req.params.nombre;

  try {
    const usuarios = await buscarUsuariosPorNombre(nombre);

    if (!usuarios.length) {
      return res.status(404).json({ message: "No se encontraron usuarios" });
    }
    res.status(200).json(usuarios);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error interno del servidor" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
