//DASHBOARD
$(document).ready(function(){
  var h = $("h1:eq(0)").text();
  //$("body").append("<h2 class='temps'></h2>");
  //$("body").append("<h3 class='temps'></h3>");
  //$(".temps").hide();
  var ph = "table:contains(Location Information) td:contains";
  var hp = "table:contains(User Selected Match) td:contains";
  var sr = "#search-results";
  var dt = ["#locationName",ph+"(Address:) ~ td",ph+"(Address 2:) ~ td",ph+"(Phone):eq(0) ~ td",ph+"(Local Phone) ~ td",ph+"(City):eq(0) ~ td"];
  $("input[type='submit']").click(function(){
    $("mark").contents().unwrap();
    $(sr).insertBefore(".clear:eq(4)");
    $(hp+"(City:)").css('background-color','');
    $("#search-results img").parent().css('background-color','');
    //$(".temps").remove();
  });
  if($(":contains(Stop Processing Continuously)").length){
    $("a:contains(Stop Processing Continuously)")[0].click();
  }
  //HIGHLIGHT
  function hma(worda,wordb){
    var ta = $(worda).text();
    var tb = $(wordb).text();
    var t1 = ta.split(/[ -\-,.|&'/\\]+/);
    var t2 = tb.split(/[ -\-,.|&'/\\]+/);
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
    for(i = 1;i < $(sr+" tbody tr").length;i++){
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
    window.scrollTo(0,260);
  }
  //GEO
  if(h.includes("Geocode Validation") || h.includes("Healthcare")){
    window.scrollTo(0,175);
  }
  //MATCH
  if(h.includes("Tags Manual Match Verification")){
    window.scrollTo(25,185);
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
    });
    obs.observe(document.querySelector(sr),{attributes:true,childList:true,characterData:true});
    if($(dt[5]).text().toLowerCase() != $(hp+"(City:) ~ td").text().toLowerCase()){
      $(hp+"(City:)").css('background-color','pink');
    }
  }
  //LISTING
  if(h.includes("Tags Missing Listing Verification")){
    window.scrollTo(25,185);
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
    });
    observer.observe(document.querySelector(sr),{attributes:true,childList:true,characterData:true});
  }
});
//SHORTCUT KEYS
$(document).ready(function(){
  var sl = [];
  var b;
  var c = 0;
  var n = $("h1:eq(0)").text();
  $(document).keydown(function(e){
    switch(e.keyCode){
      case 101:
        if(n == "Suppression Approval"){
          $(".reject-btn:eq("+b+")").val(10);
          $(".reject-btn:eq("+b+")").change(); 
          $(".reject-btn:eq("+b+")").addClass("selected");
          $(".accept-btn:eq("+b+")").removeClass("selected");
        }
        else if(n == "My Tasks"){
          var cc = 0;
          setInterval(function(){
            if(cc<15){
              cc++;
              $("a:contains(process tasks continuously)")[0].click();
            }else{
              clearInterval();
              location.reload();
            }
          },150);
        }
        else{
          location.reload();
        }
        break;
      case 107:
        let $temp = $("<input>");
        $("body").append($temp);
        $temp.val(window.location.href).select();
        document.execCommand("copy");
        $temp.remove();
        break;
      case 106:
        if(n == "Geocode Validation"){
          window.scrollTo(0,document.body.scrollHeight);
          $("textarea[name='reason']").val('city in business name');
        }else if(n == "Tags Missing Listing Verification"){
          $("textarea[name='reason']").val('cannot process without accept button');
        }else{
          if($("#search-results img").length){
            var l = $("#search-results img").length;
            if(c == 0 || c == l){
              c = 1;
            }
            else{
              c++;
            }
            b = c-1;
            $("#search-results img").parent().css('background-color','');
            $("#search-results img:eq("+b+")").parent().css('background-color','black');
            var q = $("#search-results img:eq("+b+")").parent().attr('href').split('/');
            $("textarea[name='reason']").val('Match not selectable - '+q[3]);
          }
        }
        break;
      case 99:
        if(n == "Suppression Approval"){
          $(".accept-btn:eq("+b+")").click();
          $(".reject-btn:eq("+b+")").val(13);
          $(".reject-btn:eq("+b+")").change();
          $(".reject-btn:eq("+b+")").addClass("selected");
          $(".accept-btn:eq("+b+")").removeClass("selected");
        }
        $(".js-unverifiable-radio").click();
        $("textarea[name='form.comments']").val("Can't locate business");
        $(".js-latlng").val("");
        $("input[value='EXISTING']").click();
        break;
      case 98:
        if(n == "Suppression Approval"){
          $(".reject-btn:eq("+b+")").val(8);
          $(".reject-btn:eq("+b+")").change(); 
          $(".reject-btn:eq("+b+")").addClass("selected");
          $(".accept-btn:eq("+b+")").removeClass("selected");
        }
        if(n == "Manual Search API Task"){
          navigator.clipboard.readText().then(text => {
            $("input[name='listingUrlEntry']").val(text);
          })
          .catch(err => {
            alert('Failed to read clipboard contents ');
          });
        }
        $(".js-bgm-radio").click();
        $("input[value='accept']").click();
        $("input[value='MANUAL']").click();
        break;
      case 96:
        $(".js-entered-radio").click();
        $("input[value='add']").click();
        $("input[value='NONE']").click();
        $(".accept-btn:eq("+b+")").click();
        break;
      case 100:
        if(n == "Suppression Approval"){
          var l = $(".accept-btn").length;
          if(c == 0 || c == 1){
            c = l;
          }
          else{
            c--;
          }
          b = c-1;
          $(".accept-btn:eq("+b+")").focus();
        }
        else if($(".js-external-id").length){
          var l = $(".js-external-id").length;
          if(c == 0 || c == 1){
            c = l;
          }
          else{
            c--;
          }  
          b = c-1; 
          $(".js-external-id:eq("+b+")").click();
        }
        break;
      case 13:
      case 97:
        if(n == "Suppression Approval"){
          var l = $(".accept-btn").length;
          if(c == 0 || c == l) {
            c = 1;
          }
          else{
            c++;
          }
          b = c-1;
          $(".accept-btn:eq("+b+")").focus();
        }
        else if($(".js-external-id").length){
          var l = $(".js-external-id").length;
          if(c == 0 || c == l){
            c = 1;
          }
          else{
            c++;
          }
          b = c-1;
          $(".js-external-id:eq("+b+")").click();
        }
        break;
      case 102:
        $(".reject-btn:eq("+b+")").val(9);
        $(".reject-btn:eq("+b+")").change(); 
        $(".reject-btn:eq("+b+")").addClass("selected");
        $(".accept-btn:eq("+b+")").removeClass("selected");
        break;
      case 39:
        if(n == "My Tasks"){
          sl = [];
          var ab = $("a[target='_blank']").length;
          for (i=0;i<ab;i++){ 
            sl[i] = window.open($("a[target='_blank']:eq("+i+")").attr('href'), '_blank');
          }
        }
        break;
      case 37:
        if(n == "Suppression Approval"){
          window.open($("td:contains(Website:) ~ td>a").attr('href'),'','resizable,height=980,width=940');
        }
        if(n == "Manual Search API Task"){
          window.open($("td:contains(Listing URL)>a").attr('href').replace('site:',''),'','resizable,height=980,width=940');
        }
        if(n == "Geocode Validation" || n == "Unverified Geocode Validation"){
          let all = $("td:contains(Name:):eq(0) ~ td").text()+"+"+$("td:contains(1:):eq(0) ~ td").text()+"+"+$("td:contains(2:):eq(0) ~ td").text()+"+"+$("td:contains(City:):eq(0) ~ td").text()+"+"+$("td:contains(State:):eq(0) ~ td").text()+"+"+$("td:contains(Zip:):eq(0) ~ td").text();
          window.open("https://maps.google.com/maps?t=k&q="+all.replace("&","%26").replace("#","%23"),'','resizable,height=980,width=940');
        }
        if(n == "My Tasks"){
          var aa = sl.length;
          var ccc = 0;
          setInterval(function(){
            if(ccc<aa){
              try{
                if(sl[ccc].$(":contains(No search results)").length && sl[ccc].$("h1:eq(0)").text() == "Tags Missing Listing Verification"){
                  sl[ccc].$("input[value='add']").click();
                  sl[ccc].$("input[value='Process Task']").click();
                }
              }catch{}
              ccc++;
            }else{
              clearInterval();
            }
          },500);
        }
        break;
    }
  });
});
