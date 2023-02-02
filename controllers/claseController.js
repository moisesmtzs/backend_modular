const Clase = require('../models/clase');

module.exports = {

    async create(req, res, next) {
        console.log("Entro");
        try{
            const clase = req.body;
                const data = await Clase.create(clase);
                    return res.status(201).json({
                        success: true,
                        message: 'Clase creada correctamente',
                        data: data.id
                    });
            
        }catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al crear la Clase',
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