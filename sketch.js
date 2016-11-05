var screenW = window.innerWidth;    // Screen Width
var screenH = window.innerHeight;   // Screen Height

var theCanvas, pages;
//html elements
var signup, login;

function setup() {
  htmlElements();
  theCanvas = createCanvas(screenW,screenH);
  pages = new Pages();
}

function draw() {
  background(90);
  text('ShareBooks',20,20);
  
  if (pages.home){
    pages.displayHome();
  } 
  
  else if (pages.signup){
    pages.displaySign();
  }
  
}

function htmlElements(){
  
  signup = select("#form");
  signup.style('display', 'none');
  login = select("#login");
  login.style('display', 'none');
}

function updateWidth(elem){
  if (elem == 1)
      pages.signUpwid = 340;
  else if (elem == 2)
      pages.signUpwid = signup.width;
}

function Pages(){
  this.home = false;
  this.signup = true;
  this.login = false;
  this.submit_book = false;
  this.request_book = false;
  this.signUpwid = signup.width;
  
  this.displaySign = function(){
    
    signup.style('display', 'inline-block');
    signup.position(screenW/2-this.signUpwid/2,120);
    
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
  
  this.displayHome = function(){
    
  }
  
  this.templateScreen = function(){
    
    //canvas.position(0,70);
    
    nextButton.style('display', 'none');
    template.style('display', 'inline-block');
    template.position(screenW/2-400, 280);
    
    background("#262228");
    fill(255, 204, 0);
    textSize(50);
    var phrase = "Choose a template";
    text(phrase,screenW/2-textWidth(phrase)/2,90);
    textSize(20);
    var phrase = "Create a resume using one of out templates.";
    text(phrase,screenW/2-textWidth(phrase)/2,130);
  }
  
  this.loginScreen = function(){
    
    //canvas.position(0,70);
    
    template.style('display', 'none');
    firstName.style('display', 'inline-block');
    lastName.style('display', 'inline-block');
    add.style('display', 'inline-block');
    firstName.position(screenW/2-400+155, 230);
    lastName.position(screenW/2-140+155, 230);
    add.position(screenW/2-245, 300);
    
    fname = select('#fname').value();
    lname = select('#lname').value();
    address = select('#address').value();
     
    fullname = fname + " " + lname;
    
    if (fullname != ' '){
      nextButton.style('display', 'inline-block');
      nextButton.position(screenW/2-55, 380);
    }
    
    background("#262228");
    fill(255, 204, 0);
    textSize(50);
    var phrase = "What is your name?";
    text(phrase,screenW/2-textWidth(phrase)/2,90);
    textSize(20);
    var phrase = "Let's start building your resume.";
    text(phrase,screenW/2-textWidth(phrase)/2,130);
  }
}

// Updates the Screen Size
function windowResized() {
  screenW = window.innerWidth;  
  screenH = window.innerHeight;   
  theCanvas.size(window.innerWidth, window.innerHeight);
}