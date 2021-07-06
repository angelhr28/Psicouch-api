'use strict';

import Route from '@ioc:Adonis/Core/Route';
import RegisterUsersController from 'App/Controllers/Http/Auth/RegisterUsersController';
import PostLoginsController from 'App/Controllers/Http/Auth/PostLoginsController';
import DeleteLogoutController from 'App/Controllers/Http/Auth/DeleteLogoutController';
import GetValidateTokenController from 'App/Controllers/Http/Auth/GetValidateTokenController';
import ProfileUsersController from 'App/Controllers/Http/Profile/ProfileUsersController';
import GoogleCalendarController from 'App/Controllers/Http/GoogleCalendarController';
import RecoveryPasswordsController from 'App/Controllers/Http/RecoveryPassword/RecoveryPasswordsController';
import MeetingCrossingsController from 'App/Controllers/Http/Meeting/MeetingCrossingsController';
import MeetingRegistersController from 'App/Controllers/Http/Meeting/MeetingRegistersController';
import MeetingCalendarsController from 'App/Controllers/Http/Meeting/MeetingCalendarsController';
import GoogleDrivesController from 'App/Controllers/Http/GoogleDrivesController';
import PaymentRegistersController from 'App/Controllers/Http/Meeting/PaymentRegistersController';
import Application from '@ioc:Adonis/Core/Application';

Route.post('/file', async ({ request }) => {
    const coverImage = request.file('boton')
    console.log(request)
    if (coverImage) {
        await coverImage.move(Application.tmpPath('uploads'))
    }
})

Route.get( '/js', 'GooglePosController2.invoke' );
Route.get( '/send-session', new GoogleCalendarController().invoke );
Route.get( '/save', new GoogleDrivesController().invoke );

Route.post( 'register', new RegisterUsersController().invoke );
Route.post( 'auth/login', new PostLoginsController().invoke ).as( 'login' );
Route.post( 'auth/recovery', new RecoveryPasswordsController().invoke );

Route.get( '/crossing', new MeetingCrossingsController().invoke );

Route.group( () => {
    Route.post( '/register', new MeetingRegistersController().invoke );
    Route.get( '/calendar', new MeetingCalendarsController().invoke );
    Route.post( '/payment', new PaymentRegistersController().invoke );
} ).prefix( 'meeting' ).middleware( 'auth' );

Route.group( () => {
    Route.delete( 'logout', new DeleteLogoutController().invoke );
    Route.get( 'validate', new GetValidateTokenController().invoke );
    Route.get( 'profile', new ProfileUsersController().invoke );
} ).prefix( 'auth' ).middleware( 'auth' );


