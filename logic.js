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
var replyID;	
var firebaseRetrieveCommentsRef;	
var firebaseStoreCommentsRef;
var firebaseStoreRepliesRef;
var firebaseRetrieveRepliesRef;	
var retrievedCommentData;
var retrievedCommentKey;
var retrievedRepliesData;
var retrievedRepliesKey;	
	
	
	
	
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
	initApp();
 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

    function initApp(){
  	
    //+++++++++++Retrieving Msgs++++++++++++++++++++++++++++++++
					
				firebaseRetrieveCommentsRef = firebase.database().ref().child("CommentsBoard");
				
				firebaseRetrieveCommentsRef.on("child_added", snapComments =>{
				retrievedCommentData = snapComments.val();
				retrievedCommentKey = snapComments.key;	
				console.log("retrieved comment is : "+retrievedCommentData.Comment);
				console.log("retrieved name is : "+retrievedCommentData.Name);	
				console.log("retrieved key is : "+retrievedCommentKey);
				console.log("RetrievedCommentData is : "+retrievedCommentData);
				console.log("RetrievedCommentData in JSON is : "+retrievedCommentData.toJSON());
				console.log("snapComments in JSON is : "+snapComments.toJSON());
					
				   var numChilds = snapComments.child("Replies").numChildren();	
				   console.log("The number of children replies has is : "+numChilds);	
				
				var object = JSON.stringify(retrievedCommentData);
				console.log("Object is in stringify : " + object);
					
				var objectJSON = JSON.parse(object);
				console.log("Object is in JSON : " + objectJSON);
					//object.Replies[0]
				 for(var i=1;i<=numChilds;i++){
				 var replierVar = object.Replies[i].Replier;
				 var replyVar = object.Replies[i].Replier;	 
				  console.log(i+" replier is " + replierVar);
				  console.log(i+" reply is " + replyVar);	 
				 }	
				$("#commentList").append("<div><label style='width:100%;'>"+retrievedCommentData.Name+" says.."+"</label><p style='width:100%;background-color:#808080;font-style:italic;'>"+retrievedCommentData.Comment+"</p><button id="+"'"+retrievedCommentKey+"'"+" style='background-color:red;border-radius:5px' data-toggle='modal' data-target='#replyModal' class='btn btn-sm' onClick='storeReply(this.id)'>"+"Reply"+"</button></div>");	
								
				
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
			  firebaseStoreCommentsRef = firebase.database().ref().child("CommentsBoard/");
			 //firebaseStoreRef.push().set(newComment);
			   firebaseStoreCommentsRef.push({Comment:newComment, Name:newName});
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
			  //var firebaseStoreRef = firebase.database().ref().child("CommentsBoard/"+replyID+"/Replies");
			firebaseStoreRepliesRef = firebase.database().ref().child("CommentsBoard/"+replyID+"/Replies");	   
			 //firebaseStoreRef.push().set(newReply);
			   firebaseStoreRepliesRef.push({Reply:newReply, Replier:newReplyName});
			  // firebaseStoreRef.push({Name:newReplyName});		   
			   replyBox.value="";
			   replyNameBox.value="";   
				   
		//---Retrieving Replies start
			/*	   firebaseRetrieveRepliesRef = firebase.database().ref().child("CommentsBoard/"+replyID+"/Replies");
					firebaseRetrieveRepliesRef.on("child_added", snapReplies =>{
					retrievedRepliesData = snapReplies.val();
					retrievedRepliesKey = snapReplies.key;	
					console.log("retrieved reply is : "+retrievedRepliesData.Reply);
					console.log("retrieved replier is : "+retrievedRepliesData.Replier);	
					console.log("retrieved key is : "+retrievedRepliesKey);
					});		*/
		//---Retrieving replies ends		   
				   
				   
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
