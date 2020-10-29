import axios from "axios";

const addCommentForm = document.getElementById("jsAddComment");
//const commentList = document.getElementById("jsCommentList");
//const commentNumber = document.getElementById("jsCommentNumber");
const deleteBtns = document.querySelectorAll(".deleteBtn");
//array [ ]
let commentID;

const deleteComment = async (event) => {
  const deleteBtnEvent = event.target;
  commentID = deleteBtnEvent.nextElementSibling.innerHTML;
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/delete_comment`,
    method: "POST",
    data: {
      //to videoController.js-postDeleteComment
      commentID,
    },
  });
  if (response.status === 200) {
    location.href = location.href;
  }
};

/*const increaseNumber = () => {
  commentNumber.innerHTML = parseInt(commentNumber.innerHTML, 10) + 1;
  //10의 의미는 너무 신경쓰지 말 것.
}; 


const showUpComment = (comment) => {
  //강의 중 addComment
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerHTML = comment;
  li.appendChild(span);
  commentList.prepend(li);
  //prepend는 위쪽, append는 아래쪽
  increaseNumber();
}; */ 

const sendComment = async (comment) => {
  const videoId = window.location.href.split("/videos/")[1];
  const response = await axios({
    url: `/api/${videoId}/comment`,
    method: "POST",
    data: {
      comment, //to videoController.js-postAddComment
      //from handleSubmit
    },
  });
  if (response.status === 200) {
    //showUpComment(comment);
    location.href = location.href;
  }
};

const handleSubmit = (event) => {
  event.preventDefault();
  const commentInput = addCommentForm.querySelector("input");
  const comment = commentInput.value;
  sendComment(comment);
  commentInput.value = "";
};

function init() {
  addCommentForm.addEventListener("submit", handleSubmit);
  deleteBtns.forEach((deleteBtn) =>
    deleteBtn.addEventListener("click", deleteComment)
  );
}

if (addCommentForm) {
  init();
}
