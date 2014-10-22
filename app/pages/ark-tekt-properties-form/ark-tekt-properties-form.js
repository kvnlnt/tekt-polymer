(function(){

    var scope;

    Polymer('ark-tekt-properties-form', {

        publish:{
            method:'POST'
        },

        // Fires when an instance of the element is created
        created: function() { 

            scope = this;

        },

        submit:function(e){

            e.preventDefault();
            var method = scope.el.form.attr('method');
            var data = scope.el.form.serialize();
            console.log(method, data);

        },

        // Fires when the element’s initial set of children and siblings are guaranteed to exist
        domReady: function() {

            scope.el = {};
            scope.el.form = $(scope.shadowRoot.getElementById("form"));
            scope.el.submit = $(scope.shadowRoot.getElementById("submit"));
            scope.el.submit.on('click', scope.submit);

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

