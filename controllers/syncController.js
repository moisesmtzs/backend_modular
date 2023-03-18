const Sync = require("../models/sync");

module.exports = {

    async executeCommand(req, res, next) {

        let query = req.body;

        try {
            await Sync.executeSync(query.command);

            return res.status(201).json({
                success: true,
                message: 'Sincronización hecha correctamente',
            });

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: 'Hubo un error al sincronizar la aplicación',
                error: error,
                success: false
            });
        }

    }

}


