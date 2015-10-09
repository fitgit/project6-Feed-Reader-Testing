/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /*  Test suite -RSS Feeds
    *   Pre-condtion: expexts allFeeds to be defined and has atleast one object(url,name)
    *
    *   Test case -url not defined 
    *   Goes thro each feed and checks if url is defined.
    *
    *   Test case -url not empty 
    *   Goes thro each feed and checks if url is not empty.
    *
    *   Test case -name not defined 
    *   Goes thro each feed and checks if name is defined.
    *
    *   Test case -name not empty 
    *   Goes thro each feed and checks if name is not empty.
    */
    describe('RSS Feeds', function() {
        
         beforeEach(function(){
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            this.clickedOnce=false;
         });

         it(':URL not undefined',function(){
            allFeeds.forEach(function(feed){
                expect(feed.url).toBeDefined();
            });
         });

         it(':URL not empty',function(){
            allFeeds.forEach(function(feed){
                expect(feed.url.length).not.toBe(0);
            });
         });
       
         it(':Name not undefined',function(){
            allFeeds.forEach(function(feed){
                expect(feed.name).toBeDefined();
            });
         });

         it(':Name not empty',function(){
            allFeeds.forEach(function(feed){
                expect(feed.name.length).not.toBe(0);
            });
         });

    });

    /*  Test suite -The Menu
    *   Pre-condtion: 
    *   Test case -Default behaviour hide menu
    *   checks if body has the "menu-hidden" class, if it does then Menu is not showing
    *
    *   Test case -:HamburgerIcon clicked,Display Menu
    *   simulate a click on menu-icon-click and checks for menu-hidden class. Since not found
    *   menu is not hidden.
    *
    *   Test case -HamburgerIcon clicked again, Hide  menu
    *   Simulates 2 clicks. First for displaying the menu, second for toggling the display.
    *   Checks for the menu-hidden class.
    *   
    */
    describe('The Menu', function() {

        it(':Default behaviour ,hide menu',function(){
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        it(':HamburgerIcon clicked, Display Menu',function(){
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
            //reset the click , with another click, so the clicked state does not flow to the next it()
            $('.menu-icon-link').trigger('click');
        });

        it(':HamburgerIcon clicked again, Hide  menu',function(){
            //first click - which would show the Menu - the case above
            $('.menu-icon-link').trigger('click');

            //second click - which would toggle to hide
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });

    /*  Test suite -Initial Entries
    *   Pre-condtion: async function loadFeed needs to be done executing, before calling the tests.
    *   Test case -Feed entry length should be altleast 1
    *   ehecks for the length of the feed entry to be greater than 0.
    */
    describe('Initial Entries', function() {
        beforeEach(function(done){
            loadFeed(0,done);
        });

        it(':Feed entry length should be altleast 1',function(done){
            expect($('.feed .entry').length).toBeGreaterThan(0);
            done();
        });

    });

    /*  Test suite -New feed selection
    *   Pre-condtion: get the initial loadFeed(0) values, execute loadFeed(1)
    *   Test case -Entries change on new Feed
    *   compares feedLoad(0) to feedLoad(1)  by comparing tehe h2 values in both feeds.
    *   If there is a change, the test should pass.
    */
    describe('New feed selection', function() {
        beforeEach(function(done){
            //on a page load, loadFeed(0) is executed , lets get its values;
            entries=$('.feed .entry h2').text();
            feedTitle=$('.header-title').text();
            //console.log("entries= " +entries +"titles=" + feedTitle);
            //execute the new feed.
            loadFeed(1,done);
        });
        afterEach(function(done){
            loadFeed(0,done);
        });

        it(':Entries change on new Feed',function(done){
            expect($('.feed .entry h2').text()).not.toBe(entries);
            done();   
        });

    });
    
}());
