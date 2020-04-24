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
class FixedNav {
  constructor(fijar=true) {
    this.fijas=fijar;
    let pinged=false;
    let nav=document.querySelector(".cc");
    let coords=nav.getBoundingClientRect();
    let stickyScrollPoint = coords.top;
    window.addEventListener('scroll',function(ev){
      let coords=nav.getBoundingClientRect();
      if(window.scrollY<stickyScrollPoint)return defaulnav();
      if(coords.top <=0) pingToTop();

    })
    function pingToTop(){
     if (pinged) return
     nav.classList.add("ccpin");
     pinged=true;
    }
    function defaulnav(){
      if (!pinged) return
      nav.classList.remove("ccpin");
      pinged=false;
    }
  }

}
class ViewPort {
  static visible(el){
     let coords=el.getBoundingClientRect();
     let windowHeigth =document.documentElement.clientHeight;
     console.log(coords);
     console.log(coords.top < windowHeigth && (coords.top*-1)<windowHeigth);
     return (coords.top < windowHeigth && (coords.top*-1)<windowHeigth);
  }
}
class PlayOnViewPort {
  constructor(video_selector) {
    this.video=document.querySelector(video_selector);
    this.evaluate=this.evaluate.bind(this);
    this.blindEvent();
  }
  blindEvent(){
    window.addEventListener('scroll',this.evaluate)
  }
  evaluate(){
    if(ViewPort.visible(this.video)){
      this.video.play();
      this.video.volumen(50);
    }
    else {
      this.video.pause();
    }
  }


}
(function(){
  new Slider(".slider");
  new FixedNav();
  new PlayOnViewPort("video")
})();
