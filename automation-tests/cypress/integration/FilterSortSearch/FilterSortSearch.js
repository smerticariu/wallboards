import { Before, Given, When, And, Then } from "cypress-cucumber-preprocessor/steps";
import Search_PO from "../../support/PageObjects/Search_PO";
import CreateGroup_PO from "../../support/PageObjects/CreateGroup_PO";


const search = new Search_PO();
const group = new CreateGroup_PO();
var text = '', text_lower, creation_date, title= '', test_text = 'Most viewed', date = '', autor = ''
var unsorted = [];
var sorted = []
var sorted_by_web = [];
var items = 0


beforeEach(() => {
    cy.login()
})

//  Scenario: Performing a search by wallboard name displays the results matching search criteria

Given('the landing page is displayed', () => {
    search.visitLandingPage();
    
})

When('the user fills in the desired search criteria in the search field', () => {
    cy.get('tr> td.c-landing-table__wb-name > p > a').first().then(($mytext) => {
        text = $mytext.text()
        search.searchbar().type(text)
        search.span().contains(text).click()
    })
})

Then('the results matching the search criteria are displayed', () => {
    search.firstcolumntext().each(($element) =>{
        $element = $element.text().toLowerCase()
        text = text.toLowerCase()
        expect($element).to.include(text, {matchCase: false})
    })

})


//    Scenario: Performing a search by person name displays the results matching search criteria

Given('the landing page is displayed', () => {
    search.visitLandingPage();
    
})

When('the user fills in the desired person name search criteria in the search field', () => {
    search.firstcolumnname().first().then(($mytext) => {
        text = $mytext.text()
        search.searchbar().type(text)
        search.span().contains(text).click()
    })
})

Then('the results matching the person name are displayed', () => {
    search.firstcolumnname().contains(text);

})

//   Scenario: The components start filtering from the very first letter that the user inputs

Given('the landing page is displayed', () => {
    search.visitLandingPage();
    
})

When('the user fills in the first character of the search keyword', () => {
    search.firstcolumntext().first().then(($mytext) => {
        text = $mytext.text()[0]
        search.searchbar().type(text)
    })
})

Then('the results matching the first character of the searched keyword', () => {
    search.allRows().each(($element) => {
        $element = $element.text().toLowerCase()
        text = text.toLowerCase()
        expect($element).to.include(text, {matchCase: false})
    })
})



//Scenario: The user is informed when there are no wallboards found for the search criteria

Given('the landing page is displayed', () => {
    search.visitLandingPage();
})

When('the user fills in a given search criteria', () => {
    search.searchbar().type('$#@DSA!')
})

Then('the user is informed that no wallboards are found', () => {
    search.AlertSearch().contains('No data')
})

//Scenario: The user is informed there are no wallboards found when searching by creation date


Given('the landing page is displayed', () => {
    search.visitLandingPage();
})

When('the user fills an existing creation date in the search field', () => {
    search.CreationDate().first().then(($date) => {
        text = $date.text()
        search.searchbar().type(text)
    })
})

Then('the user is informed that no wallboards are found', () => {
    search.AlertSearch().contains('No data')
})

// Scenario: Default filter on the landing page is most recently viewed wallboards [NEW]
Given('the wallboards table landing page is displayed', () => {
    search.visitLandingPage();
})

And('the user selects to view the 5th wallboard', () => {
    cy.get('tr:nth-child(5) > td.c-landing-table__wb-name > p > a').then(($wallboard_title)=>{
        title = $wallboard_title.text()
    }).invoke('removeAttr', 'target').click({force:true})
    search.wallboardTitle().then(($Title)=>{
        expect($Title.text()).to.include(title)
        })
})

When('the user navigates to the landing page', () => {
    search.logo().click();
})

Then('the recently viewed wallboard is displayed in the first row', () => {
    cy.intercept('GET')
    cy.wait(2000)
    search.visitLandingPage()
    search.firstcolumntext().first().then(($first_wallboard_title)=>{
        expect($first_wallboard_title.text()).to.include(title)
    })
})

// Scenario: Most recently viewed wallboard is displayed first when recently edited [NEW]

Given('the landing page wallboards table is displayed', () => {
    search.visitLandingPage();
})

And('the user edits the 5th wallboard', () => {
    cy.get('tr:nth-child(5) > td.c-landing-table__wb-actions > a').invoke('removeAttr', 'target').click({force:true})
    search.title_input(test_text)
})

