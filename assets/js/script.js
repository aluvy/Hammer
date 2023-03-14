
window.addEventListener("load", ()=>{

    // set height
    let btnH = Array.from(document.querySelectorAll(".list_item .btn_del"));
    let liH = document.querySelector(".list_item").offsetHeight;
    btnH.forEach((item)=>{ item.style.height = `${liH}px` });

    // hammer
    let AllList = Array.from(document.querySelectorAll(".list_item"))
    let list = Array.from(document.querySelectorAll(".list_item a"));

    list.forEach((item, idx)=>{
        let mc = new Hammer(item);
        let btn = item.parentNode.querySelector(".btn_del");
        let minX = btn.clientWidth * -1;    // open
        let maxX = 0;                       // close

        let type, x, angle;

        item.addEventListener("click", function(e){
            e.preventDefault();
        })

        mc.get("pan").set({ direction: Hammer.DIRECTION_ALL });

        mc.on("panstart panend panleft panright", function(e) {

            let siblings = AllList.filter(node => node != item.parentNode);
            siblings.forEach((Allitem, idx) =>{
                Allitem.style.transform = `translateX(0)`;
                Allitem.classList.remove("on");
            })

            let li = item.parentNode;

            type = e.type;
            x = e.deltaX;
            angle = e.angle;
            
            if( type == "panleft" ){
                x = ( li.classList.contains("on") )
                    ? minX
                    : (x <= minX ) ? minX : x;
            }

            x = ( x >= maxX ) ? maxX : x;
            x = ( x <= minX ) ? minX : x;

            if(    ( angle >= -180 && angle <= -165  )
                || ( angle >= 165 && angle <= 180  )
                || ( angle >= -20 && angle <= 20  ) ){
                    li.style.transform = `translateX(${x}px)`;
            }

            if ( type == "panend" ) {
                x = ( x >= minX/2 ) ? maxX : minX;
                li.style.transform = `translateX(${x}px)`;
                ( x == minX ) ? li.classList.add("on") : li.classList.remove("on");
            }
        });

        mc.on("tap", function(e) {
            AllList.forEach((Allitem, idx)=>{ Allitem.style.transform = `translateX(${maxX})`; })
        })

    })
})

$(()=>{

    let btm = document.querySelector(".bottom-sheet");
    let mc = new Hammer(btm);

    mc.get("pan").set({ direction: Hammer.DIRECTION_VERTICAL });
    mc.on("panup pandown panstart panend", function(e) {
        console.log(e);
        let type = e.type;
        let btmsht = $(document).find(".bottom-sheet");
        let body = $(document).find(".bottom-sheet .body");

        console.log(body.scrollTop());

        if( type == "panup" ){
            btmsht.addClass("on");
        } else if ( type == "pandown" ){
            btmsht.removeClass("on");
        }
    })
})