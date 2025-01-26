const FOR_EDIT = "For Edit";
const PUBLISHED = "Published";
const WRITER = "writer";
const EDITOR = "editor";
const ACTIVE = "Active";
const INACTIVE = "Inactive";

const parseDate = (date) => {
  return date.toDate().toISOString().slice(0, 16);
};

const parseReqDate = (req, res) => {
  const {date} = req.body;
  let parsedDate;
  if (date) {
    parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({error: "Invalid date format"});
    } else {
      req.body.date = parsedDate;
    }
  } else {
    req.body.date = new Date();
  }

  return req.body.date;
};

const userResponseJson = (user) => {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    type: user.type,
    status: user.status,
    created_at: user.created_at ? parseDate(user.created_at) : null,
    updated_at: user.updated_at ? parseDate(user.updated_at) : null,
  };
};

/* eslint-disable max-len */
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const {body, validationResult} = require("express-validator");
const bodyParser = require("body-parser");
const cors = require("cors");
const {Filter} = require("firebase-admin/firestore");

admin.initializeApp();
const db = admin.firestore();

const app = require("express")();
app.use(bodyParser.json());

const corsOptions = {
  origin: ["https://carlxaeron.github.io", "http://localhost:8080", "https://carlxaeron.github.io/"],
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

// Middleware to check for X-Username header
const checkUsernameHeader = async (req, res, next) => {
  if (!req.headers["x-username"]) {
    return res.status(400).json({error: "X-Username header is required"});
  }
  const user = await checkUserValidation(req, res);
  if (user.status !== ACTIVE) {
    return res.status(401).json({error: "Unauthorized"});
  }

  next();
};

const checkUserValidation = async (req, res) => {
  const user = req.headers["x-username"];
  const userSnapshot = await db.collection("users").where("username", "==", user).get();
  if (userSnapshot.empty) {
    return res.status(401).json({error: "Unauthorized"});
  }
  return {
    ...userSnapshot.docs[0].data(),
    id: userSnapshot.docs[0].id,
  };
};

// Function to create a new article
app.post(
    "/articles",
    checkUsernameHeader,
    [
      body("title").notEmpty().withMessage("Title is required"),
      body("link").isURL().withMessage("Link must be a valid URL"),
      body("date").notEmpty().withMessage("Date is required"),
      body("content").notEmpty().withMessage("Content is required"),
      body("company").notEmpty().withMessage("Company is required"),
      body("image").isURL().withMessage("Image is required"),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

      const user = await checkUserValidation(req, res);
      if (user.type !== WRITER) {
        return res.status(401).json({error: "Unauthorized"});
      }

      const article = req.body;
      article.date = parseReqDate(req);
      article.writer = req.headers["x-username"];
      article.status = FOR_EDIT;
      article.created_at = new Date();
      article.updated_at = new Date();
      await db.collection("articles").add(article);
      res.status(201).send();
    },
);

// Function to update an article
app.put(
    "/articles/:id",
    checkUsernameHeader,
    [
      body("title").notEmpty().withMessage("Title is required"),
      body("link").isURL().withMessage("Link must be a valid URL"),
      body("date").notEmpty().withMessage("Date is required"),
      body("content").notEmpty().withMessage("Content is required"),
      body("company").notEmpty().withMessage("Company is required"),
      body("image").isURL().withMessage("Image is required"),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

      const user = await checkUserValidation(req, res);
      if (req.body.status && req.body.status === PUBLISHED) {
        if (user.type === EDITOR) {
          // do nothing
        } else {
          return res.status(401).json({error: "Unauthorized"});
        }
      }
      req.body.date = parseReqDate(req);
      if (user.type === EDITOR) req.body.editor = req.headers["x-username"];

      const {id} = req.params;

      const articleSnapshot = await db.collection("articles").doc(id).get();
      if (!articleSnapshot.exists) {
        return res.status(400).json({error: "Article not found"});
      }
      if (articleSnapshot.data().status === PUBLISHED && req.body.status === PUBLISHED) {
        return res.status(400).json({error: "Article is already published"});
      }

      const article = req.body;
      article.updated_at = new Date();
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

    if (!req.headers["x-username"]) {
      return res.status(400).json({error: "X-Username header is required"});
    }

    if (req.query.forEdit) {
      query = query.where("status", "==", FOR_EDIT);
    } else if (req.query.published) {
      query = query.where("status", "==", "Published");
    }

    const snapshot = await query.get();
    const articles = await Promise.all(snapshot.docs.map(async (doc) => {
      const ret = {id: doc.id, ...doc.data()};
      ret.date = parseDate(ret.date);

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

// Function to add a new user
app.post(
    "/users",
    checkUsernameHeader,
    [
      body("firstName").notEmpty().withMessage("Firstname is required"),
      body("lastName").notEmpty().withMessage("Lastname is required"),
      body("username").isLength({min: 8}).withMessage("Username is required"),
      body("password").isLength({min: 8}).withMessage("Password must be at least 8 characters long"),
      body("email").isEmail().withMessage("Email must be a valid email address"),
      body("type").isIn([WRITER, EDITOR]).withMessage("Type must be either \"Writer\" or \"Editor\""),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

      const payload = req.body;
      const userSnapshot = await db.collection("users").where("username", "==", payload.username).get();
      if (!userSnapshot.empty) {
        return res.status(400).json({error: "Username already exists"});
      }
      const userEmailSnapshot = await db.collection("users").where("email", "==", payload.email).get();
      if (!userEmailSnapshot.empty) {
        return res.status(400).json({error: "Email already exists"});
      }

      const admin = await checkUserValidation(req, res);

      const user = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        username: payload.username,
        password: payload.password,
        email: payload.email,
        type: payload.type,
        status: ACTIVE,
        created_at: new Date(),
        updated_at: new Date(),
        created_by: admin.id,
      };

      await db.collection("users").add(user);
      res.status(201).send();
    },
);

// Function to update a user
app.put(
    "/users/:id",
    checkUsernameHeader,
    [
      body("firstName").notEmpty().withMessage("Firstname is required"),
      body("lastName").notEmpty().withMessage("Lastname is required"),
      body("username").notEmpty().withMessage("Username is required"),
      body("email").isEmail().withMessage("Email must be a valid email address"),
      body("type").isIn([WRITER, EDITOR]).withMessage("Type must be either \"Writer\" or \"Editor\""),
      body("status").isIn([ACTIVE, INACTIVE]).withMessage("Status must be either \"Active\" or \"Inactive\""),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
      }

      const {id} = req.params;
      const payload = req.body;
      const userSnapshot = await db.collection("users").doc(id).get();
      if (!userSnapshot.exists) {
        return res.status(400).json({error: "User not found"});
      }
      const user = userSnapshot.data();
      const admin = await checkUserValidation(req, res);

      if (payload.status && payload.status === INACTIVE) {
        if (admin.type !== EDITOR) {
          return res.status(401).json({error: "Unauthorized"});
        }
      }

      if (payload.username && payload.username !== user.username) {
        return res.status(400).json({error: "Username cannot be updated"});
      }

      if (payload.password && payload.password.length < 8) {
        return res.status(400).json({error: "Password must be at least 8 characters long"});
      }
      if (payload.password && payload.password !== payload.confirmPassword) {
        return res.status(400).json({error: "Password do not match"});
      }

      if (payload.email && !user.email) {
        const userEmailSnapshot = await db.collection("users").where("email", "==", payload.email).get();
        if (!userEmailSnapshot.empty) {
          return res.status(400).json({error: "Email already exists"});
        }
      } else if (payload.email === user.email) {
        // do nothing
      } else {
        return res.status(400).json({error: "Email cannot be updated"});
      }

      const updatedUser = {
        firstName: payload.firstName,
        lastName: payload.lastName,
        username: payload.username,
        email: payload.email,
        type: payload.type,
        status: payload.status,
        updated_at: new Date(),
        updated_by: admin.id,
      };

      if (payload.password) {
        updatedUser.password = payload.password;
      }

      await db.collection("users").doc(id).update(updatedUser);
      res.status(200).send();
    },
);

// Function to get all users
app.get("/users",
    checkUsernameHeader,
    async (req, res) => {
      const snapshot = await db.collection("users").get();
      const usersList = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()})).sort((a, b) => {
        if (a.created_at && b.created_at) {
          return b.created_at - a.created_at;
        }
        return 0;
      });
      const users = usersList.map((user) => userResponseJson(user));
      res.json(users);
    },
);

// Function to add a new company
app.post(
    "/companies",
    checkUsernameHeader,
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
app.get("/companies",
    checkUsernameHeader,
    async (req, res) => {
      const snapshot = await db.collection("companies").get();
      const companies = snapshot.docs.map((doc) => ({id: doc.id, ...doc.data()}));
      res.json(companies);
    });

// Function to login (allow to use username/email to login)
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

      const snapshot = await db.collection("users").where(
          Filter.or(
              Filter.where("username", "==", req.body.username),
              Filter.where("email", "==", req.body.username),
          ),
      ).where("password", "==", req.body.password).get();

      if (snapshot.empty) {
        return res.status(401).send();
      }

      const response = snapshot.docs[0].data();

      res.json(userResponseJson(response));
    },
);

exports.api = functions.https.onRequest(app);
