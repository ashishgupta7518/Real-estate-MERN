export const errorHandler = (statusCode , message) => {
    const error = new Error();
    error.message = message || "Internal Server Error";
    error.statusCode = statusCode || 500;
    return error;
};