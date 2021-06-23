'use strict';

enum ErrorMessageBag {
    BAD_ATTEMPT = 'Hubo un problema al enviar la información',
    INVALID_CREDENTIALS = 'Usuario o contraseña incorrecta',
    EXIST_REGISTER = 'Ya existe un registro con esos datos.',
    EXIST_MAIL = 'Debe ingresar un correo.',
    EXIST_SECRET_WORD = 'Debe ingresar su palabra secreta.',
    EXIST_PASSWORD = 'Debe ingresar una contraseña.',
}

export default ErrorMessageBag;
