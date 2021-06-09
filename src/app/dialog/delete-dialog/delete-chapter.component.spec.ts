import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteChapterComponent } from './delete-chapter.component';

describe('DeleteChapterComponent', () => {
  let component: DeleteChapterComponent;
  let fixture: ComponentFixture<DeleteChapterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteChapterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteChapterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
