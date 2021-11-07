function Block(id,domE) {
    this.id = id
    this.domE = domE
    this.showing = true;
    this.playing = false;

    this.returnId = function() {
        return this.id;
    }

    this.show = function() {
        // console.log(this.id)
        this.domE.classList.add("show")
        setTimeout(()=> this.domE.classList.remove("show"),300)
    }


    
    this.domE.addEventListener("click",()=> {
        if (this.showing) {
            // Efectos visuales
            this.domE.classList.toggle("clicky")
            setTimeout(()=> this.domE.classList.remove("clicky"),300)
        }

        if (this.playing) {
            verif(this.id);
        }
    })
}

