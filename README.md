List
===============================================================================
This is a purely functional List implementation, based on Chris Okasaki's work.
We provide both Okasaki's suggested API, as well as a more conventional one.

It is very important to note that a list is NOT an array in JavaScript.  It's
chief value is that it is completely immutable.


| Task               | Native Array   | Okasaki   | Conventional |
|--------------------|----------------|-----------|--------------|
| Insert at front    | unshift        | cons      | prepend      |
| Insert at end      | push           | snoc      | append       |
| First element      | shift          | head      | first        |
| Last element       | pop            | daeh      | last         |
| All but first      | slice(1)       | tail      | Not Provided |
| All but last       | slice(0, -1)   | lait      | Not Provided |
| Produce a value    | reduce         | fold      | reduce       |
| Change every value | map            | map       | map          |


tail and lait have no conventional implementations, as they are nearly always
specific to purly functional languages.  In languages with mutable data
structures, they tend to be provided for by conducting a pop-like operation
then reading the altered list.
