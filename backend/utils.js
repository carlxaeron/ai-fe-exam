const FOR_EDIT = 'For Edit';
const PUBLISHED = 'Published';
const WRITER = 'writer';
const EDITOR = 'editor';

const parseDate = date => {
  return date.toDate().toISOString().slice(0, 16);
};

module.exports = { FOR_EDIT, PUBLISHED, WRITER, EDITOR
, parseDate
 };