And('the user saves the changes', () => {
    search.saveButton().click();
    search.saveButtonAlert().click();
    cy.intercept('PUT')
    cy.wait(2000)
})

When('the user navigates to the landing page', () => {
    search.logo().click();
})

Then('the wallboard recently edited is displayed as first', () => {
    search.firstcolumntext().first().then(($first_wallboard_title)=>{
        expect($first_wallboard_title.text()).to.include(test_text)
    })
})


// Scenario: The wallboards can be sorted by wallboard name
Given('the landing page is displayed', () => {
    search.visitLandingPage();
})

When('the user sorts the wallboards by name', () => {
    var i = 0;
    search.firstcolumntext().each(($title) =>{
        title = $title.text()
        unsorted.push(title.toLowerCase())
        i+=1
    })
    search.nameColumn().click({force:true});
})

Then('the wallboards are displayed in alphabetical order by name', () => {
    sorted = unsorted.sort()
    var i = 0;
    search.firstcolumntext().each(($title)=>{

        expect($title.text().toLowerCase()).to.include(sorted[i])
        i+=1
    })
})


// Scenario: The wallboards can be sorted by creation date
Given('the landing page is displayed', () => {
    search.visitLandingPage();
})

When('the user sorts the wallboards by creation date', () => {
    var i = 0;
    unsorted = []
    search.firstcolumncreatedon().each(($date) =>{
        date = $date.text()
        unsorted.push(date.toLowerCase())
        i+=1
    })
    search.createdOnColumn().click({force:true});
})

Then('the wallboards are displayed in chronological order by creation date', () => {
    sorted = unsorted.sort()
    var i = 0;
    search.firstcolumncreatedon().each(($date)=>{
        expect($date.text().toLowerCase()).to.include(sorted[i])
        i+=1
    })
})


// Scenario: The wallboards can be sorted by the user name

Given('the landing page is displayed', () => {
    search.visitLandingPage();
})

When('the user sorts the wallboards by the user who created the wallboard', () => {
    var i = 0;
    unsorted = []
    search.firstcolumncreatedby().each(($autor) =>{
        autor = $autor.text()
        unsorted.push(autor.toLowerCase())
        i+=1
    })
    search.createdByColumn().click({force:true});
})

Then('the wallboards are displayed alphabetically by the user name', () => {
    sorted = unsorted.sort()
    var i = 0;
    search.firstcolumncreatedby().each(($autor)=>{
        expect($autor.text().toLowerCase()).to.include(sorted[i])
        i+=1
    })
})

// Scenario: Performing a search by group name displays the results matching search criteria
Given ('the landing page is displayed', () => {
    group.visitLandingPage();
    group.pageTitle().should('contain', 'Recent Wallboards');
})
And ('the user navigates to view all wallboard groups', () => {
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
})
When ('the user types in the desired search criteria in the search field', () => {
    search.firstcolumntext().first().then(($el) => {
        text = $el.text().slice(0, 5)
        cy.wrap(text);
        search.searchbar().type(text);
    })
})
Then ('the results matching the search criteria are displayed', () => {
    search.firstcolumntext().each(($el) => {
        cy.wrap($el).should('contain', text);
    })
})

// Scenario: Performing a search by author name displays the results matching search criteria
Given ('that the landing page is displayed', () => {
    group.visitLandingPage();
    group.pageTitle().should('contain', 'Recent Wallboards');
})
And ('the user navigates to view all groups', () => {
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
})
When ('the user fills in the desired author name in the search field', () => {
    search.firstcolumncreatedby().first().then(($el) => {
        text = $el.text().slice(0, 4)
        cy.wrap(text);
        search.searchbar().type(text);
    })
})
Then ('the results matching the author name are displayed', () => {
    search.firstcolumncreatedby().each(($el) => {
        cy.wrap($el).should('contain', text);
    })
})

// Scenario: The user is informed there are no groups found when searching by creation date
Given ('the landing page is displayed', () => {
    group.visitLandingPage();
    group.pageTitle().should('contain', 'Recent Wallboards');
})
And ('the user navigates to view all groups', () => {
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
})
When ('the user types an existing creation date in the search field', () => {
    search.firstcolumncreatedon().first().then(($el) => {
        text = $el.text();
        cy.wrap(text);
        search.searchbar().type(text);
    })
})
Then ('the user is informed that no wallboard groups are found', () => {
    search.AlertSearch().should('contain', 'No data')
})

