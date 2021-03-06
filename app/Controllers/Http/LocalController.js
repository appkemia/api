"use strict";

const Local = use("App/Models/Local");
const LocalUsuario = use("App/Models/LocalUsuario");

class LocalController {
  async index({ request, auth }) {
    const auth_user = await auth.getUser();

    let { empresaId } = request.all();

    if (!empresaId) {
      empresaId = auth_user.empresa_id;
    }

    let locais = Local.query()
      .where("empresa_id", empresaId)
      .with("users", (qr) => qr.select("id", "nome"))

    if (auth_user.tipo === "operator") {
      const locaisIds = await LocalUsuario.query()
        .where("user_id", auth_user.id)
        .pluck('local_id');

      locais.whereIn("id", locaisIds);
    }

    locais = await locais.fetch();
    return locais;
  }

  async show({ params }) {
    const local = await Local.find(params.id);

    await local.load("users");

    return local;
  }

  async store({ request, response }) {
    const data = request.only(["nome", "descricao", "endereco", "empresa_id"]);

    const local = await Local.create(data);

    const { users } = request.post();

    if (users && users.length > 0) {
      await local.users().attach(users);
    }

    return response.status(201).json(local);
  }

  async update({ request, params, response }) {
    const data = request.only(["nome", "descricao", "endereco", "empresa_id"]);

    const local = await Local.find(params.id);

    local.merge(data);

    await local.save();

    const { users } = request.post();

    if (users && users.length > 0) {
      await local.users().detach();
      await local.users().attach(users);
    }

    return local;
  }

  async destroy({ params, response }) {
    const local = await Local.find(params.id);

    await local.delete();

    response.status(204).send("");
  }
}

module.exports = LocalController;
