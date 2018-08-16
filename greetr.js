//Creating an IIFE for our library so that it doesn't conflict with the global scope
(function(global,$){
    //function that will be exposed to end users of our library and is responsible
    // for returning an object that our users can work with
   var greetr = function(firstName,lastName,language){
       return new greetr.init(firstName,lastName,language);
   };

   // private data that won't be exposed as it stays inside IIFE
   var languages = ["en","es"];

   var greetings = {
       en : "Hello",
       es : "Hola"
   };

   var formalGreetings = {
       en : "Greetings",
       es : "Saludos"
   };

   //adding functionalities and properties to our library's returned object's prototype which shall
   // be exposed to the clients
   greetr.prototype = {
    validate : function(){
       if (languages.indexOf(this.language) === -1){
           throw "Invalid Language";
       } 
    },

      greeting : function(){
          return greetings[this.language] + " " + this.firstName;
      },
      
      formalGreeting : function(){
          return formalGreetings[this.language] + " " + this.firstName;
      },

      greet : function(formal){
          var msg;
          if(formal){
              msg = this.formalGreeting();
          }else{
              msg = this.greeting();
          }

          if(console){
              console.log(msg);
          }

          return this;
      },

      setLang : function(lang){         
          this.language = lang;
          this.validate();
          return this;
      },

      display : function(selector,formal){
         if(!$){
             throw "jQuery not loaded";
         }

         if(!selector){
             throw "Missing jQuery selector";
         }
        var msg = "";
         if(formal){
           msg = this.formalGreeting();
         }else{
             msg = this.greeting();
         }

         $(selector).html(msg);
         return this;
      }

   }

   //function constructor that actually produces our library's object
   greetr.init = function(firstName,lastName,language){
      this.firstName = firstName || "";
      this.lastName = lastName || "";
      this.language = language || "en";
      this.validate();
   }

   greetr.init.prototype = greetr.prototype;

   //exposing the function and adding it as a global variable
   global.greetr = global.G$ = greetr;
}(window,jQuery));