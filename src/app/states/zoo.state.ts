import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext, StateToken } from '@ngxs/store';
import { tap, mergeMap } from 'rxjs';
import { FeedAnimals } from '../actions/feed-animals.action';
import { TakeAnimalsOutside } from '../actions/take-animal-outside.action';
import { AnimalService } from '../services/animal.service';

export interface ZooStateModel {
    feedAnimals: string[];
}

const ZOO_STATE_TOKEN = new StateToken<ZooStateModel>('zoo');

@State<ZooStateModel>({
    name: ZOO_STATE_TOKEN,
    defaults: {
        feedAnimals: []
    }
})
@Injectable()
export class ZooState {

    constructor (private animalService: AnimalService) {}

    @Action(FeedAnimals)
    feedAnimals(ctx: StateContext<ZooStateModel>, action: FeedAnimals) {
        return this.animalService.feed(action.animalsToFeed).pipe(
            tap(animalsToFeedResult => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    feedAnimals: [...state.feedAnimals, animalsToFeedResult]
                });
            }),
            mergeMap(() => ctx.dispatch(new TakeAnimalsOutside('boi')))
        );
    }

    @Selector()
    static pandas(state: string[]) {
        return state.filter(s => s.indexOf('panda') > -1);
    }
}