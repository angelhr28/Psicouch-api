'use strict';

import Route from '@ioc:Adonis/Core/Route';
import RegisterUsersController from 'App/Controllers/Http/Auth/RegisterUsersController';
import PostLoginsController from 'App/Controllers/Http/Auth/PostLoginsController';
import DeleteLogoutController from 'App/Controllers/Http/Auth/DeleteLogoutController';
import GetValidateTokenController from 'App/Controllers/Http/Auth/GetValidateTokenController';
import ProfileUsersController from 'App/Controllers/Http/Profile/ProfileUsersController';
import GooglePosController from 'App/Controllers/Http/GooglePosController';
import RecoveryPasswordsController from 'App/Controllers/Http/RecoveryPassword/RecoveryPasswordsController';
import MeetingCrossingsController from 'App/Controllers/Http/Meeting/MeetingCrossingsController';
import MeetingRegistersController from 'App/Controllers/Http/Meeting/MeetingRegistersController';

Route.get( '/', () => {
    return { message: 'hello word' };
} );
Route.get( '/js', 'GooglePosController2.invoke' );
Route.get( '/send-session', new GooglePosController().invoke );

Route.post( 'register', new RegisterUsersController().invoke );
Route.post( 'auth/login', new PostLoginsController().invoke ).as( 'login' );
Route.post( 'auth/recovery', new RecoveryPasswordsController().invoke );

Route.get( '/crossing', new MeetingCrossingsController().invoke );

Route.group( () => {
    Route.post( '/register-meeting', new MeetingRegistersController().invoke );
} ).prefix( 'meeting' ).middleware( 'auth' );

Route.group( () => {
    Route.delete( 'logout', new DeleteLogoutController().invoke );
    Route.get( 'validate', new GetValidateTokenController().invoke );
    Route.get( 'profile', new ProfileUsersController().invoke );
} ).prefix( 'auth' ).middleware( 'auth' );


