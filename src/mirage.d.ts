declare module "miragejs" {
  export function createServer(config: {
    models?: { [key: string]: ModelDefinition };
    seeds?: (server: Server) => void;
    routes?: (this: Server) => void;
  }): Server;

  export class Model {
    static extend(props: object): ModelDefinition;
  }

  export interface Server {
    namespace: string;
    get(url: string, handler: (schema: Schema, request: Request) => any): void;
    post(url: string, handler: (schema: Schema, request: Request) => any): void;
    put(url: string, handler: (schema: Schema, request: Request) => any): void;
    delete(
      url: string,
      handler: (schema: Schema, request: Request) => any
    ): void;
    create(modelName: string, data: object): ModelInstance;
  }

  export interface Schema {
    [key: string]: any;
  }

  export interface Request {
    requestBody: string;
    params: { [key: string]: string };
  }

  export interface ModelInstance {
    id: string;
    [key: string]: any;
  }
}
