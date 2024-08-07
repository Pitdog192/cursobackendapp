import {errorsDictionary, HttpStatus} from "./errorsDictionary.js"

class HttpResponse {
    Ok(res, data) {
        return res.status(HttpStatus.OK).json({
            status: HttpStatus.OK,
            message: "Success",
            data,
        });
    }

    NotFound(res, data) {
        return res.status(HttpStatus.NOT_FOUND).json({
            status: HttpStatus.NOT_FOUND,
            message: errorsDictionary.NOT_FOUND,
            data,
        });
    }

    Unauthorized(res, data) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
            status: HttpStatus.UNAUTHORIZED,
            message: errorsDictionary.UNAUTHORIZED,
            error: data,
        });
    }

    Forbidden(res, data) {
        return res.status(HttpStatus.FORBIDDEN).json({
            status: HttpStatus.FORBIDDEN,
            message: errorsDictionary.FORBIDDEN,
            error: data,
        });
    }

    ServerError(res, data) {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            message: errorsDictionary.INTERNAL_SERVER_ERROR,
            error: data,
        });
    }
}

export const httpResponse = new HttpResponse()