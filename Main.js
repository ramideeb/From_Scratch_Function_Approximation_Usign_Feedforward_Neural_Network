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
                y: Math.sin(8*k)
            });
            k += 0.02;
        }
    }

    if(x=="cos"){
        data=[];
        var k = 0;
        for (var i = 0; i < 50; i++) {
            data.push({
                x: k,
                y: Math.cos(8*k)
            });
            k += 0.02;
        }
    }
    
    
    if(x=="x"){
        data=[];
        var k = 0;
        for (var i = 0; i < 50; i++) {
            data.push({
                x: k,
                y: k
            });
            k += 0.02;
        }
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
                y: (k-0.5 )* (k-0.5)
            });
            k += 0.02;
        }
    }

    if(x=="abs"){
        data=[];
        var k = 0;
        for (var i = 0; i < 50; i++) {
            data.push({
                x: k,
                y: Math.abs(k-0.5)
            });
            k += 0.02;
        }
    }

    if(x=="sqrt"){
        data=[];
        var k = 0;
        for (var i = 0; i < 50; i++) {
            data.push({
                x: k,
                y: Math.sqrt(k)
            });
            k += 0.02;
        }
    }

    window.scatterChartData.datasets[0].data =data;
    window.myScatter.update(500)
			

} 