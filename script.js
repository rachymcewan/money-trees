// import {
//   getDataFromDocId,
//   getDocumentsByField,
//   addDocument,
//   queryDatabase,
//   fullUpdate,
//   partialUpdate
// } from "./firestore_functions.js";
// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
// import { getFirestore } from "https://www.gstatic.com/firebasejs/9.13.0/firebase-firestore.js";

 
 
// const firebaseConfig = {

//   apiKey: "AIzaSyAlQXXov3LkclpZDuBk1rUDTk8QNPyimFs",

//   authDomain: "nft-rees.firebaseapp.com",

//   projectId: "nft-rees",

//   storageBucket: "nft-rees.appspot.com",

//   messagingSenderId: "393362868395",

//   appId: "1:393362868395:web:7bd3691c8141d8249acfee"

// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);


// const db = getFirestore(app);
// let current_collection = "Users";

// var user_button = document.getElementById("user_button");
// var burryman_button = document.getElementById("burryman_button");
// var manifestationInput = document.getElementById("manifestation_input");
// var result = document.getElementById("results");
// var profile_input = document.getElementById("profile_input");
// var dataURLVal;

// function replace_content(data) {
//   var username = document.getElementById("username");
//   username.innerText = data.name;
//   var profile_image = document.getElementById("profile_image");
//   profile_image.src = data.image;
//   var manifestation = document.getElementById("manifestation");
//   manifestation.innerText = data.manifestation;
//   var frame = document.getElementById("frame");
//   frame.innerText = data.frame;
// }

// function populate_results(data){
//   result.innerHTML = "";
//   data.forEach((doc)=>{
//     result.innerHTML += doc.manifestation + "<br/>";
//    console.log(doc.manifestation); 
//   })
// }

// function profile_function() {
//   user_button.onclick = async function () {
//     var new_data = await getDataFromDocId(db, current_collection, "floftus");
//     replace_content(new_data);
//   };

//   burryman_button.onclick = async function () {
//     var new_data = await getDataFromDocId(
//       db,
//       current_collection,
//       "the_burryman"
//     );
//     replace_content(new_data);
//   };
// }

// function read_via_input(input_obj){
//   input_obj.addEventListener("keyup", async function(event){
//     if (event.key === "Enter") {
//       var new_data = await getDataFromDocId(
//         db,
//         current_collection,
//         input_obj.value.toLowerCase()
//       );
//       replace_content(new_data);
//       input_obj.value = "";
//     }
//   });
// }

// function read_via_tag(the_tag) {
//   manifestationInput.addEventListener("keyup", function (event) {
//     if (event.key === "Enter") {
//       var input_val = parseInt(manifestationInput.value); // change string to integer
//       manifestationInput.value = "";
//       var the_data;
//       getDocumentsByField(db, current_collection, the_tag, input_val).then(
//         (the_data) => {
//           console.log("the data count is: ", the_data.count_v);
//           console.log("the full data is: ", the_data.full_data);
//           if (the_data.count_v > 0) {
//             // var data_dictionary = {};
//             var data_array = [];
//             the_data.full_data.forEach((doc) => {
//               console.log(doc.id, " => ", doc.data());
//               // data_dictionary[doc.id] = doc.data();
//               data_array.push(doc.data());
//             });
//             // console.log("got the dictionary, the values are: \n ", data_dictionary);
//             console.log("got the array, the values are: \n ", data_array);
//             populate_results(data_array);
//           } else {
//             populate_results(["No results"]);
//             console.log("no data");
//           }
//         }
//       );
//     }
//   });
// }


// window.addEventListener("DOMContentLoaded", function () {
//   var image = document.querySelector("#cropperimage");
//   let cropper = new Cropper(image, {
//     dragMode: "move",
//     aspectRatio: 4 / 3,
//     autoCropArea: 0.64,
//     // autoCrop: false,
//     restore: false,
//     guides: false,
//     center: true,
//     highlight: false,
//     cropBoxMovable: true,
//     cropBoxResizable: false,
//     toggleDragModeOnDblclick: false,
//     ready: function () {
//       cropper.setCropBoxData({
//         width: 400,
//         height: 300,
//       });
//     },
//   });
//   window.addEventListener("load", function () {
//     document
//       .querySelector('input[type="file"]')
//       .addEventListener("change", function () {
//         if (this.files && this.files[0]) {
//           console.log("upload file function");
//           cropper.replace(URL.createObjectURL(this.files[0]));
//           setTimeout(image_to_data, 1000);
//         }
//       });

//   });
  
//   function image_to_data(){
//     var croppedImage = cropper.getCroppedCanvas({
//       width: 400,
//       height: 300,
//     }).toDataURL();
//     console.log("the length of the cropped image is: ", croppedImage.length);
//     dataURLVal = croppedImage;
//   }
// });


// function writeNewData(){
//   var id = document.getElementById("doc_id");
//   var name = document.getElementById("doc_name");
//   var manifestation = document.getElementById("doc_manifestation");
//   var frame = document.getElementById("doc_frame");
//   var submit_button = document.getElementById("submit_button");
  
//   submit_button.onclick = function(){
//     var data_dict = {}
//     data_dict["frame"] = parseInt(frame.value);
//     data_dict["image"] = dataURLVal;
//     data_dict["manifestation"] = manifestation.value;
//     data_dict["name"] = name.value;
//     addDocument(db, current_collection, id.value.toLowerCase(), data_dict);
//   }
// }

// function updateData(){
  
// }
// // queryDatabase(database, the_collection)

// async function main() {
//   profile_function();
//   read_via_input(profile_input);
//   read_via_tag("frame");
//   writeNewData();
// }

// main().catch(console.log);
let capture;
let scaledWidth;
let scaledHeight;

function setup() {
  createCanvas(windowWidth, windowHeight);
  capture = createCapture(VIDEO);
  capture.size(320, 240);
  capture.hide(); // Hide the HTML element, draw it with p5

  // Calculate the scaled dimensions while maintaining the aspect ratio
  const videoAspectRatio = capture.width / capture.height;
  const windowAspectRatio = windowWidth / windowHeight;

  if (windowAspectRatio > videoAspectRatio) {
    // Window is wider than video aspect ratio
    scaledHeight = windowHeight;
    scaledWidth = windowHeight * videoAspectRatio;
  } else {
    // Window is narrower than video aspect ratio
    scaledWidth = windowWidth;
    scaledHeight = windowWidth / videoAspectRatio;
  }
}

function draw() {
  background(255);
  // Use the calculated scaled dimensions
  image(capture, (windowWidth - scaledWidth) / 2, (windowHeight - scaledHeight) / 2, scaledWidth, scaledHeight);
}
