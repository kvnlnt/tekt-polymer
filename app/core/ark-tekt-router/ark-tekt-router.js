(function(){

    var scope;

    Polymer('ark-tekt-router', {

        publish:{
            poll:null,
            regex: /^<(int|string):(.*)>/, // token finder
            route:'',
            default_hash:'#/dashboard',
            routes:{
                '#/error':'ark-tekt-error',
                '#/dashboard':'ark-tekt-dashboard',
                '#/properties':'ark-tekt-properties',
                '#/properties/new':'ark-tekt-properties-new',
                '#/properties/<int:id>':'ark-tekt-properties-view',
                '#/properties/<int:id>/edit':'ark-tekt-properties-edit',
                '#/properties/<int:id>/delete':'ark-tekt-properties-delete',
                '#/paths':'ark-tekt-paths',
                '#/pages':'ark-tekt-pages',
                '#/parts':'ark-tekt-parts',
                '#/pieces':'ark-tekt-pieces',
            },
        },

        /**
         * Find route by path
         * @param  {string} route a path. Example: path/to/find
         * @return {string}       contents of route found
         */
        get: function(route){

            // don't include url params
            var route = route.split('?')[0];

            // find routes of same length
            var found = _.pick(scope.routes, function(v,k){
                var tokens = k.split('/');
                var compare_tokens = route.split('/');
                var sameLength = tokens.length === compare_tokens.length;
                var isMatch = false;
                if(sameLength){ isMatch = scope.match(tokens, compare_tokens); }
                return sameLength && isMatch;
            });

            return found;

        },

        /**
         * Route to a hash
         * this mechanism allows preservation of browser history
         * @param  {string} route Example: path/to/find
         */
        go: function(hash){

            var route = scope.get(hash);
            var noRoute = _.isEmpty(route);
            var page;

            // config
            route  = noRoute ? '#/error' : _.keys(route)[0];
            hash   = noRoute ? '#/error' : hash;
            params = noRoute ? {} : scope.getParams(route, hash);
            page   = scope.routes[route];

            // load page
            scope.route = hash;
            window.location.hash = hash;
            ARK.page.load(page, params);

        },

        /**
         * If hash has changed, find route and load new page
         * @return {n/a}
         */
        checkHash: function(hash){

            // get or set hash
            var hash = hash || window.location.hash;

            // if it's empty, set it to the default
            hash = 0 === hash.length ? scope.default_hash : hash;

            // now let's see if it's changed
            var changed = scope.route !== hash;

            // if yes, find route and load
            if(changed){ scope.go(hash); }

        },

        /**
         * Get params from tokenized string
         * @param  {string} route Example: #/path/<int:id>
         * @param  {string} hash  Example: #/path/1
         * @return {object}       Example: {id:1}
         */
        getParams: function(route, hash){

            var params         = {};
            var route_segments = route.split('/');
            var hash_segments  = hash.split('?')[0].split('/');

            // loop presumable tokenized segments
            _.each(route_segments, function(v, k){

                // is this a token?
                var isRegex = scope.regex.test(v);

                // if yes, get the value
                if(isRegex){
                    var token = scope.regex.exec(v)[2];
                    params[token] = hash_segments[k];
                }
            });

            return params;

        },

        /**
         * Check if route path matches route syntax
         * @param  {string} a route
         * @param  {string} b route to test
         * @return {boolean}
         */
        match: function(a,b){

            // tokens collected container
            var tokens = [];

            // loop a's items against b's (they need to be the same length)
            _.each(a, function(v, k){

                // check if it's a perfect match
                var isPerfectMatch = v === b[k];

                // if perfect match, done
                if(isPerfectMatch){
                    tokens.push(true);

                // if not, look for it to match a regex
                } else {

                    // is this a properly formatted token (<int:id>)
                    var isRegex = scope.regex.test(v);

                    // if yes, let's see if this value is of the type specified
                    if(isRegex){

                        // get the type
                        var type = scope.regex.exec(v);

                        // is there a match?
                        var isRegexMatch = scope.validateType(type[1], b[k]);

                        // if yes, add the value, if false,     not a match
                        if(isRegexMatch){
                            tokens.push(true);
                        } else {
                            tokens.push(false);
                        }

                    // if no, it's not a regex, it's not a match
                    } else {
                        tokens.push(false);
                    }

                }

            });

            // if any part of the route was wrong, it's not a match
            var isMatch = !_.contains(tokens, false);

            // return result
            return isMatch;

        },

        /**
         * Validate Type
         * @param  {string} type   type
         * @param  {string|number} param parameter
         * @return {boolean}       
         */
        validateType: function(type, param){

            var result;

            switch(type) {
                case 'int':
                    result = !isNaN(param);
                    break;
                case 'string':
                    result = isNaN(param);
                    break;
                default:
                    result = false;
            }

            return result;

        },

        // Fires when an instance of the element is created
        created: function() {

            scope = this;
            ARK.router = this;

        },

        // Fires when the element’s initial set of children and siblings are guaranteed to exist
        domReady: function() {

            scope.poll = setInterval(scope.checkHash, 200);

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

