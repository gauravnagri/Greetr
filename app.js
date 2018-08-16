$(document).ready(function(){
    $("#login").click(function(){    
        console.log("Entered");
        var user = G$("Gaurav","Nagri");
        $("#greet").hide();
        user.setLang($("#languages").val()).display("#greeting",true);
      });
});
