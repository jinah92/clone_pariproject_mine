$(document).ready(function () {

  $("#email_check").click(function() {
    const email = $("#email").val();

    let errMSG = "";
    if (email == "" || email == undefined) {
      errMSG = "이메일을 입력해주세요.";
      $("#contact_err_msg").html(errMSG);
      $("#email").focus();

      return;
    }

    const send_param = { email };
    $.post("login/emailcheck", send_param, function(returnData) {
      $("#email_check").val(returnData.message);
    });
  });

  $("#pw_btn").click(function() {
    //alert();
    const name = $("#name").val();
    const email = $("#email").val();
    const phone = $("#phone").val();

    let errMSG = "";
    if (name == "" || name == undefined) {
      errMSG = "이름을 입력해주세요.";
      $("#pw_name_err_msg").html(errMSG);
      $("#name").focus();
      return;
    } else if (email == "" || email == undefined) {
      errMSG = "이메일을 입력해주세요.";
      $("#pw_email_err_msg").html(errMSG);
      $("#email").focus();
      return;
    } else if (phone == "" || phone == undefined) {
      errMSG = "전화번호를 입력해주세요.";
      $("#pw_phone_err_msg").html(errMSG);
      $("#phone").focus();
      return;
    }

    const send_param = { name, email, phone };
    $.post("/password/process", send_param, function(returnData) {
      alert(returnData.message);
      if (returnData.flag == 1) {
        opener.location.reload();
        window.close();
      } else {
        location.reload();
      }
    });
  });

  $("#logout_btn").click(function() {
    $.post("/logout", {}, function(returnData) {
      alert(returnData.message);
      location.reload();
    });
  });

  $("#contact_btn").click(function() {
    //alert();
    const name = $("#name").val();
    const email = $("#email").val();
    const pw = $("#pw").val();
    const usr_type = $("#usr_type").val();
    const phone = $("#phone").val();
    const address = $("#address").val();

    let errMSG = "";

    if (name == "" || name == undefined) {
      errMSG = "이름을 입력해주세요.";
      $("#contact_err_msg").html(errMSG);
      $("#name").focus();
      return;
    } else if (email == "" || email == undefined) {
      errMSG = "이메일을 입력해주세요.";
      $("#contact_err_msg").html(errMSG);
      $("#email").focus();
      return;
    }
    if (pw == "" || pw == undefined) {
      errMSG = "패스워드를 입력해주세요.";
      $("#contact_err_msg").html(errMSG);
      $("#pw").focus();
      return;
    }
    if (phone == "" || phone == undefined) {
      errMSG = "전화번호를 입력해주세요.";
      $("#contact_err_msg").html(errMSG);
      $("#phone").focus();
      return;
    }

    
    const send_param = { name, email, pw, usr_type, phone, address };
    $.post("contact", send_param, function(returnData) {
      alert(returnData.message);
      window.close();
      if (returnData.flag) {
        //if문 추가
        window.close();
      }
    });
  });

  $("#login_btn").click(function() {
    const email = $("#email").val();
    const pw = $("#pw").val();
    // alert(email + ":" + pw);
    const send_param = { email, pw };
    $.post("/login/process", send_param, function(returnData) {
      let flag = returnData.flag;
      alert(returnData.message);
      //alert(window === window.parent);
      if (flag == 1) {
        opener.location.reload();
        window.close();
      } else {
        location.reload();
      }
    });
  });

  $("#login_open_btn").click(function() {
    window.open(
      "login/form",
      "_blank",
      "toolbar=no,menubar=no,scrollbars=yes,resizable=no,location=no,top=200,left=300,width=600,height=600"
    );
  });

  $('#comment_form_btn').click(function(){
    $('#comment_form').show();
    $('#comment_form_btn').hide();
  });

  $('#report_view_btn').click(function(){

    $.get('/board/view_board', {}, function(returnData){
      if(!returnData.message){
        location.href="/board/view_board";
      }
      else {
        alert(returnData.message);
      }
    });
  });

  $('#report_btn').click(function () {
    $.get('/board/write_form',{}, function(returnData){
  
      if(returnData.message){
        alert(returnData.message);
      } else{
        window.open("/board/write_form",  "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=1500,height=800");

      }
    });
});
    
  $('#r_insert_btn').click(function () {
    const time = $('#time').val() //발견 시간
    const title = $('#r_title').val()
    const threat_type = $('#threat_type').val()
    const os = $('#os').val()
    const victim_ip = $('#victim_ip').val()
    const victim_port = $('#victim_port').val()
    const attack_ip = $('#attack_ip').val()
    const comment = $('#r_comment').val()
    const sendParam = {
      time,
      title,
      threat_type,
      os,
      victim_ip,
      victim_port,
      attack_ip,
      comment
    }
    $.post('/board/write', sendParam, function (returnData) {
      alert(returnData.message);
      if(returnData.flag == 1){
        window.close();
      }
    })
  })
})
