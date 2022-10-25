const path = require("path");
const express = require("express");
const app = express();
const axios = require("axios");
const PORT = 3000;
const pool = require("../db");
// app.use(cors());
app.use(express.json());
const dotenv = require("dotenv");
const db = require("../db");
dotenv.config();
//node ./server/server.js
//npm run build if build missing.
// statically serve everything in the build folder on the route '/build'
app.use("/build", express.static(path.join(__dirname, "../build")));

app.get("/api/coins", (req, response) => {
  axios
    .get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=10&sort=cmc_rank",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "00621e99-a961-4bae-af28-e4d6afa0b1aa",
        },
      }
    )
    .then(({ data }) => {
      console.log(data);
      response.json(data);
    });
});

app.get("/api/top20", (req, response) => {
  axios
    .get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=20&sort=cmc_rank",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "00621e99-a961-4bae-af28-e4d6afa0b1aa",
        },
      }
    )
    .then(({ data }) => {
      response.json(data);
    });
});

app.get("/api/top100", (req, response) => {
  axios
    .get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=100&sort=cmc_rank",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "00621e99-a961-4bae-af28-e4d6afa0b1aa",
        },
      }
    )
    .then(({ data }) => {
      response.json(data);
    });
});

app.get("/api/inactivecoins", (req, response) => {
  axios
    .get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/map?limit=30&listing_status=inactive",
      {
        headers: {
          "X-CMC_PRO_API_KEY": "00621e99-a961-4bae-af28-e4d6afa0b1aa",
        },
      }
    )
    .then(({ data }) => {
      response.json(data);
    });
});

///Route to get all todos
app.get("/todos", async (req, res) => {
  const query = "SELECT * FROM todo";
  db.query(query)
    .then(response => {
      res.json(response.rows);
    })
});
// app.get("/todos", async (req, res) => {
//   const allTodos = await pool.query(
//     "SELECT * FROM todo"
//   );
//   res.json(allTodos.rows);
// });


//Routing for posting a todo 
app.post("/todos", async (req, res) => {
  const { description } = req.body;
  const query = "INSERT INTO todo (description) VALUES($1) RETURNING *";
  const values = [description];
  db.query(query, values)
    .then(response => {
      res.json(response.rows[0]);
    })
});
// app.post("/todos", async (req, res) => {
//     const { description } = req.body;
//     const newTodo = await pool.query(
//       "INSERT INTO todo (description) VALUES($1) RETURNING *", 
//       [description]
//     );
//     res.json(newTodo.rows[0]);
// });

//Route for deleting todo
app.delete("/todos/:id", async (req, res) => {
  const { id } = req.params;
  const deleteTodo = await pool.query(
    "DELETE FROM todo WHERE todo_id = $1",
    [id]
  );
  res.json('Todo deleted')
});
// serve index.html on the route '/'
app.get("/", (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, "../index.html"));
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
}); //listens on port 3000 -> http://localhost:3000/
