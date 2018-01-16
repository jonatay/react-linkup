

export function loggingMiddleware(request: any, response: any, next?: (err?: any) => any): any {
    console.log("do something...");
    next();
}

