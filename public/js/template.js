function main() {
          var figures = document.getElementsByTagName("figure");
          var teller = 0;
          while (teller < figures.length) {
            figures[teller].innerHTML = "<span class='upper'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span>" + "<span class='left'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span>" +  figures[teller].innerHTML + "<span class='bottom'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span><span class='right'>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -</span>";
            teller++;
          }
}

window.onload = function() {
       main();
}
