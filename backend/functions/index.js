/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {body, validationResult} = require("express-validator");
const bodyParser = require("body-parser");
const cors = require("cors");

admin.initializeApp();
const db = admin.firestore();

const app = require("express")();
app.use(bodyParser.json());

const corsOptions = {
  origin: ["https://carlxaeron.github.io", "http://localhost:8080"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware to check for X-Username header
const checkUsernameHeader = (req, res, next) => {
  if (!req.headers["x-username"]) {
    return res.status(400).json({error: "X-Username header is required"});
  }
  next();
};

// Function to create a new article
app.post(
    "/articles",
    checkUsernameHeader,
    [
      body("image").notEmpty().withMessage("Image is required"),
      body("title").notEmpty().withMessage("Title is required"),
      body("link").isURL().withMessage("Link must be a valid URL"),
      body("date").notEmpty().withMessage("Date is required"),
      body("content").notEmpty().withMessage("Content is required"),
      body("company").notEmpty().withMessage("Company is required"),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

      const {date} = req.body;
      if (date) {
        const currentDate = new Date();
        const [year, month, day] = date.split("-");
        req.body.date = new Date(year, month - 1, day, currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds());
      } else {
        req.body.date = new Date();
      }

      const article = req.body;
      article.writer = req.headers["x-username"];
      article.status = "For Edit";
      await db.collection("articles").add(article);
      res.status(201).send();
    },
);

// Function to update an article
app.put(
    "/articles/:id",
    [
      body("relatedCompany").optional().notEmpty().withMessage("Related company cannot be empty"),
      body("image").optional().notEmpty().withMessage("Image cannot be empty"),
      body("title").optional().notEmpty().withMessage("Title cannot be empty"),
      body("link").optional().isURL().withMessage("Link must be a valid URL"),
      body("date").optional().notEmpty().withMessage("Date cannot be empty"),
      body("content").optional().notEmpty().withMessage("Content cannot be empty"),
      body("status").optional().isIn(["For Edit", "Published"]).withMessage("Status must be either \"For Edit\" or \"Published\""),
      body("writer").optional().notEmpty().withMessage("Writer cannot be empty"),
      body("editor").optional().notEmpty().withMessage("Editor cannot be empty"),
      body("company").optional().notEmpty().withMessage("Company cannot be empty"),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

      const {id} = req.params;
      const article = req.body;
      await db.collection("articles").doc(id).update(article);
      res.status(200).send();
    },
);

app.get("/articles", async (req, res) => {
  try {
    let query = db.collection("articles").orderBy("date", "desc");

    if (req.query.page && req.query.limit) {
      const page = parseInt(req.query.page, 10);
      const limit = parseInt(req.query.limit, 10);

      const snapshot = await query.limit((page + 1) * limit).get();
      const startAfter = snapshot.docs[page * limit - 1];

      if (startAfter) {
        query = query.startAfter(startAfter).limit(limit);
      } else {
        query = query.limit(limit);
      }
    } else if (req.query.limit) {
      const limit = parseInt(req.query.limit, 10);
      query = query.limit(limit);
    }

    if (req.query.forEdit) {
      query = query.where("status", "==", "For Edit");
    } else if (req.query.published) {
      query = query.where("status", "==", "Published");
    }

    const snapshot = await query.get();
    const articles = await Promise.all(snapshot.docs.map(async (doc) => {
      const ret = {id: doc.id, ...doc.data()};
      ret.date = ret.date.toDate();

      if (ret.writer) {
        const writerSnapshot = await db.collection("users").where("username", "==", ret.writer).get();
        if (!writerSnapshot.empty) {
          const writerDoc = writerSnapshot.docs[0];
          ret.writer = {
            id: writerDoc.id,
            firstName: writerDoc.data().firstName,
            lastName: writerDoc.data().lastName,
          };
        } else {
          ret.writer = null;
        }
      } else {
        ret.writer = null;
      }

      if (ret.editor) {
        const editorSnapshot = await db.collection("users").where("username", "==", ret.editor).get();
        if (!editorSnapshot.empty) {
          const editorDoc = editorSnapshot.docs[0];
          ret.editor = {
            id: editorDoc.id,
            firstName: editorDoc.data().firstName,
            lastName: editorDoc.data().lastName,
          };
        } else {
          ret.editor = null;
        }
      } else {
        ret.editor = null;
      }

      return ret;
    }));

    res.json(articles);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});

// Function to delete an article
app.delete("/articles/:id", async (req, res) => {
  const {id} = req.params;
  await db.collection("articles").doc(id).delete();
  res.status(200).send();
});

// Function to add a new user
app.post(
    "/users",
    [
      body("firstname").notEmpty().withMessage("Firstname is required"),
      body("lastname").notEmpty().withMessage("Lastname is required"),
      body("type").isIn(["Writer", "Editor"]).withMessage("Type must be either \"Writer\" or \"Editor\""),
      body("status").isIn(["Active", "Inactive"]).withMessage("Status must be either \"Active\" or \"Inactive\""),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

      const user = req.body;
      await db.collection("users").add(user);
      res.status(201).send();
    },
);

// Function to get all users
app.get("/users", async (req, res) => {
  const snapshot = await db.collection("users").get();
  const users = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  res.json(users);
});

// Function to add a new company
app.post(
    "/companies",
    [
      body("logo").notEmpty().withMessage("Logo is required"),
      body("name").notEmpty().withMessage("Name is required"),
      body("status").isIn(["active", "inactive"]).withMessage("Status must be either \"Active\" or \"Inactive\""),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

      const company = req.body;
      await db.collection("companies").add(company);
      res.status(201).send();
    },
);

// Function to get all companies
app.get("/companies", async (req, res) => {
  const snapshot = await db.collection("companies").get();
  const companies = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
  res.json(companies);
});

// Function to login
app.post(
    "/login",
    [
      body("username").notEmpty().withMessage("Username is required"),
      body("password").isLength({min: 8}).withMessage("Password must be at least 6 characters long"),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

      const {username, password} = req.body;
      const snapshot = await db.collection("users").where("username", "==", username).where("password", "==", password).get();
      if (snapshot.empty) {
        return res.status(401).send();
      }

      // exlude password from response
      const response = snapshot.docs[0].data();
      delete response.password;

      res.json(response);
    },
);

exports.api = functions.https.onRequest(app);
