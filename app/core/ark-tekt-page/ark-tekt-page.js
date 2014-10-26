(function(){

    var scope;

    Polymer('ark-tekt-page', {

        publish:{},

        // Fires when an instance of the element is created
        created: function() {

            scope = this;
            ARK.page = this;

        },

        load: function(page, params){

            console.log('load', page, params);

            // params default
            var params = params || {};

            // create page object
            var page = document.createElement(page);

            // attach params
            _.each(params, function(v, k){ page[k] = v; });

            // clear the page
            scope.innerHTML = null;

            // load the page
            scope.appendChild(page);


        },

        // Fires when the element’s initial set of children and siblings are guaranteed to exist
        domReady: function() {},

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

