var config = {
    apiKey: "AIzaSyDUzqOVrCpQkxf7sAnxRe9kS3JJzMIldWU",
    authDomain: "fir-649bf.firebaseapp.com",
    databaseURL: "https://fir-649bf.firebaseio.com",
    projectId: "fir-649bf",
    storageBucket: "fir-649bf.appspot.com",
    messagingSenderId: "759797327012"
  };
  firebase.initializeApp(config);

var storeReply; 
//===============================================================================================
$("document").ready(function(){

		
const sendComment = document.getElementById("send");
const commentBox = document.getElementById("commentBox");
const nameBox = document.getElementById("nameBox");
const replyBox = document.getElementById("replyBox");
const replyNameBox = document.getElementById("replyNameBox");	
const storageRef = firebase.storage().ref();
var replyId;	
	
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
	initApp();
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    function initApp(){
  	
    //+++++++++++Retrieving Msgs++++++++++++++++++++++++++++++++
				var i=1;	
				var firebaseRetrieveRef = firebase.database().ref().child("CommentsBoard");
				
				firebaseRetrieveRef.on("child_added", snap =>{
				var retrievedData = snap.val();
				var retrievedKey = snap.key;	
				console.log("retrieved comment is : "+retrievedData.Comment);
				console.log("retrieved name is : "+retrievedData.Name);	
				console.log("retrieved key is : "+retrievedKey);
				
				
				
		//		var newRef = firebase.database().ref().child("Replies");
		//		newRef.on("child_added", snapChild =>{
		//		var retrievedChildData = snapChild.val();
		//		console.log("retrieved replier is :"+retrievedChildData.Replier);
		//		});
		                  
				if(snap.child("Replies").exists()){
				 console.log("There is a reply that exists");	
				 var retrievedChildDataReplier = snap.child("Replies/Replier/").val();
				 console.log("retrieved replier is :"+retrievedChildDataReplier);
				   }
				else{
				console.log("There is no reply");
				}	
					
				
			/*	if(retrievedData.child("Replies").exists()){
					var retrievedChildData = retrievedData.child("Replies").val();
					console.log("retrieved replier is :"+retrievedChildData.Replier);
				}
					else{
					console.log("No snapshot found !!");
					}
				*/
				$("#commentList").append("<div><label style='width:100%;'>"+retrievedData.Name+" says.."+"</label><p style='width:100%;background-color:#808080;font-style:italic;'>"+retrievedData.Comment+"</p><button id="+"'"+retrievedKey+"'"+" style='background-color:red;border-radius:5px' data-toggle='modal' data-target='#replyModal' class='btn btn-sm' onClick='storeReply(this.id)'>"+"Reply"+"</button></div>");
				
				i++; 
					});
	//+++++++++++Storing Comments++++++++++++++++++++++++++++++++
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
	//+++++++++++++Storing Replies++++++++++++++++++++++++++++++++++++++++++++
	$("#replySend").on("click", function(){
			 var newReply=replyBox.value;
			 var newReplyName=replyNameBox.value;
			  if(newReply==""){
			  alert("Empty reply doesn't make any sense, does it?? ");
			  }
			  else if(newReplyName==""){
			  alert("You forgot to enter your name..");
			  }
			   else {
			  var firebaseStoreRef = firebase.database().ref().child("CommentsBoard/"+replyID+"/Replies");
			 //firebaseStoreRef.push().set(newReply);
			   firebaseStoreRef.push({Reply:newReply, Replier:newReplyName});
			  // firebaseStoreRef.push({Name:newReplyName});		   
			   replyBox.value="";
				replyNameBox.value="";   
			  }
			});          
	//++++This will happen on click event of a reply button++++  
	storeReply = function(clickedID){
		console.log("The clicked reply button's id is : "+clickedID);
		replyID = clickedID;
		}

	//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++    
	    
		}
    	
			  

 });
