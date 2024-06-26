import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

const demoUsers = [
  { id: 1, username: "user1", displayName: "U1" },
  { id: 2, username: "user2", displayName: "U2" },
  { id: 3, username: "user3", displayName: "U3" },
];

app.get("/", (request, response) => {
  response.status(201).send({ message: "Hello Me" });
});

app.get("/api/users", (request, response) => {
  response.send(demoUsers);
});

app.get("/api/users/:id", (request, response) => {
  console.log(request.params);
  const parsedId = parseInt(request.params.id);
  console.log(parsedId);
  if (isNaN(parsedId)) {
    return response.status(400).send({ message: "Invalid ID supplied" });
  }

  const findUser = demoUsers.find((user) => user.id === parsedId);
  if (!findUser) {
    return response.status(404).send({ message: "User not found" });
  }
  response.send(findUser);
  // response.send(findUser.username);
});

app.get("/api/products", (request, response) => {
  response.send([
    { id: 1, name: "product1", price: 100 },
    { id: 2, name: "product2", price: 200 },
    { id: 3, name: "product3", price: 300 },
  ]);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
