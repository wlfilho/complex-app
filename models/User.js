
const validator = require("validator")

let User = function(data) {
    this.data = data
    this.errors = []
}

User.prototype.validate = function() {
    if (this.data.username == "") {this.errors.push("You must provide a valid username")}
    if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {this.errors.push("Username can only contain letters and numbers.")}
    if (!validator.isEmail(this.data.email)) {this.errors.push("You must provide a valid email")}
    if (this.data.password == "") {this.errors.push("You must provide a valid password")}
    if (this.data.password.length > 0 && this.data.password.length < 12) {"A senha tem que ter pelo menos 12 caractéres."}
    if (this.data.password.length > 100) {"A senha não pode ter mais de 100 caractéres."}
    if (this.data.username.length > 0 && this.data.username.length < 3) {"O username tem que ter pelo menos 3 caractéres."}
    if (this.data.username.length > 30) {"O username não pode ter mais de 100 caractéres."}
}

User.prototype.register = function() {
    // Step #1: Validate User data
    this.validate()

    // Step 2: Only if there are no validation errors


    // then save the user data into a database
}


module.exports = User   