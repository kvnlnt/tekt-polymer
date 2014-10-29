document.addEventListener('polymer-ready', function() {

    // get element
    var el = document.querySelector('ark-tekt-router');

    // check if test route exists via onload config
    assert.equal(el.routes['#/test_route'], 'test-page');

    // test get
    assert.equal(_.has(el.get('#/test_route'), '#/test_route'), true);

    // test go : valid url
    assert.equal(el.go('#/test_route'), '#/test_route');

    // test go : missing url
    assert.equal(el.go('#/null'), '#/error');

    // test go : null url
    assert.equal(el.go(null), '#/error');

    // test go : empty url
    assert.equal(el.go(''), '#/error');

    // test checkHash : did not change
    el.go('nowhere');
    assert.equal(el.checkHash('#/error'), false);

    // test checkHash : did change
    window.location.hash = '#/testing';
    assert.equal(el.checkHash(), true);

    // TODO finish testing router

    // complete testing
    done();

}); 