'use strict';

import Env from '@ioc:Adonis/Core/Env';

export const cClientId    : string = Env.get( 'CALENDAR_CLIENT_ID', '' );
export const cClientSecret: string = Env.get( 'CALENDAR_CLIENT_SECRET', '' );
export const cRefreshToken: string = Env.get( 'CALENDAR_REFRESH_TOKEN', '1//04oapOVXLMYjOCgYIARAAGAQSNwF-L9IrwKIJLuxmUhRIFW9qOpK8fYsfyH6MYvZrg_svIFibbem2Pqi0J5r8l2X_ZSsSFEO7Uc8' );
export const cToken: string = Env.get( 'CALENDAR_TOKEN', 'ya29.a0ARrdaM-o9N_29I6NO-nnuiRsdbkekYNVv7vIeoxM4wAmc9y00d8ksSJRud4nqFttHikMmuxpdzAwte0RiZqM7xmSgqnGxKW8RSikigbfBLGAJOA3qOHiehtzgFhIEixzIV_9Ii0k7Mh3jSG3RUEPTLRoAIbt' );

export const dClientId    : string = Env.get( 'DRIVE_CLIENT_ID', '' );
export const dClientSecret: string = Env.get( 'DRIVE_CLIENT_SECRET', '' );
export const dRefreshToken: string = Env.get( 'DRIVE_REFRESH_TOKEN', '1//04oapOVXLMYjOCgYIARAAGAQSNwF-L9IrwKIJLuxmUhRIFW9qOpK8fYsfyH6MYvZrg_svIFibbem2Pqi0J5r8l2X_ZSsSFEO7Uc8' );

export const redirectUri: string = Env.get( 'GOGLE_API_REDIRECT_URI', 'https://developers.google.com/oauthplayground' );
export const apiVersion: 'v3' = Env.get( 'GOGLE_API_VERSION', 'v3' );

export const pathImg: string = Env.get( 'PATH_IMG', 'resources/images/' );
