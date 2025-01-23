export default {
  getBaseUrl(functionName) {
    console.log(process.env.VUE_APP_API_URL);
    return process.env.VUE_APP_API_URL.replace('{functionName}', functionName);
  }
}