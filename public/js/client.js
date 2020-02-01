$(document).ready(function () {
  $('#report_view_btn').click(function () {
    let board_view_form = `
    <div class="container-fluid">
      <div class="row content">
        <div class="col-sm-9">
        <h4><small>Vulnerability</small></h4>
        <hr>
        <h2>신규 취약점 보고 리스트</h2>
        <h5><span class="glyphicon glyphicon-time"></span> Post by 유저이름, 시간(초, 분, 시), 일, 월, 연도</h5>
        <p>alert_type<br>threat_type</p><hr>

        <h4>Leave a Comment:</h4>
        <form role="form">
          <div class="form-group">
            <textarea class="form-control" rows="3" required></textarea>
          </div>
          <button type="submit" class="btn btn-success">Submit</button>
        </form>
        <br><br>
    `;

    $('#content_div').html(board_view_form);
    $('#main').hide();
  })

  $('#report_btn').click(function () {
    $.get('/board/write_form',{}, function(resultData){
            window.open("/board/write_form",  "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=1500,height=800");
            
    });
});
    

  $('#r_insert_btn').click(function () {
    alert()
    const time = $('#time').val() //발견 시간
    const r_title = $('#r_title').val()
    const threat_type = $('#threat_type').val()
    const os = $('#os').val()
    const victim_ip = $('#victim_ip').val()
    const victim_port = $('#victim_port').val()
    const attack_ip = $('#attack_ip').val()
    const r_comment = $('#r_comment').val()
    const sendParam = {
      time,
      r_title,
      threat_type,
      os,
      victim_ip,
      victim_port,
      attack_ip,
      r_comment
    }
    $.post('/board/write', sendParam, function (returnData) {
      alert(returnData.message)
    })
  })
})
