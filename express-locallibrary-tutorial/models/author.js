const mongoose = require('mongoose');
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    first_name: { type: String, require: true, maxLength: 100 },
    family_name: { type: String, require: true, maxLength: 100 },
    date_of_birth: { type: Date }, 
    date_of_death: { type: Date },
});

// Virtual for author's full name
AuthorSchema.virtual("name").get(function() {
    let fullname = "";
    if (this.first_name && this.family_name) {
        fullname = `${this.family_name}, ${this.first_name}`;
    }

    return fullname;
});

// Virtual for author's URL
AuthorSchema.virtual("url").get(function () {
    // We don't use an arrow function as we'll need the this object
    return `/catalog/author/${this._id}`;
});

// Virtual for formatting the Author's date of birth
AuthorSchema.virtual("date_of_birth_formatted").get(function () {
    return this.date_of_birth ? 
    DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';    
});

// Virtual for formatting the Author's date of death
AuthorSchema.virtual("date_of_death_formatted").get(function () {
    return this.date_of_death ?
    DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';       
});
  
// Export model
module.exports = mongoose.model("Author", AuthorSchema);