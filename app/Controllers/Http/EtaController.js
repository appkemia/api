"use strict";

const Eta = use("App/Models/Eta");

class EtaController {
  async index({ request }) {
    let { localId } = request.all();

    const etas = await Eta.query().where("local_id", localId).fetch();

    return etas;
  }

  async show({ params }) {
    const eta = await Eta.find(params.id);

    return eta;
  }

  async store({ request, response }) {
    const data = request.only([
      "nome",
      "descricao",
      "is_vazao",
      "is_ph",
      "is_pac",
      "is_polimero",
      "is_hipoclorito",
      "is_observacao",
      "empresa_id",
      "local_id",
    ]);

    const eta = await Eta.create(data);

    return response.status(201).json(eta);
  }

  async update({ request, params, response }) {
    const data = request.only([
      "nome",
      "descricao",
      "is_vazao",
      "is_ph",
      "is_pac",
      "is_polimero",
      "is_hipoclorito",
      "is_observacao",
      "empresa_id",
      "local_id",
    ]);

    const eta = await Eta.find(params.id);

    eta.merge(data);

    await eta.save();

    return eta;
  }

  async destroy({ params }) {
    const eta = await Eta.find(params.id);

    await eta.delete();
  }
}

module.exports = EtaController;
