// simple-todos.js
Books = new Mongo.Collection("books");

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("books");

  Template.body.helpers({
    books: function () {
      return Books.find({}, {sort: {title: 1}});
    }
  });

  Template.body.events({
    "submit .new-book": function (event) {
      // This function is called when the new task form is submitted

      var title = event.target.title.value;
      var author = event.target.author.value;
      var description = event.target.description.value;
      var isbn = event.target.isbn.value;


      Books.insert({
        title: title,
        author: author,
        description: description,
        isbn: isbn,
        createdAt: new Date() // current time
      });

      // Clear form
      event.target.text.value = "";

      // Prevent default form submit
      return false;
    },

    "click .delete": function() {
      Books.remove(this._id);
    }

  });
}

if (Meteor.isServer) {
  Meteor.publish("books", function () {
    return Books.find();
  });

  Meteor.startup(function () {
    if (Books.find().count() === 0) {
      Books.insert({title: "Moby Dick", author: "Herman Melville", description: "What a dick!"});
    }
  });
}