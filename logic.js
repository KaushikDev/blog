var config = {
    apiKey: "AIzaSyDUzqOVrCpQkxf7sAnxRe9kS3JJzMIldWU",
    authDomain: "fir-649bf.firebaseapp.com",
    databaseURL: "https://fir-649bf.firebaseio.com",
    projectId: "fir-649bf",
    storageBucket: "fir-649bf.appspot.com",
    messagingSenderId: "759797327012"
  };
  firebase.initializeApp(config);

//===============================================================================================
$("document").ready(function(){

const sendComment = document.getElementById("send");
const commentBox = document.getElementById("commentBox");
const storageRef = firebase.storage().ref();
	


 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
	initApp();
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    function initApp(){
  			
    //+++++++++++Retrieving Msgs++++++++++++++++++++++++++++++++
				var i=1;	
				var firebaseRetrieveRef = firebase.database().ref().child("CommentsBoard");
				
				firebaseRetrieveRef.on("child_added", snap =>{
				var retrievedComment = snap.val();
				console.log("retrieved comments are : "+retrievedComment.Comment);
				$("#commentList").append("<div><label  style='width:100%;'>A user says..</label><p style='width:100%;background-color:#808080;font-style:italic;'>"+retrievedComment.Comment+"</p></div>");
				i++;
					});
	//+++++++++++Storing Msgs++++++++++++++++++++++++++++++++
		$("#send").on("click", function(){
			 var newComment=commentBox.value;
			  if(newComment==""){
			  alert("Empty comment doesn't make any sense, does it?? ");
			  }
			  else{
			  var firebaseStoreRef = firebase.database().ref().child("CommentsBoard/");
			 //firebaseStoreRef.push().set(newComment);
			   firebaseStoreRef.push({Comment:newComment});	  
			   commentBox.value="";
			  }
			});
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		}
    	
			  

 });
