import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, withLatestFrom } from 'rxjs';
import { AddAnimal } from 'src/app/actions/add-animal.actions';
import { Todo } from 'src/app/actions/todo.namespace.actions';

@Component({
  selector: 'app-zoo-component',
  templateUrl: './zoo-component.component.html',
  styleUrls: ['./zoo-component.component.scss']
})
export class ZooComponentComponent {

  // @ts-ignore
  @Select(state => state.animals) animals$: Observable<any>;
  addVideo = new Todo.Add('Add');
  editVideo = new Todo.Edit('Edit');
  deleteVideo = new Todo.Delete('Delete');

  constructor(private store: Store) { }

  addAnimal(name: string) {
    this.store.dispatch(new AddAnimal(name))
      .pipe(withLatestFrom(this.animals$))
      .subscribe(
        ([_, animals]) => console.log('dispatch success', _, animals)
      );
  }

}
