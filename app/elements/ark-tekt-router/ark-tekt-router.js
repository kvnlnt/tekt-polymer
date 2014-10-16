(function(){

    var scope;

    Polymer('ark-tekt-router', {

        // publish properties
        publish: {
            routes:{},
        },

        // Fires when an instance of the element is created
        created: function() { 

            scope = this;

        },

        addRoute: function(route){

            scope.routes[route.path] = route.page;

        },

        loadRoute: function(route){

            var view = document.getElementsByTagName('ark-tekt-view').item();
            view.innerHTML = scope.routes[route];

        },

        // Fires when the element’s initial set of children and siblings are guaranteed to exist
        domReady: function() {

            // add all routes
            _.each(this.children, scope.addRoute);

            scope.loadRoute('/properties');

            // dump
            console.log(scope.routes);

        },

        // Fires when the "<polymer-element>" has been fully prepared
        ready: function() {},

        // Fires when the element was inserted into the document
        attached: function() {},

        // Fires when the element was removed from the document
        detached: function() {},

        // Fires when an attribute was added, removed, or updated
        attributeChanged: function(attr, oldVal, newVal) {}
    });

})();

