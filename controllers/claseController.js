const Clase = require('../models/clase');

module.exports = {

    async create(req, res, next) {

        try{
            const clase = req.body;
            const begin = new Date(clase.begin_hour);
            const end = new Date(clase.end_hour);
            const dia = await Clase.findByUserAndDay(clase.id_user, clase.days);

            for(const clase in dia){
                const horaInicio = new Date(dia[clase].begin_hour);
                const horaFin = new Date(dia[clase].end_hour);
                
                if (begin.getHours() < horaFin.getHours() && end.getHours() > horaInicio.getHours()) {
                    return res.status(401).json({
                        success: false,
                        message: 'Error, el horario interfiere con otra clase',
                    });
                }
            }
            const data = await Clase.create(clase);
            return res.status(201).json({
                success: true,
                message: 'Clase creada correctamente',
                data: data.id
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al crear la clase',
                error: error
            });
            
        }
    },

    async findByUserAndSubject(req, res, next) {
        try {
            const id_user = req.params.id_user;
            const id_subject = req.params.id_subject;
            
            const data = await Clase.findByUserAndSubject(id_user, id_subject);
            return res.status(201).json(data);
        
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al obtener las clases de la materia',
                error: error,
                success: false
            });
            
        }
    },

    async findByUserAndDay(req, res, next) {
        try {
            const id_user = req.params.id_user;
            const day = req.params.day;
            const data = await Clase.findByUserAndDay(id_user, day);
            return res.status(201).json(data);
        
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al obtener las clases del dia',
                error: error,
                success: false
            });
            
        }
    },

    async update(req, res, next) {
        
        try {
            const clase = req.body;
            await Clase.update(clase);
            return res.status(201).json({
                success: true,
                message: 'Clase actualizada correctamente'
            });

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error actualizando la clase',
                success: false,
                error: error
            });
        }
    },

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            await Clase.delete(id);
            return res.status(201).json({
                success: true,
                message: 'Clase eliminada correctamente'
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al eliminar la clase',
                success: false,
                error: error
            });
        }
    }

}