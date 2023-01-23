const crypto = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../config/key');
const storage = require('../utils/cloud_storage');

const ia = require('../models/ia');

module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await ia.getAll();
            console.log(`Comandos: ${data}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener comandos',
            });
        }
    },

    async findByCommand(req, res, next) {

        try {
            const word = req.params.command;
            console.log(word);
            const data = await ia.getByCommand(word);
            return res.status(201).json(data);
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error los Comandos',
                error: error,
                success: false
            });
            
        }

    },

    async create(req, res, next) {

        let task = req.body;

        try {
            const data = await ia.create(task);

            return res.status(201).json({
                success: true,
                message: 'Comando creado correctamente',
                data: data.id
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando el Comando',
                error: error
            });
        }

    }
}

