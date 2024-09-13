import { createServer, Model } from "miragejs";

export function makeServer({ environment = "development" } = {}) {
  return createServer({
    environment,
    models: {
      employee: Model,
    },

    seeds(server) {
      server.create("employee", {
        id: "1",
        name: "John Doe",
        position: "Software Engineer",
        department: "Engineering",
      });
      server.create("employee", {
        id: "2",
        name: "Jane Smith",
        position: "Product Manager",
        department: "Product",
      });
      server.create("employee", {
        id: "3",
        name: "Chris Johnson",
        position: "Designer",
        department: "Design",
      });
      for (let i = 4; i <= 10; i++) {
        server.create("employee", {
          id: `${i}`,
          name: `Employee ${i}`,
          position: `Role ${i}`,
          department: `Department ${i}`,
        });
      }
    },

    routes() {
      this.namespace = "api";

      this.get("/employees", (schema) => {
        return schema.employees.all();
      });

      this.post("/employees", (schema, request) => {
        let attrs = JSON.parse(request.requestBody);
        return schema.employees.create(attrs);
      });

      this.put("/employees/:id", (schema, request) => {
        let newAttrs = JSON.parse(request.requestBody);
        let id = request.params.id;
        let employee = schema.employees.find(id);
        return employee.update(newAttrs);
      });

      this.delete("/employees/:id", (schema, request) => {
        let id = request.params.id;
        return schema.employees.find(id).destroy();
      });
    },
  });
}
