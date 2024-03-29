(function(){

    var scope;

    Polymer('ark-tekt-properties', {

        // publish properties
        publish: {
            endpoint:'/properties',
            properties:null
        },

        // ajax properties
        getProperties: function(){

            var data = {
                'properties':[
                    {
                        id:1,
                        property:'kevinlint.com'
                    },
                    {
                        id:2,
                        property:'linttraprecords.com'
                    }
                ]
            };

            scope.properties.model = data;

            return data;

        },

        // Fires when an instance of the element is created
        created: function() { 

            scope = this;

        },

        // Fires when the element’s initial set of children and siblings are guaranteed to exist
        domReady: function() {

            scope.getProperties();

        },

        // Fires when the "<polymer-element>" has been fully prepared
        ready: function() {

            document.title = 'Properties';
            scope.properties = this.shadowRoot.getElementById('properties');

        },

        // Fires when the element was inserted into the document
        attached: function() {},

        // Fires when the element was removed from the document
        detached: function() {},

        // Fires when an attribute was added, removed, or updated
        attributeChanged: function(attr, oldVal, newVal) {}
    });

})();

