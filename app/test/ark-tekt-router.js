document.addEventListener('polymer-ready', function() {

    // SETUP

        // get element
        var el = document.querySelector('ark-tekt-router');

        // add test routes
        var test_route = document.createElement('ark-tekt-route');
            test_route.route = 'test/page';
            test_route.page  = 'test-page';
            el.appendChild(test_route);
            el.add_route(test_route);

        var test_route = document.createElement('ark-tekt-route');
            test_route.route = 'test/page/<int:id>';
            test_route.page  = 'test-page-id';
            el.appendChild(test_route);
            el.add_route(test_route);

        var test_route = document.createElement('ark-tekt-route');
            test_route.route = 'test/page/<string:name>';
            test_route.page  = 'test-page-name';
            el.appendChild(test_route);
            el.add_route(test_route);

    // GET

        // assert get routes
        assert.equal(el.routes['#/test/page'], 'test-page');
        assert.equal(_.has(el.get('#/test/page'), '#/test/page'), true);
        assert.equal(el.go('#/test/page'), '#/test/page');

        assert.equal(el.routes['#/test/page/<int:id>'], 'test-page-id');
        assert.equal(_.has(el.get('#/test/page/1'), '#/test/page/<int:id>'), true);
        assert.equal(el.go('#/test/page/1'), '#/test/page/1');

        assert.equal(el.routes['#/test/page/<string:name>'], 'test-page-name');
        assert.equal(_.has(el.get('#/test/page/name'), '#/test/page/<string:name>'), true);
        assert.equal(el.go('#/test/page/name'), '#/test/page/name');

    // GO

        // assert missing urls
        assert.equal(el.go('#/null'), '#/error');
        assert.equal(el.go(null), '#/error');
        assert.equal(el.go(''), '#/error');

    // CHECK_HASH

        // assert hash checking
        el.go('hash_did_not_change');
        assert.equal(el.check_hash('#/error'), false);
        assert.equal(el.check_hash('#/test/page'), true);

    // GET_PARAMS
    
        // assert empty params for 
        assert.equal(_.isEmpty(el.get_params('#/test/page','#/test/page')), true);
        assert.equal(el.get_params('#/test/page/<int:id>','#/test/page/1').id, 1);
        assert.equal(el.get_params('#/test/page/<string:name>','#/test/page/test').name, 'test');

    // MATCH
        
        assert.equal(el.match(['test','tokens','<int:id>'],['test','tokens',1]), true);
        assert.equal(el.match(['test','tokens','<int:id>'],['test','tokens','string']), false);
        assert.equal(el.match(['test','tokens','<string:name>'],['test','tokens','string']), true);
        assert.equal(el.match(['test','tokens','<string:name>'],['test','tokens',1]), false);

    // VALIDATE TYPE
        
        assert.equal(el.validate_type('int',1), true);
        assert.equal(el.validate_type('int','test'), false);
        assert.equal(el.validate_type('string','test'), true);
        assert.equal(el.validate_type('string',1), false);

    // ADD ROUTE

        var test_route = document.createElement('ark-tekt-route');
            test_route.route = 'test/page/new';
            test_route.page  = 'test-page-new';

        el.add_route(test_route);
        assert.equal(el.routes['#/test/page/new'], 'test-page-new');

    // complete testing
    done();

}); 