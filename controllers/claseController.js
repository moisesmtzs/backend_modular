const Clase = require('../models/clase');

module.exports = {

    async create(req, res, next) {

        try{
            const clase = req.body;//CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
                const data = await Clase.create(clase);
                    return res.status(201).json({
                        success: true,
                        message: 'Clase creada correctamente',
                        data: data.id //Id de la materia que se registro
                    });
            
        }catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al crear Materia',
                error: error
            });
            
        }
    },
}