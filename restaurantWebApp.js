
		var Rs=[0, 0, 0];
		var itemNo=[0, 0, 0];
		var itemDataTable=[];
		var counts={};
		var dta;
		var data;
		//createTable();
		function createTable(){
			var nTable="";
			var i;
			for(i=0; i<3;i++){

				 nTable+='<li> <a id='+ (i+1) +' href=# ondrop=drop(event) ondragover=allowDrop(event)  onclick=tableContent(event)> Table '+(i+1)+' <br> Rs:-'+ Rs[i] +' Item:- '+ itemNo[i] +'</a></li></br>';

			}
		    document.getElementById('myULT').innerHTML=nTable;
		}
		
		function allowDrop(ev) {
    		ev.preventDefault();
		}

		function drag(ev) {
		
    		ev.dataTransfer.setData('Text/HTML', ev.target.innerHTML);
		}

		function drop(ev) {
    		ev.preventDefault();
    		 text = ev.dataTransfer.getData("Text/HTML");
    		// console.log(text);
    	        var tb= ev.target.id;
	        tb=parseInt(tb);
    		
    		text=text.split("<br>");
    		text[0]=text[0].substr(1);
    		Rs[tb-1]=parseInt(text[1])+ Rs[tb-1];
    		itemNo[tb-1]=itemNo[tb-1]+1;
    		if (typeof(itemDataTable[tb-1]) == "undefined"){
    			itemDataTable[tb-1]=text[0]+ ";";
    		}else{
    			itemDataTable[tb-1]+= text[0] + ";";
    		}
    		createTable();
    		
		}
		
		function tableContent(evnt){
		   	dta= evnt.target.id;
        	var valu=document.getElementById(evnt.target.id);
        	var modal=document.getElementById('myModal');

        	modal.style.display = "block";
        	var ntitle=document.getElementById('headerN');
        	ntitle.innerHTML= "Table "+ valu.name + "|" + "Order Detail";
        	
        	var spanClose = document.getElementsByClassName("closeN")[0];
            var it;
            var p;
           
        	spanClose.onclick = function() { 
         		    ntitle.innerHTML= "Table "+ valu.name + "|" + "Order Detail";
      				document.getElementById('table-detail').innerHTML="<tr><th>S.No.</th><th>Item</th><th>Price</th><th>Item Count</th><th>Delete</th></tr>";
      				document.getElementsByClassName('bill-payment')[0].innerHTML='CLOSE the session!!!';
      				modal.style.display = "none";
        	}

        	if (typeof(itemDataTable[(parseInt(dta))-1]) == "undefined"){
					
					document.getElementById('table-detail').innerHTML="<tr><th>S.No.</th><th>Item</th><th>Price</th><th>Item Count</th><th>Delete</th></tr>";
				
			}else{
        		it=itemDataTable[(parseInt(dta))-1].split(";");
				var i,j;
				var counts1 = {};
				it.forEach(function(x) { counts1[x] = (counts1[x] || 0)+1; });
				counts=counts1;
      			createDetailTable(dta);
      		}
      		var generatedBill = document.getElementsByClassName('bill-payment')[0];
      		generatedBill.onclick=function(){
      			if(generatedBill.innerHTML=='Pay'){
      				ntitle.innerHTML= "Table "+ valu.name + "|" + "Order Detail";
      				document.getElementById('table-detail').innerHTML="<tr><th>S.No.</th><th>Item</th><th>Price</th><th>Item Count</th><th>Delete</th></tr>";
      				document.getElementsByClassName('bill-payment')[0].innerHTML='CLOSE the session!!!';
      				modal.style.display = "none";
      			}else if(Rs[parseInt(dta)-1]===0){
      					document.getElementById('headerN').innerHTML="<u>Bill generated</u>";
  						document.getElementById('table-detail').innerHTML='<center><p> Table is empty, please add items</p><center>';
  		 				document.getElementsByClassName('bill-payment')[0].innerHTML='Pay';
  		 				document.getElementById('total').innerHTML='';
  		 				itemDataTable[parseInt(dta)-1]='';
  		 				//modal.style.display = "none";
  				}else{
  					document.getElementById('headerN').innerHTML="<u>Bill generated</u>";
  						document.getElementById('table-detail').innerHTML='<center><p> Please pay Rs=  '+  Rs[parseInt(dta)-1] +', Thank you!</p><center>';
  		 				document.getElementsByClassName('bill-payment')[0].innerHTML='Pay';
  		 				document.getElementById('total').innerHTML='';
  						//alert("bill generated,  );
  						//modal.style.display = "none";
  						itemDataTable[parseInt(dta)-1]='';
  						itemNo[parseInt(dta)-1]=0;
     					Rs[parseInt(dta)-1]=0;
     					createTable();
  				}		      
      		}
      
        }
        //table content shown after click on table
		function createDetailTable(){			
			itemNo[parseInt(dta)-1]=0;
		    Rs[parseInt(dta)-1]=0;
			var detail=document.getElementById('table-detail');
			var tablefull ="<tr><th>S.No.</th><th>Item</th><th>Price</th><th>Item Count</th><th>Delete</th></tr>";
						for( i=0;i<Object.keys(counts).length;i++){
							
							for (j =0; j<itemData.length ; j++) {								

								if(Object.keys(counts)[i]==itemData[j].name){								
									itemNo[parseInt(dta)-1] =Object.values(counts)[i] + itemNo[parseInt(dta)-1];
									Rs[parseInt(dta)-1]=(itemData[j].cost)*(Object.values(counts)[i]) +Rs[parseInt(dta)-1] ;
									tablefull+="<tr><th><div id=s"+i+">" + (i+1) + "</div></th><th><div id=item"+i+">" + Object.keys(counts)[i] + "</div></th><th><div id=c"+i+">" + ((Object.values(counts)[i])*itemData[j].cost) +"</div></th><th><input type=number id="+ i +" min=1 value="+  Object.values(counts)[i]  + " onChange=valueChange(event)></input></th><th> <button class=delete id="+i+" onclick=deleteItem(event)>Delete </th></tr></button>";
									break;
								}
								
							}

						}

						detail.innerHTML=tablefull;
						document.getElementById('total').innerHTML= 'Total Amount: Rs '+ Rs[parseInt(dta)-1];
						
		}
		//update itemDataTable
		function updateItemDataTable(idchange){			
			var i=0;
			var j=0;
			var p;
			for ( i = 0; i<Object.keys(counts).length; i++) {
				p=Object.values(counts)[i];
				for (j = 0; j<p; j++) {
					if(i==0&&j==0){
						itemDataTable[idchange]=Object.keys(counts)[i]+";";
					}else{
						itemDataTable[idchange] +=Object.keys(counts)[i]+";";
					}				}
			}
		}
		//delete item on the click
		function deleteItem(ev){
			var del=Object.keys(counts)[parseInt(ev.target.id)];
			delete counts[del];
			updateItemDataTable((parseInt(dta)-1));
			createDetailTable();
			createTable();
		}
		function valueChange(evn){
				var takeid= parseInt(evn.target.id);
				var kn=Object.keys(counts)[takeid];
				counts[kn]=parseInt(evn.target.value);
				updateItemDataTable((parseInt(dta)-1));
				createDetailTable(dta);
				createTable();

		} 
		function searchDataTable(){
				var ul="";
				var input, filter, li, i;
				input=document.getElementById('listTable');
				filter=input.value.toUpperCase();
				ul=document.getElementById('myULT');
				li = ul.getElementsByTagName("li");
				for (i = 0; i < li.length; i++) {
		         	a = li[i].getElementsByTagName("a")[0];
		        if ((a.innerHTML.toUpperCase().indexOf(filter) > -1 )) {
		            li[i].style.display = "";
		        } else {
		            li[i].style.display = "none";

		        }
		    }
		}
	function searchData(){
		var ul="";
		var input, filter, li, i;
		input=document.getElementById('menuList');
		filter=input.value.toUpperCase();
		ul=document.getElementById('myUL');
		li = ul.getElementsByTagName("li");
		
		for (i = 0; i < li.length; i++) {
         	a = li[i].getElementsByTagName("a")[0];
        if ((a.innerHTML.toUpperCase().indexOf(filter) > -1 )||(itemData[i].type.toUpperCase().indexOf(filter) > -1)) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";

        }
    }

	}
