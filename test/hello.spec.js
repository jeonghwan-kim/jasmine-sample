describe('Hello모듈의', ()=> { 
  describe('greeting함수는', ()=>{
    it('인사 문자열을 반환한다', ()=> {
      const expectedStr = Hello.message + ' world',
            actualStr = Hello.greeting();
      expect(expectedStr).toBe(actualStr);
    });
    it('getName 함수을 호출한다', ()=> {
      spyOn(Hello, 'getName');
      Hello.greeting();
      expect(Hello.getName).toHaveBeenCalled();
    });
  });
  describe('getName함수는', ()=>{
    let request,
        callbackSpy,
        response;
    beforeEach(()=> {
      jasmine.Ajax.install();
      callbackSpy = jasmine.createSpy('callback');
      Hello.getName(callbackSpy);
      request = jasmine.Ajax.requests.mostRecent();
      response = {
        status: 200,
        responseText: 'Chris'
      };
      request.respondWith(response);
    });
    afterEach(()=> {
      jasmine.Ajax.uninstall();
    });
    it('HTTP 요청을 보낸다', () => {
      const expectUrl = 'http://name';
      expect(request.url).toBe(expectUrl);
    });
    it('http 응답이 오면 콜백함수를 실행한다', ()=> {
      expect(callbackSpy).toHaveBeenCalled();
    });
    it('콜백함수 파라매터로 이름을 반환한다', ()=> {
      expect(callbackSpy).toHaveBeenCalledWith(response.responseText);
    });
  });
  describe('print 함수는', ()=> {
    let el;
    beforeEach(()=> {
      el = $('<h1></h1>');
      $('body').append(el);
    })
    afterEach(()=>el.remove());
    it('돔엘레맨트와 제이쿼리 파리매터가 없으면 에러를 반환한다', ()=> {
      expect(()=>Hello.print()).toThrowError();
    });
    it('파라매터로 받은 돔에 인삿말을 출력한다', ()=> {
      Hello.print(el, jQuery);
      const expectText = Hello.greeting();
      expect(el).toHaveText(expectText);
    });
  })
});
