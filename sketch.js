var screenW = window.innerWidth;    // Screen Width
var screenH = window.innerHeight;   // Screen Height

var theCanvas, pages;
//html elements
var signup, login, showMenus, homeScreen;

function setup() {
  htmlElements();
  theCanvas = createCanvas(screenW,screenH);
  pages = new Pages();
}

function draw() {
  background(90);
  text('ShareBooks',20,20);
  
  if (pages.home){
    pages.displayMain();
  } 
  
  else if (pages.account){
    pages.displayAccount();
  }
  
}

function htmlElements(){
  homeScreen = select("#perspective1");
  signup = select("#form");
  signup.style('display', 'none');
  login = select("#login");
  login.style('display', 'none');
  showMenu = select('#showMenu');
}

function updateWidth(elem){
  if (elem == 1)
      pages.signUpwid = 340;
  else if (elem == 2)
      pages.signUpwid = signup.width;
}

function gotoPage(pg){
  
  // Set all pages to false
  pages.home = false; pages.signup = false; pages.request_book = false; 
  pages.login = false; pages.submit_book = false; 
  
  // Set the page to display to true
  if (pg == 1)
    pages.home = true;
  else if (pg == 2)
    pages.signup = true;
  else if (pg == 3)
    pages.account = true;
  else if (pg == 4)
    pages.request_book = true;
  else if (pg == 5)
    pages.submit_book = true;
}

function Pages(){
  this.home = true;
  this.account = false;
  this.submit_book = false;
  this.request_book = false;
  
  this.signUpwid = signup.width;
  
  this.displayMain = function(){
    
    signup.style('display', 'inline-block');
    showMenu.position(screenW-100,10);
    
  }
  
  this.displayHome = function(){
    
    homeScreen.style('display', 'none');
    
    background("#262228");
    fill("#FFCE00");
    textSize(50);
    textFont("Helvetica");
    var phrase = "BookShare";
    text(phrase,screenW/2-textWidth(phrase)/2,90);
    fill("white");
    textSize(20);
    var phrase = "Something should go here";
    text(phrase,screenW/2-textWidth(phrase)/2,130);
  }
  
  this.displayAccount = function(){
    
    background(240);
    
    textSize(50);
    textFont("Helvetica");
    var phrase = "Account Settings";
    text(phrase,screenW/2-textWidth(phrase)/2,90);
    
    // homeScreen.style('display', 'none');
    signup.style('display', 'inline-block');
    signup.position(screenW-100,10);
    
  }
  

}

// Updates the Screen Size
function windowResized() {
  screenW = window.innerWidth;  
  screenH = window.innerHeight;   
  theCanvas.size(window.innerWidth, window.innerHeight);
}