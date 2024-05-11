const { Router } = require("express");
const PessoaController = require("../controllers/PessoaController.js");

// Recebe uma instancia
const router = Router();

router.get("/pessoas", PessoaController.getAll);

module.exports = router;
