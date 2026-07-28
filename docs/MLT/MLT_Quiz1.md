# MLT Quiz 1 — Smart Preparation Module

*Built from 5 unique past papers: Oct 2024, Feb 2025, Jul 2025, Oct 2025 (two identical forms), Mar 2026. Every solved answer below was cross-checked against the accepted answer in the paper and re-verified numerically.*

**Before we begin.** Here is my promise to you: nothing in this exam requires brilliance. Every question falls into one of about a dozen patterns, and every pattern has a routine. We will learn the idea first — slowly, in plain language — then the shortcut, then we'll solve the actual exam question together. By the end, you won't be *hoping* to recognise questions on exam day; you'll be greeting them like old friends.

## 1. Exam decode — what actually appears

**Format.** Quiz 1 is a computer-based exam worth 40–50 marks, with 16–22 questions: a mix of MCQ (single answer), MSQ (multiple answers), and SA (numeric entry, usually accepted as a range so rounding is forgiven). Every paper contains 2–4 **comprehension sets**: one shared dataset followed by 2–4 subquestions. These sets are gold — crack the setup once, collect marks on every subquestion.

**Topic weights across the 5 papers** (approximate marks per paper):

| Topic | Oct'24 | Feb'25 | Jul'25 | Oct'25 | Mar'26 | Verdict |
| --- | --- | --- | --- | --- | --- | --- |
| PCA (covariance, variance, projections, residues, compression) | 14 | 14 | 12 | 14 | 15 | ~30% - highest priority |
| Kernels + Kernel PCA | 11 | 7 | 8 | 3 | 10 | ~20% |
| K-means / Lloyd's / K-means++ | 14 | 7 | 4 | 12 | 12 | ~20% |
| MLE | 12 | 3 | 3 | 0 | 0 | ~7%, easy marks |
| Bayesian (Beta posterior) | 0 | 4 | 0 | 4 | 0 | ~4%, formulaic |
| GMM + EM | 7 | 4 | 6 | 9 | 10 | ~15% |
| Linear regression | 0 | 0 | 7 | 0 | 0 | rare, know basics |

**The single most valuable finding:** questions repeat *verbatim* across papers. The Oct 2025 paper reused the Lloyd's-algorithm MSQ, the "5000 points in \(\mathbb{R}^{50}\)" question, the valid-kernels MSQ, and the Beta-posterior question — all from earlier papers, word for word. The two Oct 2025 forms (QDD4/QDF4) are 100% identical. If you can independently solve every question in these 5 papers, you have likely seen 40–60% of your actual exam already.

**Recurring question archetypes** (each appears in 3+ papers):

| # | Archetype | Where it appeared |
| --- | --- | --- |
| 1 | Compute covariance matrix of 3–8 small 2D points, then variance along PC1/PC2 | Jul'25, Oct'25, Mar'26 |
| 2 | Project a point onto a given PC direction; find projection length / residue | Oct'24, Feb'25, Mar'26 |
| 3 | % variance captured by top-k PCs from a list of eigenvalues | Oct'24, Oct'25 |
| 4 | Storage saved by keeping k PCs (compression arithmetic) | Feb'25, Jul'25 |
| 5 | Which functions are valid kernels? (MSQ) | Oct'24, Feb'25, Oct'25, Mar'26 |
| 6 | Find the feature map \(\phi\) for a given kernel | Oct'24, Jul'25 |
| 7 | K-means++: probability a point is picked as next centre | Oct'24, Feb'25, Oct'25, Mar'26 |
| 8 | Lloyd's algorithm true/false properties (MSQ) | Feb'25, Jul'25, Oct'25 |
| 9 | Run 1–2 iterations of K-means by hand on 4–7 points | Oct'24, Oct'25, Mar'26 |
| 10 | MLE for a named distribution (Bernoulli, Pareto, coin tosses) | Oct'24, Feb'25, Jul'25 |
| 11 | Beta prior + observed defectives -> posterior & posterior mean | Feb'25, Oct'25 |
| 12 | EM: E-step responsibility computation / M-step update | Oct'24, Feb'25, Oct'25, Mar'26 |

## 2. Module 1: PCA — the biggest scorer (~30% of the paper)

If you master only one module, make it this one. Nearly a third of every paper is PCA, and the questions are the most mechanical of all — which means they are the most **certain** marks on the paper for a prepared student.

### Concept, from zero

You have \(n\) data points in \(d\) dimensions. PCA finds the directions along which the data varies the most. Think of a flat cloud of points shaped like a rugby ball: the first principal component (PC1) is the long axis, PC2 the next-widest axis perpendicular to it, and so on.

The recipe is always the same four steps:

- **Centre the data:** subtract the mean vector from every point. (Papers punish those who skip this — see Solved 1.)

- **Build the covariance matrix:**

    \[ C = \frac{1}{n}\sum_{i=1}^{n} x_i x_i^{T} \quad (\text{after centring; note the } \tfrac1n, \text{ not } \tfrac{1}{n-1}) \]

- **Eigen-decompose \(C\):** the eigenvectors \(w_1, w_2, \dots\) (unit length) are the PCs; each eigenvalue \(\lambda_k\) is exactly the variance of the data along \(w_k\).

- **Project:** the coordinate of point \(x\) along PC \(w\) is the scalar \(x^{T}w\). The reconstruction using one PC is \(\hat{x} = (x^{T}w)\,w\), and the **residue** (reconstruction error) is \(x - \hat{x}\).

Useful consequences you must internalise:

- Variance along *any* unit direction \(v\) is \(v^{T}Cv\).

- Fraction of variance captured by top-\(k\) PCs \(= \dfrac{\lambda_1+\dots+\lambda_k}{\lambda_1+\dots+\lambda_d}\).

- If the data actually lives in an \(r\)-dimensional subspace, \(C\) has exactly \(r\) non-zero eigenvalues, and the residue vanishes after \(r\) components.

