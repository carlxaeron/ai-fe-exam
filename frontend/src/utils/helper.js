const FOR_EDIT = 'For Edit';
const PUBLISHED = 'Published';
const WRITER = 'writer';
const EDITOR = 'editor';
const ACTIVE = 'Active';
const INACTIVE = 'Inactive';

export { FOR_EDIT, PUBLISHED, WRITER, EDITOR, ACTIVE, INACTIVE };

export default {
  getBaseUrl(functionName) {
    return process.env.VUE_APP_API_URL.replace('{functionName}', functionName);
  }
}