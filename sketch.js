var screenW = window.innerWidth;    // Screen Width
var screenH = window.innerHeight;   // Screen Height

var theCanvas, pages;
//html elements
var signup, login, showMenus, homeScreen, sharebook,backButton, accountdiv,backButtonAccount;

function setup() {
  htmlElements();
  theCanvas = createCanvas(screenW,screenH);
  pages = new Pages();
}

function draw() {
  
  if (pages.home){
    pages.displayMain();
  } 
  
  else if (pages.account){
    pages.displayAccount();
  }
  
  else if (pages.submit_book)
    pages.displaySubmitBook();
  
}

function htmlElements(){
  accountdiv = select('#account');
  backButton = select('#backButton');
  backButtonAccount = select('#backButtonac');
  sharebook = select("#share_book");
  homeScreen = select("#perspective1");
  signup = select("#form");
  login = select("#login");
  signup.style('display', 'none');
  accountdiv.style('display', 'none');
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
  
  console.log(pg)

  
  // Set all pages to false
  pages.home = false; pages.request_book = false; 
  pages.account = false; pages.submit_book = false; 
  
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
  
  console.log(pages.account);
}

function Pages(){
  this.home = true;
  this.account = false;
  this.submit_book = false;
  this.request_book = false;
  
  this.signUpwid = signup.width;
  
  this.displayMain = function(){
    
    background(255);
    accountdiv.style('display', 'none');
    sharebook.style('display', 'none');
    homeScreen.style('display', 'inline-block');
    showMenu.position(screenW-100,10);
  }
  
  this.displayHome = function(){
    
  }
  
  this.displayAccount = function(){
    
    homeScreen.style('display', 'none');
    accountdiv.style('display', 'inline-block');
    signup.style('display', 'inline-block');
    signup.position(screenW/2-this.signUpwid/2,150);
    backButtonAccount.position(screenW-100,10);

  }
  
  this.displaySubmitBook = function(){
    
    accountdiv.style('display', 'none');
    homeScreen.style('display', 'none');
    sharebook.style('display', 'inline-block');
    backButton.position(screenW-100,10);
    
    
  }
  

}

// Updates the Screen Size
function windowResized() {
  screenW = window.innerWidth;  
  screenH = window.innerHeight;   
  theCanvas.size(window.innerWidth, window.innerHeight);
}