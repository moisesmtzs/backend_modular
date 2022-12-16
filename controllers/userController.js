const crypto = require('bcrypt');
const jwt = require('jsonwebtoken');
const key = require('../config/key');
const storage = require('../utils/cloud_storage');

const User = require('../models/user');

module.exports = {

    async getAll(req, res, next) {
        try {
            const data = await User.getAll();
            console.log(`Usuarios: ${data}`);
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener usuarios',
            });
        }
    },

    async register(req, res, next) {

        try {
            
            const user = req.body;
            
            const myUser = await User.findByEmail(user.email);
            
            if (myUser) {
                return res.status(401).json({
                    success: false,
                    message: 'Email ya registrado, inicia sesión',
                    
                });
            } else {
                const data = await User.create(user);
                return res.status(201).json({
                    success: true,
                    message: 'Cuenta creada correctamente',
                    data: data.id 
                });
            }
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al crear usuario',
                error: error
            });
            
        }
    },

    async findById(req, res, next) {
        try {

            const id = req.params.id;

            const data = await User.findById(id);
            data.session_token = req.body.session_token;
            return res.status(201).json(data);
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al obtener el usuario',
            });
        }
    },

    async login( req, res ) {

        const email = req.body.email;
        
        const myUser = await User.findByEmail(email);

        if (!myUser) {
            return res.status(401).json({
                success: false,
                message: 'Email no encontrado',

            });
        }

        try {
            
            const password = req.body.password;

            const isPasswordValid = await crypto.compare( password, myUser.password );

            if ( isPasswordValid ) {

                const token = jwt.sign({ id: myUser.id, email: myUser.email }, key.secretOrKey, {});
                const data = {
                    id: myUser.id,
                    name: myUser.name,
                    lastname: myUser.lastname,
                    phone: myUser.phone,
                    email: myUser.email,
                    image: myUser.image,
                    session_token: `JWT ${token}`
                }

                return res.status(201).json({
                    success: true,
                    data: data,
                    // token: "JWT " + token,
                    message: 'Usuario autenticado'
                });

            } else {
                return res.status(401).json({
                    success: false,
                    message: 'Contraseña inválida',
                });

            }
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al hacer login',
                error: error
            });
        }

    },

    async updateWithImage(req, res, next) {

        try {
            
            const user = JSON.parse(req.body.user);

            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`; 
                const url = await storage(files[0], pathImage);

                if (url != undefined && url != null) {
                    user.image = url;
                }
            }

            User.updateWithImage(user);
            
            // const id = req.body.id;

            // const newUser = User.findById(id);
            // newUser.session_token = user.session_token;

            return res.status(201).json({
                success: true,
                message: 'Los datos del usuario se actualizaron correctamente',
                // data: newUser
            });

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al actualizar los datos del usuario',
                error: error
            });
        }
    },

    async updateWithoutImage(req, res, next) {

        try {
            
            const id = req.body.id;
            const user = req.body;

            await User.updateWithoutImage(user);
            
            return res.status(201).json({
                success: true,
                message: 'Los datos del usuario se actualizaron correctamente',
            });

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Error al actualizar los datos del usuario',
                error: error
            });
        }
    },

    async delete(req, res, next) {
        
        try {
            const id = parseInt(req.params.id);
            await User.delete(id);
            return res.status(201).json({
                success: true,
                message: "Cuenta eliminada correctamente"
            });
            
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                message: `Error al eliminar la cuenta.`,
                success: false,
                error: error
            });
        }

    }

}