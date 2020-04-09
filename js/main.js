class Slider {
  constructor(selector) {
    this.move=this.move.bind(this);
    this.slider=document.querySelector(selector);
    this.interval=null;
    this.contador=0;
    this.itemsCount=this.slider.querySelectorAll(".sliderc > *").length;
    this.start();
    this.buildcontrols();
  }
  start(){
    this.interval=window.setInterval(this.move,3000);
  }
  buildcontrols(){
    for (var i = 0; i < this.itemsCount; i++) {
      let control=document.createElement("li");
      if(i==0) control.classList.add("active");
      this.slider.querySelector(".sliderco ul").appendChild(control);
    }
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
