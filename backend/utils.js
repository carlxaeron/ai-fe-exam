const FOR_EDIT = 'For Edit';
const PUBLISHED = 'Published';
const WRITER = 'writer';
const EDITOR = 'editor';
const ACTIVE = 'Active';
const INACTIVE = 'Inactive';

const parseDate = date => {
  return date.toDate().toISOString().slice(0, 16);
};

const parseReqDate = (req) => {
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
}

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
}

module.exports = { FOR_EDIT, PUBLISHED, WRITER, EDITOR, ACTIVE, INACTIVE,
// helper functions
parseDate, parseReqDate,
// response functions
userResponseJson,
 };