/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

/******************************************
 * Global Variables
 ******************************************/

const studentListItems = document.querySelectorAll('.student-item');
let listOfMatchingStudents = [];
const numberOfItems = 10;
const searchButton = document.querySelector('button');

/******************************************
 * Function Declarations   
 ******************************************/

// Function that hides all the students that are not on the selected page and displays the students for the selected page.

const showPage = (list, page) => {
   for (let i = 0; i < studentListItems.length; i++) {
      studentListItems[i].style.display = 'none';
   }
   for (let i = 0; i < list.length; i++) {
      if (i >= (page * numberOfItems) - numberOfItems && i < (page * numberOfItems)) {
         list[i].style.display = 'block';
      } else {
         list[i].style.display = 'none';
      }
   }
}

// function that creates the div with the pagination elements, including click listeners for each page button

const appendPageLinks = (list) => {
   const paginationDiv = document.createElement('div');
   const ul = document.createElement('ul');
   const ulAppended = paginationDiv.appendChild(ul);
   const numberOfPages = Math.ceil(list.length / numberOfItems);
   const pageDiv = document.querySelector('.page');
   paginationDiv.classList.add('pagination');
   for (let i = 1; i <= numberOfPages; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.setAttribute('href', '#');
      ulAppended.appendChild(li).appendChild(a);
      a.innerHTML = i;
      if (i === 1) {
         a.classList.add('active');
      }
   }
   pageDiv.appendChild(paginationDiv);
   const pageLinks = document.querySelectorAll('a');
   for (i = 0; i < pageLinks.length; i++) {
      pageLinks[i].addEventListener('click', (e) => {
         for (i = 0; i < pageLinks.length; i++) {
            pageLinks[i].classList.remove('active');
         }
         e.target.classList.add('active');
         let currentPage = e.target.innerHTML;
         if (document.querySelector('input').value.length)
         {
            showPage(listOfMatchingStudents, currentPage);
         } else {
            showPage(studentListItems, currentPage);
         }
      })
   }
}

// Function to add search component to the page

const addSearch = ()=> {
   const searchDiv = document.createElement('div');
   const input = document.createElement('input');
   const button = document.createElement('button');
   const pageHeader = document.querySelector('.page-header')
   searchDiv.classList.add('student-search');
   button.innerHTML = "Search";
   input.setAttribute('placeholder', 'Search for students...');
   searchDiv.appendChild(input);
   searchDiv.appendChild(button);
   pageHeader.appendChild(searchDiv);
   button.addEventListener('click', (event)=> {
      event.preventDefault();
      searchFunction(input);
   });
   input.addEventListener('keyup', ()=> {
      searchFunction(input);
   })
}

// Function that performs the search

const searchFunction = (searchInput) => {
   const pageLinks = document.querySelector('.pagination');
   listOfMatchingStudents = [];
   for (let i = 0; i < studentListItems.length; i++) {
      if (searchInput.value.length === 0) {
         showPage(studentListItems, 1);
         pageLinks.remove();
         appendPageLinks(studentListItems);
         return;
      }
      if (studentListItems[i].querySelector('h3').textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
         listOfMatchingStudents.push(studentListItems[i]);
      } 
   }
   console.log(listOfMatchingStudents);
   if (listOfMatchingStudents.length && document.querySelector('.no-matches')) {
      document.querySelector('.page').removeChild(document.querySelector('.no-matches'));
   }

   if (!listOfMatchingStudents.length && !document.querySelector('.no-matches')) {
      const noMatchesMessage = document.createElement('div');
      noMatchesMessage.classList.add('no-matches')
      noMatchesMessage.innerHTML = '<p>No results match your search.</p>';
      document.querySelector('.page').appendChild(noMatchesMessage);
   }
   pageLinks.remove();
   showPage(listOfMatchingStudents, 1);
   appendPageLinks(listOfMatchingStudents);
}

/**
 * Call functions for the first time
 */

showPage(studentListItems, 1);
appendPageLinks(studentListItems);
addSearch();
