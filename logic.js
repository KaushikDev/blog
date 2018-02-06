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
var childDatakey;
var repliesData;
var childDataSnapshot;
var numChilds;
	
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
				console.log("retrieved comment key is : "+retrievedCommentKey);
			
				numChilds = snapComments.child("Replies").numChildren();	
				console.log("The number of children replies has is : "+numChilds);	
				
					repliesData = snapComments.child("Replies");
					if(repliesData.exists()){
						var matrix = [];
						var retrievedReplies = [];
					        var htmlStr = "";
						
					repliesData.forEach(function(childSnapshot) {
						childDatakey = childSnapshot.key;
						childDataSnapshot = childSnapshot.val();
						console.log("the key from child snapshot is " + childDatakey);
						console.log("the reply from child snapshot is " + childDataSnapshot.Reply);
					
						 matrix.push([childDataSnapshot.Replier, childDataSnapshot.Reply]);
					 });
					
					for(var i=0;i<numChilds;i++){
							var string = matrix[i][0]+" replied: \""+matrix[i][1]+"\"";
							retrievedReplies.push(string);
							htmlStr = htmlStr+ "<p style='width:100%;'>"+string+"</p>";
						}
						
					console.log(retrievedReplies);	
					console.log(htmlStr);	
					$("#commentList").append("<div style='background-color:transparent;border-style:solid;border-color:white;border-width:2px;border-radius:5px;margin-bottom:2px;'><label style='width:100%;'>"+retrievedCommentData.Name+" says.."+"</label><p style='width:100%;font-style:italic;'>\""+retrievedCommentData.Comment+"\"</p><button id="+"'"+retrievedCommentKey+"'"+" style='background-color:red;color:white;width:auto;height:auto;' data-toggle='modal' data-target='#replyModal' class='btn btn-sm' onClick='storeReply(this.id)'>"+"Reply"+"</button>"+htmlStr+"</div>");	
					}
				else {
				$("#commentList").append("<div style='background-color:transparent;border-style:solid;border-color:white;border-width:2px;border-radius:5px;margin-bottom:2px;'><label style='width:100%;'>"+retrievedCommentData.Name+" says.."+"</label><p style='width:100%;font-style:italic;'>\""+retrievedCommentData.Comment+"\"</p><button id="+"'"+retrievedCommentKey+"'"+" style='background-color:red;color:white;width:auto;height:auto;' data-toggle='modal' data-target='#replyModal' class='btn btn-sm' onClick='storeReply(this.id)'>"+"Reply"+"</button></div>");	
				}	
				
								
				
					});
	//+++++++++++Storing Comments++++++++++++++++++++++++++++++++
		$("#send").on("click", function(){
			 var newComment=commentBox.value;
			 var newName=nameBox.value;
				
			
			//++++++++Trying timestamp when comment is registered+++++
			var dt = new Date();
			var utcDate = dt.toUTCString();
			alert(utcDate);
			//+++++++Till here++++++++++++
			
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
				   
				window.location.reload();	   
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
