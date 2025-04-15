import express from 'express';
import cors from 'cors';
import { getUserByUsername , buscarUsuariosPorNombre} from './app.js';

const app = express();
app.use(cors({ origin: '*', methods: ['POST', 'GET'], credentials: true }));
app.use(express.json());
const port = 3001;



app.post('/sign-in', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Faltan datos' });
  }

  try {
    const user = await getUserByUsername(username);

    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }

    if (user.usu_password === password) {
      return res.status(200).json({
        message: '✅ Login exitoso',
        userId: user.usu_id,
        username: user.usu_nombre
      });
    } else {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
});


app.get("/usuarios/:emp_id", async (req, res) => {
  try {
    const empresaDelUsario = await getEmpresaById(req.params.usu_id);
    res.status(200).send(empresaDelUsario);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error obteniendo empresa" });
  }
});

app.get("/usuarios/:suc_id", async (req, res) => {
    try {
      const sucursalDelUsuario = await getSucursalById(req.params.suc_id);
      res.status(200).send(sucursalDelUsuario);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: "Error obteniendo sucursal" });
    }
  });


  app.get('/profile/:nombre', async (req, res) => {
    const nombre = req.params.nombre;
  
    try {
      const usuarios = await buscarUsuariosPorNombre(nombre);
  
      if (!usuarios.length) {
        return res.status(404).json({ message: 'No se encontraron usuarios' });
      }
      res.status(200).json(usuarios);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error interno del servidor' });
    }
  });
  



app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
  });
  
