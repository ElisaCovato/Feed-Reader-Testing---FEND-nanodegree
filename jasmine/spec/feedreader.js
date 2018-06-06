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

    /* This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* This test ensures that each feed
         * in the allFeeds object  has a URL defined
         * and that the URL is not empty.
         */
        it('have URLs', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

        /* This test ensures that each feed
         * in the allFeeds object  has a name defined
         * and that the name is not empty.
         */
        it('have names', function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });

    });

    /*This suit is about the menu Icon  in the page*/
    describe('The menu', function() {
        // We define here two variable: the document body and the menuIcon.
        // This will be helpfull for the hide/show testing of the menu
        var body = document.body;
        var menuIcon = document.querySelector(".menu-icon-link");

        /* This test  ensures that the menu element is
         * hidden by default. We check that the body has
         * the class  'menu-hidden'.
         */
        it('menu element is hidden by default', function() {
            expect(body.className).toContain("menu-hidden");
        });

         /* This test ensures that the menu changes
          * visibility when the menu icon is clicked. The
          * menu is displayed when
          * clicked and it hides  when clicked again.
          */
        it('menu changes visibility when clicked', function() {
            menuIcon.click();
            expect(body.className).not.toContain("menu-hidden");

            menuIcon.click();
            expect(body.className).toContain("menu-hidden");
        });

    });



    /*This suit is to ensure that the are entries in the feed container*/
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });


        /* This test ensures that when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         */
        it('at least a singele entry element in the feed container', function(done) {
            var numberOfEntries = document.querySelector(".feed").getElementsByClassName("entry").length;
            expect(numberOfEntries).toBeGreaterThan(0);
            done();
        });
    });


    /*This suit is to ansure that the content changes when new feeds are loaded*/
    describe('New Feed Selection', function() {

        var initialFeedSelection;
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialFeed = document.querySelector(".feed").innerHTML;
                loadFeed(1,function() {
                    done();
                });
            });
        });

         /* This test ensures that when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         */
        it('content changes when new feed is loaded', function() {
            var newFeed = document.querySelector(".feed").innerHTML;
            expect(initialFeed).not.toBe(newFeed);
            done();
        });
    });


}());
