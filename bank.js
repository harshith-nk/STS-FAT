/* STS3007 original practice bank; numeric variants are labelled. */
const TOPICS=[
['java','Java essentials','Foundation','Types, strings, arrays, operators and control flow.','int is signed 32-bit. Integer division truncates toward zero.','Use equals for String content; == compares references.'],
['sieve','Simple sieve','CAT 1','Find all primes up to N.','Start marking at p². O(N log log N) time; O(N) space.','0 and 1 are not prime; guard N<2 before prime[1].'],
['segment','Segmented sieve','CAT 1','Find primes within [L,R].','start=max(p²,ceil(L/p)×p); index=value−L.','Use base primes up to √R. Storage O(√R+R−L+1).'],
['phi','Euler’s totient','CAT 1','Count integers from 1 to n coprime to n.','φ(n)=n∏(1−1/p), over distinct prime factors.','Apply r-=r/p once per distinct prime. φ(1)=1.'],
['strobo','Strobogrammatic numbers','CAT 1','Digits unchanged by a 180° rotation.','Valid pairs: 00,11,88,69,96. Middle: 0,1,8.','Supplied while(l<r) skips the middle digit, so input 2 incorrectly prints yes.'],
['crt','Chinese remainder theorem','CAT 1','Solve simultaneous modular congruences.','M=∏mᵢ; Mᵢ=M/mᵢ; x=ΣaᵢMᵢyᵢ mod M; Mᵢyᵢ≡1 mod mᵢ.','The basic theorem assumes pairwise coprime moduli. Linear-search inverse costs O(mᵢ).'],
['gcd','Euclid’s algorithm','CAT 2 + FAT','Find the greatest common divisor.','gcd(a,b)=gcd(b,a%b); gcd(a,0)=a for a≥0.','Positive inputs: O(log min(a,b)) time. Iterative O(1) extra space; recursion uses a stack.'],
['karatsuba','Karatsuba multiplication','CAT 2 + FAT','Multiply large numbers using three recursive products.','acB²+((a+b)(c+d)−ac−bd)B+bd; T(n)=3T(n/2)+O(n).','For n-digit arithmetic, time O(n^log₂3)≈O(n^1.585). Java long is still bounded.'],
['flip','Flip one bit','CAT 2 + FAT','Longest run of 1s after at most one zero-to-one flip.','Maintain a window containing at most one zero.','Fixed-length arrays cannot gain a position. Supplied integer code may count a leading extra bit.'],
['nibble','Swap nibbles','CAT 2 + FAT','Swap upper and lower four bits of an unsigned byte.','((n&0x0F)<<4)|((n&0xF0)>>4), for 0≤n≤255.','A nibble is four bits; swapping twice restores the byte.'],
['product','Maximum product subarray','CAT 2 + FAT','Maximum product of a nonempty contiguous subarray.','Track running maximum/minimum, or scan prefix/suffix products.','A negative can turn a minimum into a maximum. Reset product after zero.'],
['hourglass','Maximum hourglass sum','CAT 2 + FAT','Find the greatest 7-cell hourglass sum.','Placements=(rows−2)(cols−2); scan time O(rows×cols).','Material accumulates different placements into s and starts max at 0. Reset sum per placement; use a negative-safe maximum.'],
['equilibrium','Equilibrium sum','CAT 2 + FAT','Find equal sums on both sides of an index.','Excluding center: right=total−left−a[i]. Including: prefix=left+a[i], suffix=total−left.','State whether the center counts. Initial max=0 fails when all valid sums are negative.'],
['leaders','Array leaders','CAT 2 + FAT','Elements greater than everything to their right.','Scan right to left with a running maximum: O(n) time.','Strict definition uses >. Material uses ≥, so it also includes equal suffix maxima.'],
['majority','Majority element','CAT 2 + FAT','An element with frequency strictly greater than n/2.','Boyer–Moore candidate plus verification: O(n) time, O(1) auxiliary space.','Material omits reading array entries and uses >= n/2. Correct check: frequency>n/2.'],
['rotation','Block swap & rotation','CAT 2 + FAT','Rotate left by d while preserving cyclic order.','For n>0, normalize d%=n. Reverse first d, rest, then all.','Reversal and block swap are distinct algorithms. Supplied block-swap indices need correction.'],
['booth','Booth’s algorithm','CAT 2 + FAT','Multiply signed two’s-complement integers.','Pair (Q₀,Q₋₁): 01 add M; 10 subtract M; 00/11 neither. Then arithmetic right shift.','Java recombination: ((long)A<<32)|(Q&0xffffffffL). Without the mask, negative Q sign-extends.'],
['lexpal','First palindrome','CAT 2 + FAT','Lexicographically smallest palindrome from a multiset of letters.','At most one odd frequency; sorted left half + middle + reversed left half.','Even length requires all counts even; odd length requires exactly one odd count.'],
['natural','Natural sorting','CAT 2 + FAT','Compare numeric runs as numbers.','Natural: file1,file2,file10. Lexical: file1,file10,file2.','Material digit loops cache c/d without updating them. Read charAt(i) each step.'],
['josephus','Josephus problem','CAT 2 + FAT','Survivor when every kth person in a circle is removed.','J(1,k)=0; J(n,k)=(J(n−1,k)+k)%n. Add 1 for 1-based numbering.','O(n) time; recursive O(n) stack versus iterative O(1) auxiliary space.'],
['permutations','Unique permutations','CAT 2 + FAT','Distinct arrangements in lexicographic order.','Count=n!/∏frequency!. Sort characters before backtracking.','Skip equal a[i] when i>0 and a[i−1] is equal but not used in this branch.'],
['grid','Maneuvering','CAT 2 + FAT','Count top-left to bottom-right paths using right/down only.','P(r,c)=P(r−1,c)+P(r,c−1); P(1,c)=P(r,1)=1; count=C(r+c−2,r−1).','Plain recursion repeats work. Table DP: O(rc) time; reduced-row DP: O(c) auxiliary space.'],
['selection','Selection sort','CAT 2 + FAT','Choose the minimum of each unsorted suffix.','Θ(n²) comparisons in all input orders; O(1) auxiliary space.','Standard j=i+1 gives n(n−1)/2 comparisons. Material j=i gives n(n+1)/2 including self comparisons.'],
['quick','Quick sort','CAT 2 + FAT','Partition around a pivot, then sort both sides.','Average O(n log n), worst O(n²); usual recursion stack average O(log n), worst O(n).','Lomuto returns pivot index; Hoare returns a partition boundary. Ordinary quicksort is unstable.'],
['weighted','Weighted substrings','CAT 2 + FAT','Distinct contiguous substrings with total nonnegative weight ≤K.','Use a set to deduplicate substring values.','O(n²) candidates, but copying/hashing strings makes the shown implementation O(n³) worst-case time and stored-character space.'],
['hyphen','Move hyphens','CAT 2 + FAT','Move hyphens to the front, preserving other character order.','Print hyphens, then other characters: two O(n) passes.','toCharArray() allocates O(n); charAt-based streaming can use O(1) auxiliary space.'],
['manacher','Manacher’s algorithm','CAT 2 + FAT','Longest palindromic substring in linear time.','mirror=2c−i; p[i]=min(r−i,p[mirror]) for i<r; start=(center−max)/2.','Radius of #a#b#a# at index 3 is 3, not 2. Material repeated String concatenation makes preprocessing quadratic.'],
['combination','Combination sum','CAT 2 + FAT','Positive candidates may be reused; combination order does not matter.','Recurse at index i to allow reuse; i+1 to use each position at most once.','Zero can cause nonterminating recursion. Duplicate candidate values need deduplication.'],
['maze','Maze solving','CAT 2 + FAT','Reach a destination through open cells.','Check bounds before indexing and mark visited before exploring neighbors.','Material permanently marks dead ends 0; reachability visits each cell once. Enumerating all paths is a different task.'],
['queens','N-Queens','CAT 2 + FAT','Place queens without row, column or diagonal conflicts.','Diagonal conflict: |c₁−c₂|=|r₁−r₂|. One queen per recursive row.','Placement vector/stack use O(n) space. Safety-check costs affect the exact backtracking bound.'],
['knight','Knight’s tour','CAT 2 + FAT','Visit every board square exactly once.','Warnsdorff: try the legal unvisited neighbor with minimum onward degree.','Heuristic is not a guarantee. Material board and bounds remain 8×8 after reading n.'],
['hamilton','Hamiltonian path & cycle','CAT 2 + FAT','Visit every vertex once; a cycle also returns to the start.','After n vertices, cycle must test edge(last,start).','Code under the cycle heading only checks a path; count==n does not verify the closing edge.'],
['apples','Alice’s apples','CAT 2 + FAT','At coordinate (i,j), apples=|i|+|j|.','For −n…n in both axes: apples=2n(n+1)(2n+1); perimeter=8n.','Material formula 4n(n+1)(2n+1)/3 conflicts with this model: n=1 gives 8 instead of the demonstrated 12.']
].map(([id,name,group,summary,formula,trap])=>({id,name,group,summary,formula,trap}));
const BANK=[];
function add(topic,type,level,prompt,answer,distractors,explain,code='',tag='Concept practice'){
 BANK.push({id:'q'+String(BANK.length+1).padStart(4,'0'),topic,type,level,prompt,code,tag,explain,
 options:[{text:String(answer),correct:true,why:explain},...distractors.map(([text,why])=>({text:String(text),correct:false,why}))]});
}
function q(t,p,a,d,e,code='',type='Concept',level='Core',tag='Concept practice'){add(t,type,level,p,a,d,e,code,tag);}
const records=[
['sieve','Why start marking multiples of prime p at p²?','Smaller multiples were covered by smaller prime factors','Every kp with 2≤k<p already has a prime factor smaller than p.','To avoid marking odd composites|Odd composites must also be marked.','Because p² is prime|p² is composite when p≥2.','To halve the flag array|The array still covers 0 through N.'],
['sieve','Standard simple-sieve time complexity?','O(N log log N)','Summing N/p over primes p gives the standard sieve bound.','O(N²)|It is not a full quadratic scan.','O(log N)|At least the flags/output must be traversed.','O(N)|Repeated prime-multiple marking adds a log log N factor.'],
['sieve','Why mark both 0 and 1 as nonprime?','A prime must be at least 2 and have exactly two positive divisors','0 and 1 do not satisfy the definition of prime.','They are negative|Both are nonnegative.','They are even|1 is odd.','All small numbers are composite|2 and 3 are prime; 1 is neither prime nor composite.'],
['segment','Index representing 103 when L=100?','3','Relative index=103−100=3.','103|The segment uses relative indices.','100|L maps to index 0.','2|Subtracting L gives 3, not 2.'],
['segment','Base primes are needed up to which limit?','floor(sqrt(R))','Every composite ≤R has a prime factor ≤√R.','Only L|Factors may be smaller or larger than this limit.','R²|That is unnecessarily large.','Only 2 and 3|49 also needs factor 7.'],
['segment','Storage including base and segment flags, for W=R−L+1?','O(sqrt(R)+W)','Base flags use O(√R), segment flags O(W).','O(1)|The arrays grow with the limits.','O(R²)|No matrix is allocated.','O(log R)|The segment itself has W flags.'],
['phi','For a prime p, φ(p) is:','p−1','Every integer 1 through p−1 is coprime to p.','p|p is not coprime to itself.','1|All p−1 smaller positive numbers are coprime.','p/2|That is not a general prime rule.'],
['phi','Why strip all powers of factor i before updating r?','Each distinct prime contributes once','φ uses one (1−1/p) factor per distinct prime divisor.','Every repeated power contributes again|That would undercount φ.','To sort n|Division does not sort.','To force r=n|r is a separate accumulator.'],
['phi','What does the final if(n>1) account for?','A remaining prime factor','After trial division, any leftover >1 is a prime factor.','A negative factor|The method assumes positive n.','A repeated factor already removed|Those no longer remain in n.','A need to make r even|That is not the purpose of the condition.'],
['strobo','Valid middle digits for an odd-length strobogrammatic string?','0, 1 and 8','The middle digit must map to itself under rotation.','0,1,6,8,9|6 and 9 rotate into each other, not themselves.','Only 0|1 and 8 also map to themselves.','All digits|2,3,4,5,7 are invalid in the course mapping.'],
['strobo','Is 69 strobogrammatic?','Yes','Reversing position and rotating 6↔9 gives 69 again.','No, because 6 is not self-mapping|6 pairs with 9 at the opposite position.','Only if it is a palindrome|Strobogrammatic is not the same as a usual palindrome.','Only in binary|This is the stated decimal-digit rotation mapping.'],
['crt','Basic CRT uniqueness modulo the product requires:','Pairwise coprime moduli','Each pair of moduli must have gcd 1.','All moduli prime|Composite moduli like 4 and 9 also work.','All moduli odd|2 and 3 work too.','All moduli equal|Equal moduli generally are not pairwise coprime.'],
['crt','Inverse of 3 modulo 5?','2','3×2=6≡1 mod 5.','3|3×3 mod 5=4.','4|3×4 mod 5=2.','5|3×5 mod 5=0.'],
['crt','Does 6 have an inverse modulo 9?','No','gcd(6,9)=3≠1, so an inverse does not exist.','Yes, 3|6×3 mod 9=0.','Yes, 6|6×6 mod 9=0.','Yes, 1|6×1 mod 9=6.'],
['gcd','Correct recursive base case for nonnegative inputs?','if(b==0) return a;','The final nonzero remainder is the gcd.','if(b==0) return 1;|gcd(a,0)=a, not always 1.','if(a==b) return 0;|Equal positive inputs have that positive gcd.','return gcd(a,b);|The state never decreases.'],
['gcd','Iterative Euclid auxiliary space?','O(1)','Only a, b and a temporary variable are needed.','O(log min(a,b))|That describes recursive stack depth.','O(a*b)|There is no table.','O(a+b)|The number of variables stays constant.'],
['karatsuba','Which expression recovers ad+bc?','(a+b)(c+d)−ac−bd','Expanding the first product and subtracting ac and bd leaves the cross terms.','ac+bd|These are the outer products.','(a−b)(c−d)|This gives ac−ad−bc+bd.','ac−bd|This does not contain the cross terms.'],
['karatsuba','Number of recursive multiplications per split?','3','Compute ac, bd and (a+b)(c+d).','2|A third product is required to recover cross terms.','4|That is ordinary split multiplication.','1|One product cannot supply all three terms.'],
['karatsuba','Standard n-digit recurrence?','T(n)=3T(n/2)+O(n)','Three half-size products plus linear additions lead to O(n^log₂3).','T(n)=2T(n/2)+O(1)|There are three products and nonconstant additions.','T(n)=4T(n/2)+O(n)|That is ordinary divide-and-conquer multiplication.','T(n)=T(n−1)+O(n)|Inputs are split roughly in half.'],
['flip','A valid one-flip sliding window contains:','At most one zero','One zero-to-one change can make the entire window ones.','Exactly one 1|Any number of ones is allowed.','No zero|That misses windows improved by a flip.','At most two zeros|One flip cannot repair two zeros.'],
['flip','Fixed-length array [1,1,1]: answer after at most one flip?','3','No flip is needed; the answer cannot exceed the array length.','4|A flip cannot add a position.','2|All three ones are already consecutive.','0|There is already a length-three run.'],
['nibble','n & 0x0F extracts:','Lower four bits','00001111 preserves only the low nibble.','Upper four bits|Use mask 0xF0 for those.','Only the sign bit|The mask selects four low positions.','Bitwise complement|That operator is ~.'],
['nibble','Swapping nibbles twice produces:','The original byte','The two halves exchange positions twice.','Zero|The swap is reversible.','The complement|Bits are moved, not inverted.','Double the byte|This is not multiplication.'],
['product','Why retain the minimum running product?','Multiplication by a negative may turn it into the maximum','A negative reverses order, so the smallest prior product can become largest.','To sort the input|Contiguity depends on preserving order.','All products are positive|They can be negative or zero.','Only to find the minimum element|A running product can span several elements.'],
['product','Why reset a zero running product to 1 before processing the next element?','Start a new segment after zero','1 is the multiplicative identity; zero otherwise poisons all later products.','Ignore all negative elements|Negatives may form the best product.','Make the answer zero|That is not always optimal.','Because 1 is prime|1 is not prime.'],
['hourglass','Cells in one 3×3 hourglass?','7','Three top + one center + three bottom =7.','9|Middle-left and middle-right are excluded.','5|Both outer rows contribute three.','6|Do not omit the center.'],
['hourglass','Safe initial maximum when all valid sums might be negative?','Integer.MIN_VALUE or the first valid sum','Zero would incorrectly beat every negative candidate.','0|Zero might not be a valid sum.','Integer.MAX_VALUE|No candidate would exceed it.','1|This also incorrectly beats negative candidates.'],
['equilibrium','Right sum excluding current a[i]?','total−left−a[i]','total=left+a[i]+right.','total−left|This includes a[i].','total+left|This double-counts left.','left−a[i]|This does not represent the right side.'],
['equilibrium','Why must the center convention be stated?','Including the center changes the reported sum','At a balanced index, each including-center sum is the excluding sum plus a[i].','It always changes array length|The array is unchanged.','It changes Java indexing|Indices still start at zero.','There is no difference|The values differ by a[i], unless it is zero.'],
['leaders','Which is always a leader in a nonempty array?','The rightmost element','No elements follow it.','The leftmost element|A larger element may follow it.','Only the minimum|A minimum may have larger values to its right.','Every even index|Index parity is irrelevant.'],
['majority','Minimum majority frequency when n=8?','5','Majority is strictly more than 8/2=4.','4|Exactly half is insufficient.','3|Below half.','2|Below half.'],
['majority','Why verify the Boyer–Moore candidate?','A candidate can exist without a majority','For [1,2,3], selection gives a candidate but none occurs more than half the time.','To sort the array|Verification counts occurrences.','To double its value|Its numeric value is not modified.','Because selection always fails|It succeeds when a majority exists.'],
['rotation','Correct reversal sequence for left rotation by d?','Reverse first d, reverse rest, reverse all','Reversing both blocks then the full array exchanges block order while restoring each block internally.','Reverse all only|That reverses, rather than rotates.','Sort then reverse|Sorting destroys cyclic order.','Swap endpoints only|One swap does not generally rotate an array.'],
['rotation','Why normalize d %= n for n>0 and d≥0?','A full rotation of n elements changes nothing','Distances differing by multiples of n are equivalent.','It makes d=n|The remainder is below n.','It makes all array values positive|Only d is modified.','It sorts the array|Modulo is not sorting.'],
['booth','For (Q₀,Q₋₁)=10, arithmetic action before shifting?','A=A−M','10 subtracts; 01 adds; 00/11 do neither.','A=A+M|Addition belongs to 01.','A=0|The accumulator is not reset.','No add/subtract|That belongs to 00 or 11.'],
['booth','Why arithmetic-right-shift A?','Preserve its sign bit','Signed two’s-complement processing needs sign extension.','Always insert zero|That is a logical shift.','Reverse bit order|A shift does not reverse bits.','Double the value|A left shift doubles within range.'],
['booth','For n-bit inputs, standard Booth iteration count?','n','One pair decision and one combined shift per multiplier bit.','2ⁿ|It does not enumerate bit strings.','n²|There are n iterations; bit-level addition cost is separate.','Always 1|Multiple bits need multiple steps.'],
['lexpal','Palindrome rearrangement is possible when:','At most one character frequency is odd','Pairs occupy mirrored positions; only one middle can be unpaired.','Every character is distinct|Distinct multi-character strings usually fail.','Exactly two frequencies are odd|There is only one middle position.','Input is already sorted|Sorting is not a feasibility condition.'],
['lexpal','Smallest palindrome from aabbcc?','abccba','Sorted half abc followed by its reverse gives abccba.','cabbac|Palindrome, but lexicographically larger.','aabbcc|Not a palindrome.','abcabc|Not a palindrome.'],
['natural','Natural order of file10, file2, file1?','file1 file2 file10','Numeric runs compare as 1<2<10.','file1 file10 file2|That is lexical order.','file10 file2 file1|Descending numeric order.','file2 file1 file10|1 must precede 2.'],
['josephus','Convert zero-based survivor r to one-based person:','r+1','Index 0 corresponds to person 1.','r−1|Wrong direction.','r|Still zero-based.','2*r|Conversion is an offset, not scaling.'],
['josephus','Plain recursive J(n,k) stack space?','O(n)','The chain visits sizes n,n−1,…,1.','O(1)|Waiting calls consume frames.','O(log n)|Size decreases by one, not halves.','O(n²)|There are n frames, not a matrix.'],
['permutations','Number of distinct arrangements of AABC?','12','4!/2!=12 because two A characters are identical.','24|Counts swapping identical As twice.','6|There are four positions.','4|Each first-character choice has several suffixes.'],
['permutations','Why sort before unique ordered backtracking?','Group duplicates and emit lexical order','Adjacent duplicates support skipping; ascending traversal gives sorted output.','Remove repeated occurrences|Each occurrence is still used.','Make every permutation a palindrome|Sorting does not enforce symmetry.','Reduce output count to n|Output count remains n!/∏f!.'],
['grid','Number of right/down paths in a 1×c grid?','1','There is only the all-right route.','c|Cells are not routes.','0|The destination is reachable.','2ᶜ|There are no down choices.'],
['grid','Time for the full r×c DP table?','O(r*c)','Each of rc cells is computed from at most two neighbors.','O(1)|Each state is processed.','O(2^(r+c))|That is a bound for branching recursion, not table DP.','O(r+c)|There are rc states.'],
['selection','Does ordinary selection sort become linear on sorted input?','No, it still scans every suffix','Its minimum search still performs quadratically many comparisons.','Yes, it stops after one comparison|No such early exit exists.','Yes, it skips the outer loop|Loop bounds do not depend on sortedness.','It becomes logarithmic|Each suffix minimum still needs scanning.'],
['quick','Last-element-pivot quicksort can be quadratic on:','Already sorted input','Repeated 0 versus n−1 partitions give a quadratic total.','Only prime values|Primality is irrelevant.','Balanced partitions|Those produce O(n log n).','No input|A quadratic worst case exists.'],
['quick','Lomuto partition returns:','The pivot’s final index','The pivot is moved to i+1 and that index is returned.','Maximum value|It returns an index, not an element.','Total recursive calls|Partition does not count calls.','Always midpoint|The position depends on the data.'],
['weighted','Why use HashSet<String>?','Count each distinct substring value once','Different start/end positions can produce identical strings.','Preserve duplicates|A set deduplicates.','Guarantee sorted iteration|HashSet is not sorted.','Count subsequences|The loops build contiguous substrings.'],
['weighted','Breaking when weight>K is valid when weights are:','Nonnegative','Appending more nonnegative weight cannot restore validity.','Arbitrarily negative|A later negative could lower the sum.','All distinct|Distinctness says nothing about monotonic sums.','Always decreasing|Decreasing alone does not exclude negative weights.'],
['hyphen','Move hyphens to front in a-b--cd:','---abcd','There are three hyphens; remaining letters keep their order.','abcd---|This moves hyphens to the end.','---dcba|Letter order changed.','--abcd|One hyphen is missing.'],
['manacher','Mirror index around center c?','2*c−i','The midpoint of i and mirror must be c.','c+i|Not a reflection about c.','i−2*c|Sign is reversed.','c/2|The mirror depends on i.'],
['manacher','Purpose of separator characters?','Handle even and odd palindromes uniformly','Even original palindromes become centered on a separator.','Sort the string|Order is unchanged.','Remove duplicates|Characters are not removed.','Make every substring palindromic|The transformation does not create that property.'],
['combination','Recurse with i rather than i+1 to:','Allow reuse of the current candidate','The next call may choose the same candidate again.','Forbid reuse|i+1 forbids that position.','Produce every ordering|Nondecreasing indices prevent order duplicates.','Stop recursion immediately|The target controls stopping.'],
['combination','Why require positive candidates in the shown reuse recursion?','A zero can prevent progress and cause infinite recursion','Subtracting zero leaves target and index unchanged.','Negatives always make target zero|They can instead increase it.','Positive numbers are all prime|Many positive numbers are composite.','It sorts the candidates|Positivity does not imply sortedness.'],
['maze','Why test bounds before indexing a[i][j]?','Prevent out-of-bounds access','Short-circuit || returns before indexing an invalid coordinate.','To sort neighbors|No sorting occurs.','To permit diagonal moves|Directions are a separate rule.','To enumerate every path|Bounds checks do not determine enumeration.'],
['maze','a[i][j]=2 in the supplied code marks:','A cell on the current explored path','Only cells equal to 1 can be entered, so marking also prevents revisits.','An original obstacle|Obstacles are 0.','A cell with two exits|This is a marker, not a degree.','Only the destination|Every entered cell is marked.'],
['queens','Diagonal conflict test?','abs(c1−c2)==abs(r1−r2)','A diagonal has equal absolute row/column displacement.','c1+c2==r1+r2|Not the general test.','c1!=c2|Different columns can still share a diagonal.','r1*r2==c1*c2|Products do not describe these diagonals.'],
['queens','4-Queens solutions counting mirrors separately?','2','They are [2,4,1,3] and [3,1,4,2] with one-based columns.','1|The mirror is counted separately.','4|Only two satisfy all constraints.','0|Both stated placements are valid.'],
['knight','Warnsdorff chooses the neighbor with:','Fewest onward unvisited moves','Constrained squares are tried first to reduce trapping.','Most onward moves|Opposite to the heuristic.','Largest row index|Row number is not the rule.','Shortest distance to the start|Distance to start is not the degree rule.'],
['knight','Legal knight displacement?','(±1,±2) or (±2,±1)','Move two squares on one axis and one on the other.','(±1,±1)|That is a one-step diagonal.','(0,±2)|The second axis must change too.','(±2,±2)|That is a diagonal, not an L.'],
['hamilton','Extra requirement for a Hamiltonian cycle versus a path?','Edge from last vertex back to first','The cycle must close after visiting each vertex once.','Visit every edge|That concerns Eulerian traversal.','A self-loop at every vertex|Self-loops do not close the endpoint pair.','Vertices in numeric order|Labels do not define edges.'],
['apples','For |i|+|j| apples on coordinates −n…n, total is:','2*n*(n+1)*(2*n+1)','Σ|i|=n(n+1); there are 2n+1 copies per axis and two axes.','4*n*(n+1)*(2*n+1)/3|This material formula gives 8 at n=1, contradicting the model’s 12.','n*n|Grid points have varying weights.','8*n|That is perimeter, not apple count.'],
['apples','Perimeter of a square spanning −n to n?','8*n','Side=2n, perimeter=4×2n.','4*n|The side is 2n, not n.','2*n|That is one side.','n*n|That resembles area, not perimeter.']
];
for(const [t,p,a,e,...ds] of records){
 let type=/complexity|time|space|recurrence/i.test(p)?'Complexity':/index|count|formula|φ|frequency|perimeter|total is|test\?/i.test(p)?'Formula':'Concept';
 q(t,p,a,ds.map(s=>s.split('|')),e,'',type);
}
const codeRows=[
['java','What is printed?','2','Integer operands use integer division, truncating the fraction.','System.out.println(5/2);','2.5|Both operands are ints.','3|Division truncates rather than rounding.','Compilation error|Integer division is legal.'],
['java','What is printed?','23','Left-to-right: ""+2 becomes "2", then append 3.','System.out.println(""+2+3);','5|The first String makes + concatenate.','6|There is no multiplication.','Compilation error|Strings can concatenate integers.'],
['java','What is printed?','5x','2+3 is numeric first, then the result is concatenated with x.','System.out.println(2+3+"x");','23x|The first addition has no String operand.','x5|Operand order is unchanged.','Compilation error|This is legal concatenation.'],
['java','What is printed?','false true','== compares references; equals compares String content.','String a=new String("java"), b="java";\nSystem.out.println((a==b)+" "+a.equals(b));','true true|new creates a distinct reference.','false false|The contents are equal.','true false|Both predictions are reversed.'],
['java','What is printed?','6 4','x++ yields 2 and leaves 3; ++x yields 4 and leaves 4. Sum=6.','int x=2;\nint y=x++ + ++x;\nSystem.out.println(y+" "+x);','5 4|The second increment happens before yielding its value.','6 3|Both increments affect x.','5 3|This misses the second pre-increment.'],
['java','What happens?','Compilation error','Local variables must be assigned before use.','int x;\nSystem.out.println(x);','Prints 0|Local variables do not receive usable default initialization.','Prints null|x is primitive int.','Runtime exception|Definite-assignment checking rejects it earlier.'],
['java','What is printed?','false 0','&& skips its right operand when the left is false.','int x=0;\nboolean b=false && (++x>0);\nSystem.out.println(b+" "+x);','false 1|++x is never evaluated.','true 1|A conjunction with false is false.','true 0|The boolean cannot be true.'],
['java','What is printed?','1','substring(1,2) is b: inclusive start, exclusive end.','System.out.println("abcd".substring(1,2).length());','2|The end index is excluded.','bc|The code prints length, not contents.','Compilation error|This call chain is valid.'],
['java','What is printed?','-2','Java integer division truncates toward zero; −7=(−1)×5+(−2).','System.out.println(-7%5);','2|Remainder has the dividend’s sign.','3|That would be nonnegative mathematical modulo.','-3|This is not the remainder from truncated division.'],
['java','What is printed?','2147483647','−1 has all bits set; unsigned shift inserts a zero sign bit.','System.out.println(-1 >>> 1);','-1|That is arithmetic >>, not >>>.','0|Only one bit is shifted.','4294967295|The resulting int has its top bit zero.'],
['java','What happens?','ArithmeticException','Integer division by zero throws at runtime.','int z=0;\nSystem.out.println(5/z);','Infinity|That behavior applies to floating-point division.','0|No integer result exists.','NaN|NaN is floating-point, not int.'],
['java','What is printed (ignoring trailing spaces)?','B C','Execution begins at case 2 and falls through without break.','int x=2;\nswitch(x){\n case 1: System.out.print("A ");\n case 2: System.out.print("B ");\n case 3: System.out.print("C");\n}','B|There is no break after B.','A B C|Execution jumps directly to matching case 2.','C|Case 2 prints first.'],
['java','What is printed?','9','Both references point to the same array.','int[] a={1,2};\nint[] b=a;\nb[0]=9;\nSystem.out.println(a[0]);','1|Reference assignment does not copy contents.','0|The element is explicitly changed.','Compilation error|Array reference assignment is legal.'],
['java','What is printed?','abc','String is immutable; concat returns a new String that is discarded.','String s="abc";\ns.concat("d");\nSystem.out.println(s);','abcd|s is never reassigned.','d|The original reference still holds abc.','Compilation error|Ignoring the return value is legal.'],
['java','What is printed?','7','Decimal digit character codes are consecutive.','System.out.println(\'7\'-\'0\');','55|Subtracting the code of 0 converts the digit to its value.','0|The characters are different.','Compilation error|char subtraction produces int.'],
['sieve','For n=0, what happens in this literal fragment?','ArrayIndexOutOfBoundsException','The array has one entry; index 1 is invalid.','int n=0;\nboolean[] prime=new boolean[n+1];\nprime[0]=false;\nprime[1]=false;','No error|prime[1] is outside the array.','Compilation error|Index bounds are checked at runtime.','Creates two entries|n+1 is 1.'],
['strobo','Literal material logic on input "2" prints:','yes','l=r=0, so while(l<r) is skipped and p stays true. Mathematically 2 is not strobogrammatic.','String s="2";\nint l=0,r=s.length()-1;\nboolean p=true;\n// Pair-check loop runs only while(l<r)\nSystem.out.println(p?"yes":"no");','no|That is the correct classification, not this flawed code’s output.','2|The output is yes/no.','Runtime exception|No character is accessed.'],
['majority','Before any array input, what is printed?','0','Java initializes every int array element to zero; the material omits element input.','int[] a=new int[4];\nSystem.out.println(a[2]);','Unpredictable value|Java arrays are initialized.','1|The default is zero.','Compilation error|The allocation and access are valid.'],
['leaders','Using the material’s >= rule, the leaders are:','5 5 3','Scanning right accepts 3 then both equal 5s; reverse to original order.','int[] a={5,5,3};\n// scan right-to-left; accept a[i]>=maxRight\n// print accepted leaders in original order','5 3|That is the strict > version.','3|Both 5s satisfy ≥.','5 5|The rightmost element also qualifies.'],
['hamilton','What does this base case establish?','A path visiting all vertices, not necessarily a cycle','It does not test the edge from the last vertex to the start.','// vertices are added only if adjacent and unvisited\nif(count==n) return true;','Always a Hamiltonian cycle|Closure is not checked.','An Euler cycle|Edges are not the visited objects.','A minimum spanning tree|Weights and spanning-tree costs are not considered.'],
['booth','Why mask Q before combining the halves?','Prevent sign extension of Q','A negative int widened to long otherwise fills the upper 32 bits with ones.','return ((long)A<<32) | (Q & 0xffffffffL);','Erase A|The mask only applies to Q.','Set every bit of Q|AND preserves low bits; it does not set them all.','Shift Q by 32|A mask is not a shift.'],
['natural','Bug in this literal digit loop?','c never changes as i advances','The cached digit repeats, and the loop can consume nondigit suffixes. Read a.charAt(i) each step.','char c=a.charAt(i);\nwhile(i<a.length() && Character.isDigit(c)){\n n1=n1*10+(c-\'0\');\n i++;\n}','i never changes|The loop has i++.','Character.isDigit rejects digits|It correctly recognizes digits.','No bug|The character must be refreshed.'],
['hourglass','Why is this update wrong for maximum individual hourglass sum?','It adds different placements together','Reset sum at each (i,j) and update the maximum inside the inner loop.','for(int i=0;i<r-2;i++){\n int s=0;\n for(int j=0;j<c-2;j++) s+=hourglass(i,j);\n max=Math.max(max,s);\n}','It sorts the matrix|No sorting occurs.','It always skips the center|That depends on hourglass(), not +=.','No bug|This computes a row aggregate.'],
['manacher','Radius p[3] for transformed #a#b#a# with this expansion?','3','Pairs at distances 1,2,3 all match, including the outer separators.','while(i+p[i]+1<n && i-p[i]-1>=0 &&\n t.charAt(i+p[i]+1)==t.charAt(i-p[i]-1)) p[i]++;','2|This omits the outer separator pair.','7|Seven is the transformed length, not radius.','1|There are further matching pairs.'],
['rotation','What does three-reversal code implement?','The reversal algorithm for left rotation','It rotates by reversing the two blocks and the full range; it is not block-swap recursion.','reverse(a,0,d-1);\nreverse(a,d,n-1);\nreverse(a,0,n-1);','Selection sort|There is no minimum selection.','A right rotation by d in general|This order left-rotates by d.','Swapping two endpoints only|Each call reverses an entire range.']
];
for(const [t,p,a,e,code,...ds] of codeRows)q(t,p,a,ds.map(s=>s.split('|')),e,code,t==='java'?'Output':(/literal|bug|wrong|material|base case|mask|Radius/.test(p)?'Code trap':'Code purpose'),'Core',t==='java'?'Java practice':'Material code check');
q('java','Which expression gives an array’s length?','a.length',[['a.length()','Array length is a field.'],['a.size()','That is a collection method.'],['length(a)','Java has no built-in global length function.']],'Use a.length for arrays, s.length() for String, and list.size() for lists.');
q('java','Ordinary int overflow in Java:','Wraps in 32-bit two’s-complement arithmetic',[['Always throws','Ordinary overflow is not checked.'],['Automatically becomes long','The declared type does not change.'],['Becomes a fraction','Overflow does not change to floating point.']],'Integer.MAX_VALUE+1 becomes Integer.MIN_VALUE.');
q('java','continue inside a loop means:','Skip the rest of this iteration',[['Exit the loop','That is break.'],['Return from the method','That is return.'],['Restart the whole program','It only affects the enclosing loop.']],'Execution proceeds to the loop’s update/next condition.');
function numeric(t,p,a,e,code='',type='Output',level='Core'){
 const values=[a+1,a-1,a+2,a-2,a+3,a+5,a*2+1].filter(v=>v>=0&&v!==a);
 q(t,p,String(a),[...new Set(values)].slice(0,3).map(v=>[String(v),'This does not match the trace. '+e]),e,code,type,level,'Numeric drill');
}
const gcd=(a,b)=>b?gcd(b,a%b):a;
for(const [a,b] of [[48,18],[56,42],[81,27],[100,35],[17,13],[270,192],[144,60],[63,28]]){
 let x=a,y=b,steps=[];while(y){steps.push(x+'%'+y+'='+x%y);[x,y]=[y,x%y];}
 numeric('gcd','What is printed?',x,steps.join(' → ')+'. Last nonzero value: '+x+'.','int a='+a+', b='+b+';\nwhile(b!=0){int t=b; b=a%b; a=t;}\nSystem.out.println(a);');
}
for(const n of [8,9,10,12,15,16,18,20,24,30,36,49,60,100]){
 let a=Array.from({length:n},(_,i)=>i+1).filter(k=>gcd(k,n)===1).length;
 let m=n,ps=[];for(let p=2;p*p<=m;p++){if(m%p===0){ps.push(p);while(m%p===0)m/=p;}}if(m>1)ps.push(m);
 numeric('phi','Find φ('+n+').',a,n+' × '+ps.map(p=>'(1−1/'+p+')').join(' × ')+' = '+a+'.','','Formula');
}
for(const n of [10,15,20,25,30,40,50]){
 const ps=Array.from({length:n-1},(_,i)=>i+2).filter(v=>{for(let k=2;k*k<=v;k++)if(v%k===0)return false;return true;});
 numeric('sieve','Number of primes from 2 through '+n+'?',ps.length,'Primes: '+ps.join(', ')+'. Count='+ps.length+'.');
}
for(const [L,p] of [[10,3],[20,3],[30,7],[50,7],[100,11],[25,5],[41,3],[80,7]]){
 let a=Math.max(p*p,Math.ceil(L/p)*p);
 numeric('segment','L='+L+', p='+p+': first marking value (R large enough)?',a,'max('+p*p+', '+Math.ceil(L/p)*p+') = '+a+'. Use max(p²,ceil(L/p)×p).','','Formula');
}
for(const n of [1,15,16,31,64,85,100,128,171,240,255]){
 let a=((n&15)<<4)|((n&240)>>4);
 numeric('nibble','Output for n='+n+'?',a,n.toString(2).padStart(8,'0')+' → '+a.toString(2).padStart(8,'0')+' = '+a+'.','System.out.println(((n&15)<<4)|((n&240)>>4));');
}
for(const [n,k] of [[5,2],[7,3],[8,2],[10,2],[6,3],[9,4],[1,5],[12,3]]){
 let a=0,tr=[0];for(let i=2;i<=n;i++){a=(a+k)%i;tr.push(a);}
 numeric('josephus','n='+n+', k='+k+': 1-based survivor?',a+1,'Zero-based values for sizes 1…'+n+': '+tr.join(', ')+'. Add 1 to the final value.');
}
function choose(n,k){let v=1;for(let i=1;i<=k;i++)v=v*(n-i+1)/i;return Math.round(v);}
for(const [r,c] of [[2,2],[2,4],[3,3],[3,4],[4,4],[3,5],[1,8],[5,5]])
 numeric('grid',r+'×'+c+' grid: number of right/down paths?',choose(r+c-2,r-1),'Choose '+(r-1)+' down moves from '+(r+c-2)+' total: C('+(r+c-2)+','+(r-1)+')='+choose(r+c-2,r-1)+'.','','Formula');
