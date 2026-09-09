import nodeHttp = require("node:http");

function parseJsonBody<T>(req: nodeHttp.IncomingMessage): Promise<T> {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
            if(body.length > 1e6) { // Limit body size to 1MB
                req.destroy();
                reject(new ApiError(400, "Request body too large"));
            }
        });

        req.on("end", () => {
            if(!body){
                resolve({} as T); // Return an empty object if the body is empty
                return;
            }
            try{
                resolve(JSON.parse(body) as T);
            }catch {
                reject(new ApiError(400, "Invalid JSON body")); 
            }
        });

        req.on("error", (err) => reject(err));
    });
}