var slider = document.getElementById('control-slider');
var current = document.getElementById('current-value');
var HOST = location.origin.replace(/^http/,'ws');
var ws = new WebSocket(HOST);

slider.addEventListener('input',function(){
const value = Number(slider.value);

current.textContent=value;

ws.send(String(value));
});
ws.onopen = function(){
    console.log("connected to server");
}
ws.onclose=function(){
 console.log("connection lost");
}
ws.onmessage=function(event){
slider.value=event.data;
current.textContent=event.data;
}