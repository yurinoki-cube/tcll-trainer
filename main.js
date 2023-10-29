function test(){
  alert("OK");
}


//操作関係
//スペースキーの押下で実行する
document.addEventListener('keypress', keypress_ivent);
function keypress_ivent(e){

  if (e.code === 'Space') {

    document.activeElement.blur();

    //スクランブル
    ScrambleSkewb(getSelectedLanguage(),getCheckboxValues(),getCheckboxCenters());

    //カウンター更新
    count ++;
    document.getElementById("text_counter").innerHTML ="count : " + count;

    e.preventDefault();
  }
  return false;
}

//タッチ時に実行
// タッチイベント対象
document.getElementById('touchArea').addEventListener("touchstart", touchstart_ivent, {passive: false });
function touchstart_ivent(e){

  document.activeElement.blur();

  ScrambleSkewb(getSelectedLanguage(),getCheckboxValues(),getCheckboxCenters());

  //カウンター更新
  count ++;
  document.getElementById("text_counter").innerHTML ="count : " + count;

  e.preventDefault();
  return false;
}


//カウンター関係
//カウンターのリセット
function resetCounter(){
  count = 0;
  document.getElementById("text_counter").innerHTML ="count : " + count;
  document.activeElement.blur();
}

//カウンターの表示
$('#modal1').on('hidden.bs.modal', function () {

  if (document.getElementById("counter").checked == true) {
    //カウンター部
    document.getElementById("text_counter").innerHTML ="count : " + count;
    //表示
    document.getElementById('counters').style.visibility ="visible";
  }else {
    //非表示
    document.getElementById('counters').style.visibility ="hidden";
  }

})


//設定のチェックボックスを初期化
function resetSettingCheck(){

  document.getElementById("FL-Dface").checked = true;
  document.getElementById("counter").checked = false;
}


//フォーム関係
//選択されたラジオボタンの値を取得
function getSelectedLanguage() {
    // ラジオボタンの要素を取得
    var radioButtons = document.getElementsByName("state");

    // 選択されているラジオボタンを探し、その値を取得
    var selectedLanguage = "";
    for (var i = 0; i < radioButtons.length; i++) {
        if (radioButtons[i].checked) {
            selectedLanguage = radioButtons[i].value;
            break;
        }
    }
    return selectedLanguage;
}

//選択されたチェックボックスの値を取得
function getCheckboxValues() {
  var checkboxes = document.querySelectorAll('input[name="twist"]:checked');
  var selectedOptions = Array.from(checkboxes).map(checkbox => checkbox.value);
  return selectedOptions;

}


