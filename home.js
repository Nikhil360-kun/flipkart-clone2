const images=[
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/74f0ad81e44e6e6f.jpg?q=80",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/0314c6a3328f8d56.jpeg?q=80",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/1558a721300c7f6d.jpg?q=80",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/5b309e98775e22e4.jpg?q=80",
    "https://rukminim2.flixcart.com/fk-p-flap/1620/270/image/59cc03576ab30951.jpg?q=80"
];

let index=0;

function showimage(){
    document.getElementById("slider").src=images[index]
}
function nextimage(){
    index=(index+1) % images.length;
    showimage();
}
function previmage(){
    index=(index-1+images.length) %images.length;
    showimage();
}
serinterval(nextimage,3000);