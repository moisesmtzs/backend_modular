const Subject = require('../models/subject');

module.exports = {

    async create(req, res, next) {

        try{
            const subject = req.body;//CAPTURO LOS DATOS QUE ME ENVIE EL CLIENTE
                const data = await Subject.create(subject);
                    return res.status(201).json({
                        success: true,
                        message: 'Materia creada correctamente',
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