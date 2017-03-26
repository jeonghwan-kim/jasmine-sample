var Hello = {
  message: 'Hello',
  greeting() {
    return this.message + ' ' + this.getName();
  },
  getName(cb) {
    const req = new XMLHttpRequest();
    req.open('GET', 'http://name', true);
    req.onreadystatechange = function () {
      if (req.readyState == 4) {
        if(req.status == 200) {
          cb(req.responseText);
        } else {
          cb("Error loading page\n");
        }
      }
    };
    req.send(null);

    return this.name || 'world';
  },
  print(el, jQuery) {
    if (!jQuery) {
      throw new Error('제이쿼리 라이브러리가 필요합니다');
    }
    if (!el instanceof jQuery) {
      throw new Error('파라매터는 제이쿼리 객체이어야 합니다');
    }
    el.text(this.greeting());
  }
};
