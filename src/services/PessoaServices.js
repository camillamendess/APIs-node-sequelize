const dataSource = require("../database/models");
const Services = require("./Services.js");

class PessoaServices extends Services {
  constructor() {
    super("Pessoa");
    this.matriculaServices = new Services("Matricula");
  }

  async pegaMatriculasAtivasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getAulasMatriculadas();
    return listaMatriculas;
  }

  async pegaTodasMatriculasPorEstudante(id) {
    const estudante = await super.pegaUmRegistroPorId(id);
    const listaMatriculas = await estudante.getTodasMatriculas();
    return listaMatriculas;
  }

  async pegaPessoasEscopoTodos() {
    const listaPessoas = await super.pegaRegistrosPorEscopo("todosOsRegistros");
    return listaPessoas;
  }

  async cancelaPessoaEMatriculas(EstudanteId) {
    return dataSource.sequelize.transaction(async (transacao) => {
      await super.atualizaRegistro(
        { ativo: false },
        { id: EstudanteId },
        transacao
      );
      await this.matriculaServices.atualizaRegistro(
        { status: "cancelado" },
        { estudante_id: EstudanteId },
        transacao
      );
    });
  }
}

module.exports = PessoaServices;
