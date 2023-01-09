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

    async findByName(req, res, next) {

        try {
            const id_user = req.params.id;
            const name = req.params.name;

            const data = await Subject.findByName(name, id_user);
            return res.status(201).json(data);
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al recuperar la Materia por Nombre',
                error: error,
                success: false
            });
            
        }

    }
}