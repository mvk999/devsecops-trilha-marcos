const express = require("express");
const router = express.Router();
const { execFile } = require("child_process");
const { isIP } = require("net");

const hostnamePattern =
  /^(?=.{1,253}$)(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?)(?:\.(?:[A-Za-z0-9](?:[A-Za-z0-9-]{0,61}[A-Za-z0-9])?))*$/;

// GET /api/ping?host=<endereço> - diagnóstico de rede
router.get("/ping", (req, res) => {
  const { host } = req.query;
  if (typeof host !== "string" || !(isIP(host) || hostnamePattern.test(host))) {
    return res.status(400).json({ error: "Parâmetro 'host' deve ser um IP ou hostname válido" });
  }

  execFile("ping", ["-c", "2", host], (error, stdout, stderr) => {
    if (error) return res.status(500).json({ error: "Falha ao executar ping", details: stderr });
    res.json({ host, output: stdout });
  });
});

module.exports = router;
