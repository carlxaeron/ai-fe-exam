const FOR_EDIT = 'For Edit';
const PUBLISHED = 'Published';
const WRITER = 'writer';
const EDITOR = 'editor';

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

module.exports = { FOR_EDIT, PUBLISHED, WRITER, EDITOR,
parseDate, parseReqDate,
 };