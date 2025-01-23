export default {
  getBaseUrl(functionName) {
    return process.env.VUE_APP_API_URL.replace('{functionName}', functionName);
  }
}