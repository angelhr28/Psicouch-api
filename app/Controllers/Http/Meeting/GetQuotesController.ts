// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';
import { GetQuotesServices } from 'App/Services/Meeting/GetQuotesServices';

export default class GetQuotesController {
    public async invoke( { response }: HttpContextContract ) {
        
        const verify = new GetQuotesServices();
        const meeting = await verify.get();
        
        return meeting
            ? response.ok( meeting )
            : response.badRequest( { message: 'Sin resultados.' } );
    }
}
