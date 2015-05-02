var config = {
  javascript: {
    appTitle: "Useful JS",
    stylesheet: "styles-javascript",
    postCollection: "post",
    codeMirrorType: "javascript",
    db: "mongodb://mbahoshy:07maryJ68@ds029801.mongolab.com:29801/usefuljs"
  },
  go: {
    appTitle: "Useful Go",
    stylesheet: "styles-go",
    postCollection: "gopost",
    codeMirrorType: "text/x-go",
    db: "mongodb://mbahoshy:07maryJ68@ds029801.mongolab.com:29801/usefuljs"
  }
}

module.exports = config.javascript;