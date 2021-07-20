'use strict';

import Env from '@ioc:Adonis/Core/Env';

export const cClientId    : string = Env.get( 'CALENDAR_CLIENT_ID'    , '251838424508-qvkh2gdkje594ov418k8gjs19ouedjdg.apps.googleusercontent.com' );
export const cClientSecret: string = Env.get( 'CALENDAR_CLIENT_SECRET', 'gEoEdDg4AxAm73A9qoIzqn3q' );
export const cRefreshToken: string = Env.get( 'CALENDAR_REFRESH_TOKEN', '1//04Jc9DM31LjtMCgYIARAAGAQSNwF-L9IrJsuz-k0HNy7wjtCeWxyf34ezj0wBISPiGgU-wZJYnmvBx08nZ2MKqsZ6zdDoe195Wk0' );
export const cToken       : string = Env.get( 'CALENDAR_TOKEN'        , 'ya29.a0ARrdaM80pz3WwlcSQtivBg_2wO2HK9BQE4gyFVXGxvg6Cjq-0mfKBf1AonCsRg8o4vWOCnJ9HbinLliv973I2fNzKBsNz9TcSypzSYXIjDwT1tQF-yia3RnMs3l4OrYB6wGYgWQN3wkQ41FbsojLB-xUMI6E' );

export const dClientId    : string = Env.get( 'DRIVE_CLIENT_ID', '' );
export const dClientSecret: string = Env.get( 'DRIVE_CLIENT_SECRET', '' );
export const dRefreshToken: string = Env.get( 'DRIVE_REFRESH_TOKEN', '1//04oapOVXLMYjOCgYIARAAGAQSNwF-L9IrwKIJLuxmUhRIFW9qOpK8fYsfyH6MYvZrg_svIFibbem2Pqi0J5r8l2X_ZSsSFEO7Uc8' );

export const redirectUri: string = Env.get( 'GOGLE_API_REDIRECT_URI', 'https://developers.google.com/oauthplayground' );
export const apiVersion: 'v3' = Env.get( 'GOGLE_API_VERSION', 'v3' );

export const pathImg: string = Env.get( 'PATH_IMG', 'resources/images/' );

