import { type ServerResponse } from 'http';

// These helpers format API responses in a consistent JSON structure.
interface SuccessResponse<T> {
    success: true;
    data: T;
}

interface ErrorResponse {
    success: false;
    error: { message: string };
}

function createSuccessResponse<T>(res: ServerResponse, statusCode: number, data: T): void {
    const response: SuccessResponse<T> = {
        success: true,
        data,   
    };
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

function createErrorResponse(res: ServerResponse, statusCode: number, message: string): void {
    const response: ErrorResponse = {
        success: false,
        error: { message },
    };
    res.writeHead(statusCode, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(response));
}

function sendNoContent(res: ServerResponse): void {
    // 204 means the request was successful but there is no response body.
    res.writeHead(204);
    res.end();
}

export = { createSuccessResponse, createErrorResponse, sendNoContent };