(function(){

    var scope;

    Polymer('ark-tekt-menu', {

        // publish properties
        publish: {
            items:[]
        },

        // add item
        addItem: function(item){

            scope.items.push(item);

        },

        // Fires when an instance of the element is created
        created: function() { 

            scope = this;

        },

        // Fires when the element’s initial set of children and siblings are guaranteed to exist
        domReady: function() {

            // load default view
            _.each(this.children, scope.addItem);


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

