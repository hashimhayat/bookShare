var screenW = window.innerWidth;   
var screenH = window.innerHeight;   

var theCanvas, pages;
//html elements
var signup, login, showMenus, homeScreen, sharebook, requestBook,backButton, accountdiv;
var backButtonAccount, isbnBox,searchButton,ISBN_searched,bookT;
var isbn, book_info, bookSearched,title, backButtonrb, loginPressed, loginButton,signupPressed;

function setup() {
  htmlElements();
  ISBN_searched = false;
  searchedFind = false;
  loginButton = false;
  signupPressed = false;
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
  bookTitle = select('#booktitle');
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
    
    var user = select("#username").value();
    var pass = select("#password").value();
    
    var fname = select("#firstname").value();
    var lname = select("#lastname").value();
    var mail = select("#email").value();
    var passw = select("#passwordSU").value();
    var zipcode = select("#zipcode").value();

    
    if (signupPressed){
      getUsers(fname,lname,mail,passw,zipcode);
      signupPressed = false;
    }
    
    if (loginPressed){
      console.log(pass);
      userLogin(user,pass);
      loginPressed = false;
    }
  }
  
  this.displaySubmitBook = function(){
    
    hideElements();
    sharebook.style('display', 'inline-block');
    searchButton.style('display', 'inline-block');
    backButton.position(screenW-100,10);
    
    isbn = isbnBox.value();
    
    
    if (ISBN_searched){
      getBookFromISBN(isbn);
      ISBN_searched = false;
    }
    
  }
  
  this.displayFindBook = function(){
    hideElements();
    requestBook.style('display', 'inline-block');
    backButtonrb.style('display', 'inline-block');
    backButtonrb.position(screenW-100,10);
    
    bookT = bookTitle.value();
    isbn = isbnBox.value();
    
    if (searchedFind){
      getBookFound(bookT,isbn);
      searchedFind = false;
    }
  }
}

// Accessor Methods

function getUsers(fname,lname,mail,pass,zip){
  var param = {firstname: fname,lastname:lname, email:mail, zipcode:zip, password: pass};
  var path = 'http://148.84.200.116:4567/newUser';
  httpPost(path,param,usersignedup);
}

function userLogin(user,pass){
  var param = { email: user ,password:pass};
  var path = 'http://148.84.200.116:4567/login';
  httpPost(path,param,validateLogin);
}

function getBookatLocation(){
  var param = {location: 12312213};
  var path = 'http://148.84.200.116:4567/getBookAtLocation';
  httpPost(path,param,bookAtLocation);
}

function getBookFromISBN(isbn){
  var path = 'http://148.84.200.116:4567/generalBookInfo/' + isbn;
  httpGet(path,'json',getBookInfo);  
}

function getBookFound(b,is){
  var curr;
  if (is.length == 0){
    curr = b;
  } else {
    curr = is;
  }
  var param = {search:curr};
  var path = 'http://148.84.200.116:4567/searchByTitle';
  httpPost(path,param,foundBook);
}

function foundBook(data){
    document.getElementById("isbnout").value = data.isbn13;
    document.getElementById("title").value = data.title;
    document.getElementById("summary").value = data.summary;
    document.getElementById("author").value = data.author;
    document.getElementById("location").value = '382739827';
}

function getBookInfo(data){
  
    document.getElementById("isbnout").value = data.isbn13;
    document.getElementById("title").value = data.title;
    document.getElementById("summary").value = data.summary;
    document.getElementById("author").value = data.author;
    document.getElementById("location").value = '382739827';
}

function usersignedup(data){
    gotoPage(1);
}

function loginButtonPressed(){
  loginPressed = true;
}

function signUpButtonPressed(){
  signupPressed = true;
}

function bookAtLocation(data){
  console.log(data);
}

function validateLogin(data){
  if (data[0] == 0){
    gotoPage(1);
  } else if (data[0] == 1){
    // Fail
  }

}

function parseJSON(val){
  console.log(val);
}

function searchBook(){
  ISBN_searched = true;
}

function searchBookinDB(){
  searchedFind = true;
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