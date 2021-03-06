"use strict";

const Tanque = use("App/Models/Tanque");

class TanqueController {
  async index({ request }) {
    let { localId } = request.all();

    const tanques = await Tanque.query().where("local_id", localId).fetch();

    return tanques;
  }

  async show({ params }) {
    const tanque = await Tanque.find(params.id);

    return tanque;
  }

  async store({ request, response }) {
    const data = request.only(["nome", "descricao", "empresa_id", "local_id"]);

    const tanque = await Tanque.create(data);

    return response.status(201).json(tanque);
  }

  async update({ request, params, response }) {
    const data = request.only(["nome", "descricao", "empresa_id", "local_id"]);

    const tanque = await Tanque.find(params.id);

    tanque.merge(data);

    await tanque.save();

    return tanque;
  }

  async destroy({ params }) {
    const tanque = await Tanque.find(params.id);

    await tanque.delete();
  }
}

module.exports = TanqueController;
