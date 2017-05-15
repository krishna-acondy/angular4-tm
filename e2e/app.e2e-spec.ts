import { Angular4TmPage } from './app.po';

describe('angular4-tm App', () => {
  let page: Angular4TmPage;

  beforeEach(() => {
    page = new Angular4TmPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