for(const [r,c] of [[3,3],[4,4],[6,6],[3,5],[5,7],[7,4]])
 numeric('hourglass','Hourglass placements in '+r+'×'+c+'?',(r-2)*(c-2),'('+r+'−2)×('+c+'−2)='+(r-2)*(c-2)+'.','','Formula');
for(const n of [3,4,5,6,8,10])
 numeric('selection','Comparison count in the exact loop for n='+n+'?',n*(n+1)/2,'j starts at i, including self-comparisons: n(n+1)/2='+n*(n+1)/2+'.','for(int i=0;i<n;i++){\n int min=i;\n for(int j=i;j<n;j++)\n  if(a[j]<a[min]) min=j;\n}','Complexity','Challenge');
for(const arr of [[2,3,-2,4],[-2,0,-1],[-2,3,-4],[0,-2,-3,0,4],[-1],[-1,-2,-3],[1,2,3,4],[-2,-3,0,-2,-40]]){
 let best=-Infinity,sub=[];for(let i=0;i<arr.length;i++){let p=1;for(let j=i;j<arr.length;j++){p*=arr[j];if(p>best){best=p;sub=arr.slice(i,j+1);}}}
 let e='Subarray ['+sub+'] has product '+best+'; exhaustive contiguous candidates give no greater value.';
 q('product','Maximum nonempty contiguous product in ['+arr+']?',String(best),[best+1,best+2,best+3].map(v=>[String(v),'Not the maximum. '+e]),e,'','Output','Core','Numeric drill');
}
for(const s of ['11011','1011011','000','1110','10001','01110','1100111','101010']){
 let best=0,l=0,z=0;for(let r=0;r<s.length;r++){if(s[r]==='0')z++;while(z>1){if(s[l++]==='0')z--;}best=Math.max(best,r-l+1);}
 numeric('flip','Fixed-length '+s+': longest run after at most one flip?',best,'The longest contiguous window with at most one zero has length '+best+'. No extra positions are added.');
}
for(const [a,b] of [[12,13],[21,14],[23,12],[31,22],[14,15],[42,13]]){
 let ah=Math.floor(a/10),al=a%10,bh=Math.floor(b/10),bl=b%10;
 numeric('karatsuba','Split '+a+' and '+b+' into tens/units. Cross term ad+bc?',ah*bl+al*bh,'('+ah+'+'+al+')('+bh+'+'+bl+')−'+ah*bh+'−'+al*bl+'='+(ah*bl+al*bh)+'.','','Formula');
}
for(const [m1,m2,a1,a2] of [[3,5,2,3],[4,5,1,2],[5,7,3,4],[3,7,1,2],[4,9,3,5],[2,5,1,4]]){
 let x=0;while(x%m1!==a1||x%m2!==a2)x++;
 numeric('crt','Least x≥0 with x≡'+a1+' (mod '+m1+'), x≡'+a2+' (mod '+m2+')?',x,x+'%'+m1+'='+a1+' and '+x+'%'+m2+'='+a2+'. Repeat modulo '+m1*m2+'.','','Formula');
}
for(const x of [1,12,13,60,61,168,169,360,1000]){
 let n=0;while(2*n*(n+1)*(2*n+1)<x)n++;
 numeric('apples','For |i|+|j| model, minimum perimeter to collect at least '+x+' apples?',8*n,'Radius '+n+' gives '+2*n*(n+1)*(2*n+1)+' apples; radius '+(n-1)+' gives '+2*(n-1)*n*(2*n-1)+'. Perimeter=8×'+n+'='+8*n+'.','','Formula','Challenge');
}
// Additional tracing across string, backtracking and array topics.
for(const [s,a] of [['aabb','abba'],['aaabb','ababa'],['aabbcc','abccba'],['aaaabbbb','aabbbbaa'],['abc','Not possible']]){
 q('lexpal','Lexicographically first palindrome from "'+s+'"?',a,
 [['Reverse the input only','Reversal alone does not enforce palindrome symmetry or minimum order.'],['Keep the input unchanged','Check symmetry and half-count ordering; that is not the result for this input.'],['Empty string','The task must use all supplied characters.']],
 a==='Not possible'?'More than one odd frequency prevents a palindrome.':'Build the sorted half, add the odd middle if any, then mirror: '+a+'.','','Output','Core','Numeric drill');
}
for(const [arr,d] of [[[1,2,3,4,5],2],[[2,4,6,8],1],[[1,2,3,4,5,6,7],3],[[9,8,7,6,5],6]]){
 let k=d%arr.length,a=arr.slice(k).concat(arr.slice(0,k)).join(' ');
 let right=arr.slice(-k).concat(arr.slice(0,-k)).join(' ');
 q('rotation','Left rotate ['+arr+'] by '+d+':',a,
 [[arr.join(' '),'This leaves the array unchanged.'],[right,'This is rotation in the opposite direction.'],[arr.slice().reverse().join(' '),'This reverses order rather than rotating.']],
 'Normalize d='+k+'. Move the first '+k+' entries to the end: '+a+'.','','Output','Core','Numeric drill');
}
for(const [n,a] of [[1,1],[2,0],[3,0],[4,2]]){
 numeric('queens','Number of standard '+n+'-Queens solutions (mirrors separate)?',a,n===1?'The single cell holds one queen.':n<4?'No placement avoids all column and diagonal attacks.':'The solutions are [2,4,1,3] and [3,1,4,2].');
}
q('weighted','P="abc", weights a=1,b=2,c=3, K=3: number of distinct valid substrings?','4',[['3','ab is also valid, with weight 3.'],['5','bc has weight 5 and abc has weight 6.'],['6','Not all substrings satisfy the bound.']],'Valid strings are a, ab, b, c.','','Output');
q('weighted','P="aaa", weight(a)=1, K=2: number of distinct valid substrings?','2',[['5','That counts occurrences, not distinct values.'],['3','aaa weighs 3 and is invalid.'],['1','Both a and aa qualify.']],'The set is {a,aa}; repeated occurrences do not add new values.','','Output');
q('combination','Candidates [2,3,6,7], target 7, reuse allowed: combinations?','[2,2,3] and [7]',[['Only [7]','2+2+3 also sums to 7.'],['[2,3] and [7]','2+3=5, not 7.'],['[2,2,3], [2,3,2], [3,2,2], [7]','Order does not distinguish combinations.']],'Use nondecreasing candidate indices to avoid reordered duplicates.','','Output');
q('manacher','For "babad", which is a valid longest palindromic substring?','bab or aba (both length 3)',[['babad','The full string is not symmetric.'],['bad','bad is not a palindrome.'],['Only a single letter','Length-three palindromes exist.']],'Both bab and aba are longest. The material’s strict > update retains the first encountered one, bab.','','Output');
q('knight','Is Warnsdorff’s heuristic guaranteed to find a tour from every start with every tie-break?','No',[['Yes, always','A greedy heuristic can fail; backtracking may be required.'],['Only if the board has 64 cells','Board size alone does not guarantee every tie-break.'],['It never finds a tour','It is often effective.']],'Choosing minimum onward degree is a heuristic. The supplied implementation backtracks when a chosen continuation fails.');
q('hamilton','Undirected chain 1—2—3—4 has which property?','A Hamiltonian path but no Hamiltonian cycle',[['Both path and cycle','No edge 4—1 closes the chain.'],['Cycle only','A cycle would also imply a spanning path.'],['Neither','1,2,3,4 is a valid path.']],'The chain visits all four vertices in order; endpoints have degree 1 so no spanning cycle exists.','','Output');
q('equilibrium','For [1,3,5,2,2], equilibrium sum excluding the center at index 2?','4',[['9','That includes the center 5.'],['5','That is the center itself.'],['13','That is the total sum.']],'Left=1+3=4, right=2+2=4.','','Output');
q('equilibrium','For [1,3,5,2,2], equilibrium sum including the center at index 2?','9',[['4','That excludes the center.'],['5','That counts only the center.'],['13','That counts all elements, not either balanced side.']],'Prefix=1+3+5=9, suffix=5+2+2=9.','','Output');
q('quick','Lomuto partition [8,4,7,3,10,5], last pivot=5: resulting array?','4 3 5 8 10 7',[['3 4 5 7 8 10','That is fully sorted; one partition does not sort both sides.'],['8 4 7 3 10 5','That is the unchanged input.'],['5 4 3 8 10 7','The pivot must follow the two smaller values.']],'Move 4 then 3 into the low region, then swap pivot 5 into index 2.','','Output','Challenge');
q('selection','First minimum-selection pass on [64,25,12,22,11] gives:','11 25 12 22 64',[['11 12 22 25 64','That is the final sorted order, not one pass.'],['25 64 12 22 11','That resembles an adjacent swap, not selecting the global minimum.'],['64 25 12 22 11','The minimum 11 must move to the front.']],'Minimum 11 swaps with the first element 64.','','Output');
q('booth','If A=1110 in 4-bit two’s complement, arithmetic-right-shift A yields:','1111',[['0111','That is logical right shift, losing the sign.'],['1100','That is a left shift.'],['0000','The bits do not all vanish.']],'Replicate the sign bit 1: 1110 (−2) becomes 1111 (−1).','','Output');
q('booth','Using 4-bit operands, the product of −3 and 2 is:','11111010 (8-bit −6)',[['00000110','That is +6.'],['11111101','That is −3, not the product.'],['11110100','That is −12.']],'−3×2=−6; invert 00000110 and add one to get 11111010.','','Output');
const complexity=[
['phi','Trial-division totient time (original positive n)','O(sqrt(n))','The loop tests factors through the square root; divisions shrink n.'],
['strobo','Two-pointer strobogrammatic check time for length n','O(n)','At most a linear number of digit-pair checks.'],
['flip','One-zero sliding-window time for length n','O(n)','Both pointers move only forward, at most n positions each.'],
['nibble','One fixed-width byte nibble swap time','O(1)','A fixed number of masks, shifts and OR operations.'],
['product','Prefix/suffix maximum-product scan time','O(n)','One loop updates two products per index.'],
['equilibrium','Total-sum plus running-left equilibrium scan time','O(n)','One sum pass and one checking pass.'],
['leaders','Right-to-left leader scan time','O(n)','Each element is inspected once.'],
['majority','Boyer–Moore plus verification time','O(n)','Two linear passes remain linear.'],
['rotation','Iterative in-place block swap or three-reversal rotation time','O(n)','Total work is proportional to array length.'],
['lexpal','Fixed 26-letter count-and-build palindrome time','O(n)','Counting and constructing the output are linear.'],
['natural','Sorting n strings with O(L) natural comparisons (worst string length L)','O(n log n * L)','Comparison sorting uses O(n log n) comparisons, each scanning up to L characters.'],
['hyphen','Two-pass hyphen-moving time','O(n)','Two linear passes give O(n), not O(n²).'],
['manacher','Manacher core scan with linear preprocessing','O(n)','Previously computed radii avoid repeated full expansions.'],
['maze','Supplied reachability DFS with permanently closed dead ends, r×c grid','O(r*c)','Each cell is entered at most once; only four neighbors per cell.']
];
for(const [t,p,a,e] of complexity){
 let ds=['O(1)','O(log n)','O(n)','O(n log n)','O(n²)','O(2ⁿ)'].filter(x=>x!==a).slice(0,3);
 q(t,p+'?',a,ds.map(x=>[x,'This does not account for the stated work. '+e]),e,'','Complexity');
}
if(typeof module!=='undefined')module.exports={BANK,TOPICS};

