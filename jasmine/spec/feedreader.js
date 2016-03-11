/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {
    /* This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('should be defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it('should have a defined URL, which is not empty', function () {

            allFeeds.forEach(function (feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBe('');
            });
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */

        it('should have a defined name, which is not empty', function () {

            allFeeds.forEach(function (feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBe('');
            });
        });
    });

    /* Test suite designed to test "The menu" */
    describe('The menu', function () {

        /* This test checks if menu is hidden by default, determining if body has class 'menu-hidden' */
        it('should be hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* The menu becomes visible when the icon is clicked */
        it('should appear when the menu icon is clicked', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);
        });

        /* The menu hides again when the menu icon is clicked again */
        it('should disappear when the menu icon is clicked again', function () {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);

        });
    });

    /* Test suite designed to test "Initial Entries" */
    describe('Initial Entries', function () {

        /* Test that ensures when the loadFeed function is called and completes its work..  */
        beforeEach(function (done) {
            loadFeed(0, done);
        });

        /* ..there is at least a single .entry element within the .feed container. */
        it('should have at least 1 entry when loaded', function (done) {
            expect($('.entry')[0]).toBeDefined();
            done();
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function () {
        /*  Before loading the new feed, the previous feed data is stored in oldFeed variable */
        var oldFeed;

        /*  This test ensures that when the new feed is loaded... */
        beforeEach(function (done) {
            loadFeed(0, function(){
                oldFeed = $('.feed').html();
                loadFeed(1, done);
            });
        });

        /* ...the content actually changes. */
        it('should change the content of the feed, when the new feed is loaded', function (done) {
            expect(oldFeed).not.toEqual($('.feed').html());
            done();
        });

    });

}());
