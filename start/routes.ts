'use strict';

import Route from '@ioc:Adonis/Core/Route';
import RegisterUsersController from 'App/Controllers/Http/RegisterUsersController';
import PostLoginsController from 'App/Controllers/Http/PostLoginsController';
import DeleteLogoutController from 'App/Controllers/Http/DeleteLogoutController';
import GetValidateTokenController from 'App/Controllers/Http/GetValidateTokenController';

Route.get( '/', () => {
    return { message: 'hello word' };
} );
Route.get( '/js', 'GooglePosController2.invoke' );
Route.get( '/a', 'GooglePosController.invoke' );

Route.post( 'register', new RegisterUsersController().invoke );
Route.post( 'auth/login', new PostLoginsController().invoke ).as( 'login' );

Route.group( () => {
    Route.delete( 'logout', new DeleteLogoutController().invoke );
    Route.get( 'validate', new GetValidateTokenController().invoke );
} ).prefix( 'auth' ).middleware( 'auth' );


