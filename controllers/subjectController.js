const Subject = require('../models/subject');

module.exports = {

    async create(req, res, next) {
        try{
            const subject = req.body;
                const data = await Subject.create(subject);
                    return res.status(201).json({
                        success: true,
                        message: 'Materia creada correctamente',
                        data: data.id
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

    async findByUser(req, res, next) {
        try {
            const id_user = req.params.id_user;
            
            const data = await Subject.findByUser(id_user);
            return res.status(201).json(data);
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al obtener las materias del usuario',
                error: error,
                success: false
            });
            
        }
    },

    async update(req, res, next) {
        try {
            const subject = req.body;
            await Subject.update(subject);
            return res.status(201).json({
                success: true,
                message: 'Materia actualizada correctamente'
            });
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error actualizando la materia',
                success: false,
                error: error
            });
        }
    },

    async delete(req, res, next) {
        try {
            const id = req.params.id;
            await Subject.delete(id);
            return res.status(201).json({
                success: true,
                message: 'Materia eliminada correctamente'
            });
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al eliminar la materia',
                success: false,
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
    },

    async findByNameIA(req, res, next) {
        try {
            const id_user = req.params.id;
            const name = req.params.name;
            const data = await Subject.findByNameIA(name, id_user);
            return res.status(201).json(data);
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al recuperar la Materia por Nombre',
                error: error,
                success: false
            });
            
        }
    },

    async getDates(req, res, next) {
        
        const id = req.params.id;
        try {
            const data = await Subject.getDates(id);

            return res.status(200).json(data);

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al obtener las fechas',
                success: false,
                error: error
            });
        }

    },

    async getNameById(req, res, next) {
        console.log("ENTRAMOS");
        const id = req.params.id;
        try {
            const data = await Subject.getName(id);

            return res.status(200).json(data);

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al obtener el nombre',
                success: false,
                error: error
            });
        }

    }

}