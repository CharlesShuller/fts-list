/*
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
*/

import * as Maybe from "fts-maybe"
import * as List from "../List"

type NumberList = List.List<number>;

test("We can create an empty list", () => {
    const emptyList = List.empty();

    expect(List.isEmpty(emptyList)).toBe(true);
});

test("We can create an empty list from an array", () => {
    const list = List.fromArray([]);

    expect(List.isEmpty(list)).toBe(true);
});


test("We can create an non-empty list from an array", () => {
    const list = List.fromArray([1, 2, 3, 4, 5]);

    expect(List.isEmpty(list)).toBe(false);
});


test("We can create an array from a list", () => {
    const sourceArray = [1, 2, 3, 4, 5];
    const list = List.fromArray(sourceArray);
    const array = List.toArray(list);

    expect(array).toStrictEqual(sourceArray);
});

test("We can sum a list using fold", () => {
    const list = List.fromArray([1, 2, 3, 4, 5]);
    const expectedResult = 15;
    const actualResult = List.foldl(
        (sum, num) => sum+num,
        0,
        list
    );

    expect(actualResult).toBe(expectedResult);
});
