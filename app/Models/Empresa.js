'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Empresa extends Model {

    users() {
        return this.hasMany('App/Models/User')
    }

    locais() {
        return this.hasMany('App/Models/Local')
    }

    equipamentos() {
        return this.hasMany('App/Models/Equipamento')
    }
}

module.exports = Empresa
