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

    async finByWord(req, res, next) {

        try {
            const word = req.params.word;

            const data = await ia.getByWord(word);
            return res.status(201).json(data);
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error los Comandos',
                error: error,
                success: false
            });
            
        }

    }
}

