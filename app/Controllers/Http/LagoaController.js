"use strict";

const Lagoa = use("App/Models/Lagoa");

class LagoaController {
  async index({ request }) {
    let { localId } = request.all();

    const lagoas = await Lagoa.query().where("local_id", localId).fetch();

    return lagoas;
  }

  async show({ params }) {
    const lagoa = await Lagoa.find(params.id);

    return lagoa;
  }

  async store({ request, response }) {
    const data = request.only([
      "nome",
      "descricao",
      "is_ph",
      "is_od",
      "is_ss",
      "is_aeracao",
      "is_observacao",
      "empresa_id",
      "local_id",
    ]);

    const lagoa = await Lagoa.create(data);

    return response.status(201).json(lagoa);
  }

  async update({ request, params, response }) {
    const data = request.only([
      "nome",
      "descricao",
      "is_ph",
      "is_od",
      "is_ss",
      "is_aeracao",
      "is_observacao",
      "empresa_id",
      "local_id",
    ]);

    const lagoa = await Lagoa.find(params.id);

    lagoa.merge(data);

    await lagoa.save();

    return lagoa;
  }

  async destroy({ params }) {
    const lagoa = await Lagoa.find(params.id);

    await lagoa.delete();
  }
}

module.exports = LagoaController;
