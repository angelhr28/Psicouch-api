'use strict';

enum ErrorMessageBag {
    UNAUTHORIZED_ACCESS = 'No tienes los permisos suficientes para realizar esta acción',
    BAD_ATTEMPT = 'Hubo un problema al enviar la información',
    EXPIRED_JWT_TOKEN = 'Tu sesión ha expirado, inicia sesión nuevamente',
    INVALID_CREDENTIALS = 'Usuario o contraseña incorrecta',
    INVALID_JWT_OBJECT = 'No se puede continuar',
    INVALID_JWT_TOKEN = 'Tu sesión ha expirado, inicia sesión nuevamente',
    HTTP_EXCEPTION = 'No se puede continuar',
    EXIST_REGISTER = 'Ya existe un registro con esos datos.'
}

export default ErrorMessageBag;
