import express, { Application } from 'express';
import cors from 'cors';
import { authRoutes } from '../routes';

import { db } from '../db';


class Server {

    private app: Application;
    private port: string;
    private apiPaths = {
        auth: '/api/auth'
    }

    constructor() {
        this.app  = express();
        this.port = process.env.PORT || '8000';

        // Métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection() {

        try {
            
            await db.dbConnection();
        } catch (error) {
            console.log("Could not connect to the db");
               
        }
    }

    middlewares() {

        // CORS
        this.app.use( cors() );

        // Lectura del body
        this.app.use( express.json() );

        // Carpeta pública
        this.app.use( express.static('public') );
    }


    routes() {
        this.app.use( this.apiPaths.auth, authRoutes )
    }


    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ' + this.port );
        })
    }

}

export default Server;