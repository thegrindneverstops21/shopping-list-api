import nodeHttp = require("node:http");
import ApiError = require("./ApiError");

// This helper reads the request body and converts it from JSON into a JavaScript object.
function parseJsonBody<T>(req: nodeHttp.IncomingMessage): Promise<T> {
    return new Promise((resolve, reject) => {
        let body = "";
        req.on("data", (chunk) => {
            body += chunk;
            // Keep the API safe by stopping very large request bodies.
            if(body.length > 1e6) { // Limit body size to 1MB
                req.destroy();
                reject(new ApiError(400, "Request body too large"));
            }
        });

        req.on("end", () => {
            if(!body){
                // An empty request body is treated as an empty object.
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

export = { parseJsonBody };