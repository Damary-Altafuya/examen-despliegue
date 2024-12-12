const request = require("supertest");
const app = require("../Server"); // Importar tu aplicación

describe("API Datos Personales", () => {
  let createdEntryId;

  test("GET /api - Documentación de la API", async () => {
    const response = await request(app).get("/api");
    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Bienvenido a la API Datos Personales");
  });

  test("POST /personal-data - Crear un dato personal", async () => {
    const newEntry = { 
      firstName: "Damary", 
      lastName: "Altafuya", 
      phone: "123456789", 
      email: "damaryaltafuya@gmail.com" 
    };
    const response = await request(app).post("/personal-data").send(newEntry);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.firstName).toBe(newEntry.firstName);
    expect(response.body.lastName).toBe(newEntry.lastName);
    expect(response.body.phone).toBe(newEntry.phone);
    expect(response.body.email).toBe(newEntry.email);
    createdEntryId = response.body.id; // Guardar el ID para otras pruebas
  });

  test("GET /personal-data - Listar todos los datos personales", async () => {
    const response = await request(app).get("/personal-data");
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  test("DELETE /personal-data/:id - Eliminar un dato personal", async () => {
    const response = await request(app).delete(`/personal-data/${createdEntryId}`);
    expect(response.status).toBe(204); // No Content
  });

  test("GET /personal-data - Confirmar dato personal eliminado", async () => {
    const response = await request(app).get("/personal-data");
    expect(response.status).toBe(200);
    const entryExists = response.body.some((entry) => entry.id === createdEntryId);
    expect(entryExists).toBe(false);
  });
});

