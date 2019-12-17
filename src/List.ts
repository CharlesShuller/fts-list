/**
 * Main module for the List type.
 *
 * Copyright 2019 Charles Shuller
 *
 * This file is part of fts-list.
 *
 * fts-list is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * fts-list is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public License
 * along with fts-list.  If not, see <https://www.gnu.org/licenses/>.
 *
 */



import {Functor, FmapFunction} from 'fts-functor';
import * as Maybe from 'fts-maybe';
import {Just, Nothing} from 'fts-maybe';

export type MaybeList<V> = Maybe.Maybe<List<V>>;
export type FoldFun<Vi, Vo> = (accumulator: Vo, element: Vi) => Vo;

/**
 * This is our fundamental list implementation.  Do NOT use "new" to create
 * a new list, instead use one of the factory functions.  fromList is probably
 * the most useful.
 */
export class List<V> implements Functor<V> {
    constructor(
        readonly maybeValue: Maybe.Maybe<V>,
        readonly maybeNext: MaybeList<V>
    ){}

    fmap<Vo>( fmapFunction: FmapFunction<V, Vo> ): List<Vo> {
        return empty<Vo>();
    }
}


/**
 * Returns true if the list is empty, false otherwise.
 */
export function isEmpty<V>(list: List<V>): boolean {
    return Maybe.unbox(
        list.maybeValue,
        (value) => false,
        () => true
    );
}

/**
 * Returns true if the list is not empty, false otherwise
 */
export function isNotEmpty<V>(list: List<V>): boolean {
    return !isEmpty(list);
}

/**
 * Creates an empty list
 */
export function empty<V>(): List<V> {
    return new List<V>(Nothing(), Nothing());
}


/**
 * Creates a new list based on an array
 */
export function fromArray<V>(array: Array<V>): List<V> {
    const newList =
        array.reduceRight(
            (list: List<V>, value: V) => {
                return cons(value, list);
            },
            empty<V>()
        );
    return newList;
}

/**
 * Converts a list to an array
 */
export function toArray<V>(list: List<V>): Array<V> {
    //Our folder below mutates the array, and therefore
    //has side effects.  Though it's entirely constrained within
    //this function
    return foldl(
        (array: Array<V>, value: V) => {
            array.push(value);
            return array;
        },
        new Array<V>(),
        list
    );
}


/**
 * Returns the first element from a list.  It is an error to call this function
 * on an empty list.
 */
export function head<V>(list: List<V>): V {
    return Maybe.unbox(
        list.maybeValue,
        (value: V) => value,
        () => { throw new Error("Empty List") }
    );
}

/**
 * Returns list without it's first element, i.e. everything but head.
 *
 * If list is empty, it raises an exception.
 *
 * If list has exactly one element, it returns the empty list
 */
export function tail<V>(list: List<V>): List<V> {
    if(isEmpty(list)) {
        throw new Error("Empty List");
    } else {
        return Maybe.unbox(
            list.maybeNext,
            (next: List<V>) => next,
            () => { throw new Error("Empty List") }
        );
    }
}



/**
 * CONStructs a new list.  The new element is placed at the head
 */
export function cons<V>(value: V, list: List<V>): List<V> {
    return new List( Just(value), Just(list) );
}


/**
 * Folds a list, also called reduce in many languages.
 */
export function foldl<Vi, Vo>(
    foldFun: FoldFun<Vi, Vo>,
    initialValue: Vo,
    list: List<Vi>
): Vo {
    if(isEmpty<Vi>(list)) {
        return initialValue;
    } else {
        const newInitialValue = foldFun( initialValue, head(list) );
        return foldl( foldFun, newInitialValue, tail(list) );
    }
}


/**
 * This is just an alias for foldl, since most javascript programmers expect
 * this name for the function.
 */
export function reduce<Vi, Vo>(
    foldFun: FoldFun<Vi, Vo>,
    initialValue: Vo,
    list: List<Vi>
): Vo {
    return foldl<Vi, Vo>(foldFun, initialValue, list);
}