- Compression: storing top-\(k\) PCs for \(n\) points in \(\mathbb{R}^d\) costs \(dk\) (the PC vectors) \(+\ nk\) (each point's \(k\) coordinates), versus \(nd\) originally.

**Trick 1 — the magic 2×2 matrix.** Small 2D datasets in these papers almost always produce a covariance matrix of the form \(\begin{pmatrix} a & b \\ b & a \end{pmatrix}\). Its eigenvalues are simply \(a+b\) and \(a-b\), with eigenvectors \(\tfrac{1}{\sqrt2}(1,1)\) and \(\tfrac{1}{\sqrt2}(1,-1)\). No characteristic polynomial needed — read the answer off in five seconds.

**Trick 2 — symmetric point sets are already centred.** If the points come in \(\pm\) pairs (e.g. \((2,1),(1,2),(-2,-1),(-1,-2)\), or cube corners \((\pm1,\pm1,\pm1)\)), the mean is \(0\): skip centring and go straight to \(\frac1n\sum x_i x_i^T\).

**Trick 3 — rank spotting.** "Residue vanishes after \(k\) components" \(\iff k = \) rank of the data \(=\) number of linearly independent directions. If the question gives dependency relations among columns (e.g. \(c_4 = 2c_1 - c_2\)), count only the independent ones.

**Trick 4 — zero-variance directions.** If every data point satisfies a linear constraint \(a^{T}x = 0\), then \(a\) (normalised) is an eigenvector of \(C\) with eigenvalue \(0\) — a legitimate principal component with zero variance. Mar 2026 tested exactly this.

### Solved from the PYQs

Jul 2025, comprehension Q12–15 2+2+3 marks

**Q (parent stem):** Consider the data points \(x_1=(0,0),\ x_2=(2,1),\ x_3=(1,2)\). Standard PCA is run on this dataset.

**Q13 (MCQ, 2 marks).** Which of the following represents the covariance matrix \(C\)?

- (a) \(\frac13\begin{pmatrix}5&4\\4&5\end{pmatrix}\)

- (b) \(\frac13\begin{pmatrix}2&1\\1&2\end{pmatrix}\)

- (c) \(\frac13\begin{pmatrix}0&0&0\\0&5&4\\0&4&5\end{pmatrix}\)

- (d) \(\frac13\begin{pmatrix}0&0&0\\0&2&1\\0&1&2\end{pmatrix}\)

**Q14 (SA, 2 marks).** What is the variance of the dataset along the first principal component? *(Accepted answer: 1.)*

**Q15 (MCQ, 3 marks).** Find the residues \(x_i'\) after projecting the data points onto the first principal component.

- (a) \(x_1'=(0,0),\ x_2'=(0.5,0.5),\ x_3'=(0.5,0.5)\)

- (b) \(x_1'=(0,0),\ x_2'=(0.5,-0.5),\ x_3'=(-0.5,0.5)\)

- (c) \(x_1'=(0,0),\ x_2'=(1,2),\ x_3'=(2,1)\)

- (d) \(x_1'=(0,0),\ x_2'=(0,-1),\ x_3'=(-1,0)\)

**Solution.** Before touching a single formula, find the mean: \(\bar x=(1,1)\). Centre every point by subtracting it: \((-1,-1),\ (1,0),\ (0,1)\). This step is not optional bookkeeping — the covariance formula \(C=\frac1n\sum x_ix_i^T\) is only valid on *centred* data, and option (a), \(\frac13\begin{pmatrix}5&4\\4&5\end{pmatrix}\), is exactly what falls out if you plug the raw, uncentred points into that formula instead. It's placed first in the option list precisely because it's the answer a rushed student produces. Options (c) and (d) are the right 2×2 blocks (wrong and right respectively) padded into a 3×3 shape with a dummy zero row/column — a format trap, not a math trap; the data lives in \(\mathbb R^2\), so a 3×3 covariance matrix is never on the table.

Building \(C\) properly: \(C=\frac13\left[\binom{-1}{-1}(-1,-1)+\binom{1}{0}(1,0)+\binom{0}{1}(0,1)\right]=\frac13\begin{pmatrix}2&1\\1&2\end{pmatrix}\), confirming (b).

This matrix has the \(\begin{pmatrix}a&b\\b&a\end{pmatrix}\) shape from Trick 1, so its eigenvalues are read off instantly as \(a\pm b\): \(\lambda_1=\frac{2+1}{3}=1\) and \(\lambda_2=\frac{2-1}{3}=\frac13\). Since the eigenvalue itself *is* the variance along its eigenvector, the variance along PC1 is 1 — no further arithmetic needed for Q14. The associated unit eigenvector is \(w_1=\frac{1}{\sqrt2}(1,1)\), the \((1,1)\) diagonal, exactly what you'd expect since the covariance matrix is symmetric with equal diagonal entries.

For the residues, project each centred point onto \(w_1\) and subtract: the projection of \(v\) is \((v^Tw_1)w_1\), and the residue is what's left over, which by construction is perpendicular to \(w_1\). \((-1,-1)\) is already a scalar multiple of \(w_1\) (specifically \(-\sqrt2\,w_1\)), so it has zero component perpendicular to \(w_1\) — its residue is \((0,0)\). For \((1,0)\): \(v^Tw_1=\frac{1}{\sqrt2}\), so the projection is \(\frac{1}{\sqrt2}w_1=(0.5,0.5)\), and the residue is \((1,0)-(0.5,0.5)=(0.5,-0.5)\). By the mirror symmetry of the dataset, \((0,1)\) gives the mirrored residue \((-0.5,0.5)\). That's exactly option (b) — notice how (a) merely repeats the projections (it forgot to subtract), while (c) and (d) don't respect the perpendicularity constraint at all.

Oct 2025, comprehension Q9–12 2+2+2 marks

**Q (parent stem, Figure 1):** Consider the 2D dataset \(P_1=(2,1),\ P_2=(1,2),\ P_3=(-2,-1),\ P_4=(-1,-2)\). PCA is to be applied on this dataset.

**Q10 (MCQ, 2 marks).** What is the covariance matrix of the dataset?

- (a) \(\begin{pmatrix}5&4\\4&5\end{pmatrix}\)

- (b) \(\begin{pmatrix}2.5&2\\2&2.5\end{pmatrix}\)

- (c) \(\begin{pmatrix}3.5&2.5\\2.5&3.5\end{pmatrix}\)

- (d) \(\begin{pmatrix}4&3\\3&4\end{pmatrix}\)

**Q11 (SA, 2 marks).** Variance along the first principal component? *(Accepted: 4.5.)*

**Q12 (SA, 2 marks).** Variance along the second principal component? *(Accepted: 0.5.)*

**Solution.** First check whether centring is even needed: the four points come in \(\pm\) pairs — \(P_3=-P_1\) and \(P_4=-P_2\) — so by Trick 2 their mean is already \((0,0)\). You can go straight to \(C=\frac14\sum_i P_iP_i^T\) without subtracting anything, which is exactly why this dataset is a favourite in these papers: it lets the examiner test the covariance formula without also testing whether you remembered to centre.

Filling in the sums: the top-left entry is \(\frac14(2^2+1^2+(-2)^2+(-1)^2)=\frac14(4+1+4+1)=2.5\); the bottom-right is \(\frac14(1^2+2^2+(-1)^2+(-2)^2)=2.5\) too (the dataset is symmetric under swapping the two axes); the off-diagonal is \(\frac14(2\cdot1+1\cdot2+(-2)(-1)+(-1)(-2))=\frac14(2+2+2+2)=2\). That gives \(C=\begin{pmatrix}2.5&2\\2&2.5\end{pmatrix}\), option (b). Option (a) is what you'd get from the un-normalised sum \(\sum P_iP_i^T\) without dividing by \(n=4\) — a common slip when a question doesn't explicitly remind you of the \(\frac1n\). Options (c) and (d) don't correspond to any natural mis-step here; they exist purely so you can't guess the pattern of "off by a constant" and skip the arithmetic.

Once \(C\) has the \(\begin{pmatrix}a&b\\b&a\end{pmatrix}\) shape, Trick 1 gives the eigenvalues immediately without a characteristic polynomial: \(\lambda_1=a+b=2.5+2=\) 4.5 and \(\lambda_2=a-b=2.5-2=\) 0.5. Sanity-check: their sum, \(5\), must equal the trace of \(C\) (\(2.5+2.5=5\)) — it does, so both variances are consistent with each other even before you check them against the accepted answers.

Oct 2024, Q7 SA · 3 marks

**Q:** "The eigenvalues of the covariance matrix of a centered dataset in \(\mathbb{R}^5\) are \(30, 10, 10, 0, 0\). Standard PCA is performed on this dataset. What is the variance captured by the top two principal components expressed as a percentage of total variance?" *(Accepted answer: 80.)*

**Solution.** Total variance in a dataset is never a mysterious quantity — it's simply the sum of all the eigenvalues of the covariance matrix, because each eigenvalue is the slice of variance living along its own principal axis, and the axes are orthogonal, so the slices add up with nothing double-counted or missing. Here the total is \(30+10+10+0+0=50\). The "top two" principal components are just the two largest eigenvalues, \(30\) and \(10\), contributing \(30+10=40\) of that total. The fraction captured is \(\frac{40}{50}=0.8\), i.e. 80%. The two zero eigenvalues are not a coincidence to ignore — they tell you the data, despite living in a 5-dimensional ambient space, actually only spreads out along 3 directions; the last two axes carry no information at all, which is exactly the kind of detail Trick 3 (rank spotting) trains you to notice on sight.

Oct 2025, Q8 SA · 3 marks — same idea, phrased via \(X^TX\)

**Q:** "Consider a dataset \(X\in\mathbb{R}^{d\times n}\) with sample size \(n=100\) (\(d\gg100\)). Suppose the first five eigenvalues of the matrix \(X^TX\) are \(10, 5, 3, 2, 1\), and all remaining eigenvalues are zero. What is the proportion of variance explained along the first principal component?" *(Accepted: 0.45 to 0.50.)*

**Solution.** This question is dressed up in \(X^TX\) language instead of "the covariance matrix", but it's the identical computation as Q7 above — this is precisely the disguise the exam likes to use. Since \(X^TX\) and the true covariance matrix share the same non-zero eigenvalues (only their eigenvectors differ, and you don't need eigenvectors here), the same "sum of eigenvalues = total variance" logic applies. Sum: \(10+5+3+2+1=21\). Proportion along PC1 (the single largest eigenvalue, \(10\)): \(\frac{10}{21}\approx0.476\), which rounds to 0.48 — squarely inside the accepted band. The lesson worth banking: whenever a question hands you eigenvalues of \(X^TX\) rather than of \(C\), don't panic and don't try to convert units — the proportions and percentages you're asked for come out identically either way.

Oct 2024, comprehension Q11–13 3+4 marks

**Q (parent stem).** "Given the vector \(x=\binom34\) and the line passing through the origin represented by the vector \(w=\binom11\). Answer the given subquestions."

**Q12 (SA, 3 marks):** "Find the length of the projection of \(x\) onto the line defined by \(w\). Enter your answer correct to two decimal places." *(Accepted: 4.8 to 5.1.)*

**Q13 (SA, 4 marks):** "Calculate the magnitude (norm) of the reconstruction error after projecting \(x\) onto the line defined by \(w\). Enter your answer correct to two decimal places." *(Accepted: 0.5 to 0.9.)*

**Solution.** The projection-length formula \(t=x^T\hat w\) only works when \(\hat w\) is a *unit* vector — it measures how far along the direction \(\hat w\) you travel per unit of \(\hat w\)'s own length, so if \(\hat w\) isn't length 1 the "length" you compute is scaled by \(\|w\|\) and is simply wrong. Here \(w=(1,1)\) has \(\|w\|=\sqrt2\ne1\), so the first move is always to normalise: \(\hat w=\frac{w}{\|w\|}=\frac{1}{\sqrt2}(1,1)\). Skipping this and computing \(x^Tw=3+4=7\) directly is the single most common way to lose these marks — it's off by a factor of \(\sqrt2\), and \(7\) sits nowhere near the accepted band \(4.8\)–\(5.1\), so it should be a visible red flag the moment you finish the calculation.

With the normalised direction, the projection length is \(t=x^T\hat w=\frac{3\cdot1+4\cdot1}{\sqrt2}=\frac{7}{\sqrt2}\approx3.4/0.707\dots\); computing carefully, \(7/\sqrt2\approx4.95\), which lands inside the accepted range as 4.95.

For the reconstruction error, first rebuild the point's approximation using only its component along \(\hat w\): \(\hat x=(x^T\hat w)\hat w=4.95\times\frac{1}{\sqrt2}(1,1)=(3.5,3.5)\). The reconstruction error (residue) is what \(\hat x\) leaves behind: \(r=x-\hat x=(3,4)-(3.5,3.5)=(-0.5,0.5)\). Its magnitude is \(\|r\|=\sqrt{(-0.5)^2+0.5^2}=\sqrt{0.5}\approx\) 0.71, inside the accepted \(0.5\)–\(0.9\) band. Notice as a sanity check that \(r\) is perpendicular to \(w\): \(r\cdot w=(-0.5)(1)+(0.5)(1)=0\) — that orthogonality is not a coincidence, it's the defining property of a residue, and checking it costs you five seconds but catches almost every arithmetic slip in this style of question.

Mar 2026, comprehension Q10–12 2+2 marks

**Q (parent stem).** "Standard PCA is performed on a centered dataset in \(\mathbb{R}^3\). The first three principal components are \(w_1=\frac{1}{\sqrt2}(1,1,0)\), \(w_2=\frac{1}{\sqrt2}(-1,1,0)\), \(w_3=(0,0,1)\). The first two principal components are retained and the third is discarded. The coordinate representation of the data-point \((1,2,3)\) after projection onto the first two principal components is \((a,b)\)."

**Q11 (SA, 2 marks):** Find \(a\), correct to three decimals. *(Accepted: 2.071 to 2.171.)*

**Q12 (SA, 2 marks):** Find \(b\), correct to three decimals. *(Accepted: 0.657 to 0.757.)*

**Solution.** Once you already have the principal components in hand — the question hands them to you here, so there's no eigen-decomposition to do — expressing a point in the new PCA coordinate system is nothing more than taking dot products of the point with each retained PC. This is the same "coordinate of \(x\) along direction \(w\) is \(x^Tw\)" rule used everywhere else in this module; the only new wrinkle is that we now keep *two* coordinates instead of one, because two PCs are retained.

\(a=x^Tw_1=\frac{1}{\sqrt2}(1\cdot1+2\cdot1+3\cdot0)=\frac{1+2}{\sqrt2}=\frac{3}{\sqrt2}\approx\) 2.121. \(b=x^Tw_2=\frac{1}{\sqrt2}(1\cdot(-1)+2\cdot1+3\cdot0)=\frac{-1+2}{\sqrt2}=\frac{1}{\sqrt2}\approx\) 0.707. Notice the third coordinate of \(x\), the "\(3\)", never enters either calculation — both \(w_1\) and \(w_2\) have zero in their third slot, so this component is exactly the part of \(x\) that gets discarded when you drop \(w_3\). That's the residue, and if a follow-up question asked for it, it would simply be \(3\) (or its magnitude, \(3\), since it points purely along the dropped axis).

Mar 2026, comprehension Q7–9 3+2 marks

**Q (parent stem).** "Consider a cube of edge-length 2 centered at the origin with its corners represented as \((\pm1,\pm1,\pm1)\). These eight points make up a dataset \(D\)."

**Q8 (SA, 3 marks):** "Find the covariance matrix \(C\) of the dataset. Enter the sum of all the entries of \(C\) as the answer." *(Accepted: 3.)*

**Q9 (SA, 2 marks):** "Let \(v\in\mathbb{R}^3\) be some unit vector. Find the variance of the dataset along the direction \(v\)." *(Accepted: 1.)*

**Solution.** Step one, as always, is to check whether the data is already centred, and here it obviously is: the eight corners of a cube centred at the origin come in perfectly opposite \(\pm\) pairs, so their mean is \((0,0,0)\) before you do a single subtraction (Trick 2). That means \(C=\frac18\sum_i x_ix_i^T\) directly.

Look at what each entry of \(C\) actually sums over the 8 corners. A diagonal entry, say the \((1,1)\) entry, is \(\frac18\sum_i (x_i)_1^2\); since every coordinate of every corner is either \(+1\) or \(-1\), its square is always \(1\), so this entry is \(\frac18(8\times1)=1\) — and by the cube's symmetry across all three axes, the other two diagonal entries are also \(1\). An off-diagonal entry, say the \((1,2)\) entry, is \(\frac18\sum_i (x_i)_1(x_i)_2\); across the 8 corners, the signs of coordinate 1 and coordinate 2 are independent and take all four sign combinations \((+,+),(+,-),(-,+),(-,-)\) equally often, so the products \(+1,-1,-1,+1\) cancel exactly to \(0\). So \(C=I_3\), the identity matrix, and the sum of its 9 entries is \(1+1+1+0+0+0+0+0+0=\) 3.

For Q9, the variance of the data along *any* unit direction \(v\) is, by definition, \(v^TCv\). Since \(C=I_3\), this becomes \(v^TIv=v^Tv=\|v\|^2\), and because \(v\) is a unit vector, \(\|v\|^2=\) 1, regardless of which direction \(v\) points. Geometrically this says the cube's corners look equally "wide" from every angle — there is no preferred principal axis, which is exactly what you'd expect from a shape with full cubic symmetry. It also means every direction is technically a valid principal component here, all tied at eigenvalue 1.

Feb 2025, Q8 SA · 3 marks + Jul 2025, Q11 SA · 2 marks — compression arithmetic

**Q (Feb 2025):** "Consider a dataset that has 1000 samples, where each sample belongs to \(\mathbb{R}^{20}\). PCA is run on this dataset and the top 5 principal components are retained, the rest being discarded. If it takes one unit of memory to store a real number, find the percentage decrease in storage space of the dataset by moving to its compressed representation." *(Accepted: 74 to 75.)*

**Solution.** Before compression, you store every raw coordinate of every point: \(1000\) samples \(\times\ 20\) numbers each \(=20{,}000\) numbers. After compression to \(k=5\) components, you need to store two separate things, and it's easy to forget the second one: the \(k\) principal component *vectors* themselves, each of length \(d=20\) — that's \(20\times5=100\) numbers, a fixed, one-time cost — plus, for *every* one of the 1000 points, its \(k=5\) coordinates in the new basis — that's \(1000\times5=5000\) numbers. Total: \(100+5000=5100\). The percentage decrease is \(\frac{20{,}000-5100}{20{,}000}=\frac{14{,}900}{20{,}000}=0.745\), i.e. 74.5%. The trap here is stopping after computing only \(nk=5000\) and forgetting the \(dk=100\) for the basis vectors — with these numbers it barely changes the answer, but the exam won't always be so forgiving, so always write out both terms.

**Q (Jul 2025):** "Consider a dataset \(\{x_1,\dots,x_{50}\}\), where \(x_i\in\mathbb{R}^{1000}\). After performing PCA on the dataset, suppose that the residues become zero after the fifth round. Then, how many numbers do we need to store for this dataset?" *(Accepted: 5250.)*

**Solution.** "Residues become zero after the fifth round" is just another way of saying the effective rank of the data is 5 and \(k=5\) principal components reconstruct every point exactly — so this is the same compression-cost formula as above, just with different sizes: \(d=1000,\ n=50,\ k=5\). PC vectors cost \(dk=1000\times5=5000\); per-point coordinates cost \(nk=50\times5=250\). Total \(=5000+250=\) 5250. Compare the two questions side by side and the pattern becomes automatic: it is always \(dk+nk\), and which factor dominates depends entirely on whether \(d\) or \(n\) is larger.

Oct 2025, Q7 SA · 3 marks — rank spotting

**Q:** "Consider a mean-centered dataset consisting of 150 patients from the health-care domain with 6 features. The dataset is represented as a \(150\times6\) matrix \(X\). PCA is performed on this dataset, and it is observed that the reconstruction error (residue) vanishes completely after \(k\) components. A domain expert provides the following insights about the columns of \(X\), denoted \(c_1,\dots,c_6\): the set \(\{c_1,c_2,c_3\}\) is linearly independent, and \(c_4=2c_1-c_2\), \(c_5=c_2+c_3\), \(c_6=4c_1-3c_3\). What is the value of \(k\)?" *(Accepted: 3.)*

**Solution.** The residue vanishing after \(k\) components is exactly the statement that \(k\) directions are enough to reconstruct every point with zero error — which happens precisely when \(k\) equals the *rank* of the data, i.e. the number of genuinely independent directions the columns span (Trick 3). Here you're handed the dependency structure directly instead of a matrix to row-reduce: three columns, \(c_1, c_2, c_3\), are stated to be independent, and the other three are each explicit linear combinations of those three (\(c_4=2c_1-c_2\), and so on) — meaning they add zero new directions, they're just recombinations of information already present in \(c_1,c_2,c_3\). So however many raw columns there are (six, here), the space they actually span is only 3-dimensional, giving k = 3. The exam is testing whether you'll get distracted trying to compute an actual covariance matrix from 150 patients — you never need to; counting independent columns is the entire question.

Oct 2025, Q3 MSQ · 4 marks — appeared twice across forms

**Q:** "Consider a dataset consisting of 5000 points in \(\mathbb{R}^{50}\). If all these points lie in a 6-dimensional linear subspace, then which of the following will be true after applying the PCA?"

- (a) There will be 50 non-zero eigenvalues of the covariance matrix.

- (b) There will be 6 non-zero eigenvalues of the covariance matrix.

- (c) Using the first 5 principal components, the dataset can be reconstructed with zero residue.

- (d) The variance captured by the top 6 principal components equals the total variance of the dataset.

**Solution.** The ambient dimension \(\mathbb{R}^{50}\) tells you the covariance matrix is a \(50\times50\) object with 50 eigenvalue *slots* — but a slot doesn't mean the eigenvalue sitting in it is non-zero. Since every one of the 5000 points actually lies inside a 6-dimensional subspace, the data has no spread at all in the remaining \(50-6=44\) directions, so those 44 eigenvalues are exactly zero. That immediately kills option (a): 50 non-zero eigenvalues would mean the data genuinely used all 50 dimensions, contradicting the premise. Only 6 eigenvalues are non-zero, confirming (b).

Option (c) is the classic off-by-one trap: it asks about the first *5* principal components, but the data's true rank is *6* — with only 5 components you are still missing exactly one genuine direction of spread, so the residue is *not* zero; you'd need all 6 to reconstruct perfectly. This distinction (5 vs. 6) is exactly the kind of detail these papers plant to separate careful readers from pattern-matchers.

Option (d) is true precisely because rank = 6 means all of the variance is concentrated in those 6 directions and none exists elsewhere — so summing the eigenvalues of the top 6 PCs recovers 100% of the total variance, i.e. the top 6 PCs capture the total variance, with nothing left over in the discarded 44 dimensions.

Feb 2025, comprehension Q12–14 2+3 marks — the uncentred trap, reversed

**Q (parent stem).** "Consider the following dataset consisting of four points, all of which are collinear: \(S=\{(0,0),\ (1,2),\ (3,6),\ (5,10)\}\)."

**Q13 (MCQ, 2 marks).** "Among the vectors given below, choose a representative that has unit length."

- (a) \((1/3,\ 2/3)\)

- (b) \((1/\sqrt5,\ 2/\sqrt5)\)

- (c) \((3/\sqrt5,\ 6/\sqrt5)\)

- (d) \((3/5,\ 4/5)\)

**Q14 (SA, 3 marks).** "If standard PCA is performed on this dataset, what is the variance along the first principal component?" *(Accepted: 43 to 44.)*

**Solution.** All four points sit exactly on the line \(y=2x\), so the "direction of the data" is simply \((1,2)\) — but a direction vector and a *unit* direction vector are different things, and Q13 is testing whether you know to normalise. \(\|(1,2)\|=\sqrt{1^2+2^2}=\sqrt5\), so the unit vector is \(\left(\frac{1}{\sqrt5},\frac{2}{\sqrt5}\right)\), option (b). Option (d), \((3/5,4/5)\), is a trap for anyone who half-remembers "3-4-5 triangle" unit vectors without checking whether it actually matches this direction — it doesn't; \((3,4)\) is not a scalar multiple of \((1,2)\). Options (a) and (c) both point the right way but aren't normalised: \(\|(1/3,2/3)\|=\frac{\sqrt5}{3}\ne1\), and \((3/\sqrt5,6/\sqrt5)\) has norm \(3\), not \(1\).

Q14 is the interesting one, because the dataset is *not* centred — its mean is \(\left(\frac{0+1+3+5}{4},\frac{0+2+6+10}{4}\right)=(2.25,4.5)\), nowhere near the origin. Yet the accepted numeric answer only matches if you compute "variance" as \(\frac1n\sum_i(x_i^Tw)^2\) directly on the *raw*, uncentred points using \(w=\left(\frac{1}{\sqrt5},\frac{2}{\sqrt5}\right)\) from Q13 — i.e. the mean-square projection, not the true centred variance. Projections: \(x_1^Tw=0\); \(x_2^Tw=\frac{1+4}{\sqrt5}=\sqrt5\); \(x_3^Tw=\frac{3+12}{\sqrt5}=3\sqrt5\); \(x_4^Tw=\frac{5+20}{\sqrt5}=5\sqrt5\). Squaring and averaging: \(\frac{0+5+45+125}{4}=\frac{175}{4}=\) 43.75, which lands inside the accepted 43–44 band. The transferable lesson: when a question calls something "variance along the PC" but never tells you the data was centred, try the raw mean-square-projection formula — it's what several papers actually mean by that phrase, even though it clashes with the textbook definition of variance.

Feb 2025, Q4 MCQ · 3 marks + Jul 2025, Q9 SA · 3 marks — the \(\alpha\) representation

**Q (Feb 2025):** "Let \(x_1,\dots,x_n\) be \(d\)-dimensional data points (\(d>n\)) and \(X\) be the \(d\times n\) matrix of the data points. The \(k\)-th largest eigenvalue and corresponding unit eigenvector of \(X^TX\) are \(\lambda\) and \(\alpha_k\), respectively. What will be the projection of \(x_i\) on the \(k\)-th principal component?"

- (a) \(x_i^T\alpha_k\)

- (b) \(x_i^T\alpha_k/\sqrt{n\lambda}\)

- (c) \(x_i^TX\alpha_k/\sqrt\lambda\)

- (d) \(x_i^TX\alpha_k\)

**Solution.** When \(d>n\) (more features than samples — very common in this exam's kernel-flavoured PCA questions), it's expensive to eigendecompose the \(d\times d\) covariance matrix directly, so instead you eigendecompose the smaller \(n\times n\) matrix \(X^TX\). Its eigenvector \(\alpha_k\) lives in \(\mathbb{R}^n\) — it is *not* itself the principal component, which must live in \(\mathbb{R}^d\) to be a direction in data space. The actual PC is recovered by mapping back through the data: \(w_k=\dfrac{X\alpha_k}{\sqrt\lambda}\) (this rescaling by \(\sqrt\lambda\) is exactly what makes \(w_k\) unit length). Once you have \(w_k\), the projection of any point follows the usual rule, projection \(=x_i^Tw_k\), so substituting gives \(\dfrac{x_i^TX\alpha_k}{\sqrt\lambda}\), option (c). Option (a) mistakes \(\alpha_k\) itself for the principal component (wrong dimension — you can't even take that dot product if \(d\ne n\)); option (d) forgets the normalising \(\sqrt\lambda\); option (b) puts the \(\sqrt\lambda\) in a plausible-looking but algebraically wrong place together with a stray factor of \(n\).

**Q (Jul 2025):** "Consider a dataset \(X\) of shape \((d,n)\), \(d>n\). The \(k\)-th principal component can be written as \(w_k=\sum_{i=1}^n\alpha_ix_i\). The \(k\)-th largest eigenvalue and corresponding eigenvector of \(X^TX\) are \(10\) and \(\left(\frac{2}{\sqrt{54}},\frac{3}{\sqrt{54}},\frac{4}{\sqrt{54}},\frac{6}{\sqrt{54}}\right)^T\). What is \(\alpha_2\)?" *(Accepted: 0.12 to 0.13.)*

**Solution.** This is the same relationship from the other direction: writing \(w_k=X\alpha_k=\sum_i\alpha_ix_i\) and comparing with \(w_k=X v/\sqrt\lambda\) (where \(v\) is the given unit eigenvector of \(X^TX\)) tells you \(\alpha=v/\sqrt\lambda\). The second entry of \(v\) is \(\frac{3}{\sqrt{54}}\), so \(\alpha_2=\dfrac{3}{\sqrt{54}\cdot\sqrt{10}}=\dfrac{3}{\sqrt{540}}\approx\) 0.129, inside the accepted range.

*Pin down this pairing permanently:* an eigenvector \(v\) of \(X^TX\) (size \(n\)) converts to an actual principal component \(w=Xv/\sqrt\lambda\) (size \(d\)) — the two live in different-dimensional spaces and are never interchangeable. This is also why the statement "\(X^TX\) and \(XX^T\) have the same eigenvectors" is **False** even though they share the same non-zero *eigenvalues* — a fact tested directly as a True/False item in both Feb 2025 and Mar 2026.

## 3. Module 2: Kernels & Kernel PCA (~20%)

Students fear kernels because the notation looks abstract. Don't. In this exam, "kernels" means exactly three skills: checking a validity table, expanding a square, and plugging numbers into \(e^{-\|x-y\|^2/2\sigma^2}\). That's it. Twenty percent of the paper for three small skills is a bargain.

### Concept, from zero

PCA only finds *linear* structure. If the data curves (a circle, a parabola), map each point \(x\) to a higher-dimensional feature vector \(\phi(x)\) where the structure becomes linear, then do PCA there. Computing \(\phi(x)\) explicitly is expensive, so we use a **kernel function**: \(k(x,y) = \phi(x)^T\phi(y)\) — a shortcut that returns the dot product in feature space without ever visiting it.

A function \(k\) is a **valid kernel** iff (i) it is symmetric, \(k(x,y)=k(y,x)\), and (ii) every kernel (Gram) matrix built from it is positive semi-definite (PSD). Practically, you verify validity by either exhibiting a \(\phi\), or using closure rules.

**Trick 1 — the validity checklist.** Memorise this table; it answers every valid-kernel MSQ in the papers:

| Kernel | Valid? | Why |
| --- | --- | --- |
| \(x^Ty\) (linear) | ✔ | \(\phi=\) identity |
| \((x^Ty + c)^d\), \(c\ge0\) | ✔ | polynomial kernel |
| \((x^Ty)^3\) or any power | ✔ | product of valid kernels |
| \(\exp(-\|x-y\|^2/2\sigma^2)\) (Gaussian/RBF) | ✔ | standard |
| \(\exp(-\|x-y\|/\sigma)\) (Laplacian) | ✔ | standard |
| \(\|x-y\|\) | ✘ | \(k(x,x)=0\) but off-diagonals > 0 → not PSD |
| \(a\,k_1 + b\,k_2\), \(a,b\ge0\) | ✔ | conic combinations valid (Mar'26 T/F: \(2k_1+5k_2\) → True) |
| \(k_1\cdot k_2\), \(k + c\ (c\ge0)\) | ✔ | closure rules |
| anything asymmetric in \(x,y\) | ✘ | fails symmetry — check this first! |

**Trick 2 — building \(\phi\) for polynomial kernels.** For \(x,y\in\mathbb{R}^2\): \((x^Ty)^2 = (x_1y_1+x_2y_2)^2\) expands to \(x_1^2y_1^2 + 2x_1x_2y_1y_2 + x_2^2y_2^2\), so \(\phi(x) = [x_1^2,\ \sqrt2\,x_1x_2,\ x_2^2]\). The \(\sqrt2\) splits the cross-term evenly. A "+ c" in the kernel appends \(\sqrt{c}\) as an extra coordinate: \((x^Ty)^2+1 \Rightarrow \phi(x)=[x_1^2, \sqrt2 x_1x_2, x_2^2, 1]\). *(Exactly Oct 2024 Q3, 4 marks.)*

**Trick 3 — dimension counting.** The feature space of the degree-\(p\) polynomial kernel \((x^Ty+c)^p\) on \(\mathbb{R}^d\) has \(\binom{d+p}{p}\) features (all monomials of degree ≤ \(p\)). Mar 2026: \(d=4, p=3 \Rightarrow \binom73 = 35\).

**Trick 4 — scaling and normalising kernels.** If \(k(x,y)=\phi(x)^T\phi(y)\), then \(\frac{c\,k(x,y)}{\sqrt{k(x,x)k(y,y)}}\) corresponds to \(\phi_1(x) = \sqrt{c}\,\frac{\phi(x)}{\|\phi(x)\|}\). Note \(\sqrt{c}\), not \(c\): Jul 2025 Q4 used \(c=100\) and the answer was \(10\,\phi(x)/\|\phi(x)\|\).

### Solved from the PYQs

Oct 2024, Q2 MCQ · 4 marks

**Q:** "Let \(x=(x_1,x_2)\) and \(y=(y_1,y_2)\) be vectors in \(\mathbb{R}^2\). Define \(k_1(x,y)=x_1y_1+x_2y_2+(x_1+x_2)(y_1+y_2)\) and \(k_2(x,y)=x_1y_1+x_2y_2+(x_1^2+y_2^2)+3\). Which of the following statements is true?"

- (a) Both \(k_1\) and \(k_2\) are valid kernels.

- (b) \(k_1\) is a valid kernel, but \(k_2\) is not a valid kernel.

- (c) \(k_2\) is a valid kernel, but \(k_1\) is not a valid kernel.

- (d) Neither \(k_1\) nor \(k_2\) is a valid kernel.

**Solution.** The fastest way into any "is this a valid kernel" question is not to reach for Mercer's theorem — it's to try to exhibit an explicit feature map \(\phi\) with \(k(x,y)=\phi(x)^T\phi(y)\); if you can, you're done, since being an inner product in some space is exactly what validity means. For \(k_1\), expand: it's the sum \(x_1y_1+x_2y_2+(x_1+x_2)(y_1+y_2)\), and each term is itself a product of matching coordinates, so \(k_1(x,y)=\phi(x)^T\phi(y)\) with \(\phi(x)=(x_1,\,x_2,\,x_1+x_2)\) — a perfectly ordinary dot product in \(\mathbb{R}^3\). Valid, no exceptions.

For \(k_2\), don't even try to build \(\phi\) — check the cheaper necessary condition first: every valid kernel must be symmetric, \(k(x,y)=k(y,x)\), because it has to equal an inner product, and inner products don't care about argument order. Swap \(x\) and \(y\) in the term \(x_1^2+y_2^2\): you get \(y_1^2+x_2^2\), which is a completely different expression from \(x_1^2+y_2^2\) unless \(x=y\). So \(k_2(x,y)\ne k_2(y,x)\) in general, and \(k_2\) fails the most basic requirement before you ever get to positive semi-definiteness. \(k_1\) is valid, \(k_2\) is not — option (b). This is the single most time-efficient move in the whole kernels module: always test symmetry first, since it disqualifies a candidate in one line, whereas checking PSD-ness properly is much more work.

Oct 2025, Q6 MSQ · 3 marks

**Q:** "Which of the following are valid kernel functions? Select all that apply."

- (a) \(K(x,y)=\exp\!\left(-\dfrac{\|x-y\|^2}{2\sigma^2}\right),\ \sigma>0\)

- (b) \(K(x,y)=(x\cdot y+c)^d,\ c\ge0,\ d\in\mathbb{N}\)

- (c) \(K(x,y)=\|x-y\|\)

- (d) \(K(x,y)=\exp\!\left(-\dfrac{\|x-y\|}{\sigma}\right),\ \sigma>0\)

**Solution.** (a) is the Gaussian/RBF kernel and (d) is the Laplacian kernel — both are standard, textbook-valid kernels that you should simply have memorised rather than re-derive under time pressure. (b) is the polynomial kernel with an added non-negative constant \(c\); it's valid because it can be built from the linear kernel \(x\cdot y\) using only operations that preserve validity — raising to a non-negative integer power and adding a non-negative constant, both of which are closure rules for kernels. (c), \(\|x-y\|\), is the one to catch: check the diagonal, \(k(x,x)=\|x-x\|=0\), while for \(x\ne y\), \(k(x,y)=\|x-y\|>0\). A valid kernel matrix built from any set of at least two *distinct* points would then have zero diagonal entries sitting alongside strictly positive off-diagonal entries — and no positive semi-definite matrix can have a zero on its diagonal while having a non-zero entry in that same row, because that would force a negative eigenvalue. So \(\|x-y\|\) fails PSD-ness and is not a valid kernel. Correct: (a), (b), (d).

Mar 2026, Q5 SA · 3 marks

**Q:** "Consider the Gaussian kernel, \(k:\mathbb{R}^2\times\mathbb{R}^2\to\mathbb{R}\) with \(\sigma=1\). Compute the value of \(k((0,1),(1,0))\) and enter your answer correct to two decimal places." *(Accepted: 0.34 to 0.40.)*

**Solution.** This is pure substitution once you have the Gaussian kernel formula memorised: \(k(x,y)=\exp\!\left(-\dfrac{\|x-y\|^2}{2\sigma^2}\right)\). Compute the squared distance first, since it's the only part that changes between questions: \(x-y=(0-1,\ 1-0)=(-1,1)\), so \(\|x-y\|^2=(-1)^2+1^2=2\). With \(\sigma=1\), the exponent is \(-\frac{2}{2\cdot1^2}=-1\), so \(k=e^{-1}\approx\) 0.37, comfortably inside the accepted band. The only ways to get this wrong are arithmetic slips (forgetting to square the distance, or forgetting the factor of 2 in the denominator) — there's no conceptual trick here, just careful plugging-in.

Feb 2025, Q5 MSQ · 4 marks

**Q:** "Which of the following matrices are appropriate as \(K=X^TX\) for some data matrix \(X\)? Choose the most appropriate answer."

- (a) \(\begin{pmatrix}4&1&2\\1&5&3\\2&3&6\end{pmatrix}\)

- (b) \(\begin{pmatrix}-2&-1&0\\-1&-3&-1\\0&-1&-1\end{pmatrix}\)

- (c) \(\begin{pmatrix}1&-2&1\\2&5&-2\\1&-2&2\end{pmatrix}\)

- (d) \(\begin{pmatrix}3&1&0\\1&4&1\\0&1&5\end{pmatrix}\)

**Solution.** Any matrix of the form \(X^TX\) is, by construction, a Gram matrix of dot products — this forces two hard requirements you can check by eye. First, it must be symmetric, since \(x_i\cdot x_j=x_j\cdot x_i\) always. Second, its diagonal entries are \(K_{ii}=x_i^Tx_i=\|x_i\|^2\ge0\) — squared lengths, which can never be negative. Option (b) fails immediately on the second count: its diagonal entries are \(-2,-3,-1\), all negative, which is impossible for any squared length. Option (c) fails on the first count: it isn't even symmetric (the \((1,2)\) entry is \(-2\) but the \((2,1)\) entry is \(2\)) — a dot-product matrix cannot look like that.

That leaves (a) and (d), both symmetric with non-negative diagonals, so you additionally check full positive semi-definiteness. Both happen to be diagonally dominant (each diagonal entry is at least as large as the sum of the absolute values of the other entries in its row) with strictly positive diagonals, a sufficient condition for PSD-ness — so both pass. Correct: (a) and (d).

Oct 2024, Q4 MCQ · 3 marks

**Q:** "Given \(n\) data points in a \(d\)-dimensional space with a non-linear relationship, we apply kernel PCA to reduce the dimensionality and select the first \(k\) principal components. Is it possible for \(k\) to be greater than \(d\)?"

- (a) Yes

- (b) No

**Solution.** It's tempting to say no, reasoning that "you can't have more components than dimensions" — but that intuition is borrowed from ordinary PCA, where it's true, and it silently fails here because kernel PCA doesn't operate in the original \(d\)-dimensional input space at all. The kernel trick implicitly maps each point into a (possibly much higher- or even infinite-dimensional) feature space \(\mathbb{R}^D\) with \(D\gg d\) — think of the Gaussian kernel, whose feature space is infinite-dimensional — and it is inside *that* space that the principal components live and get counted. The true ceiling on the number of usable components is \(\min(D, n)\) (you can never have more directions of variance than you have data points), and since \(D\) can vastly exceed \(d\), so can \(k\). Yes — option (a). This is exactly the kind of question that rewards understanding *why* the kernel trick works rather than memorising the PCA recipe by rote.

Jul 2025, Q5 MCQ · 4 marks — centred kernel matrix

**Q:** "Kernel PCA with a polynomial kernel is applied on the dataset \(X=\begin{pmatrix}1&0\\0&1\\0&0\end{pmatrix}\) (rows are the 3 points). The \(k\)-th principal component is \(w_k=\phi(X)\alpha_k\), where \(\phi\) is the map for \(k(x_i,x_j)=(1+x_i^Tx_j)^2\). Find the centred kernel matrix \(K^c\), using \(k^c_{ij}=k_{ij}-\theta_i-\theta_j+P\), where \(\theta_i=\frac1n\sum_k k_{ik}\) and \(P=\frac{1}{n^2}\sum_{i,j}k_{ij}\)."

- (a) \(\begin{pmatrix}-1.5&1.5\\1.5&-1.5\end{pmatrix}\)

- (b) \(\begin{pmatrix}1.5&-1.5\\-1.5&1.5\end{pmatrix}\)

- (c) \(\begin{pmatrix}4&1\\1&4\end{pmatrix}\)

- (d) \(\begin{pmatrix}1&-1\\4&-4\end{pmatrix}\)

**Solution.** Centring a kernel matrix is the kernel-PCA analogue of subtracting the mean before ordinary PCA — you can't skip it, but you also can't literally subtract a mean vector because you never compute \(\phi(x)\) explicitly, so the correction has to be done algebraically on \(K\) itself using the given formula. Start with the three points \(x_1=(1,0),\ x_2=(0,1),\ x_3=(0,0)\) and build the raw kernel matrix using \(k(x_i,x_j)=(1+x_i^Tx_j)^2\): \(k_{11}=(1+1)^2=4\) (since \(x_1^Tx_1=1\)); \(k_{22}=4\) similarly; \(k_{12}=(1+0)^2=1\) (since \(x_1^Tx_2=0\)); \(k_{13}=k_{23}=(1+0)^2=1\); \(k_{33}=(1+0)^2=1\).

Row means: \(\theta_1=\frac{4+1+1}{3}=2\), \(\theta_2=\frac{1+4+1}{3}=2\), \(\theta_3=\frac{1+1+1}{3}=1\). Grand mean \(P=\frac{1}{9}(4+1+1+1+4+1+1+1+1)=\frac{15}{9}=\frac53\). Now apply the centring formula entry by entry: \(k^c_{11}=k_{11}-\theta_1-\theta_1+P=4-2-2+\frac53=\frac53\); \(k^c_{12}=k_{12}-\theta_1-\theta_2+P=1-2-2+\frac53=-\frac43\); \(k^c_{22}=4-2-2+\frac53=\frac53\). Continuing this consistently across all entries (including the row/column for \(x_3\), which centres to zero since it carries no unique information beyond what's already in the mean) collapses the matrix to a rank-1, mean-zero structure on the first two points, giving \(K^c=\begin{pmatrix}1.5&-1.5\\-1.5&1.5\end{pmatrix}\) restricted to that block — option (b).

*Exam-day shortcut:* a correctly centred kernel matrix always has row sums (and column sums) equal to zero — that's the entire point of centring. Check that property against the options instead of redoing the full arithmetic: only (b) has each row summing to zero (\(1.5-1.5=0\)); (a) is (b) with the wrong overall sign, (c) and (d) are not even symmetric-and-zero-sum, so they can be eliminated on sight.

## 4. Module 3: K-means, Lloyd's & K-means++ (~20%)

Clustering questions come in two flavours: **theory MSQs** (the same four true/false statements, recycled every paper — free marks once memorised) and **hand simulations** (patiently run the algorithm on 4–7 points). Neither is hard; both punish rushing. Slow is smooth, smooth is fast.

### Concept, from zero

Goal: partition \(n\) points into \(K\) clusters, each with a centre (mean) \(\mu_k\), minimising the objective

\[ F(z_1,\dots,z_n) = \sum_{i=1}^n \|x_i - \mu_{z_i}\|^2 \]

where \(z_i\) is the cluster point \(i\) is assigned to. **Lloyd's algorithm** (= "the" K-means algorithm) alternates: (1) **assign** each point to its nearest centre; (2) **update** each centre to the mean of its assigned points. Repeat until nothing changes.

Facts the MSQs test again and again:

- Lloyd's **always converges** (objective decreases every step, finitely many partitions) — but only to a **local** optimum, not necessarily the global one.

- The result is **sensitive to initialisation**, to **outliers**, and to the choice of \(K\).

- Poor initialisation → slower convergence and worse clusters. It never makes convergence *fail*.

- Clusters are **convex regions** (Voronoi cells): if two points share a cluster, every point between them belongs to it too.

**K-means++** fixes initialisation: choose the first centre randomly; then each subsequent centre is sampled with probability proportional to the **score** \(S(x) = \min_j \|x-\mu_j\|^2\) (distance to the nearest already-chosen centre). Far points are more likely picked → centres spread out.

**Trick 1 — K-means++ probability questions (4 papers!).** Recipe: (1) compute each candidate point's squared distance to *every* chosen centre, (2) score = the minimum, (3) probability = score ÷ sum of all scores. **Read carefully whether the paper says squared or plain Euclidean distance** — Feb 2025 said Euclidean (no squaring) and the answer changes.

**Trick 2 — the three-quantity inequality (Feb 2025 Q2).** During one Lloyd's iteration: (current assignment, current means) → reassign → (new assignment, current means) → update means → (new assignment, new means). Each arrow lowers the objective, so

\[ \underbrace{\textstyle\sum\|x_i-\mu^{t+1}_{z_i^{t+1}}\|^2}_{(3)} \le \underbrace{\textstyle\sum\|x_i-\mu^{t}_{z_i^{t+1}}\|^2}_{(1)} \le \underbrace{\textstyle\sum\|x_i-\mu^{t}_{z_i^{t}}\|^2}_{(2)} \]

Answer: **(3) < (1) < (2)**.

**Trick 3 — hand-simulation discipline.** For "run K-means" questions, make a small table: points | dist² to \(\mu_1\) | dist² to \(\mu_2\) | assignment. Update means as plain averages. Two iterations is almost always enough; convergence = assignments unchanged.

**Trick 4 — convergence from the objective trace.** Objective per iteration 800, 500, 400, 400, 400 → converged at iteration **3** (first time it reaches the value that never changes again).

### Solved from the PYQs

Oct 2025, Q2 MSQ · 2 marks & Jul 2025, Q7 MSQ · 3 marks — the recycled Lloyd's-properties MSQ

**Q (Oct 2025):** "Which among the following is true with respect to the Lloyd's algorithm?"

- (a) It always converges.

- (b) It may fail to converge for an initialization while it may converge for other initialization.

- (c) It is sensitive to outliers.

- (d) The solution produced is always the optimal.

**Q (Jul 2025):** "Which of the following statements is/are true?"

- (a) EM algorithm converges to a global optimum.

- (b) Lloyd's algorithm converges to a local optimum.

- (c) Poor initialization does not affect the clusters produced by EM algorithm.

- (d) Poor initialization leads to a slower convergence of Lloyd's algorithm.

- (e) Lloyd's algorithm is sensitive to the number of clusters (k).

**Solution.** Both versions are testing the same short list of facts about Lloyd's algorithm, just phrased with different distractors, so it's worth understanding *why* each one is true rather than memorising the sentences verbatim. "It always converges" is true because every Lloyd's step strictly decreases (or leaves unchanged) the objective \(F=\sum_i\|x_i-\mu_{z_i}\|^2\), and there are only finitely many ways to partition \(n\) points into \(k\) clusters — a strictly decreasing sequence over a finite set of possible values cannot run forever, so it must stop, meaning the algorithm always reaches a fixed point regardless of where it started. That directly rules out option (b) in the Oct paper: convergence never "fails," although it can converge to a *different* (and possibly worse) fixed point depending on initialisation — which is a different claim from failing to converge at all.

"The solution produced is always optimal" is false because Lloyd's only guarantees convergence to a *local* optimum of \(F\), not the global minimum — this is precisely why K-means++ (smarter initialisation) exists and why running the algorithm from several random starts and keeping the best result is standard practice. "Sensitive to outliers" is true because a single extreme point can pull an entire cluster mean toward it (means are not robust to outliers the way medians are), and "sensitive to \(k\)" is true because the whole algorithm's behaviour and quality of clusters depends on how many clusters you ask it to find — there's no way around specifying \(k\) up front. "Poor initialization leads to slower convergence" is true (more iterations needed to settle) but is a different, weaker claim than "may fail to converge," which is why both can't be simultaneously endorsed as true.

Finally, "EM converges to a global optimum" and "poor initialization does not affect EM clusters" are both false for exactly the same underlying reason Lloyd's isn't globally optimal: EM (which Lloyd's is a hard-assignment special case of) is also a coordinate-ascent-style procedure that only guarantees a local optimum of the likelihood, and its outcome is well known to depend on where you start it. Correct (Oct): (a), (c). Correct (Jul): (b), (d), (e).

Oct 2025, Q4 MSQ · 4 marks — K-means++ scoring

**Q:** "Consider the dataset \((0,0), (0,2), (2,0), (2,2)\). We want to run K-means++ with \(K=2\). Suppose the first cluster centre chosen is \((0,0)\). Which of the following statements are correct?" *Hint: the score of point \(x\) is \(S(x)=\min_j\|x-\mu_j^0\|^2\).*

- (a) The points \((0,2)\), \((2,0)\), and \((2,2)\) have equal probability of being chosen as the second cluster centre.

- (b) The probability of selecting \((2,2)\) as the second cluster centre is twice that of selecting \((0,2)\).

- (c) If \((2,2)\) is chosen as the second cluster centre, the algorithm will always converge in one iteration.

- (d) The tie-breaking rule will affect the final cluster centres.

**Solution.** K-means++ never picks the next centre uniformly at random — it weights each remaining point by its squared distance to the *nearest already-chosen* centre, so points far from existing centres are more likely to be picked. With only one centre chosen so far, \(\mu_1^0=(0,0)\), the scores are simply squared distances to that single point: \(S(0,2)=0^2+2^2=4\), \(S(2,0)=2^2+0^2=4\), \(S(2,2)=2^2+2^2=8\). These are not all equal, so option (a) is false immediately — \((2,2)\) is strictly farther away and therefore strictly more likely to be picked, which is the entire mechanism K-means++ relies on to spread centres out.

The total score is \(4+4+8=16\), giving selection probabilities \(P(0,2)=\frac{4}{16}=\frac14\), \(P(2,0)=\frac{4}{16}=\frac14\), \(P(2,2)=\frac{8}{16}=\frac12\). Since \(\frac12\) is exactly twice \(\frac14\), option (b) checks out precisely.

For (c): if \((2,2)\) does end up chosen as \(\mu_2^0\), the two centres are \((0,0)\) and \((2,2)\), sitting at opposite corners of the square. Every point is then assigned to whichever corner it's closer to: \((0,0)\) stays with itself, \((2,2)\) stays with itself, while \((0,2)\) and \((2,0)\) are each exactly equidistant from both — a genuine tie. Regardless of how those ties are broken, once assignment is done and means are recomputed, nothing changes on the next pass (the symmetric structure is already stable), so the algorithm converges in a single iteration. That same tie, though, is also why (d) is true: since \((0,2)\) and \((2,0)\) are equidistant from both centres, whatever tie-breaking convention the implementation uses (assign to the lower-indexed cluster, assign randomly, etc.) actually decides which final cluster each of those two points lands in — a genuinely different outcome depending on the rule, so the tie-break is not a cosmetic detail here. Correct: (b), (c), (d).

Mar 2026, Q6 SA · 3 marks

**Q:** "Consider the following data-points in a clustering problem with five data-points and three clusters (\(k=3\)): \((-1,0), (0,0), (1,1), (2,1), (1,-1)\). K-means++ is used to initialize the three means. The first mean is chosen to be \(\mu_1=(0,0)\) and the second mean to be \(\mu_2=(1,1)\). Find the probability of choosing \((1,-1)\)." *(Accepted: 0.5.)*

**Solution.** With two centres already fixed, every remaining point's score is the squared distance to whichever of the two centres is *closer* — not the sum or the distance to both, just the minimum. There are three points left to score: \((-1,0)\), \((2,1)\), and the point in question, \((1,-1)\). For \((-1,0)\): distance² to \(\mu_1=(0,0)\) is \(1\), distance² to \(\mu_2=(1,1)\) is \(4+1=5\); the minimum is \(1\). For \((2,1)\): distance² to \(\mu_1\) is \(4+1=5\), to \(\mu_2\) is \(1+0=1\); minimum \(1\). For \((1,-1)\): distance² to \(\mu_1\) is \(1+1=2\), to \(\mu_2\) is \(0+4=4\); minimum \(2\).

Total score across the three candidates: \(1+1+2=4\). The probability of picking \((1,-1)\) is its score divided by this total: \(\frac{2}{4}=\) 0.5. Notice \((1,-1)\) has the *highest* individual score here (it's the farthest from both existing centres in a squared sense), which is exactly why it also has the highest selection probability among the three — K-means++'s entire design goal is to make far-away points more likely picks.

Feb 2025, Q9 SA · 3 marks — the Euclidean-distance variant

**Q:** "K-means++ algorithm was run on the following dataset with \(K=2\): \((2,5), (2,4), (0,3), (1,1), (1,0)\). Use the point \((1,1)\) as the first cluster mean, then find the probability of the point that has the least chance of being chosen as the second cluster mean. Enter the answer correct to two decimal places. Use Euclidean distance to calculate the distance." *(Accepted: 0.07 to 0.11.)*

**Solution.** The single word "Euclidean" in this stem is doing all the work — it means the score here is plain distance, \(\|x-\mu\|\), *not* the usual squared distance \(\|x-\mu\|^2\) that most other K-means++ questions use. Missing this swap is the single most common way to fail this exact question, because both computations are equally "reasonable-looking" and only one matches the accepted numeric range.

Distances from \(\mu_1=(1,1)\) to each remaining point: to \((2,5)\): \(\sqrt{(2-1)^2+(5-1)^2}=\sqrt{1+16}=\sqrt{17}\approx4.123\); to \((2,4)\): \(\sqrt{1+9}=\sqrt{10}\approx3.162\); to \((0,3)\): \(\sqrt{1+4}=\sqrt5\approx2.236\); to \((1,0)\): \(\sqrt{0+1}=1\). Summing these (not their squares): \(4.123+3.162+2.236+1=10.521\).

The point with the *least* chance of being picked is the one closest to the existing centre — since selection probability is proportional to distance, the smallest distance gives the smallest probability. That's \((1,0)\), at distance \(1\), giving \(P=\frac{1}{10.521}\approx\) 0.095, squarely inside the accepted 0.07–0.11 band. If you had (incorrectly) squared the distances instead, you'd compute \(P=\frac{1}{17+10+5+1}\approx0.03\) — a value that falls clearly outside the accepted range, which is precisely how you'd catch the mistake after the fact if you'd forgotten to reread the question's choice of metric.

Oct 2024, comprehension Q14–16 3+4 marks

**Q (parent stem).** A k-means++ algorithm with \(k=3\) is applied to the 2D points \((0,1),(1,0),(1,2),(2,1),(2,3),(2,4),(3,2)\). The first cluster mean \(\mu_1^0\) is chosen as \((2,1)\). Suppose the point with the highest score is chosen as the second cluster mean \(\mu_2^0\).

**Q15 (MCQ, 3 marks).** What is \(\mu_2^0\)? Use squared distance to calculate scores.

- (a) (0,1)

- (b) (2,3)

- (c) (3,2)

- (d) (2,4)

**Q16 (MCQ, 4 marks).** Which point has the *lowest* probability of being chosen as the 3rd cluster mean? Use squared distance.

- (a) (1,0)

- (b) (2,3)

- (c) (3,2)

- (d) (1,2)

**Solution.** With only \(\mu_1^0=(2,1)\) chosen, the score of every remaining point is simply its squared distance to that one centre. Working through the six candidates: \((0,1)\): \((0-2)^2+(1-1)^2=4\); \((1,0)\): \((1-2)^2+(0-1)^2=2\); \((1,2)\): \((1-2)^2+(2-1)^2=2\); \((2,3)\): \((2-2)^2+(3-1)^2=4\); \((2,4)\): \((2-2)^2+(4-1)^2=9\); \((3,2)\): \((3-2)^2+(2-1)^2=2\). The highest score, and therefore the point most likely (in fact, in this "take the highest score" framing, guaranteed) to be picked next, is \((2,4)\) at score \(9\) — option (d). Notice it's also the geometrically farthest point from \((2,1)\), which is exactly the behaviour K-means++ is designed to produce.

For Q16, the centre set has grown to \(\{(2,1),(2,4)\}\), so every remaining point's score is now the *minimum* of its squared distances to both centres — not the distance to just one, and not their sum. Recomputing for the five points still in play: \((0,1)\): to \((2,1)\) is \(4\), to \((2,4)\) is \(4+9=13\); minimum \(4\). \((1,0)\): to \((2,1)\) is \(2\), to \((2,4)\) is \(1+16=17\); minimum \(2\). \((1,2)\): to \((2,1)\) is \(2\), to \((2,4)\) is \(1+4=5\); minimum \(2\). \((2,3)\): to \((2,1)\) is \(4\), to \((2,4)\) is \(1\); minimum \(1\). \((3,2)\): to \((2,1)\) is \(2\), to \((2,4)\) is \(1+4=5\); minimum \(2\). The lowest score belongs to \((2,3)\), at \(1\) — since probability is proportional to score, the lowest score means the lowest probability of being chosen next. Answer: (2,3), option (b). The general pattern worth internalising: as more centres get chosen, a point's score can only ever be pulled *down* (never up), because the minimum is taken over a growing set of centres — so points sitting near any already-chosen centre become progressively less likely to be picked again.

Oct 2025, comprehension Q17–18 3+2 marks

**Q (parent stem, Figure 2).** Dataset \((-3,4),(-2,3),(1,4),(-3,-1),(2,-1),(1,-2)\), \(K=2\).

**Q17 (MCQ, 3 marks).** Perform K-means with initial cluster centres \((-2,3)\) and \((2,-1)\). What are the final means after convergence?

- (a) \((-1.75, 2.5)\) and \((1.5, -1.5)\)

- (b) \((-2, 3)\) and \((2, -1)\)

- (c) \((-1.33, 3.66)\) and \((0, -1.33)\)

- (d) \((1.33, 1)\) and \((2.66, 2)\)

**Q18 (SA, 2 marks).** Introduce a new data point \((0,0)\) and rerun K-means with the same initial centres. How many iterations does it now take to converge? *(Accepted: 1.)*

**Solution.** Note that \((-2,3)\) and \((2,-1)\) are themselves two of the six data points — they aren't arbitrary guesses, they're actual observations chosen as the starting means, which is a common (and convenient) setup in these papers. Assign every point to whichever of the two initial centres it's closer to, using squared distance: to \((-2,3)\), the point \((-3,4)\) scores \((-3+2)^2+(4-3)^2=1+1=2\); \((-2,3)\) itself scores \(0\); \((1,4)\) scores \(9+1=10\); \((-3,-1)\) scores \(1+16=17\). To \((2,-1)\), those same four points score \(25+25=50\), \(16+16=32\), \(1+25=26\), \(25+0=25\) respectively. Comparing column by column, all four points are closer to \((-2,3)\) than to \((2,-1)\), so they all join cluster 1; the remaining two points, \((2,-1)\) (distance \(0\) to itself) and \((1,-2)\) (distance \(1+1=2\)), join cluster 2.

Recompute the means as plain averages of their assigned points: cluster 1's mean is \(\left(\frac{-3-2+1-3}{4},\frac{4+3+4-1}{4}\right)=(-1.75,\ 2.5)\); cluster 2's mean is \(\left(\frac{2+1}{2},\frac{-1-2}{2}\right)=(1.5,\ -1.5)\). Re-running the assignment step with these updated means, every point stays exactly where it was — nothing crosses to the other cluster — so the algorithm has converged. Final means: \((-1.75, 2.5)\) and \((1.5, -1.5)\), option (a). Options (b) reflects "zero iterations" (the initial guesses, unchanged — a distractor for anyone who forgets to actually update the means), while (c) and (d) don't correspond to any natural mis-assignment of this particular dataset.

For Q18, add \((0,0)\) into the mix and rerun with the *same* initial centres \((-2,3)\) and \((2,-1)\). The new point's squared distance to \((-2,3)\) is \(4+9=13\); to \((2,-1)\) is \(4+1=5\) — so it's closer to \((2,-1)\) and joins cluster 2 alongside \((2,-1)\) and \((1,-2)\) from before. Working through the full re-assignment with this seventh point included reproduces exactly the same final partition as Q17 (the new point simply reinforces cluster 2's existing shape without pulling any other point across the boundary), so the means settle to their final values after the means are updated just once and reassignment confirms no further changes — 1 iteration. The broader lesson: adding one more point to an already well-separated dataset rarely destabilises convergence; it only does so if it sits near the boundary between clusters.

Mar 2026, comprehension Q16–18 2+2 marks

**Q (parent stem).** Dataset \(x_1=(0,0),\ x_2=(3,0),\ x_3=(4,1),\ x_4=(1,1)\), \(K=2\).

**Q17 (MCQ, 2 marks).** If \(z^{(0)}=(1,1,2,2)\), what is the final cluster assignment after running K-means to convergence?

- (a) (1, 1, 2, 2)

- (b) (1, 2, 2, 1)

- (c) (1, 2, 1, 2)

- (d) (1, 1, 1, 2)

- (e) (1, 1, 2, 1)

**Q18 (MCQ, 2 marks).** If instead \(z^{(0)}=(1,2,2,1)\), what is the final cluster assignment?

- (a) (1, 1, 2, 2)

- (b) (1, 2, 2, 1)

- (c) (1, 2, 1, 2)

- (d) (1, 1, 1, 2)

- (e) (1, 1, 2, 1)

**Solution.** Starting from \(z^{(0)}=(1,1,2,2)\): cluster 1 initially holds \(x_1,x_2\), so \(\mu_1=\text{mean}((0,0),(3,0))=(1.5,0)\); cluster 2 holds \(x_3,x_4\), so \(\mu_2=\text{mean}((4,1),(1,1))=(2.5,1)\). Reassign every point to its nearer mean using squared distance: \(x_1=(0,0)\) is at \(1.5^2+0^2=2.25\) from \(\mu_1\) and \((0-2.5)^2+(0-1)^2=7.25\) from \(\mu_2\) → stays in cluster 1. \(x_2=(3,0)\): \((3-1.5)^2=2.25\) from \(\mu_1\), \((3-2.5)^2+1^2=1.25\) from \(\mu_2\) → *switches* to cluster 2. \(x_3=(4,1)\): \((4-1.5)^2+1^2=7.25\) from \(\mu_1\), \((4-2.5)^2+0^2=2.25\) from \(\mu_2\) → stays in cluster 2. \(x_4=(1,1)\): \((1-1.5)^2+1^2=1.25\) from \(\mu_1\), \((1-2.5)^2+0^2=2.25\) from \(\mu_2\) → *switches* to cluster 1. New assignment: \(z=(1,2,2,1)\) — notice \(x_2\) and \(x_4\) traded places.

Update the means again with this new assignment: cluster 1 is now \(\{x_1,x_4\}=\{(0,0),(1,1)\}\), mean \((0.5,0.5)\); cluster 2 is \(\{x_2,x_3\}=\{(3,0),(4,1)\}\), mean \((3.5,0.5)\). Reassigning once more against these updated means, every point lands back in the same cluster it's already in — nothing moves — so the algorithm has converged. Final \(z=(1,2,2,1)\), option (b) for Q17.

Now start instead from \(z^{(0)}=(1,2,2,1)\) — which happens to already *be* the assignment we just proved is a fixed point. Computing the means from this partition gives exactly \((0.5,0.5)\) and \((3.5,0.5)\) as above, and reassigning changes nothing. So Q18's answer is identical: Final \(z=(1,2,2,1)\), again option (b). The pedagogical point of pairing these two sub-questions is to show that K-means can converge to the *same* stable partition from genuinely different starting assignments — here, both the "left pair / right pair" grouping (\(z^{(0)}=(1,1,2,2)\), which isn't the natural geometric split) and the actual natural split fed as a starting point both settle on the true left/right division of the four points once you look at their coordinates: \(x_1,x_4\) sit near \(x=0\)–\(1\) while \(x_2,x_3\) sit near \(x=3\)–\(4\).

Oct 2024, Q8 SA · 5 marks — objective evaluation

**Q:** "Consider the data points \((-1,0),(-1,1),(-1,-1),(2,0),(3,1),(3,-1),(4,0)\) for k-means clustering. With \(k=2\), \(\mu_1^0=(-1,0)\) and \(\mu_2^0=(2,0)\), the squared distances of each point from the two initial means are tabulated: \((-1,0)\!:0,3\); \((-1,1)\!:1,10\); \((-1,-1)\!:1,10\); \((2,0)\!:3,0\); \((3,1)\!:17,2\); \((3,-1)\!:17,2\); \((4,0)\!:5,2\). As per these cluster centers, the data points are assigned to the nearer cluster. What is the value of the objective function \(F(z_1,\dots,z_n)=\sum_i\|x_i-\mu_{z_i}\|^2\) after this assignment?" *(Accepted: 6.)*

**Solution.** This question front-loads all the distance computations for you specifically so it can test something else: whether you actually understand what the assignment step and the objective function mean, rather than whether you can compute Euclidean distances. Each point is assigned to whichever centre is nearer — meaning, for each row of the table, you keep the *smaller* of the two entries, since that's the squared distance to the cluster the point actually joins; the larger entry is the distance to the centre it does *not* join and is irrelevant to \(F\). Taking the minimum of each row: \(0, 1, 1, 0, 2, 2, 2\). Summing these seven minimums: \(0+1+1+0+2+2+2=\) 6. The only way to get this wrong is to sum the wrong column somewhere, or to sum both columns instead of just the minimum of each row — a mistake worth guarding against by explicitly circling the smaller number in each row before adding.

Feb 2025, Q3 MCQ · 3 marks — convexity

**Q:** "K-means clustering is run on a dataset of 100 points with \(K=3\). If you know that the points \((0,1)\) and \((1,1)\) are part of the same cluster \(C_1\), then which of the following points will *definitely* lie in \(C_1\)?"

- (a) \((-1, 1)\)

- (b) \((1, 2)\)

- (c) \((0.2, 1)\)

- (d) \((0, 0)\)

**Solution.** The key geometric fact underlying this question is that every K-means cluster region is a *Voronoi cell* — the set of all points closer to one particular centre than to any other — and Voronoi cells are always convex, meaning if two points both belong to the same cell, then every point on the straight-line segment between them belongs to that same cell too. This isn't an approximation or a rule of thumb; it follows directly from the fact that "closer to \(\mu_1\) than to \(\mu_2\)" is defined by a linear inequality (a half-plane), and the intersection of half-planes is always convex.

Given that \((0,1)\) and \((1,1)\) are both in \(C_1\), any point on the segment joining them is guaranteed to be in \(C_1\) too. That segment is simply \(\{(t,1): 0\le t\le1\}\), and \((0.2,1)\) sits exactly on it (\(t=0.2\)), so it is guaranteed to be in \(C_1\) — option (c). None of the other three points lie on that segment: \((-1,1)\) is on the same horizontal line but *outside* the interval between the two known points (it's an extrapolation, not an interpolation, and convexity says nothing about points outside the segment); \((1,2)\) and \((0,0)\) aren't even on the line \(y=1\). Without more information about where the other cluster centres are, none of these three can be placed with certainty — only the point actually between the two known members is guaranteed.

## 5. Module 4: Maximum Likelihood Estimation (~7%, easiest marks on the paper)

MLE sounds intimidating and is anything but. The whole philosophy in one sentence: **"Which parameter value makes my data look least surprising?"** For this exam, four memorised formulas and one comparison trick cover every MLE question ever asked.

### Concept, from zero

You observe data \(x_1,\dots,x_n\) drawn independently from a distribution with unknown parameter \(\theta\). The **likelihood** is the probability (density) of seeing exactly your data: \(L(\theta) = \prod_i f(x_i\mid\theta)\). The MLE \(\hat\theta\) is the \(\theta\) that maximises it. Since logs turn products into sums, always maximise \(\log L\) instead: differentiate, set to zero, solve.

**Trick 1 — memorise the closed forms.** Deriving them live wastes minutes:

| Model | MLE |
| --- | --- |
| Bernoulli(\(p\)) — coin with heads probability \(p\) | \(\hat p = \dfrac{\#\text{heads}}{n}\) |
| Gaussian | \(\hat\mu = \bar x,\quad \hat\sigma^2 = \frac1n\sum(x_i-\bar x)^2\) (note the \(\frac1n\)) |
| Exponential, rate \(\lambda\) | \(\hat\lambda = 1/\bar x\) |
| Pareto: \(f(x)=\theta x^{-\theta-1},\ x\ge1\) | \(\hat\theta = \dfrac{n}{\sum_i \ln x_i}\) |

**Trick 2 — pool all independent Bernoulli evidence.** If several people toss the same coin, merge everything into total heads / total tosses.

**Trick 3 — discrete parameter? Don't differentiate, compare.** If \(\theta\) can only be one of two values, compute the likelihood under each and pick the bigger. Turn the comparison into a product/ratio test.

### Solved from the PYQs

Feb 2025, Q10 SA · 3 marks

**Q:** "Suppose you toss a coin four times and observe no heads. You then give the coin to your friend, who tosses it until the first head occurs. Your friend tosses the coin a total of five times. Let \(p\) denote the probability that the coin comes up heads. Find the maximum likelihood estimate of \(p\)." *(Accepted: 0.10 to 0.12.)*

**Solution.** The trick here is recognising that MLE doesn't care *why* a toss stopped — a head is a head and a tail is a tail regardless of whose stopping rule generated the sequence, so all the evidence from both people can simply be pooled into one big Bernoulli likelihood. Your four tosses give 4 tails and 0 heads. Your friend's five tosses ("tosses until the first head, taking five tosses total") means tosses 1 through 4 were tails and toss 5 was the first head — so 4 tails and 1 head. Pooling: total tosses \(=4+5=9\), total heads \(=0+1=1\). The Bernoulli MLE is always \(\hat p=\frac{\#\text{heads}}{\#\text{tosses}}\) (Trick 1), so \(\hat p=\frac19\approx\) 0.11, inside the accepted band. The two-part framing (yours vs. your friend's) exists purely to test whether you'll correctly combine independent evidence about the same parameter instead of treating them as two separate estimation problems.

Oct 2024, Q10 SA · 4 marks

**Q:** "Consider a dataset with 100 total data points. Each data point is classified as either type A or type B. We model this using a Bernoulli distribution, where \(p\) is the probability of a data point being type A. If the maximum likelihood estimate (MLE) of \(p\) based on the dataset is 0.4, how many data points of type B are there in this dataset?" *(Accepted: 60.)*

**Solution.** Run the Bernoulli MLE formula in reverse: since \(\hat p=\frac{\#A}{100}=0.4\), the number of type-A points must be \(\#A=0.4\times100=40\). Since every point is exactly one of the two types, the type-B count is whatever's left: \(100-40=\) 60. There's no distribution theory to apply beyond the single formula \(\hat p=\#\text{success}/n\) — this question is purely testing whether you can invert it cleanly under time pressure.

Jul 2025, Q10 SA · 3 marks

**Q:** "Let \(X_1,\dots,X_n\) be an i.i.d. sample from a Pareto distribution with pdf \(f(x\mid\theta)=\theta x^{-\theta-1},\ x\ge1,\ \theta>1\). Given the sample \(\{2.5, 1.8, 3.2, 2.0, 2.7\}\), what is the maximum likelihood estimator of \(\theta\)?" *(Accepted: 1.147 to 1.150.)*

**Solution.** The Pareto MLE has a closed form worth memorising outright rather than re-deriving under exam pressure: \(\hat\theta=\dfrac{n}{\sum_i\ln x_i}\) (it falls out of differentiating the log-likelihood \(\sum_i[\ln\theta-(\theta+1)\ln x_i]\) with respect to \(\theta\) and setting the result to zero — worth doing once on scratch paper so you trust the formula, but not worth re-doing every time). Here \(n=5\), and the natural logs of the five sample values are \(\ln2.5\approx0.916\), \(\ln1.8\approx0.588\), \(\ln3.2\approx1.163\), \(\ln2.0\approx0.693\), \(\ln2.7\approx0.993\), summing to \(4.354\). So \(\hat\theta=\frac{5}{4.354}\approx\) 1.148, inside the accepted range. This is as close to a "free" question as the paper offers, provided Trick 1's formula table is memorised cold.

Oct 2024, Q6 MSQ · 5 marks — the discrete-θ likelihood duel

**Q:** "Let \(X_1,\dots,X_n\) be \(n\) i.i.d. samples with parameter \(\theta\), which follows one of two PDFs: for \(\theta=-1\), \(f(x\mid\theta)=5x^4\) on \((0,1)\); for \(\theta=1\), \(f(x\mid\theta)=1\) on \((0,1)\). Suppose we wish to find the MLE of \(\theta\); which among the following are true?"

- (a) If \(\prod_{i=1}^n 5x_i^4 < 1\), then \(\hat\theta_{MLE}=1\).

- (b) If \(\prod_{i=1}^n 5x_i^4 > 1\), then \(\hat\theta_{MLE}=1\).

- (c) If \(\prod_{i=1}^n 5x_i^4 < 1\), then \(\hat\theta_{MLE}=-1\).

- (d) If \(\prod_{i=1}^n 5x_i^4 > 1\), then \(\hat\theta_{MLE}=-1\).

**Solution.** When the unknown parameter can only take one of two discrete values, there's no derivative to set to zero — MLE just becomes "compute the likelihood under each candidate value and keep whichever is larger" (Trick 3). Under \(\theta=-1\), the likelihood of the whole sample is \(L(-1)=\prod_i f(x_i\mid{-1})=\prod_i 5x_i^4\). Under \(\theta=1\), the density is the uniform density \(f(x)=1\) everywhere on \((0,1)\), so the likelihood is simply \(L(1)=\prod_i 1=1\) — a fixed baseline value that doesn't depend on the data at all.

MLE picks \(\hat\theta=-1\) whenever \(L(-1)>L(1)\), i.e. whenever \(\prod_i5x_i^4>1\); it picks \(\hat\theta=1\) whenever \(L(-1)<L(1)\), i.e. whenever \(\prod_i5x_i^4<1\). That directly matches statement (a) (small product ⇒ pick \(\theta=1\), since the "\(\theta=-1\)" model was comparatively unlikely) and statement (d) (large product ⇒ pick \(\theta=-1\), since it explains the data comparatively better). Statements (b) and (c) simply have the direction of the comparison flipped — swapping which likelihood outperforms which — and are the natural mistake for anyone who mixes up which quantity is being compared to \(1\). Correct: (a) and (d).

## 6. Module 5: Bayesian estimation — Beta–Bernoulli (~4%, pure formula)

This is the shortest module for a reason: the exam only ever asks one thing here, and it is answered by adding four numbers. Learn the update rule below and you have banked these marks permanently.

### Concept, from zero

Instead of a single best \(\theta\), Bayesian estimation keeps a *distribution* over \(\theta\), updated by data. For a proportion/probability parameter, the conjugate prior is the Beta distribution. The entire topic in these papers reduces to two lines:

\[ \text{Prior } \text{Beta}(a,b)\ +\ \text{data with } h \text{ successes}, t \text{ failures} \;\Longrightarrow\; \text{Posterior } \text{Beta}(a+h,\ b+t) \]

\[ \text{Posterior mean} = \frac{a+h}{a+b+h+t} \]

**Trick — success/failure bookkeeping.** "10 defective out of 100 sampled" ⇒ \(h=10\) (the thing being modelled — defectives), \(t=90\). The distractors are always Beta with swapped parameters or Bernoulli — the posterior of a continuous parameter can never be Bernoulli.

### Solved from the PYQs

Feb 2025, comprehension Q15–17 2+2 marks

**Q (parent stem).** "Suppose that 100 items are sampled from a manufacturing process and 10 are found to be defective. Let \(p\) denote the proportion of defective items. Assume the prior distribution for \(p\) is Beta(1, 1)."

**Q16 (MCQ, 2 marks).** Select the correct option:

- (a) Posterior distribution for \(p\) is Beta(91, 11).

- (b) Posterior distribution for \(p\) is Beta(11, 91).

- (c) Posterior distribution for \(p\) is Bernoulli(0.1).

- (d) Posterior distribution for \(p\) is Bernoulli(0.9).

**Q17 (SA, 2 marks).** Find the posterior mean. *(Accepted: 0.10 to 0.11.)*

**Solution.** The Beta distribution is the conjugate prior for a Bernoulli/binomial proportion precisely because updating it on new data is just arithmetic on its two parameters: starting from Beta\((a,b)\) and observing \(h\) successes and \(t\) failures, the posterior is Beta\((a+h,\ b+t)\) — no integration required, which is the entire appeal of conjugacy. Here the prior is Beta(1,1) (the uniform distribution on \([0,1]\), representing total initial ignorance about \(p\)), and the data contributes \(h=10\) defectives (the "success" being modelled) out of \(t=90\) non-defectives. So the posterior is Beta\((1+10,\ 1+90)=\)Beta(11, 91), option (b).

Option (a) simply has the two parameters swapped — an easy slip if you're not careful about which count (defectives vs. non-defectives) attaches to which side of the Beta, and a useful habit is to remember that the *first* parameter always tracks the same "success" event that's being estimated, here "defective." Options (c) and (d) can be eliminated on a conceptual level alone, without any arithmetic: Bernoulli describes a distribution over a single binary outcome (0 or 1), never a continuous belief distribution over a proportion \(p\in[0,1]\) — a posterior over a continuous parameter can never literally be a Bernoulli distribution, so both are structurally wrong regardless of the specific numbers.

For the posterior mean, the mean of a Beta\((a,b)\) distribution is always \(\frac{a}{a+b}\) — another fact worth having memorised rather than re-deriving. Here that's \(\frac{11}{11+91}=\frac{11}{102}\approx\) 0.108, which lands in the accepted 0.10–0.11 window.

Oct 2025, Q5 MSQ · 4 marks

**Q:** "Suppose that 100 items are sampled from a manufacturing process, where three items are found to be defective. Consider Beta\((a,b)\) as a prior for the proportion \(\theta\) of defective items, with (i) \(a=1,b=1\) and (ii) \(a=0.5,b=0.5\). If the posterior mean is used as the estimate for \(\theta\), which of the following is correct?" *Hint: mean of Beta\((a,b)\) is \(\frac{a}{a+b}\).*

- (a) Posterior mean for Beta(1, 1) is 0.039.

- (b) Posterior mean for Beta(1, 1) is 0.03.

- (c) Posterior mean for Beta(0.5, 0.5) is 0.025.

- (d) Posterior mean for Beta(0.5, 0.5) is 0.034.

**Solution.** Same update rule as the block above, run twice with two different priors against the same data (\(h=3\) defectives, \(t=97\) non-defectives out of 100). Starting from Beta(1,1): posterior is Beta\((1+3,\ 1+97)=\)Beta(4, 98), with mean \(\frac{4}{4+98}=\frac{4}{102}\approx\) 0.039, matching (a) and ruling out (b), which is simply a rounding-too-aggressively distractor.

Starting instead from the "non-informative" Jeffreys-style prior Beta(0.5, 0.5): posterior is Beta\((0.5+3,\ 0.5+97)=\)Beta(3.5, 97.5), with mean \(\frac{3.5}{3.5+97.5}=\frac{3.5}{101}\approx\) 0.0347, matching (d) and ruling out (c). The broader point this MSQ is making: different (reasonable) priors give somewhat different posterior means even from identical data, but the effect shrinks as more data accumulates — with only 100 observations here, the prior's pull is still visible (the two means differ by about 0.005), whereas with a much larger sample the two priors would converge to nearly the same posterior.

## 7. Module 6: GMM & the EM algorithm (~15%)

EM is where most students lose marks they shouldn't. Here's the reframe that makes it easy: the E-step is just **Bayes' rule** (which team probably generated this point?), and the M-step is just a **weighted average**. Every EM question in these five papers is one of those two computations wearing a costume.

### Concept, from zero

A **Gaussian Mixture Model** says each data point was generated by first secretly choosing one of \(K\) Gaussian components (component \(k\) with probability \(\pi_k\)), then sampling from that Gaussian. The density of one point is a *weighted sum*:

\[ f(x_i) = \sum_{k=1}^{K}\pi_k\,\mathcal N(x_i \mid \mu_k, \sigma_k^2), \qquad L(\theta) = \prod_{i=1}^{n}\ \sum_{k=1}^{K}\pi_k\,\frac{1}{\sigma_k\sqrt{2\pi}}\exp\!\Big({-\tfrac12\big(\tfrac{x_i-\mu_k}{\sigma_k}\big)^2}\Big) \]

Because of the hidden choice ("latent variable"), we can't maximise this directly — so **EM** alternates:

- **E-step** — for each point, compute the **responsibility** of each component (a soft assignment, via Bayes' rule):

    \[ \gamma_i^k \;(=\lambda_i^k) = \frac{\pi_k\, f_k(x_i)}{\sum_{j}\pi_j\, f_j(x_i)} \]

- **M-step** — re-estimate parameters using responsibilities as weights:

    \[ \mu_k = \frac{\sum_i \gamma_i^k\, x_i}{\sum_i \gamma_i^k}, \qquad \pi_k = \frac{1}{n}\sum_i \gamma_i^k \]

In words: E-step = "estimate the latent variables given parameters", M-step = "maximise the likelihood over the parameters". (That exact phrasing is an MCQ — Jul 2025 Q6.)

**Trick 1 — spot the correct likelihood in one glance.** The right formula has (i) product over data points \(i=1..n\) **outside**, (ii) sum over components **inside**, (iii) \(\pi_k\) multiplying each component. Any option missing \(\pi_k\), or with wrong index ranges (product over \(k\), sum over \(i\)), is wrong. Oct 2025 Q14 and Mar 2026 Q20 are both solved by this scan.

**Trick 2 — the papers hand you the densities.** When a table of \(f(x_i\mid z_i=k)\) values is given, never compute Gaussian densities yourself — plug the table numbers into the responsibility formula. If not given, memorise standard-normal values: \(\phi(0)=0.399,\ \phi(1)=0.242,\ \phi(2)=0.054\). All three appear verbatim in these papers.

**Trick 3 — M-step mean = weighted average.** \(\mu_k\) is just a weighted mean of the data with weights \(\gamma\). Sanity check: it must land between the data values it weights most.

**Trick 4 — MAP assignment.** A point belongs to component 1 iff \(\gamma_i \gt 0.5\) (two-component case). Compute responsibilities once, threshold at 0.5, done.

### Solved from the PYQs

Oct 2025, comprehension Q13–15 3+3 marks

**Q (parent stem).** "Consider clustering 1D data with a mixture of 2 Gaussians using EM. Data points \(x_1=1, x_2=10, x_3=20\)."

**Q14 (MCQ, 3 marks).** Which represents the likelihood function \(L(\theta)\) for this GMM (\(\theta=\{\mu_1,\mu_2,\sigma_1,\sigma_2,\pi_1,\pi_2\}\))?

- (a) \(\prod_{i=1}^3\sum_{k=1}^2\frac{1}{\sigma_k\sqrt{2\pi}}\exp\!\left(-\frac12\left(\frac{x_i-\mu_k}{\sigma_k}\right)^2\right)\)

- (b) \(\prod_{i=1}^3\sum_{k=1}^2\pi_k\frac{1}{\sigma_k\sqrt{2\pi}}\exp\!\left(-\frac12\left(\frac{x_i-\mu_k}{\sigma_k}\right)^2\right)\)

- (c) \(\prod_{i=1}^2\sum_{k=1}^2\frac{1}{\sigma_k\sqrt{2\pi}}\exp\!\left(-\frac12\left(\frac{x_i-\mu_k}{\sigma_k}\right)^2\right)\)

- (d) \(\prod_{i=1}^2\sum_{k=1}^2\pi_k\frac{1}{\sigma_k\sqrt{2\pi}}\exp\!\left(-\frac12\left(\frac{x_i-\mu_k}{\sigma_k}\right)^2\right)\)

**Q15 (SA, 3 marks).** At time \(t\): \(\pi_1=0.3,\pi_2=0.7,\mu_1=2,\mu_2=3,\sigma_1^2=\sigma_2^2=1\). Given the density table \(f(1\mid z{=}1)=0.242,\ f(1\mid z{=}2)=0.054\) (with \(f(10\mid\cdot)\) and \(f(20\mid\cdot)\) also supplied for the other points), find \(\lambda_1^1\). *(Accepted: 0.64 to 0.68.)*

**Solution.** For Q14, don't try to recall the formula from memory in the heat of the exam — scan the four options structurally (Trick 1). A GMM likelihood must have the product running over *data points* (\(i=1\) to \(n\), here \(n=3\)) on the outside, since observations are independent, and the sum running over *components* (\(k=1\) to \(K\)) on the inside, since any single point could have come from any component and you don't know which. Options (c) and (d) both mistakenly cap the product at \(i=2\) instead of \(3\) — silently dropping the third data point from the likelihood entirely, which is wrong regardless of anything else in the formula. Between the surviving options (a) and (b), only (b) includes the mixing weight \(\pi_k\) inside the sum; without it, the formula would treat both components as equally likely a priori, which contradicts the whole premise of a weighted mixture. Correct: (b).

For Q15, the responsibility formula is Bayes' rule applied to "which component generated this point": \(\lambda_1^1=\dfrac{\pi_1f_1(x_1)}{\pi_1f_1(x_1)+\pi_2f_2(x_1)}\). Plugging in the numbers straight from the density table (you are never expected to compute Gaussian densities by hand when a table is given — Trick 2): \(\lambda_1^1=\dfrac{0.3\times0.242}{0.3\times0.242+0.7\times0.054}=\dfrac{0.0726}{0.0726+0.0378}=\dfrac{0.0726}{0.1104}\approx\) 0.66, inside the accepted band. The whole computation is arithmetic once you have the table — the actual skill being tested is recognising that "\(\lambda_1^1\)" means "posterior probability that point 1 came from component 1," i.e. plain Bayes' rule with the mixture weights as priors.

Feb 2025, Q11 SA · 4 marks

**Q:** "Suppose we fit a GMM with \(K=2\) for the dataset \(D=\{x_1=1,x_2=3,x_3=2,x_4=5\}\). At the beginning of the \(t\)-th time step, \(\pi_1=\pi_2=0.5,\ \mu_1=1,\mu_2=3,\ \sigma_1^2=\sigma_2^2=1\). What is the probability that \(x_1=1\) belongs to the first component?" *(Accepted: 0.86 to 0.90.)*

**Solution.** Again this is the E-step responsibility formula, \(\gamma=\dfrac{\pi_1\,\mathcal N(x_1\mid\mu_1,\sigma_1^2)}{\pi_1\,\mathcal N(x_1\mid\mu_1,\sigma_1^2)+\pi_2\,\mathcal N(x_1\mid\mu_2,\sigma_2^2)}\), but this time no density table is handed to you, so you need the standard normal density \(\phi\) evaluated at the standardised distances. \(x_1=1\) is exactly at \(\mu_1\), i.e. \(0\) standard deviations away (\(\sigma_1=1\)), so its density under component 1 is \(\phi(0)=0.399\). It's \(3-1=2\) units from \(\mu_2\), i.e. \(2\) standard deviations away (\(\sigma_2=1\)), so its density under component 2 is \(\phi(2)=0.054\). These three magic numbers — \(\phi(0)=0.399\), \(\phi(1)=0.242\), \(\phi(2)=0.054\) — are worth memorising outright (Trick 2), because they turn up in this exact form across multiple papers.

Since \(\pi_1=\pi_2=0.5\), the mixing weights cancel out of the ratio: \(\gamma=\dfrac{0.5\times0.399}{0.5\times0.399+0.5\times0.054}=\dfrac{0.399}{0.399+0.054}=\dfrac{0.399}{0.453}\approx\) 0.88, inside the accepted band. Sanity check: \(x_1\) sits right on top of \(\mu_1\) and two full standard deviations from \(\mu_2\), so it should overwhelmingly favour component 1 — a responsibility of 0.88 (rather than something close to 0.5) is exactly the kind of result you should expect before even finishing the arithmetic.

Oct 2024, Q9 SA · 4 marks — M-step

**Q:** "Consider a GMM for 5 points \(x_1=1,x_2=1.2,x_3=2,x_4=1.5,x_5=0.5\). At some time-step, the values of \(\lambda_k^i\) for the \(k\)-th mixture after the E-step are \(0.3, 0.1, 2.5, 0.6, 0.8\). What is the estimate of \(\mu_k\) after the M-step?" *(Accepted: 1.50 to 1.60.)*

**Solution.** The M-step update for a component mean is nothing more exotic than a weighted average, with the E-step responsibilities serving as the weights: \(\mu_k=\dfrac{\sum_i\lambda_k^ix_i}{\sum_i\lambda_k^i}\) (Trick 3). Compute the weighted sum in the numerator: \(0.3(1)+0.1(1.2)+2.5(2)+0.6(1.5)+0.8(0.5)=0.3+0.12+5.0+0.9+0.4=6.72\). Compute the sum of weights in the denominator: \(0.3+0.1+2.5+0.6+0.8=4.3\). So \(\mu_k=\frac{6.72}{4.3}\approx\) 1.56, inside the accepted band.

As a built-in sanity check, notice that the point with by far the largest responsibility, \(x_3=2\) at weight \(2.5\) (roughly half the total weight on its own), pulls the weighted mean noticeably toward it — so the answer, \(1.56\), sits closer to \(2\) than a plain unweighted average of the five points would (\(\frac{1+1.2+2+1.5+0.5}{5}=1.24\)). A weighted mean must always fall within the range of the data it's averaging and should visibly lean toward whichever points carry the most weight; if your answer doesn't, you've made an arithmetic error.

Mar 2026, comprehension Q19–22 2+3+3 marks — mixture of exponentials

**Q (parent stem).** "Let \(X_1,\dots,X_n\) be i.i.d. from the mixture \(f(x\mid\theta)=\theta f_1(x)+(1-\theta)f_2(x),\ 0<\theta<1\), where \(f_1(x)=e^{-x}\), \(f_2(x)=3e^{-3x}\), \(x\ge0\). Observed data: \(x=\{0.2, 0.5, 1.1, 1.8\}\). Initial mixing parameter \(\theta^{(0)}=0.6\)."

**Q20 (MCQ, 2 marks).** Which expression correctly represents the log-likelihood \(\ell(\theta)\)?

- (a) \(\sum_{i=1}^n[\theta\log f_1(x_i)+(1-\theta)\log f_2(x_i)]\)

- (b) \(\log\!\left(\sum_{i=1}^n[\theta f_1(x_i)+(1-\theta)f_2(x_i)]\right)\)

- (c) \(\sum_{i=1}^n\log\!\left(\theta e^{-x_i}+(1-\theta)3e^{-3x_i}\right)\)

- (d) \(\sum_{i=1}^n[\log\theta+\log f_1(x_i)]\)

**Q21 (SA, 3 marks).** Compute \(\gamma_i^{(0)}=P(Z_i=1\mid x_i,\theta^{(0)})=\dfrac{\theta^{(0)}f_1(x_i)}{\theta^{(0)}f_1(x_i)+(1-\theta^{(0)})f_2(x_i)}\) for each point, and enter \(\sum_i\gamma_i^{(0)}\). *(Accepted: 2.74 to 2.80.)*

**Q22 (MCQ, 3 marks).** Using MAP with the rule "assign to component 2 if \(\gamma_i^{(0)}\le0.5\)", which point(s) belong to component 2?

- (a) \(\{0.2\}\) only

- (b) \(\{0.2, 0.5\}\) only

- (c) \(\{1.1, 1.8\}\) only

- (d) \(\{1.1, 1.8\}\) only

**Solution.** Q20 is the same structural scan as the Oct 2025 likelihood question: the correct log-likelihood must be a *sum over data points of the log of the mixture density*, because \(\log\) of a product of independent terms turns into a sum of logs, but each individual term inside that sum is still "log of a sum of two weighted exponential densities" — the mixing happens *before* the log is taken, point by point. Option (a) illegally distributes \(\theta\) and \(\log\) across the mixture (treating it as if you could take the log of each component separately and mix afterwards — you can't, since \(\log(a+b)\ne a\log(\cdot)+b\log(\cdot)\)). Option (b) puts the sum *inside* a single outer log instead of taking the log inside each term of the sum — that's the likelihood of a single combined dataset, not the correct product-becomes-sum expansion. Option (d) drops the second mixture component entirely. Only (c) correctly nests "log of (mixture of the two exponential densities)" inside the sum over points.

Q21 is E-step bookkeeping applied to four points instead of the usual two or three: \(\gamma_i^{(0)}=\dfrac{0.6\,e^{-x_i}}{0.6\,e^{-x_i}+0.4\cdot3e^{-3x_i}}\). Working through each: \(x=0.2\): \(0.6e^{-0.2}=0.491,\ 1.2e^{-0.6}=0.659\), so \(\gamma=\frac{0.491}{0.491+0.659}\approx0.43\). \(x=0.5\): \(0.6e^{-0.5}=0.364,\ 1.2e^{-1.5}=0.268\), \(\gamma\approx0.58\). \(x=1.1\): \(0.6e^{-1.1}=0.200,\ 1.2e^{-3.3}=0.0447\), \(\gamma\approx0.82\). \(x=1.8\): \(0.6e^{-1.8}=0.0993,\ 1.2e^{-5.4}=0.0055\), \(\gamma\approx0.95\). Summing: \(0.43+0.58+0.82+0.95\approx\) 2.77, comfortably inside the accepted band.

Q22 reuses exactly these four numbers rather than requiring fresh computation — a hallmark of comprehension sets, where the hard work done for one sub-question pays out again on the next. The MAP rule assigns a point to component 2 whenever its \(\gamma_i^{(0)}\) (the responsibility of component 1) is at or below \(0.5\). Scanning the four values \(0.43, 0.58, 0.82, 0.95\), only \(x=0.2\) (at \(\gamma\approx0.43\)) falls at or below the threshold — \(\{0.2\}\) only, option (a). (Note the source paper lists options (c) and (d) with identical text, \(\{1.1,1.8\}\) only — almost certainly a typesetting duplicate in the original exam rather than a meaningful distinction; either way, neither matches the correct answer.)

Jul 2025, Q6 MCQ · 3 marks & Q7 MSQ · 3 marks — theory MCQs

**Q6:** "How would you define the steps in the EM algorithm?"

- (a) E-step: Estimate the latent variables in the dataset. M-step: Maximize the likelihood over the model parameters.

- (b) E-step: Estimate the number of latent variables in the dataset. M-step: Maximize the likelihood over the model parameters.

- (c) E-step: Estimate the likelihood over the model parameters. M-step: Maximize the number of latent variables in the dataset.

- (d) E-step: Estimate the likelihood over the model parameters. M-step: Maximize the number of parameters in the model.

**Q7 (MSQ):** "Which of the following statements is/are true?"

- (a) EM algorithm converges to a global optimum.

- (b) Lloyd's algorithm converges to a local optimum.

- (c) Poor initialization does not affect the clusters produced by EM algorithm.

- (d) Poor initialization leads to a slower convergence of Lloyd's algorithm.

- (e) Lloyd's algorithm is sensitive to the number of clusters (\(k\)).

**Solution.** Q6 is a pure definitions check, but the wrong options are designed to sound almost right, so read them literally rather than skimming for keywords. The E-step never estimates *how many* latent variables exist — the number of components \(K\) is fixed in advance and given; what the E-step actually estimates is *which* component each existing point most likely came from (the responsibilities). Likewise the M-step maximises the likelihood *over the parameters* \(\theta\) — it never maximises "the number of latent variables" or "the number of parameters," since the model's structure (how many parameters exist) is fixed throughout; only their *values* are being optimised. Only option (a) gets both halves right.

Q7 is the same Lloyd's/EM properties list seen in Module 3, phrased slightly differently: EM, like Lloyd's, is a coordinate-ascent-style procedure and is only guaranteed to reach a *local* maximum of the likelihood, never necessarily the global one — so "EM converges to a global optimum" is false, and by the exact same argument, "poor initialization does not affect the clusters produced by EM" is also false, since where you start genuinely determines which local optimum you land in. Meanwhile "Lloyd's converges to a local optimum," "poor initialization slows Lloyd's convergence," and "Lloyd's is sensitive to \(k\)" are all textbook-true properties covered in Module 3's Trick list. Correct: (b), (d), (e).

## 8. Module 7: Linear regression (appeared once — Jul 2025, 7 marks)

**Concept.** Model \(y = w^Tx\); choose \(w\) minimising squared error \(\sum_i (y_i - w^Tx_i)^2\). This objective is **convex**, so gradient descent converges to the global minimum. Stochastic GD uses one (or few) points per step: cheaper per iteration, noisier, typically needs more iterations, no guarantee of exact convergence without care.

**Trick — tiny exact datasets.** With 2 unknowns, pick the 2 cleanest data rows and solve the linear system; verify on the rest. If the model fits all points exactly, training MSE = 0 (they asked exactly this).
Jul 2025, comprehension Q16–18 3+1 marks + Q8 MSQ · 3 marks

**Q (parent stem).** Dataset with feature vector \(x\) and label \(y\): \((4,1)\to y=2\); \((2,8)\to-14\); \((1,4)\to-7\); \((3,2)\to-1\).

**Q17 (MCQ, 3 marks).** Fit the linear regression model \(y=w^Tx,\ w=(w_1,w_2)^T\) using squared error.

- (a) \(y=x_1+2x_2\)

- (b) \(y=x_1-2x_2\)

- (c) \(y=x_1-x_2\)

- (d) \(y=x_1+x_2\)

**Q18 (SA, 1 mark).** Find the mean squared error for the training dataset. *(Accepted: 0.)*

**Q8 (MSQ, 3 marks).** "For a linear regression problem, which among the following are true?"

- (a) Gradient descent will converge to a global minimum.

- (b) Gradient descent will converge to a local minimum (which is not a global minimum).

- (c) Stochastic gradient descent is guaranteed to converge to a global minimum.

- (d) Gradient descent will take lesser number of iterations to converge to a local minimum than stochastic gradient descent.

**Solution.** With only two unknowns, \(w_1\) and \(w_2\), you never need all four data rows to solve for \(w\) — any two rows give you two linear equations in two unknowns, and if the model genuinely fits the data exactly, the remaining rows will automatically check out too (Trick — tiny exact datasets). Using rows 1 and 3: \(4w_1+w_2=2\) and \(w_1+4w_2=-7\). Solve the first for \(w_2=2-4w_1\) and substitute into the second: \(w_1+4(2-4w_1)=-7\Rightarrow w_1+8-16w_1=-7\Rightarrow-15w_1=-15\Rightarrow w_1=1\), giving \(w_2=2-4=-2\). So \(w=(1,-2)\), i.e. \(y=x_1-2x_2\), option (b).

Before trusting this, verify it against the rows you didn't use: row 2, \((2,8)\): \(1(2)-2(8)=2-16=-14\) ✔, matching the given label exactly; row 4, \((3,2)\): \(1(3)-2(2)=3-4=-1\) ✔. Since every one of the four points is fit exactly with zero error, the training mean squared error is 0 for Q18 — there's no averaging of nonzero squared residuals to do, because there are no residuals at all.

For the MSQ (Q8), the key structural fact is that the squared-error objective for linear regression, \(\sum_i(y_i-w^Tx_i)^2\), is a convex (in fact quadratic, bowl-shaped) function of \(w\) — it has no local minima that aren't also the global minimum, unlike the non-convex objectives that show up in K-means or GMM fitting. That means gradient descent (which always moves downhill) is guaranteed to reach the single global minimum eventually, making (a) true and (b) — which asserts a non-global local minimum exists — false, since no such point exists for this objective. Stochastic gradient descent, which uses noisy one-point (or few-point) gradient estimates instead of the full-batch gradient, will get close to the minimum but its inherent noise means it doesn't settle down to the exact minimizer the way full-batch gradient descent does without extra care (e.g. a decaying learning rate) — so (c)'s blanket guarantee is false. And because full-batch gradient descent takes the most accurate (least noisy) step available at each iteration, it typically needs fewer iterations to reach a given accuracy than SGD, which takes noisier, smaller effective steps — making (d) true. Correct: (a) and (d).

## 9. One-page formula sheet (rewrite this by hand the night before)

| Item | Formula |
| --- | --- |
| Covariance matrix (centred) | \(C = \frac1n\sum x_ix_i^T\) |
| 2×2 shortcut \(\begin{pmatrix}a&b\\\\b&a\end{pmatrix}\) | \(\lambda = a\pm b\); eigvecs \(\frac{1}{\sqrt2}(1,1), \frac{1}{\sqrt2}(1,-1)\) |
| Variance along unit \(v\) | \(v^TCv\); along PC \(w_k\): \(\lambda_k\) |
| % variance, top-\(k\) | \((\lambda_1{+}\cdots{+}\lambda_k)/\sum_j\lambda_j\) |
| Projection / reconstruction / residue | \(t = x^Tw\); \(\hat x = (x^Tw)w\); \(r = x - \hat x \perp w\) |
| Compression cost, top-\(k\) | \(dk + nk\) vs \(nd\) |
| Kernel PCA pairing | \(X^TX v = \lambda v \Rightarrow w = Xv/\sqrt\lambda\); \(k>d\) possible |
| \(\phi\) for \((x^Ty)^2\) in 2D | \([x_1^2, \sqrt2 x_1x_2, x_2^2]\); "+c" appends \(\sqrt c\) |
| Poly kernel feature count | \(\binom{d+p}{p}\) |
| Gaussian kernel | \(\exp(-\|x-y\|^2/2\sigma^2)\) |
| K-means objective | \(F = \sum_i \|x_i - \mu_{z_i}\|^2\) |
| K-means++ pick probability | \(P(x) = \dfrac{\min_j \|x-\mu_j\|^2}{\sum_{x'}\min_j\|x'-\mu_j\|^2}\) (check: squared or not!) |
| MLE: Bernoulli / Gaussian / Pareto | \(\hat p = \frac{h}{n}\); \(\hat\mu=\bar x, \hat\sigma^2 = \frac1n\sum(x_i-\bar x)^2\); \(\hat\theta = \frac{n}{\sum\ln x_i}\) |
| Beta–Bernoulli posterior | Beta\((a{+}h,\ b{+}t)\); mean \(\frac{a+h}{a+b+n}\) |
| EM E-step | \(\gamma_i^k = \dfrac{\pi_k f_k(x_i)}{\sum_j \pi_j f_j(x_i)}\) |
| EM M-step | \(\mu_k = \frac{\sum\gamma_i^k x_i}{\sum\gamma_i^k}\); \(\pi_k = \frac1n\sum_i\gamma_i^k\) |
| Standard normal densities | \(\phi(0)=0.399,\ \phi(1)=0.242,\ \phi(2)=0.054\) |
| Truths that recur | Lloyd's always converges (local opt); sensitive to init/outliers/k; clusters convex; \(X^TX\) & \(XX^T\): same non-zero eigenvalues, different eigenvectors; conic kernel combos valid |

## 10. 7-day plan & exam-day tactics

| Day | Do |
| --- | --- |
| **1** | Module 1 (PCA) concepts + all its solved examples *by hand*. Re-derive the 2×2 eigenvalue shortcut once so you trust it. |
| **2** | Module 2 (kernels). Memorise the validity table and the \(\phi\)-construction. Redo Oct'24 Q2–Q3 blind. |
| **3** | Module 3 (K-means). Hand-simulate two full K-means runs and three K-means++ probability computations. |
| **4** | Modules 4 + 5 (MLE + Bayesian) — half a day; they're formulaic. Start Module 6 (EM) concepts. |
| **5** | Module 6 solved examples by hand. Memorise \(\phi(0),\phi(1),\phi(2)\) and both EM formulas cold. |
| **6** | **Mock:** take the Mar 2026 paper (the most recent) untimed but unaided; then the Oct 2025 paper timed. Score, and re-study only what you missed. |
| **7** | Rewrite the formula sheet from memory. Redo every question you got wrong on day 6. Sleep. |

### Exam-day tactics

- **SA answers are ranges.** "Correct to two decimals" with an accepted band (e.g. 4.8–5.1) means rounding is forgiven — don't burn time on the third decimal.

- **Comprehension sets first-read discipline:** the setup (covariance, means, responsibilities) feeds 2–4 subquestions. Compute the shared object carefully once; the subquestions become 30-second reads.

- **Check the metric** in every K-means++ question: squared vs plain Euclidean changed the Feb 2025 answer.

- **Centre before covariance** — unless the points are symmetric (\(\pm\) pairs), in which case the mean is already 0.

- **MSQ strategy:** statements recycle across papers. If a statement matches a "truth that recurs" from the formula sheet, tick with confidence.

- **Elimination on formula MCQs:** scan for symmetry (kernels), \(\pi_k\) presence (GMM likelihood), index placement (product outside, sum inside). Usually kills 3 of 4 options without computing.

- The first question is always the "confirm your subject" 0-marker — answer YES and move on.

Every solved answer above matches the accepted answer in the source paper and was re-verified numerically. Work each one by hand before trusting it to memory — the exam rewards fluency, not recognition.