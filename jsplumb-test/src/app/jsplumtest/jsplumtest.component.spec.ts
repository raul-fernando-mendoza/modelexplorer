import { TestBed } from '@angular/core/testing';
import { JsPlumbComponent } from './jsplumtest.component';

describe('JsPlumbComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        JsPlumbComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(JsPlumbComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'jsplumb-test'`, () => {
    const fixture = TestBed.createComponent(JsPlumbComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('jsplumb-test');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(JsPlumbComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('jsplumb-test app is running!');
  });
});
