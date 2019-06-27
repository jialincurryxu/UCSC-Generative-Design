window.onload = function() {
	let isGreeting = false;

// Find in the DOM the slug img using the "slug-img" id
let imageElem  = document.getElementById("the_img");

// Call this function when user click on the image
imageElem.onclick = function() {
    //isGreeting = !isGreeting;
    let heyP = document.getElementById("greeting");
    //if(isGreeting) {
    if(1){
    	let num = (Math.ceil(Math.random() * 6));
    	let word = "";
    	if(num<4){
    		word="Unlucky, ";
    	}else{
    		word="Lucky, ";
    	}
        heyP.innerHTML = word + num;
    
    } else {
        //heyP.innerHTML = ""
    
}

}
}