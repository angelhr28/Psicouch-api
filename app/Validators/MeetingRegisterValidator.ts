import { rules, schema } from '@ioc:Adonis/Core/Validator';
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext';

export default class MeetingRegisterValidator {
    constructor( protected ctx: HttpContextContract ) {
    }

    public schema = schema.create( {

        name: schema.string( {
            trim: true,
        }, [
            rules.maxLength( 255 ),
        ] ),

        surname: schema.string( {
            trim: true,
        }, [
            rules.maxLength( 255 ),
        ] ),

        age: schema.number(),

        phone: schema.string( {
            trim: true,
        }, [
            rules.maxLength( 9 ),
        ] ),

        document_id: schema.number( [
            rules.required(),
            rules.unsigned(),
            rules.exists( {
                table: 'documents',
                column: 'id',
                where: { status: '1' },
            } ),
        ] ),

        document_number: schema.string( {
            trim: true,
        }, [
            rules.maxLength( 16 ),
        ] ),

        emails: schema.array.optional().members(
            schema.string( {
                trim: true,
            }, [ rules.email() ] ),
        ),

        product_id: schema.number( [
            rules.required(),
            rules.unsigned(),
            rules.exists( {
                table: 'products',
                column: 'id',
                where: { status: '1' },
            } ),
        ] ),
        gender_id: schema.number( [
            rules.required(),
            rules.unsigned(),
            rules.exists( {
                table: 'genders',
                column: 'id',
                where: { status: '1' },
            } ),
        ] ),

        description: schema.string( {
            trim: true,
        }, [
            rules.maxLength( 100 ),
        ] ),

        disease: schema.string(
            {
                trim: true,
            },
            [
                rules.exists( {
                    table: 'diseases',
                    column: 'name',
                    where: { status: '1' },
                } ),
            ],
        ),

        date: schema.array.optional().members(
            schema.string( {
                trim: true,
            } ),
        ),

        start_time: schema.array.optional().members(
            schema.string( {
                trim: true,
            } ),
        ),

        end_time: schema.array.optional().members(
            schema.string( {
                trim: true,
            } ),
        ),
        
        is_app:schema.boolean.optional()
    } );
    public messages = {};
}
