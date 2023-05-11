/**
 * https://leetcode.com/problems/reverse-integer/description/
 * Given a signed 32-bit integer x, return x with its digits reversed.
 * If reversing x causes the value to go outside the signed 32-bit integer range [-231, 231 - 1], then return 0.
 * Assume the environment does not allow you to store 64-bit integers (signed or unsigned).
 */

/**
 * @param {number} x
 * @return {number}
 */
var reverse = function(x) {
   var lowerTreshold = -Math.pow(2, 31);
   var upperTreshold = Math.pow(2, 31) - 1;

   var stringifiedX =  Math.abs(x).toString();
   var reversedString = '';

   for(var i = stringifiedX.length; i >=0 ; i--){
      reversedString += stringifiedX.charAt(i);
   }
   var reversed = x > 0 ? +reversedString : -reversedString;

   if(reversed < lowerTreshold || reversed > upperTreshold) return 0;

   return isNaN(reversed) ? undefined : reversed
};

module.exports = {
   reverse
}

