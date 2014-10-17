(function(){

    var scope;

    Polymer('ark-tekt-view', {

        // publish properties
        publish: {
            default:'dashboard',
            loadView:this.loadView
        },

        // load view
        loadView: function(view){

            var el = document.createElement('ark-tekt-'+view);
            this.innerHTML = "";
            this.appendChild(el);

        },

        // Fires when an instance of the element is created
        created: function() { 

            scope = this;

        },

        // Fires when the element’s initial set of children and siblings are guaranteed to exist
        domReady: function() {

            // load default view
            scope.loadView(this.default);

        },

        // Fires when the "<polymer-element>" has been fully prepared
        ready: function() {},

        // Fires when the element was inserted into the document
        attached: function() {

            ARK.view = this;

        },

        // Fires when the element was removed from the document
        detached: function() {},

        // Fires when an attribute was added, removed, or updated
        attributeChanged: function(attr, oldVal, newVal) {}

    });

})();

