
( function( $, undefined ) {
    // init variables
    var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    var nextNum = 1;
    var total = 9;
    var showTime = 5000;
    var isStart = false;

    function failed () {
        alert ("Sorry! The next number should be "+nextNum+"!");
        isStart = false;
    }
    function succeeded () {
        alert ("Congratulations! You did it!");
        isStart = false;
    }

    function shuffleNumbers () {
        for (var i = numbers.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var tmp = numbers[i];
            numbers[i] = numbers[j];
            numbers[j] = tmp;
        }
    }

    function btnClick (e) {
        if (isStart) {
            var index = parseInt(e.currentTarget.id.substring(4));
            $('span', this).text (numbers[index]);
            if (numbers[index] === nextNum) {
                if (nextNum === total) {
                    succeeded();
                }
                else {
                    nextNum ++;
                }
            }
            else {
                failed ();
            }
        }
    };

    function createNumbers (num) {
        numbers = [];
        for (var i = 1; i <= num; i ++) {
            numbers.push (i);
        }
    }

    function createBtnGrid (grid) {
        var btn_grid = $("<div id=\"btn_grid\"></div>");
        for (var i = 0; i < grid; i ++) {
            var rowEl = $("<div class=\"ui-grid-"+String.fromCharCode(97 + grid - 2)+"\"></div>");
            for (var j = 0; j < grid; j++) {
                var colEl = $("<div class=\"ui-block-"+String.fromCharCode(97 + j)+"\"></div>")
                var btnEl = $("<a data-role=\"button\" id=\"btn_"+(i*grid+j)+"\"  href=\"#page1\"" + ">?</a>");
                btnEl.bind ('click', btnClick);
                colEl.append (btnEl)
                rowEl.append (colEl);
            }
            btn_grid.append (rowEl);
        }
        return btn_grid;
    }

    $( document ).bind( "pageinit", function( e ) {

        $( "#btn_start", e.target ).on( "click", function( e ) {
            nextNum = 1;
            shuffleNumbers();
            showTime = parseInt($("#txt_time").val())*1000;

            // set numbers on buttons
            for (var i = 0; i < total; i ++) {
                var btn_id = "#btn_"+i+" span";
                $(btn_id).text (numbers[i]);
            }

            // show the numbers for 'showTime' seconds
            setTimeout(function () {
                for (var i = 0; i < total; i ++) {
                    var btn_id = "#btn_"+i+" span";
                    $(btn_id).text ('?');
                }
                isStart = true;
            }, showTime);
        });


        $("#sel_grid").on("change", function(e){
            var grid = parseInt($(this).val());
            total = grid*grid;

            createNumbers (total);

            $("#btn_grid").remove();
            var btn_grid = createBtnGrid (grid);
            $("#content").append(btn_grid);
            btn_grid.trigger("create");
        });

        $("#sel_grid").change();

    });
})( jQuery );
