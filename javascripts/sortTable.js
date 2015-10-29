var activeColumn = false;
var currentColumn = false;
var direction;

function sortString(a, b) 
{
	if ( a.innerHTML.toUpperCase() < b.innerHTML.toUpperCase() ) return -1;
	if ( a.innerHTML.toUpperCase() > b.innerHTML.toUpperCase() ) return 1;
	return 0;
}

function sortTable(objId)
{
	var obj = document.getElementById(objId);
	var indexThis = obj.cellIndex;
	
	if(obj.getAttribute('direction') || obj.direction){
		direction = obj.getAttribute('direction');
		if(direction=='ascending'){
			direction = 'descending';
			obj.setAttribute('direction','descending');
			obj.direction = 'descending';
			obj.childNodes[0].innerHTML = '&or;';
			obj.childNodes[0].style.display = 'inline';
		}else{
			direction = 'ascending';
			obj.setAttribute('direction','ascending');
			obj.direction = 'ascending';
			obj.childNodes[0].innerHTML = '&and;';
			obj.childNodes[0].style.display = 'inline';
		}
	}else{
		direction = 'ascending';
		obj.setAttribute('direction','ascending');
		obj.direction = 'ascending';
		obj.childNodes[0].innerHTML = '&and;';
		obj.childNodes[0].style.display = 'inline';
	}

	var tBody = document.getElementsByTagName('TBODY')[0];
	
	if(currentColumn)currentColumn.className='';
	document.getElementById('col' + (indexThis+1)).className='highlightedColumn';
	currentColumn = document.getElementById('col' + (indexThis+1));

	if(activeColumn && activeColumn!=obj){
		if(activeColumn)activeColumn.removeAttribute('direction');
	}

	activeColumn = obj;
	
	var tableHead = document.getElementsByTagName("TH");
	for(var no=0;no<tableHead.length;no++){
		if(no!=indexThis)tableHead[no].childNodes[0].style.display = 'none';
	}
	
	var cellObjArray = new Array();
	for(var no=0;no<tBody.rows.length;no++){
		cellObjArray.push(tBody.rows[no].cells[indexThis]);
	}

	cellObjArray = cellObjArray.sort(sortString);
	
	if(direction=='descending'){
		for(var no=cellObjArray.length-1;no>=0;no--){
			tBody.appendChild(cellObjArray[no].parentNode);
		}
	}else{
		for(var no=0;no<cellObjArray.length;no++){
			tBody.appendChild(cellObjArray[no].parentNode);
		}
	}
}