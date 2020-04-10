class IndexForSiblings {

  static get(el) {
    let children = el.parentNode.children;
    for (var i = 0; i < children.length; i++) {
        let child=children[i];
        if(child==el)return i;
      }
  }
}

class Slider {
  constructor(selector) {
    this.move=this.move.bind(this);
    this.moveByButtom=this.moveByButtom.bind(this);
    this.slider=document.querySelector(selector);
    this.interval=null;
    this.contador=0;
    this.itemsCount=this.slider.querySelectorAll(".sliderc > *").length;
    this.start();
    this.buildcontrols();
    this.bindEvents();
  }
  start(){
    this.interval=window.setInterval(this.move,3000);
  }
  restart(){
    if(this.interval) window.clearInterval(this.interval);
    this.start();
  }
  bindEvents(){
    this.slider.querySelectorAll(".sliderco li")
        .forEach(item => {
          item.addEventListener("click",this.moveByButtom)
        });
  }
  buildcontrols(){
    for (var i = 0; i < this.itemsCount; i++) {
      let control=document.createElement("li");
      if(i==0) control.classList.add("active");
      this.slider.querySelector(".sliderco ul").appendChild(control);
    }
  }

  moveByButtom(ev){
    let index=IndexForSiblings.get(ev.currentTarget);
    this.contador=index;
    this.moveTo(index);
    this.restart();
  }
  move(){

    this.contador++;
    if(this.contador>this.itemsCount-1) this.contador=0;
    this.moveTo(this.contador)
  }
  resetIndicador(){
    this.slider.querySelectorAll(".sliderco li.active")
        .forEach(item => item.classList.remove("active"));
  }
  moveTo(index){
    let left=index*100;
    this.resetIndicador();
    this.slider.querySelector(".sliderco li:nth-child("+(index+1)+")").classList.add("active");
    this.slider.querySelector(".sliderc").style.left="-"+left+"%";
  }
}
(function(){
  new Slider(".slider");
})();
