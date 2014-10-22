(function(){

    var scope;

    Polymer('ark-tekt-router', {

        publish:{
            poll:null,
            route:'',
            routes:{
                '':'ark-tekt-dashboard',
                '#/dashboard':'ark-tekt-dashboard',
                '#/properties':'ark-tekt-properties',
                '#/properties/new':'ark-tekt-properties-new',
                '#/paths':'ark-tekt-paths',
                '#/pages':'ark-tekt-pages',
                '#/parts':'ark-tekt-parts',
                '#/pieces':'ark-tekt-pieces',
            }
        },

        // load a page
        loadPage: function(route){

            var el = scope.routes[route];
            var page = document.createElement(el);
            scope.page.innerHTML = null;
            scope.page.appendChild(page);

        },

        checkHash: function(){

            var changed = scope.route !== window.location.hash;

            if(changed){
                var route = window.location.hash;
                scope.loadPage(route);
                scope.route = route;
            }

        },

        // Fires when an instance of the element is created
        created: function() {

            scope = this;
            scope.page = document.getElementsByTagName('ark-tekt-page').item();

        },

        // Fires when the element’s initial set of children and siblings are guaranteed to exist
        domReady: function() {},

        // Fires when the "<polymer-element>" has been fully prepared
        ready: function() {

            scope.loadPage(scope.route);
            scope.poll = setInterval(scope.checkHash, 200);

        },

        // Fires when the element was inserted into the document
        attached: function() {},

        // Fires when the element was removed from the document
        detached: function() {},

        // Fires when an attribute was added, removed, or updated
        attributeChanged: function(attr, oldVal, newVal) {}

    });

})();

