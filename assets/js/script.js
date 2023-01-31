
window.addEventListener("load", ()=>{

    var myElement = document.getElementById('myElement');

    // create a simple instance
    // by default, it only adds horizontal recognizers
    var mc = new Hammer(myElement);

    // listen to events...
    mc.on("panleft panright tap press", function(ev) {
        console.log( ev.type );
        myElement.textContent = ev.type +" gesture detected.";
    });



    let list = Array.from(document.querySelectorAll(".list_item"));
    list.forEach((item, idx)=>{
        let mc = new Hammer(item);
        let x;

        mc.on("panleft panright tap press", function(ev) {
            // console.log( ev.type );

            console.log(ev, ev.center.x, ev.deltaX, ev.center.x - ev.deltaX);

            x = ev.deltaX;
            if( x < -70 ){
                x = -70;
            } else if ( x > 0){
                x = 0
            }
            item.style.transform = `translateX(${x}px)`;
            // item.style.transform = `matrix(1, 0, 0, 1, ${x}px, 0, 0)`;

            if( ev.type == "panleft" ){
                console.log('left');
            } else if ( ev.type == "panright" ){
                console.log('panright');
            } else if ( ev.type == "tap" ) {
                console.log('tab');

            }
            myElement.textContent = ev.type +" gesture detected.";
        });

        // item.addEventListener("mouseup touchend", function(){
        //     console.log("dd mouseup touchend");
        // })

        // item.addEventListener("mouseup", function(){
        //     console.log("mouseup");
        // })

        // item.addEventListener("touchend", function(){
        //     console.log("touchend");
        // })

        $(item).on("mouseup touchend", function(){
            
            if ( x < -35 ){
                x = -70;
            } else {
                x = 0;
            }
            item.style.transform = `translateX(${x}px)`;

            console.log( $(item).css("transform") );
            // item.style.transform = `translate3d(${x}px, 0, 0)`;
        })

        

        // console.log(item, idx)
    })
})