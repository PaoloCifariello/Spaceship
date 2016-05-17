import express = require('express');
import path = require('path');

module Core.Routes {
    export class RoutesInitializer {
        private static app;

        static Initialize(app) {
            this.app = app;

            /* /public static folder */
            this.InitializeStatic();

            /* every content below is only for logged user */
            //this.InitializeUserMustBeLogged();

            /* /me */
            this.InitializeRedirectToSignup();
        }
       
        private static InitializeStatic() {
            this.app.use('/images', express.static(path.resolve(process.cwd(), 'client/images')));
            this.app.use('/lib', express.static(path.resolve(process.cwd(), 'client/lib')));
            this.app.use('/script', express.static(path.resolve(process.cwd(), 'client/script')));
            this.app.use('/sound', express.static(path.resolve(process.cwd(), 'client/sound')));
            this.app.use('/styles', express.static(path.resolve(process.cwd(), 'client/styles')));
        }

        private static InitializeRedirectToSignup() {
            this.app.get('/*', this.renderIndex);
        }
        
        private static renderIndex(req: express.Request, res: express.Response) {
            res.sendFile(path.resolve(process.cwd(), 'client/views/game.html'));
        }
 

    }
}

export = Core.Routes.RoutesInitializer;
