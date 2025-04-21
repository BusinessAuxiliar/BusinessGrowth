import mysql from "mysql2";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

const port = 3001;
const app = express();

const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  })
  .promise();

app.use(cors());

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Conectado a la base de datos MySQL");
    connection.release();
  } catch (err) {
    console.error("❌ Error al conectar con MySQL:", err);
  }
};
testConnection();

export default pool;

export async function getUserByUsername(username) {
  const [rows] = await pool.query(
    `SELECT * FROM usuarios WHERE usu_nombre = ?`,
    [username]
  );
  return rows[0];
}


export async function buscarUsuariosPorNombre(nombre) {
  const [rows] = await pool.query(
    `SELECT * FROM usuarios WHERE usu_nombre LIKE ?`,
    [`%${nombre}%`]
  );
  return rows;
}


export async function getEmpresaByUsername(usu_nombre) {
  const [row] = await pool.query(
    `SELECT empresas.emp_nombre FROM usuarios 
  LEFT JOIN empresas ON usuarios.emp_id = empresas.emp_id
  WHERE usuarios.usu_nombre = ?`,
    [usu_nombre]
  );
  return row[0];
}


export async function getUserById(usu_id) {
  const [row] = await pool.query(`SELECT * FROM usuarios WHERE id = ?`, [
    usu_id,
  ]);

  return row[0];
}


export async function getEmpresaByEmpId(usu_id) {
  const [rows] = await pool.query(
    `SELECT empresas.*
    FROM usuarios
    LEFT JOIN empresas ON usuarios.emp_id = empresas.emp_id
    WHERE usuarios.usu_id = ?
 `,
    [usu_id]
  );
  return rows;
}


export async function getSucursalById(suc_id) {
  const [row] = await pool.query(
    `SELECT sucursales.*
    FROM usuarios
    LEFT JOIN sucursales ON usuarios.suc_id = sucursales.suc_id
    WHERE usuarios.suc_id = ?
    `,
    [suc_id]
  );
  return row[0];
}


export async function getEmpresaYSucursalByUsername(usu_nombre) {
  const [rows] = await pool.query(`
    SELECT 
      empresas.emp_nombre,
      sucursales.suc_nombre
    FROM usuarios
    LEFT JOIN empresas ON usuarios.emp_id = empresas.emp_id
    LEFT JOIN sucursales ON usuarios.suc_id = sucursales.suc_id
    WHERE usuarios.usu_nombre = ?
  `, [usu_nombre]);

  return rows;
}


export async function getEmailById(usu_id) {
  const [row] = await pool.query(
    `SELECT usuarios.usu_email FROM usuarios WHERE usu_id = ?`,
    [usu_id]
  );
  return row;
}
