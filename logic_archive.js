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

	const scrollToTopBtn = document.getElementById("back-to-top-btn");		
	const commentBox = document.getElementById("commentBox");
	const nameBox = document.getElementById("nameBox");
	const replyBox = document.getElementById("replyBox");
	const replyForm = document.getElementById("form-reply-input");
	var replyID;	
	var firebaseRetrieveCommentsRef;	
	var firebaseStoreCommentsRef;
	var firebaseStoreRepliesRef;
	var retrievedCommentData;
	var retrievedCommentKey;
	var repliesData;
	var childDataSnapshot;
	var numChilds;
	
	//Add Blogs Name here. //Create a constant for each blog name.
	const LWD_Challenges = "LWD_Challenges";
	 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++	
		initApp();
	 //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
	
		function initApp(){
		  
		//+++++++++++Retrieving Msgs++++++++++++++++++++++++++++++++
						
					firebaseRetrieveCommentsRef = firebase.database().ref().child("CommentsBoard/"+LWD_Challenges);
					
					firebaseRetrieveCommentsRef.on("child_added", snapComments =>{
					retrievedCommentData = snapComments.val();
					retrievedCommentKey = snapComments.key;	
						
				
					numChilds = snapComments.child("Replies").numChildren();	
						
					
						repliesData = snapComments.child("Replies");
						if(repliesData.exists()){
							var matrix = [];
							var retrievedReplies = [];
								var htmlStr = "";
							
						repliesData.forEach(function(childSnapshot) {
							childDatakey = childSnapshot.key;
							childDataSnapshot = childSnapshot.val();
						
						
							 matrix.push([childDataSnapshot.Replier, childDataSnapshot.Reply, childDataSnapshot.TimestampR]);
						 });
						
						for(var i=0;i<numChilds;i++){
								var string = "On ["+matrix[i][2]+"], "+matrix[i][0]+" replied: \"<i>"+matrix[i][1]+"\"</i>";
								retrievedReplies.push(string);
								htmlStr = htmlStr+ "<p>"+string+"</p>";
							}
							
					
						
						$("#commentList").append("<div class='comments'><label>On ["+retrievedCommentData.TimestampC+"], "+retrievedCommentData.Name+" said..."+"</label><p>\""+retrievedCommentData.Comment+"\"</p>"+htmlStr+"<button id="+"'"+retrievedCommentKey+"'"+" class='comment-reply-btn' onClick='storeReply(this.id)'>"+"Reply To This Conversation"+"</button><hr></div>");
	
	
						}
					else {
					
					$("#commentList").append("<div class='comments'><label>On ["+retrievedCommentData.TimestampC+"],  "+retrievedCommentData.Name+" said..."+"</label><p>\""+retrievedCommentData.Comment+"\"</p><button id="+"'"+retrievedCommentKey+"'"+" class='comment-reply-btn' onClick='storeReply(this.id)'>"+"Reply To This Conversation"+"</button><hr></div>");
					
				
				
				}	
					
									
					
						});
		//+++++++++++Storing Comments++++++++++++++++++++++++++++++++
			$("#send").on("click", function(){
				
				//++++++++Trying timestamp when comment is registered+++++
				var dtc = new Date();
				var tsc = dtc.toLocaleString();
				//alert(tsc);
				//+++++++Till here++++++++++++
				
				 var newComment=commentBox.value;
				 var newName=nameBox.value;
	
				if(newName==""){
					if (localStorage.getItem("name") === null) {
							localStorage.setItem("name", "Anonymous");
							newName = localStorage.getItem("name");
					}
	
					else{
						newName = localStorage.getItem("name");
					}
				}
	
				else{
					localStorage.setItem("name", newName);
				}
				
				if(newComment==""){
				  alert("Please type your comment. ");
				}
				
				else {
				  firebaseStoreCommentsRef = firebase.database().ref().child("CommentsBoard/LWD_Challenges");
				  firebaseStoreCommentsRef.push({Comment:newComment, Name:newName, TimestampC:tsc});
				  commentBox.value="";
				  nameBox.value="";   
				}
				});
		//+++++++++++++Storing Replies++++++++++++++++++++++++++++++++++++++++++++
		$("#replySend").on("click", function(){
				//++++++++Trying timestamp when reply is registered+++++
				var dtr = new Date();
				var tsr = dtr.toLocaleString();
			//-------------------//
				
				 var newReply=replyBox.value;
				var newReplyName = localStorage.getItem("name");
	
	
				  if(newReply==""){
				  alert("Please type your reply.");
				  }
				
				else {
				  
				   firebaseStoreRepliesRef = firebase.database().ref().child("CommentsBoard/"+LWD_Challenges+"/"+replyID+"/Replies");	   
				   firebaseStoreRepliesRef.push({Reply:newReply, Replier:newReplyName, TimestampR:tsr});
				   replyBox.value="";
				   window.location.reload();	   
				  }
				});    
	
			//++++This will happen on click event of a reply button++++  
			storeReply = function(clickedID){
			
				replyID = clickedID;
				replyForm.style.visibility = "visible";
			}
	
	
			$("#cancelReply").on("click", function(){
				
				replyForm.style.visibility = "hidden";
				
				});  
		//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++    
			   }
	
	
				// Back To TOP FEATURE
				function checkScroll(){
					let y = window.scrollY;
					if(y>500){
						scrollToTopBtn.className = "back-to-top show";
					}
					else {
						scrollToTopBtn.className = "back-to-top hide";
					}
				}
	
				window.addEventListener("scroll", checkScroll);
				function takeMeToTheTop(){
					//c is number of pixels we are from the top
					const c = document.documentElement.scrollTop || document.body.scrollTop ;
					if(c > 0){
						window.requestAnimationFrame(takeMeToTheTop);
						window.scrollTo(0, c-c/50); //the y coordinate controls the speed of scrolling back to top
					}
				}
	
				scrollToTopBtn.onclick =  function(e){
					e.preventDefault();
					takeMeToTheTop();
				}
				//BACK TO TOP FEATURE
			
	 });
	