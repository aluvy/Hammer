
window.addEventListener("load", ()=>{

    let list = Array.from(document.querySelectorAll(".list_item"));
    list.forEach((item, idx)=>{
        let mc = new Hammer(item);
        let btn = item.querySelector(".btn_del").clientWidth * -1;
        let myx, x;

        mc.on("panleft panright tap press", function(ev) {

            $(document).find(".list_item").css({"transform" : "translateX(0)" });

            myx = Number((item.style.transform).replace("translateX(", "").replace("px)", ""));
            x = ev.deltaX + myx;

            x = ( x <= btn ) ? btn : x;     // min
            x = ( x >= 0 ) ? 0 : x;         // max
            x = ( ev.type == "tap" && x == btn ) ? 0 : x;   // max, tab

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