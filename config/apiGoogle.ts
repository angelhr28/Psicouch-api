'use strict';

import Env from '@ioc:Adonis/Core/Env';

export const clientId: string = Env.get( 'GOGLE_API_CLIENT_ID', '' );
export const clientSecret: string = Env.get( 'GOGLE_API_CLIENT_SECRET', '' );
export const redirectUri: string = Env.get( 'GOGLE_API_REDIRECT_URI', 'https://developers.google.com/oauthplayground' );
export const refreshToken: string = Env.get( 'GOGLE_API_REFRESH_TOKEN', '1//04oapOVXLMYjOCgYIARAAGAQSNwF-L9IrwKIJLuxmUhRIFW9qOpK8fYsfyH6MYvZrg_svIFibbem2Pqi0J5r8l2X_ZSsSFEO7Uc8' );
export const apiVersion: 'v3' = Env.get( 'GOGLE_API_VERSION', 'v3' );
