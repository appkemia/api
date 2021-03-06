"use strict";

const ControleVazao = use("App/Models/ControleVazao");
const Mail = use("Mail");
const formatDate = use("Utils")("formatDate");

class ControleVazaoController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const controle_vazaos = await ControleVazao.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .fetch();

    return controle_vazaos;
  }

  async show({ params }) {
    const controle_vazao = await ControleVazao.find(params.id);

    return controle_vazao;
  }

  async sendEmail({ request }) {
    const { localId, startDate, endDate, email, tipo } = request.all();

    const controle_vazaos = await ControleVazao.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .fetch();

    await Mail.send(
      "emails.vazaos",
      {
        vazaos: controle_vazaos.toJSON(),
        startDate: formatDate(startDate),
        endDate: formatDate(endDate),
      },
      (message) => {
        message.to(email).from("appkemia@gmail.com").subject("Kemia");
      }
    );

    return localId;
  }

  async store({ request, response }) {
    const data = request.only([
      "data",
      "hora",
      "vazao_dia",
      "empresa_id",
      "local_id",
    ]);

    const controle_vazao = await ControleVazao.create(data);

    return response.status(201).json(controle_vazao);
  }

  async update({ request, params, response }) {
    const data = request.only([
      "data",
      "hora",
      "vazao_dia",
      "empresa_id",
      "local_id",
    ]);

    const controle_vazao = await ControleVazao.find(params.id);

    controle_vazao.merge(data);

    await controle_vazao.save();

    return controle_vazao;
  }

  async destroy({ params }) {
    const controle_vazao = await ControleVazao.find(params.id);

    await controle_vazao.delete();
  }
}

module.exports = ControleVazaoController;
