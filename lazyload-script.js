module.exports = function lazyLoadScript(src, id = undefined) {
  return new Promise(function(resolve, reject) {
    if(!src) {
      throw new Error('src parameter must be specified');
      return;
    }

    var script = document.createElement('script');
    script.src = src;
    if(id) {
      script.setAttribute('id',id);
      if(document.getElementById(id)) {
        resolve(document.getElementById(id));
        return;
      }
    } else {
      const sc = document.querySelector(`script[src="${src}"]`);
      if(sc) {
        resolve(sc);
        return;
      }
    }
    script.onload = function(event) {
      resolve(script);
    }
    script.onerror = function(event) {
      reject(event);
    }
    document.body.appendChild(script);
  });

}
