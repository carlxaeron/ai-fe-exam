const FOR_EDIT = 'For Edit';
const PUBLISHED = 'Published';
const WRITER = 'writer';
const EDITOR = 'editor';

export { FOR_EDIT, PUBLISHED, WRITER, EDITOR };

export default {
  getBaseUrl(functionName) {
    return process.env.VUE_APP_API_URL.replace('{functionName}', functionName);
  }
}