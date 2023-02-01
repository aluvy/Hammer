
window.addEventListener("load", ()=>{

    let btnH = Array.from(document.querySelectorAll(".list_item .btn_del"));
    let liH = document.querySelector(".list_item").offsetHeight;
    btnH.forEach((item)=>{ item.style.height = `${liH}px` })

    let list = Array.from(document.querySelectorAll(".list_item"));
    list.forEach((item, idx)=>{
        let mc = new Hammer(item);
        let btn = item.querySelector(".btn_del").clientWidth * -1;
        let myx, x;

        mc.on("panleft panright tap press", function(ev) {

            console.log(ev);

            // "panleft"
            // "panright"

            $(document).find(".list_item").css({"transform" : "translateX(0)" });

            myx = Number((item.style.transform).replace("translateX(", "").replace("px)", ""));
            x = ev.deltaX + myx;

            // x = ( x <= btn ) ? btn : x;     // min
            // x = ( x >= 0 ) ? 0 : x;         // max
            // x = ( ev.type == "tap" && x == btn ) ? 0 : x;   // max, tab

            if( ev.type == "panleft" ){             // left, min (btn)
                x = ( x <= btn ) ? btn : x;
            } else if ( ev.type == "panright" ) {   // right, max (0)
                x = ( x >= 0 ) ? 0 : x;
            } else if ( ev.type == "tap" ) {        // tap, 0
                x = (x == btn) ? 0 : x; 
            }

            item.style.transform = `translateX(${x}px)`;
        });

        item.addEventListener("mouseup", ()=>{ touchend(item, x, btn) });
        item.addEventListener("touchend", function(){ touchend(item, x, btn) })
    })
    
    const touchend = function(item, x, btn){
        x = ( x <= btn/2 ) ? btn : 0;
        item.style.transform = `translateX(${x}px)`;
    }
})