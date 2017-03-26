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
});