function getCheckboxCenters(){

  var arrCheck = [[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[],[]];
  for (var i = 0; i < 18; i++) {
    for (var j = 0; j < 11; j++) {
      if (centers[i][j] == true) {
        arrCheck[i].push(j.toString());
      }
    }
  }
  return arrCheck;
}


//Center画面を開いたときの処理
function selectCenters(num){

  cNumber = num;
  for (var i = 0; i < 11; i++) {
    document.getElementById(centersID[i]).checked = centers[cNumber][i];
  }
}

//Center画面を閉じたら実行
$('#modal-center').on('hide.bs.modal', function (e) {

  //centers更新
  for (var i = 0; i < 11; i++) {
    centers[cNumber][i] = document.getElementById(centersID[i]).checked;
  }

  //背景色変更
  var count = centers[cNumber].filter(n => n ==true).length;
  switch (count) {
    case 0:
      document.getElementById(tclls[0][i]).checked = false;
      document.getElementById(tclls[0][cNumber]).style.backgroundColor = "#FFFFFF";
      document.getElementById(tclls[1][cNumber]).style.backgroundColor = "#FFFFFF";
      break;
    case 11:
      document.getElementById(tclls[0][i]).checked = true;
      document.getElementById(tclls[0][cNumber]).style.backgroundColor = "#ABC88B";
      document.getElementById(tclls[1][cNumber]).style.backgroundColor = "#ABC88B";
      break;
    default:
      document.getElementById(tclls[0][i]).checked = true;
      document.getElementById(tclls[0][cNumber]).style.backgroundColor = "#F47A4D";
      document.getElementById(tclls[1][cNumber]).style.backgroundColor = "#F47A4D";
  }
});


//centerのチェックショートカット用
function checlCenter(str,flag){

  var checkboxElement = document.getElementsByName(str);

  for (var i = 0; i < checkboxElement.length; i++) {
    checkboxElement[i].checked = flag;
  }
}

function updateCenters(num,flag){

  for (var i = 0; i < 11; i++) {
    centers[num][i] = flag;
  }
}

//TCLLのチェックショートカットボタン用
function checkTCLL(str,num){

  var checkboxElement = document.getElementsByName(str);

  for (var i = 0; i < checkboxElement.length; i++) {
    switch (num) {
      case 0:
        checkboxElement[i].checked = false;
        updateCenters(i,false);
        document.getElementById(tclls[0][i]).style.backgroundColor = "#FFFFFF";
        document.getElementById(tclls[1][i]).style.backgroundColor = "#FFFFFF";
        break;
      case 1:
        if (i % 2 == 1) {
          checkboxElement[i].checked = false;
          updateCenters(i,false);
          document.getElementById(tclls[0][i]).style.backgroundColor = "#FFFFFF";
          document.getElementById(tclls[1][i]).style.backgroundColor = "#FFFFFF";
        }else {
          checkboxElement[i].checked = true;
          updateCenters(i,true);
          document.getElementById(tclls[0][i]).style.backgroundColor = "#ABC88B";
          document.getElementById(tclls[1][i]).style.backgroundColor = "#ABC88B";
        }
        break;
      case 2:
        if (i % 2 == 0) {
          checkboxElement[i].checked = false;
          updateCenters(i,false);
          document.getElementById(tclls[0][i]).style.backgroundColor = "#FFFFFF";
          document.getElementById(tclls[1][i]).style.backgroundColor = "#FFFFFF";
        }else {
          checkboxElement[i].checked = true;
          updateCenters(i,true);
          document.getElementById(tclls[0][i]).style.backgroundColor = "#ABC88B";
          document.getElementById(tclls[1][i]).style.backgroundColor = "#ABC88B";
        }
        break;
      case 3:
        checkboxElement[i].checked = true;
        updateCenters(i,true);
        document.getElementById(tclls[0][i]).style.backgroundColor = "#ABC88B";
        document.getElementById(tclls[1][i]).style.backgroundColor = "#ABC88B";
        break;
    }
  }
}

function checkAll(num){

  var arr = ['twist','twist1-1','twist1-2','twist1-3','twist1-4','twist2-1','twist2-2','twist3-1','twist3-2','twist3-3','twist3-4','twist3-5','twist3-6','twist3-7','twist3-8','twist4-1','twist4-2','twist4-3','twist4-4'];

  for (var i = 0; i < arr.length; i++) {
      checkTCLL(arr[i],num);
  }
}



//チェックボックスの背景
$('#checkbox1').change(function(){
  var cnt = 0;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox2').change(function(){
  var cnt = 1;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox3').change(function(){
  var cnt = 2;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox4').change(function(){
  var cnt = 3;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox5').change(function(){
  var cnt = 4;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox6').change(function(){
  var cnt = 5;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox7').change(function(){
  var cnt = 6;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox8').change(function(){
  var cnt = 7;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox9').change(function(){
  var cnt = 8;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox10').change(function(){
  var cnt = 9;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox11').change(function(){
  var cnt = 10;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox12').change(function(){
  var cnt = 11;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox13').change(function(){
  var cnt = 12;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox14').change(function(){
  var cnt = 13;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox15').change(function(){
  var cnt = 14;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox16').change(function(){
  var cnt = 15;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox17').change(function(){
  var cnt = 16;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});

$('#checkbox18').change(function(){
  var cnt = 17;
  if ($(this).prop('checked')) {
    updateCenters(cnt,true);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#ABC88B";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#ABC88B";
  }else {
    updateCenters(cnt,false);
    document.getElementById(tclls[0][cnt]).style.backgroundColor = "#FFFFFF";
    document.getElementById(tclls[1][cnt]).style.backgroundColor = "#FFFFFF";
  }
});
