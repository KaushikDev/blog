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
const nameBox = document.getElementById("nameBox");	
const storageRef = firebase.storage().ref();
	


 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
	initApp();
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    function initApp(){
  			
    //+++++++++++Retrieving Msgs++++++++++++++++++++++++++++++++
				var i=1;	
				var firebaseRetrieveRef = firebase.database().ref().child("CommentsBoard");
				
				firebaseRetrieveRef.on("child_added", snap =>{
				var retrievedData = snap.val();
				console.log("retrieved comment is : "+retrievedData.Comment);
				console.log("retrieved name is : "+retrievedData.Name);	
				$("#commentList").append("<div><label style='width:100%;'>"+retrievedData.Name+" says.."+"</label><p style='width:100%;background-color:#808080;font-style:italic;'>"+retrievedData.Comment+"</p><button id="+"'"+"reply"+i+"'"+" style='background-color:red;border-radius:5px' data-toggle='modal' data-target='#replyModal' class='btn btn-sm'>"+"Reply"+"</button></div>");
				i++;
					});
	//+++++++++++Storing Msgs++++++++++++++++++++++++++++++++
		$("#send").on("click", function(){
			 var newComment=commentBox.value;
			 var newName=nameBox.value;
			  if(newComment==""){
			  alert("Empty comment doesn't make any sense, does it?? ");
			  }
			  else if(newName==""){
			  alert("You forgot to enter your name..");
			  }
			   else {
			  var firebaseStoreRef = firebase.database().ref().child("CommentsBoard/");
			 //firebaseStoreRef.push().set(newComment);
			   firebaseStoreRef.push({Comment:newComment, Name:newName});
			  // firebaseStoreRef.push({Name:newName});		   
			   commentBox.value="";
				nameBox.value="";   
			  }
			});
	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++
		}
    	
			  

 });
