//DASHBOARD-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function(){
  var h = $("h1:eq(0)").text();
  $("body").append("<h2 class='temps'></h2>");
  $("body").append("<h3 class='temps'></h3>");
  $(".temps").hide();
  var ph = "table:contains(Location Information) td:contains";
  var hp = "table:contains(User Selected Match) td:contains";
  var sr = "#search-results";
  var dt = ["#locationName",ph+"(Address:) ~ td",ph+"(Address 2:) ~ td",ph+"(Phone):eq(0) ~ td",ph+"(Local Phone) ~ td",ph+"(City):eq(0) ~ td"];
  if($(":contains(Stop Processing Continuously)").length){
    $("a:contains(Stop Processing Continuously)")[0].click();
  }
  //SUBMIT
  $("input[type='submit']").click(function(){
    $("mark").contents().unwrap();
    $(sr).insertBefore(".clear:eq(4)");
    $(hp+"(City:)").css('background-color','');
    $("#search-results img").parent().css('background-color','');
    $(".temps").remove();
  });
  $(".taskprocessing-submit").click(function(){
    $("mark").contents().unwrap();
    $(".temps").remove();
  });
  //HIGHLIGHT
  function hma(worda,wordb){
    var ta = $(worda).text();
    var tb = $(wordb).text();
    var t1 = ta.split(/[ -\-,.|&'/\\]+/).filter(w => w.length);
    var t2 = tb.split(/[ -\-,.|&'/\\]+/).filter(w => w.length);
    t1.sort(function(a,b){
      return b.length-a.length;
    });
    t2.sort(function(a,b){
      return b.length-a.length;
    });
    var re;
    t1.forEach(function(word){
      if(word.length > 2 && isNaN(word)){
        re = new RegExp(word,"gi");
        if(re.test(tb)){
          $(wordb).contents().filter(function(i,el){return el.nodeType === 3;}).each(function(i,el){ 
            var $el = $(el);
            var rp = $el.text().replace(re,function(str){return "<mark>"+str+"</mark>"});
            $el.replaceWith(rp);
          });
          ta = ta.replace(word,"");
        }
      }
      else{
        re = new RegExp("\\b"+word+"\\b","gi");
        if(re.test(tb)){
          $(wordb).contents().filter(function(i,el){return el.nodeType === 3;}).each(function(i,el){ 
            var $el = $(el);
            var rp = $el.text().replace(re,function(str){return "<mark>"+str+"</mark>"});
            $el.replaceWith(rp);
          });
        }
      }
    });
    t2.forEach(function(word){
      if(word.length > 2 && isNaN(word)){
        re = new RegExp(word,"gi");
        if(re.test(ta)){
          $(wordb).contents().filter(function(i,el){return el.nodeType === 3;}).each(function(i,el){ 
            var $el = $(el);
            var rp = $el.text().replace(re,function(str){return "<mark>"+str+"</mark>"});
            $el.replaceWith(rp);
          });
        }
      }
      else{
        re = new RegExp("\\b"+word+"\\b","gi");
        if(re.test(ta)){
          $(wordb).contents().filter(function(i,el){return el.nodeType === 3;}).each(function(i,el){ 
            var $el = $(el);
            var rp = $el.text().replace(re,function(str){return "<mark>"+str+"</mark>"});
            $el.replaceWith(rp);
          });
        }
      }
    });
  }
  //MOVE&LOOP
  function lop(){
    if($(":contains(error code: 502)").length || $(":contains(Scanning Unavailable Exception)").length || $(":contains(RpcException occurred)").length || $(":contains(SearchListings call has been timed out.)").length || $(":contains(503 Service Unavailable)").length || $(":contains(502 Bad Gateway)").length || $(":contains(Exception making a proxy request to Url)").length){
      close();
    }
    $(sr).insertAfter(".verticalContainer:contains(Location Information)");
    $(sr).insertAfter(".verticalContainer:contains(User Selected Match)");
    for(let i = 1;i < $(sr+" tbody tr").length;i++){
      var ti = sr+" tr:eq("+i+") ";
      hma(dt[0],ti+"td:eq(1) span:eq(0)");
      hma(dt[1],ti+"td:eq(2) span:eq(0)");
      hma(dt[2],ti+"td:eq(2) span:eq(1)");
      hma(dt[3],ti+"td:eq(1) span:eq(1)");
      hma(dt[4],ti+"td:eq(1) span:eq(1)");
      hma(dt[5],ti+"td:eq(2) span:eq(1)");
      hma(dt[5],ti+"td:eq(2) span:eq(2)");
    }
  }
  //LOOP2
  function lop2(){
    if($(":contains(error code: 502)").length || $(":contains(502 Bad Gateway)").length){
      close();
    }
    for(let i = 1;i < $(sr+" tbody tr").length;i++){
      var ti = sr+" tr:eq("+i+") ";
      hma(dt[0],ti+"td:eq(0) a:eq(0)");
      hma(dt[1],ti+"td:eq(1)");
    }
  }
  //PROCESS
  function proclist(){
    $("input[value='add']").click();
    $("input[value='Process Task']").click();
  }
  //OK&ERROR
  if($(":contains(This task was already complete)").length || $("#error-detail").length){
    close();
  }
  //TASKCOUNT
  if(h == "My Tasks"){
    $(".headerRow td").text("Tasks To Be Processed - " + $("td>img").length);
  }
  //SUPPRESS
  if(h == "Suppression Approval"){
    let ro = new ResizeObserver(function() {
      $("td:contains(Location Information)")[0].scrollIntoView({ behavior: "auto", block: "start" });
    });
    ro.observe(document.body);
  }
  //GEO
  if(h.includes("Geocode Validation") || h.includes("Healthcare")){
    let ro = new ResizeObserver(function() {
      $(window).scrollTop(175);
    });
    ro.observe(document.body);
  }
  //MATCH
  if(h == "AutoMatching Verification" || h == "Enterprise AutoMatching Verification"){
    let ro = new ResizeObserver(function() {
      $("td:contains(Location Information)")[0].scrollIntoView({ behavior: "auto", block: "start" });
    });
    ro.observe(document.body);
    lop2();
  }
  if(h == "Tags Manual Match Verification"){
    let ro = new ResizeObserver(function() {
      $("td:contains(Location Information)")[0].scrollIntoView({ behavior: "auto", block: "start" });
    });
    ro.observe(document.body);
    hma(dt[0],hp+"(Name:) ~ td a");
    $(hp+"(Address)").each(function(ix){
      hma(dt[1],hp+"(Address):eq("+ix+") ~ td");
    });
    hma(dt[2],hp+"(Address:) ~ td");
    hma(dt[3],hp+"(Phone:) ~ td");
    hma(dt[4],hp+"(Phone:) ~ td");
    hma(dt[5],hp+"(City:) ~ td");
    lop();
    var obs = new MutationObserver(function(mutations){
      lop();
      obs.disconnect();
    });
    obs.observe(document.querySelector(sr),{attributes:true,childList:true,characterData:true});
    if($(dt[5]).text().toLowerCase() != $(hp+"(City:) ~ td").text().toLowerCase()){
      $(hp+"(City:)").css('background-color','pink');
    }
  }
  //LISTING
  if(h == "Tags Missing Listing Verification"){
    let ro = new ResizeObserver(function() {
      $("td:contains(Location Information)")[0].scrollIntoView({ behavior: "auto", block: "start" });
    });
    ro.observe(document.body);
    //NO SEARCH RESULTS
    if($(":contains(No search results)").length){
      //close();
      //proclist();
    }
    //SCANNING
    //else 
    //RESULTS
    else{
      lop();
    }
    //LOADING
    var observer = new MutationObserver(function(mutations){
      //NO SEARCH RESULTS
      if($(":contains(No search results)").length){
        //close();
        //proclist();
      }
      //SCANNING
      //RESULTS
      else{
        lop();
      }
      observer.disconnect();
    });
    observer.observe(document.querySelector(sr),{attributes:true,childList:true,characterData:true});
  }
});
//MANAGE TOOLS--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
$(document).ready(function(){
  var h = $("h1:eq(0)").text();
  var w = window.name;
  var l;
  var lob = ["Match","List","Sup","Geo","Unv","API","AMV","EAV","HC","Clear","Internal","External","Manager","Remove Manager"];
  function pr(x){
    for(let c = 0; c < l; c++){
      if($(".x:eq("+c+")").prop("checked")){
        var w = window.open($("a:contains(edit):eq("+c+")").attr("href"),x+c);
      }
    }
  }
  function ct(x,y){
    $.get(x,function(response){
      let s = (y == 123) 
        ? $(response).find("tbody:last .js-duplicate-item").length 
        : $(response).find("form:eq(0) .decision-dropdown").length;
      $("#sa").append("<tr><td><a href='"+x+"'>"+x+"</a></td><td>"+s+"</td></tr>");
    });
  }
  if(h == "Task Processing Details"){
    var tsktyp = $("#tasktype").val();
    if(tsktyp == 123 || tsktyp == 152 || tsktyp == 153)
    {
      var c = $("a:contains(Audit)").length;
      $("#content").append("<table><tbody id='sa'></tbody></table>");
      for(let i = 0; i < c; i++){
        var j = $("a:contains(Audit):eq("+i+")").attr("href");
        ct(j,tsktyp);
      }
    }
  }
  function sw(x){
    if($("input[value='"+x+"']").is(":checked")){
      close();
    }
    else{
      $("label input").removeAttr('checked');
      $("input[value='"+x+"']").click();
      $("input[value='Save Changes']").click();
    }
  }
  if(h == "Edit User"){
    window.scrollTo(0,200);
    if(w.includes("Mat")){
      sw(88);
    }
    if(w.includes("Lis")){
      sw(89);
    }
    if(w.includes("Sup")){
      sw(123);
    }
    if(w.includes("Geo")){
      sw(124);
    }
    if(w.includes("Unv")){
      sw(126);
    }
    if(w.includes("API")){
      sw(146);
    }
    if(w.includes("AMV")){
      sw(152);
    }
    if(w.includes("EAV")){
      sw(153);
    }
    if(w.includes("HC")){
      sw(148);
    }
    if(w.includes("Int")){
      if($("input[name='userView.isInternal']").is(":checked")){
        close();
      }
      else{
        $("input[name='userView.isInternal']").click();
        $("input[value='Save Changes']").click();
      }
    }
    if(w.includes("Ext")){
      if($("input[name='userView.isInternal']").is(":checked")){
        $("input[name='userView.isInternal']").click();
        $("input[value='Save Changes']").click();
      }
      else{
        close();
      }
    }
    if(w.includes("Man")){
      if($("input[name='userView.isManager']").is(":checked")){
        close();
      }
      else{
        $("input[name='userView.isManager']").click();
        $("input[value='Save Changes']").click();
      }
    }
    if(w.includes("Rem")){
      if($("input[name='userView.isManager']").is(":checked")){
        $("input[name='userView.isManager']").click();
        $("input[value='Save Changes']").click();
      }
      else{
        close();
      }
    }
  }
  if(h == "Users"){
    if(w.includes("clearTasks")){
      window.addEventListener("unload",function(){
        close();
      });
      $("form[action='"+w+"'] .link-input").click();
    }
    else if($("h2").text() != "1"){
      $("h2").text("1");
      $("thead td").attr('colspan',3);
      $("thead tr").append("<td><input type='checkbox' id='y'><button id='z'>⇌</button></td>");
      $(".verticalContainer div:eq(0)").remove();
      l = $("tbody tr").length;
      var i = 0;
      $(".clear:eq(1)").remove();
      while(i<l){
        var d = $("span:eq("+i+")").text().replace(/\s/g,'');
        if(am.includes(d)){
          i++;
        }
        else{
          $("tbody tr:eq("+i+")").remove();
          l--;
        }
      }
      l = $("tbody tr").length;
      $("td:contains(password)").remove();
      $("td:has(.link-input)").hide();
      $("tbody tr").append("<td><button class='w'>clear</button></td><td><input type='checkbox' class='x'></td>");
      for(let i = 0; i < lob.length; i++){
        $("#content").append("<td><button id='"+lob[i].substring(0,3)+"'>"+lob[i]+"</button></td>");
      }
      var t = "tbody:eq(0) .x";
      $("#y").click(function(){
        if($("#y").prop("checked")){
          $(t).prop("checked",true);
        }
        else{
          $(t).prop("checked",false);
        }
      });
      $("#z").click(function(){
        for(let i = 0; i < $(t).length; i++){
          if($(".x:eq("+i+")").prop("checked")){
            $(".x:eq("+i+")").prop("checked",false);
          }
          else{
            $(".x:eq("+i+")").prop("checked",true);
          }
        }
      });
      $("#Mat").click(function(){
        pr("Mat");
      });
      $("#Lis").click(function(){
        pr("Lis");
      });
      $("#Sup").click(function(){
        pr("Sup");
      });
      $("#Geo").click(function(){
        pr("Geo");
      });
      $("#Unv").click(function(){
        pr("Unv");
      });
      $("#API").click(function(){
        pr("API");
      });
      $("#AMV").click(function(){
        pr("AMV");
      });
      $("#EAV").click(function(){
        pr("EAV");
      });
      $("#HC").click(function(){
        pr("HC");
      });
      $("#Int").click(function(){
        pr("Int");
      });
      $("#Ext").click(function(){
        pr("Ext");
      });
      $("#Man").click(function(){
        pr("Man");
      });
      $("#Rem").click(function(){
        pr("Rem");
      });
      $("#Cle").click(function(){
        for(let i = 0; i < l; i++){
          if($(".x:eq("+i+")").prop("checked")){
            window.open(window.location.href,$("form:has(.link-input):eq("+i+")").attr("action"));
          }
        }
      });
      $(".w").click(function(){
        var i = $(".w").index(this);
        window.open(window.location.href,$("form:has(.link-input):eq("+i+")").attr("action"),'resizable,height=1,width=1');
      });
      $("tbody tr>:nth-child(1)").click(function(){
        $(".x:eq("+$("tbody tr>:nth-child(1)").index(this)+")").click();
      });
    }
  }
});
