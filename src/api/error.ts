export class ApiError extends Error {
    public status: number;

    constructor(status: number, message: string) {
        super(message);
        this.status = status;
        this.name = "ApiError";
    }
}

export class UnauthorizedError extends ApiError {
    constructor(message = "Unauthorized") {
        super(401, message);
    }
}
export class ForbiddenError extends ApiError {

    constructor(message = "Forbidden") {
        super(403, message);
    }
}

export class NotFoundError extends ApiError {

    constructor(message = "Resource Not Found") {
        super(404, message);
    }
}

export class ValidationError extends ApiError {

    constructor(message = "Validation Failed") {
        super(422, message);
    }
}