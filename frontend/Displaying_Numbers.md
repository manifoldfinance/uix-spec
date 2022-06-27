## Collapsing Number Ranges

> [source, unicode.org](https://unicode-org.github.io/cldr/ldml/tr35-numbers.html#:~:text=in%20the%20future.-,8.2%20Collapsing%20Number%20Ranges,of%20the%20upper%20string.,-8.3%20Range%20Pattern)
> 

Collapsing a number range refers to the process of removing duplicated information in the lower and upper values. 

For example, if the lower string is "3.2 centimeters" and the upper string is "4.5 centimeters", it is desirable to remove the extra "centimeters" token.

This operation requires semantic annotations on the formatted value. The exact form of the semantic annotations is implementation-dependent. However, implementations may consider the following broad categories of tokens:

Numerical value, including decimal and grouping separators

- Sign symbol.  
- Scientific or compact notation.  
- Unit of measurement.  

For example, consider the string -5.3M US dollars. It may be annotated as follows:

<pre>
- → sign symbol
5.3 → numerical value
M → compact notation
US dollars → unit of measurement for the currency USD
</pre>

Two tokens are semantically equivalent if they have the same semantic annotations, even if they are not the exact same string. For example:

> "centimeter" is semantically equivalent to "centimeters".   

> "K" (the thousands symbol in compact decimals) is NOT semantically equivalent to "K" (the measurement unit Kelvin).   

The above description describes the expected output. Internally, the implementation may determine the equivalent units of measurement by passing the codes back from the number formatters, allowing for a precise determination of "semantically equivalent".    

Two semantically equivalent tokens can be collapsed if they appear at the start of both values or the end of both values. However, the implementation may choose different levels of aggressiveness with regard to collapsing tokens. The currently recommended heuristic is: 

- Only collapse semantically equivalent unit of measurement tokens. 
> This is to avoid ambiguous strings such as "3–5K" (could represent 3–5000 or 3000–5000).    

- Only collapse if the tokens are more than one code point in length. This is to increase clarity of strings such as "$3–$5".
