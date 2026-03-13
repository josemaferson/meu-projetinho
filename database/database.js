const { Client } = require('pg');

const db = new Client({
  connectionString: "postgresql://neondb_owner:npg_3LdqsCnR4UtX@ep-frosty-leaf-acpujuhr-pooler.sa-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require",
  ssl: {
    rejectUnauthorized: false
  }
});

db.connect()
  .then(() => {
    console.log("Conectado ao PostgreSQL (Neon) com sucesso!");
  })
  .catch((err) => {
    console.error("Erro ao conectar ao PostgreSQL:", err);
  });

module.exports = db;