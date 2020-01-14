let config = {
    apiKey: "AIzaSyDUzqOVrCpQkxf7sAnxRe9kS3JJzMIldWU",
    authDomain: "fir-649bf.firebaseapp.com",
    databaseURL: "https://fir-649bf.firebaseio.com",
    projectId: "fir-649bf",
    storageBucket: "fir-649bf.appspot.com",
    messagingSenderId: "759797327012"
  };
  firebase.initializeApp(config);
  
  
  
  const blogName = document.currentScript.getAttribute("blogName");
  console.log(blogName);
  
  //===============================================================================================
  $("document").ready(function() {
  
    const commentBox = document.getElementById("commentBox");
    const nameBox = document.getElementById("nameBox");
   
  
    let firebaseRetrieveCommentsRef;
    let firebaseStoreCommentsRef;
  
    let retrievedCommentData;
  
   
  
    //Add Blogs Name here. //Change the value of BLOG_NAME.
    //const BLOG_NAME = "1_Challenges";
    const BLOG_NAME = blogName;
  
  
    
    initApp();
    
    function initApp() {
      
      firebaseRetrieveCommentsRef = firebase
        .database()
        .ref()
        .child("CommentsBoard/" + BLOG_NAME);
  
        firebaseRetrieveCommentsRef.on("child_added", snapComments => {
        retrievedCommentData = snapComments.val();
       
        $("#commentsList").append(
          "<li class='comments'><h4 class='comment-items'>" +
            retrievedCommentData.Name +
            " <span>["+retrievedCommentData.Timestamp+"]</span></h4><p class='comment-items'>" +
            retrievedCommentData.Comment +
            "</p></li>"
        );
  
      });
  
    
      $("#post").on("click", function(e) {
        e.preventDefault();
        let options = { year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' };
        let dtc = new Date();
        let tsc = dtc.toLocaleString("en-US", options);
      
        let newComment = commentBox.value;
        let newName = nameBox.value;
  
        if (newName == "") {
          if (localStorage.getItem("name") === null) {
            localStorage.setItem("name", "Anonymous");
            newName = localStorage.getItem("name");
          } else {
            newName = localStorage.getItem("name");
          }
        } else {
          localStorage.setItem("name", newName);
        }
  
        if (newComment == "") {
          alert("Please type your comment. ");
        } else {
          firebaseStoreCommentsRef = firebase
            .database()
            .ref()
            .child("CommentsBoard/" + BLOG_NAME);
          firebaseStoreCommentsRef.push({
            Comment: newComment,
            Name: newName,
            Timestamp: tsc
          });
          commentBox.value = "";
          nameBox.value = "";
        }
      });
   
    }

    const scrollToTopBtn = document.getElementById("back-to-top-btn");
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
  

