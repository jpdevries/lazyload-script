var src = 'https://code.jquery.com/qunit/qunit-2.2.1.js',
id = 'qunit-2.2.1.js';

describe("lazyLoadScript", function () {
  beforeEach(function () {});

  it("returns a promise", function () {
    expect(lazyLoadScript(src, id)).toEqual(jasmine.any(Promise));
  });

  it("should append a script to the DOM", function (done) {
    lazyLoadScript(src, id).then(function (script) {
      expect(!!document.getElementById('' + id)).toBe(true);
      done();
    }).catch(function (err) {
      fail(err);
      done();
    });
  });

  it("should not append the same script to the DOM more than once", function (done) {
    lazyLoadScript(src, id).then(function () {
      lazyLoadScript(src, id).then(function () {
        expect(document.body.querySelectorAll('script[id="' + id + '"]').length).toBe(1);
        done();
      });
    });
  });
});
