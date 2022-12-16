const { findByUserAndStatus } = require('../models/task');
const Task = require('../models/task');

module.exports = {

    async findByUserAndStatus(req, res, next) {

        try {
            const id_user = req.params.id_user;
            const status = req.params.status;

            const data = await Task.findByUserAndStatus(id_user, status);
            return res.status(201).json(data);
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al obtener las tareas del usuario',
                error: error,
                success: false
            });
            
        }

    },

    async create(req, res, next) {

        let task = req.body;

        task.status = 'PENDIENTE';

        try {
            const data = await Task.create(task);

            return res.status(201).json({
                success: true,
                message: 'Tarea creada correctamente',
                data: data.id
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error creando la tarea',
                error: error
            });
        }

    }

}