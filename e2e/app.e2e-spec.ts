import { VsdPage } from './app.po';

describe('vsd App', () => {
  let page: VsdPage;

  beforeEach(() => {
    page = new VsdPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
