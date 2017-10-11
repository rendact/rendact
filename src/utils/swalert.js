import {default as swal } from 'sweetalert2'

export const swalert = function(type, title, body, callback, rgba){
  var background = '#fff';
  var buttonColor = '#357ca5';
  var showCancelButton = true;
  var confirmButtonText = "";
  var text = body;

  if (type==="warning") {
    background = "rgba(239,203,4,.75)";
    buttonColor = '#db8b0b';
    text = title;
    confirmButtonText = "Yes"
  }
  if (type==="info") {
    background = "rgba(0,0,128,.75)";
    buttonColor = '#00a7d0';
    showCancelButton = false;
    confirmButtonText = "OK";
  }
  if (type==="error"){
    background = "rgba(239,4,16,.75)";
    buttonColor = '#d33724';
    showCancelButton = false;
    confirmButtonText = "OK";
  }

  if (!callback) {
    callback = function(){}
  }

  swal({
      /*title: title,*/
      text: text,
      showCancelButton: showCancelButton,
      background: background,
      confirmButtonText: confirmButtonText,
      cancelButtonText: 'Cancel',
      confirmButtonColor: buttonColor,
      cancelButtonColor: 'grey',
      confirmButtonClass: 'btn swal-btn-success',
      cancelButtonClass: 'btn swal-btn-danger',
      buttonsStyling: true,
      customClass: 'swal'
    }).then(callback)
}
