(function(){

    var scope;

    Polymer('ark-tekt-router', {

        publish:{
            poll:null,
            regex: /^<(int|string):(.*)>/, // token finder
            route:'#/dashboard',
            default:'#/dashboard',
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

        /**
         * Check if route path matches route syntax
         * @param  {string} a route
         * @param  {string} b route to test
         * @return {boolean}
         */
        routeMatch: function(a,b){

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
         * Find route by path
         * @param  {string} route a path. Example: path/to/find
         * @return {string}       contents of route found
         */
        getRoute: function(route){

            // don't include url params
            var route = route.split('?')[0];

            // find routes of same length
            var found = _.pick(scope.routes, function(v,k){
                var tokens = k.split('/');
                var compare_tokens = route.split('/');
                var sameLength = tokens.length === compare_tokens.length;
                var isMatch = false;
                if(sameLength){ isMatch = scope.routeMatch(tokens, compare_tokens); }
                return sameLength && isMatch;
            });

            return found;

        },

        /**
         * Route to a hash
         * @param  {string} route Example: path/to/find
         */
        routeTo: function(route){

            window.location.hash = route;

        },

        // load a page
        loadPage: function(route, params){

            console.log('load', route, params);

            // get page element name
            var el = scope.routes[route];

            // create page object
            var page = document.createElement(el);

            // attach params
            _.each(params, function(v, k){ page[k] = v; });

            // clear the page
            ARK.page.innerHTML = null;

            // load the page
            ARK.page.appendChild(page);


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
         * If hash has changed, find route and load new page
         * @return {n/a}
         */
        checkHash: function(){

            // check if the hash has changed
            var hash = window.location.hash;
            var changed = scope.route !== hash;

            // if hash is empty, route to default
            if(hash.length === 0){
                scope.routeTo(scope.default);
                return false;
            }

            // if yes, find route and load
            if(changed){
                var route = scope.getRoute(hash);
                var noRoute = _.isEmpty(route);

                // if not route, route to error
                if(noRoute){
                    scope.routeTo('#/error');
                    return false;
                } else {
                    route = _.keys(route)[0];
                    params = scope.getParams(route, hash);
                    scope.loadPage(route, params);
                    scope.route = hash;
                }
                
                
            }

        },

        // Fires when an instance of the element is created
        created: function() {

            scope = this;
            ARK.router = this;

        },

        // Fires when the element’s initial set of children and siblings are guaranteed to exist
        domReady: function() {

            scope.loadPage(scope.route);
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

