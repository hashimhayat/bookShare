var screenW = window.innerWidth;    // Screen Width
var screenH = window.innerHeight;   // Screen Height

var theCanvas, pages;
//html elements
var signup, login, showMenus, homeScreen, sharebook, requestBook,backButton, accountdiv, backButtonAccount, isbnBox,searchButton;
var isbn, book_info, bookSearched,title, backButtonrb;

function setup() {
  htmlElements();
  bookSearched = false
  theCanvas = createCanvas(screenW,screenH);
  pages = new Pages();
}

function draw() {
  
  if (pages.home){
    pages.displayHome();
  } 
  
  else if (pages.account){
    pages.displayAccount();
  }
  
  else if (pages.submit_book)
    pages.displaySubmitBook();
  
  else if (pages.request_book)
    pages.displayFindBook();
}

function htmlElements(){
  
  
  requestBook = select('#request_book');
  title = select('#title');
  searchButton = select('#searchButton');
  isbnBox = select('#isbn')
  accountdiv = select('#account');
  backButton = select('#backButton');
  backButtonrb = select('#backButtonrb');
  backButtonAccount = select('#backButtonac');
  sharebook = select("#share_book");
  homeScreen = select("#perspective1");
  signup = select("#form");
  showMenu = select('#showMenu');
  backButtonrb.style('display', 'none');
  searchButton.style('display', 'none');
  accountdiv.style('display', 'none');
 
}

function updateWidth(elem){
  if (elem == 1)
      pages.signUpwid = 340;
  else if (elem == 2)
      pages.signUpwid = signup.width;
}

function gotoPage(pg){
  
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
  
}

function Pages(){
  this.home = true;
  this.account = false;
  this.submit_book = false;
  this.request_book = false;
  
  this.signUpwid = signup.width;
  
  this.displayHome = function(){
    
    hideElements();
    homeScreen.style('display', 'inline-block');
    showMenu.position(screenW-100,10);
  }

  
  this.displayAccount = function(){
    
    hideElements();
    accountdiv.style('display', 'inline-block');
    signup.style('display', 'inline-block');
    signup.position(screenW/2-this.signUpwid/2,120);
    backButtonAccount.position(screenW-100,10);

  }
  
  this.displaySubmitBook = function(){
    
    hideElements();
    sharebook.style('display', 'inline-block');
    searchButton.style('display', 'inline-block');
    backButton.position(screenW-100,10);
    
    isbn = isbnBox.value();
    
    if (bookSearched){
        var url = 'http://jsonplaceholder.typicode.com/posts/1';
        loadJSON(url,parseJSON);
        bookSearched = false;
    }
    
    document.getElementById("isbnout").value = '384789324798324';
    document.getElementById("title").value = 'Harry Potter'
    document.getElementById("summary").value = 'Best Seller!';
    document.getElementById("author").value = 'JK Rowling';
    document.getElementById("location").value = '382739827';
  }
  
  this.displayFindBook = function(){
    hideElements();
    requestBook.style('display', 'inline-block');
    backButtonrb.style('display', 'inline-block');
    backButtonrb.position(screenW-100,10);
    getUsers();
  }
}

function getUsers(){
  var path = 'http://148.84.200.116:4567/getUsers';
  httpGet(path,"json",displayUser)
}

function displayUser(data){
  console.log(data);
}

function parseJSON(val){
  console.log(val);
}

setTimeout(parseJSON, 5000);

function searchBook(){
  bookSearched = true;
}

function submitBook(){
  
}

function hideElements(){
  
  requestBook.style('display', 'none');
  accountdiv.style('display', 'none');
  homeScreen.style('display', 'none');
  accountdiv.style('display', 'none');
  sharebook.style('display', 'none');
}

// Updates the Screen Size
function windowResized() {
  screenW = window.innerWidth;  
  screenH = window.innerHeight;   
  theCanvas.size(window.innerWidth, window.innerHeight);
}