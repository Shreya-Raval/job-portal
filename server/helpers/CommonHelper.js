exports.apiResponse = ( res,statusCode,message,data = {} ) => {
    let response = {
        "statusCode" : statusCode,
        "message": message,
        "data": data
    };
    return res.status(statusCode).json(response);
}