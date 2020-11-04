"use strict";

const TratamentoEfluenteLagoa = use("App/Models/TratamentoEfluenteLagoa");

class TratamentoEfluenteLagoaController {
  async index({ request }) {
    let { localId, startDate, endDate } = request.all();

    const tratamentos = await TratamentoEfluenteLagoa.query()
      .where("local_id", localId)
      .whereBetween("data", [startDate, endDate])
      .with("lagoa")
      .fetch();

    return tratamentos;
  }

  async show({ params }) {
    const tratamento = await TratamentoEfluenteLagoa.find(params.id);

    return tratamento;
  }

  async sendEmail({ request }) {
    const { localId, startDate, endDate, email, tipo } = request.all();

    return localId
  }

  async store({ request, response }) {
    const data = request.only([
      "data",
      "ph",
      "od",
      "ss",
      "aeracao",
      "observacao",
      "nivel_lagoa",
      "bomba_recalque_funcionando",
      "observacao_geral",
      "lagoa_id",
      "empresa_id",
      "local_id",
    ]);

    const tratamento = await TratamentoEfluenteLagoa.create(data);

    return response.status(201).json(tratamento);
  }

  async update({ request, params, response }) {
    const data = request.only([
      "data",
      "ph",
      "od",
      "ss",
      "aeracao",
      "observacao",
      "nivel_lagoa",
      "bomba_recalque_funcionando",
      "observacao_geral",
      "operador_id",
      "lagoa_id",
      "empresa_id",
      "local_id",
    ]);

    const tratamento = await TratamentoEfluenteLagoa.find(params.id);

    tratamento.merge(data);

    await tratamento.save();

    return tratamento;
  }

  async destroy({ params }) {
    const tratamento = await TratamentoEfluenteLagoa.find(params.id);

    await tratamento.delete();
  }
}

module.exports = TratamentoEfluenteLagoaController;
