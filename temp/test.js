ar=[];

for(i in dt){
  t={};
  t.id=i;
  t.name=dt[i].innerText.split("\n")[1];
  t.img=dt[i].getElementsByTagName("img")[1].src;
  ar.push(t);  
}

hmd.children
ar=[];
dt=hmd.children
for(i in dt){
    t={};
    t.id=parseInt(i)+50;
    t.title=dt[i].innerText.split("\n")[2];
    t.artist=dt[i].innerText.split("\n")[3];
    t.img=dt[i].getElementsByTagName("img")[1].src;
    ar.push(t);  
  }


  hmd.getElementsByTagName("li")

ar=[]
dt=hmd.getElementsByTagName("li");
for(i=0;i<16;i+=2){
  ar.push(dt[i].getElementsByTagName("img")[1].src)
}