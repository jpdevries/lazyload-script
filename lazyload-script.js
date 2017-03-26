module.exports = function lazyLoadScript(src, opts = {}) {
  return new Promise(function(resolve, reject) {
    if(!src) {
      throw new Error('src parameter must be specified');
      return;
    }

    const defaults = {
      force: false
    },
    {id, async, integrity, type, text, defer, charset, crossorigin, force} = Object.assign({}, defaults, (typeof opts === 'string') ? {
      id: opts
    } : opts),
    script = document.createElement('script');

    script.src = src;
    if(id) {
      script.setAttribute('id',id);
      if(document.getElementById(id)) {
        resolve(document.getElementById(id));
        return;
      }
    } else {
      const sc = document.querySelector(`script[src="${src}"]`);
      if(!force && sc) {
        resolve(sc);
        return;
      }
    }

    if(async) script.setAttribute('async', 'true');
    if(defer) script.setAttribute('defer', 'true');
    if(integrity) script.setAttribute('integrity', integrity);
    if(type) script.setAttribute('type', type);
    if(text) script.setAttribute('text', text);
    if(charset) script.setAttribute('charset', charset);
    if(crossorigin) script.setAttribute('crossorigin', crossorigin);

    script.onload = function(event) {
      resolve(script);
    }
    script.onerror = function(event) {
      reject(event);
    }
    document.body.appendChild(script);
  });

}
