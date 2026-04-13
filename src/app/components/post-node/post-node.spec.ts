import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostNode } from './post-node';

describe('PostNode', () => {
  let component: PostNode;
  let fixture: ComponentFixture<PostNode>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostNode]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostNode);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
