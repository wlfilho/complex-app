const bcrypt = require("bcryptjs")
const usersCollection = require('../db').db().collection("users")
const validator = require("validator")

let User = function(data) {
    this.data = data
    this.errors = []
}

User.prototype.cleanUp = function() {
    if (typeof(this.data.username) != "string") {this.data.username = ""}
    if (typeof(this.data.email) != "string") {this.data.email = ""}
    if (typeof(this.data.password) != "string") {this.data.password = ""}

    // get rid of any bogus properties
    this.data = {
        username: this.data.username.trim().toLowerCase(),
        email: this.data.email.trim().toLowerCase(),
        password: this.data.password,
    }
}

User.prototype.validate = function() {
    if (this.data.username == "") {this.errors.push("You must provide a valid username")}
    if (this.data.username != "" && !validator.isAlphanumeric(this.data.username)) {this.errors.push("Username can only contain letters and numbers.")}
    if (!validator.isEmail(this.data.email)) {this.errors.push("You must provide a valid email")}
    if (this.data.password == "") {this.errors.push("You must provide a valid password")}
    if (this.data.password.length > 0 && this.data.password.length < 12) {"A senha tem que ter pelo menos 12 caractéres."}
    if (this.data.password.length > 50) {"A senha não pode ter mais de 50 caractéres."}
    if (this.data.username.length > 0 && this.data.username.length < 3) {"O username tem que ter pelo menos 3 caractéres."}
    if (this.data.username.length > 30) {"O username não pode ter mais de 100 caractéres."}
}

User.prototype.login = function() {
    return new Promise(async (resolve, reject) => {
        this.cleanUp()
        const attemptedUser = await usersCollection.findOne({username: this.data.username})
        if (attemptedUser && bcrypt.compareSync(this.data.password, attemptedUser.password)) {
            resolve("Congrats!")
        } else {
            reject("Invalid username/password")
        } 
    })
}

User.prototype.register = function() {
    // Step #1: Validate User data
    this.cleanUp()
    this.validate()

    // Step 2: Only if there are no validation errors
    // then save the user data into a database
    if (!this.errors.length) {
        //hash user password
        let salt = bcrypt.genSaltSync(10)
        this.data.password = bcrypt.hashSync(this.data.password, salt)
        usersCollection.insertOne(this.data)
    }
}


module.exports = User   