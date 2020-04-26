var Number_Of_Hidden_Layers=1;
var Number_Of_Nodes_Per_Layer=1;
var Learning_Rate=0.01;
var Epochs=50;
var Activation_Function="tanh";

let data=[];


function datagenerate(x){
        
    if(x=="sin"){
        data=[];
        var k = 0;
        for (var i = 0; i < 50; i++) {
            data.push({
                x: k,
                y: Math.sin(8*k)+Math.random()/8
            });
            k += 0.02;
        }        
        updataselections(2,70,0.001,50,"tanh");

    }

    if(x=="cos"){
        data=[];
        var k = 0;
        for (var i = 0; i < 50; i++) {
            data.push({
                x: k,
                y: Math.cos(8*k)+Math.random()/4 
            });
            k += 0.02;
        }


        updataselections(2,56,0.001,206,"tanh");

    }
    
    
    if(x=="x"){
        data=[];
        var k = 0;
        for (var i = 0; i < 50; i++) {
            data.push({
                x: k,
                y: k+Math.random()/9
            });
            k += 0.02;
        }
    
        updataselections(1,3,0.1,20,"relu");
    }
    
    if(x=="none"){
        data=[];

    }

    if(x=="x^2"){
        data=[];
        var k = 0;
        for (var i = 0; i < 50; i++) {
            data.push({
                x: k,
                y: (k-0.5 )* (k-0.5) + Math.random()/30
            });
            k += 0.02;
        }
        updataselections(1,17,0.1,40,"relu");


    }

    if(x=="abs"){
        data=[];
        var k = 0;
        for (var i = 0; i < 50; i++) {
            data.push({
                x: k,
                y: Math.abs(k-0.5)+ Math.random()/25
            });
            k += 0.02;
        }
        updataselections(1,30,0.1,40,"relu");
    }

    if(x=="sqrt"){
        data=[];
        var k = 0;
        for (var i = 0; i < 50; i++) {
            data.push({
                x: k,
                y: Math.sqrt(k)+ Math.random()/25
            });
            k += 0.02;
        }
        updataselections(1,30,0.1,40,"sigmoid");
    }
    Scaler();
    window.scatterChartData.datasets[0].data =data;
    window.myScatter.update(500)
			

} 



function updataselections(h1,h2,h3,h4,h5){
    document.getElementById('h11').value=h1;
    document.getElementById('hid_n').innerHTML=h1;
    document.getElementById('h12').value=h2;
    document.getElementById('hid_nn').innerHTML=h2;
    document.getElementById('h13').value=h3;
    document.getElementById('hid_nnlr').innerHTML=h3;
    document.getElementById('h14').value=h4;
    document.getElementById('hid_nnep').innerHTML=h4;
    document.getElementById('epn').innerHTML=h4;
    document.getElementById('h15').value=h5;
    Number_Of_Hidden_Layers=h1;
    Number_Of_Nodes_Per_Layer=h2;
    Learning_Rate=h3;
    Epochs=h4;
    Activation_Function=h5;
}


function Scaler(){
    let xmax=-99999;
    let ymax=-99999;
    let xmin=99999;
    let ymin=99999;

    for(let i = 0 ; i < data.length ; i++ ){
        if(data[i].x<xmin){
            xmin=data[i].x;
        }

        if(data[i].y<ymin){
            ymin=data[i].y;
        }

        if(data[i].x>xmax){
            xmax=data[i].x;
        }

        if(data[i].y>ymax){
            ymax=data[i].y;
        }

    }

    for(let i = 0 ; i < data.length ; i++ ){
        data[i].x= (data[i].x - xmin)/(xmax-xmin);
        data[i].y= (data[i].y - ymin)/(ymax-ymin);
    }


}