// Scenario: The wallboard groups can be sorted by group name
Given ('the landing page is displayed', () => {
    group.visitLandingPage();
    group.pageTitle().should('contain', 'Recent Wallboards');
})
And ('the user navigates to view all groups', () => {
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
})
When ('the user sorts the groups by name', () => {
    var i = 0;
    unsorted = []
    search.firstcolumntext().each(($title) =>{
        title = $title.text();
        unsorted.push(title.toLowerCase())
        i+=1
    })
    search.nameColumn().click({force:true});
})
Then ('the groups are displayed in alphabetical order by name', () => {
    sorted = unsorted.sort()
    var i = 0;
    search.firstcolumntext().each(($title)=>{

        expect($title.text().toLowerCase()).to.include(sorted[i])
        i+=1
    })
})

// Scenario: The wallboard groups can be sorted by creation date
Given ('the landing page is displayed', () => {
    group.visitLandingPage();
    group.pageTitle().should('contain', 'Recent Wallboards');
})
And ('the user navigates to view all groups', () => {
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
})
When ('the user sorts the groups by creation date', () => {
    var i = 0;
    unsorted = []
    search.firstcolumncreatedon().each(($date) =>{
        date = $date.text()
        unsorted.push(date.toLowerCase())
        i+=1
    })
    search.createdOnColumn().click({force:true});
})
Then ('the groups are displayed in chronological order by creation date', () => {
    sorted = unsorted.sort()
    var i = 0;
    search.firstcolumncreatedon().each(($date)=>{
        expect($date.text().toLowerCase()).to.include(sorted[i])
        i+=1
    })
})

// Scenario: The wallboard groups can be sorted by the author name
Given ('the landing page is displayed', () => {
    group.visitLandingPage();
    group.pageTitle().should('contain', 'Recent Wallboards');
})
And ('the user navigates to view all groups', () => {
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
})
When ('the user sorts the groups by author name', () => {
    var i = 0;
    unsorted = []
    search.firstcolumncreatedby().each(($autor) =>{
        autor = $autor.text()
        unsorted.push(autor.toLowerCase())
        i+=1
    })
    search.createdByColumn().click({force:true});
})
Then ('the groups are displayed alphabetically by the author name', () => {
    sorted = unsorted.sort()
    var i = 0;
    search.firstcolumncreatedby().each(($autor)=>{
        expect($autor.text().toLowerCase()).to.include(sorted[i])
        i+=1
    })
})

// Scenario: Most recently viewed group is displayed first when recently opened
Given ('all groups landing page is displayed', () => {
    group.visitLandingPage();
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
})
And ('the user opens to view the 3rd group', () => {
    search.thirdGroup().then(($el) => {
        title = $el.text();
    })
    search.thirdGroup().invoke('removeAttr', 'target').click();
    cy.wait(2000);
})
When ('the user navigates to the groups landing page', () => {
    search.logo().click();
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    
})
Then ('the group recently opened is displayed as first', () => {
    search.firstcolumntext().first().should('contain', title);
})

// Scenario: Most recently viewed group is displayed first when recently edited
Given ('the groups landing page is displayed', () => {
    group.visitLandingPage();
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
    group.pageTitle().should('contain', 'Recent Groups');
})
And ('the user edits the 3rd group', () => {
    search.thirdGroup().then(($el) => {
        title = $el.text();
    })

    search.editThird().invoke('removeAttr', 'target').click();

    group.stepItems().then(($el) => {
        items = $el.length;
        cy.log(items)
        if(items == 10) {
            group.newGroupTitle().type(' edited');
        }
        else {
            group.newStep().click();
            group.newEmptyStep().first().click();
            group.wallboardNameModal().first().click();
            group.modalButton().contains('Select').click();
        }
    })
})
And ('the user saves the group changes', () => {
    group.groupButton().contains('Save').click();
    group.confirmationButton().contains('Save').click();
    cy.wait(1000);
})
When ('the user navigates to the groups landing page', () => {
    search.logo().click();
    group.sideMenu();
    group.allGroupsFilter().click();
    group.closeMenu();
})
Then ('the group recently edited is displayed first', () => {
    if(items == '10') {
        search.firstcolumntext().first().should('contain', title + ' edited');
    }
    else{
        search.firstcolumntext().first().should('contain', title);
    }
})