const container = document.querySelector(".container");
const buscar = document.getElementById("buscar");
const usersList = document.getElementById("users");
const spinner = document.getElementById("carga");

let users = [];

window.addEventListener("load", () => {
  cargarUsuarios();
});

buscar.addEventListener("keyup", (e) => {
  const newUsers = users.filter((user) =>
    `${user.firstname.toLowerCase()} ${user.lastname.toLowerCase()}`.includes(
      e.target.value.toLowerCase()
    )
  );
  renderUsers(newUsers);
});

const cargarUsuarios = async () => {
  const respuesta = await fetch(
    "https://fakerapi.it/api/v1/persons?_quantity=1000"
  );
  const data = await respuesta.json();
  users = data.data;
  renderUsers(users);
  container.removeChild(spinner);
};

const createUsers = (users) =>
  users.map((user) => `<li>${user.firstname} ${user.lastname}</li>`).join("");

const renderUsers = (users) => {
  const itemUser = createUsers(users);
  usersList.innerHTML = itemUser;
};
