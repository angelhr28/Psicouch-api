// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { PaymentRegisterServices } from 'App/Services/Meeting/PaymentRegisterServices';
import PaymentRegisterValidator from 'App/Validators/PaymentRegisterValidator';

export default class PaymentRegistersController {
    public async invoke( { request, response }: HttpContextContract ) {

        const data = await request.validate( PaymentRegisterValidator );

        const payment = new PaymentRegisterServices( data.meeting_id );
        const meeting = await payment.get();

        return meeting
            ? response.ok( meeting )
            : response.badRequest( { message: 'Sin resultados.' } );
    }
}
