import {rest} from "msw";

export const handlers = [
    rest.post("http://127.0.0.1/:3001", function (request, response, context) {
        return response(
            context.json({
                documents: [
                    'Hello world\n'
                ]
            })
        );



    })

];
