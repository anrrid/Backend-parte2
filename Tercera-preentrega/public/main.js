/***AVATAR SCRIPT***/

function readURL(input)
{
    if(input.files && input.files[0]){
        var reader= new FileReader();
        reader.onload=function(e)
        {
            var fileurl=e.target.result;
            $('.profile-pic').attr('src',fileurl);
        }
        reader.readAsDataURL(input.files[0]);
    }
}
$(".file-upload").on('change',function(){
readURL(this);
});
$(".upload-button").on('click',function(){
$(".file-upload").click();
});
/***AVATAR SCRIPT***/

/*** PHONE SCRIPT ***/

const phoneInputField = document.querySelector("#phone");
      const phoneInput = window.intlTelInput(phoneInputField, {
        preferredCountries: ["ar", "br", "pe", "cl"],
        utilsScript:
          "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
      });
            const info = document.querySelector(".alert-info");

      function process(event) {
      event.preventDefault();

      const phoneNumber = phoneInput.getNumber();

      info.style.display = "";
      info.innerHTML = `Phone number in E.164 format: <strong>${phoneNumber}</strong>`;
      }

/*** PHONE SCRIPT ***/