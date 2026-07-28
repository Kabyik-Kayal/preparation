# MLF Quiz 2: The Complete Preparation Module

**Built from six actual Quiz 2 papers:** 2024 Mar 24 (QDD3), 2024 Aug 04 (QDF2), 2024 Dec 01 (QDF3), 2025 Mar 16 (QDD4), 2025 Aug 03 (QDF4), 2026 Apr 06.

**Every question in this document is the exact question from those papers, with its exact options and its official answer key.** Every numerical answer in this document was recomputed independently and cross checked against the key. Where the official key disagrees with the mathematics, I say so openly in Part 11 rather than teaching you something false.

---

## How to read this document

I am going to teach you the way I would teach a student sitting across the table from me, one week out from an exam, who has honest but shallow preparation. That means three things.

First, I will not hand you a formula and move on. Every concept gets a plain explanation of what the object actually is and why anyone invented it, because a formula you understand is a formula you can reconstruct under pressure, and a formula you memorised is a formula you will misremember.

Second, immediately after each concept you get **The Exam Trick**. This is the shortcut that turns a five minute computation into a fifteen second elimination. These tricks are not cheating. They are what a person who genuinely understands the material does automatically. In an exam where the marks come from four options rather than from your working, the trick is the whole game.

Third, you then solve the real questions. Not paraphrases. The actual questions, with the actual distractors, because the distractors are where the examiner hides the trap, and learning to see the trap is half of what separates a 30 from a 40.

Work through Part 0 first. It tells you where the marks are. Then work the parts in order. The parts are ordered by exam weight, heaviest first, so if you run out of time you will have run out of time in the right place.

---

# PART 0: THE ANATOMY OF THIS EXAM

Before you study a single concept, you should understand the machine you are being fed into. Look at what this exam actually is.

## 0.1 The fixed structure

Every one of the six papers has exactly the same skeleton:

| Property | Value |
| --- | --- |
| Total marks | 40.00, without exception, in all six papers |
| Number of scoring questions | 13 to 16 |
| Question types | MCQ (one correct), MSQ (multiple correct), SA (numeric entry) |
| Marks per question | 2, 3, or 4 |
| A zero mark Q1 | Always the "are you sure this is your subject" confirmation. Answer YES. It is worth nothing. |

Two structural facts matter enormously.

**Fact one: the paper is short.** Thirteen to sixteen real questions for 40 marks means each question is worth roughly 2.7 marks on average. There is no question you can afford to donate. But it also means that if you can reliably kill the six or seven questions that repeat every single time, you have already secured over half the paper before you have thought about anything hard.

**Fact two: questions come in linked blocks.** Look at the phrase "Based on the above data, answer the given subquestions." It appears constantly. A single matrix or a single dataset is given, and then three or four questions are asked about it. This is enormously in your favour. If you compute the covariance matrix correctly once, you have set yourself up for the eigenvalue question and the projection question that follow. Equally, if you botch it, you lose the entire block. **Blocks reward accuracy on the first step above everything else.** Slow down on the first question of a block. Speed up on the rest.

## 0.2 Where the marks actually are

I tabulated every scoring question in all six papers by topic. Here is the distribution.

| Topic | Mar24 | Aug24 | Dec24 | Mar25 | Aug25 | Apr26 | Papers appeared | Typical marks per paper |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| **PCA** (covariance, eigen, direction, projection) | 3 Q | 4 Q | 3 Q | 3 Q | 3 Q | 2 Q | **6 of 6** | **8 to 11** |
| **SVD** (\(Q_1\), \(\Sigma\), \(Q_2^T\)) | 2 Q | 3 Q | 3 Q | 2 Q | 3 Q | 2 Q | **6 of 6** | **6 to 8** |
| **Complex matrices** (Hermitian, unitary, normal) | 3 Q | 2 Q | 3 Q | 4 Q | 2 Q | 3 Q | **6 of 6** | **6 to 10** |
| **Quadratic forms and definiteness** | 3 Q | 2 Q | 2 Q | 0 Q | 2 Q | 1 Q | 5 of 6 | 4 to 7 |
| **Gradient descent** (numeric iterations) | 1 Q | 1 Q | 1 Q | 1 Q | 1 Q | 2 Q | **6 of 6** | 3 to 7 |
| **Optimisation** (closest point, min value) | 1 Q | 0 Q | 1 Q | 1 Q | 1 Q | 0 Q | 4 of 6 | 3 |
| **Taylor series / second order approximation** | 1 Q | 1 Q | 0 Q | 1 Q | 0 Q | 1 Q | 4 of 6 | 3 |
| **Eigen theory** (diagonalisation, Schur, rank) | 1 Q | 1 Q | 2 Q | 3 Q | 2 Q | 3 Q | **6 of 6** | 3 to 8 |

Read that table again, because it is the single most valuable page in this document.

**PCA plus SVD plus complex matrices is between 20 and 27 marks out of 40 in every single paper.** These three topics are not "important". They are the exam. If you master nothing else, master these, and you will pass comfortably.

**Gradient descent numeric iteration appears in all six papers, always for 3 or 4 marks, and it is pure mechanical arithmetic.** It is the single highest ratio of marks to difficulty in the entire syllabus. There is no reason on earth to lose these marks. We will drill it until it is automatic.

## 0.3 The six question templates that recur verbatim

Beyond topics, specific question *templates* repeat with only the numbers changed. Recognising a template means you already know the first three lines of your solution before you have finished reading.

1. **"Compute the sample covariance matrix C for the given dataset."** Appeared in Mar24 Q9, Aug24 Q11, Dec24 Q12, Mar25 Q11, Aug25 Q14, Apr26 Q12. That is six out of six.
2. **"Which is the principal direction chosen for performing PCA?"** Mar24 Q10, Aug24 Q12, Mar25 Q12, Aug25 Q16.
3. **"If \(x_1, x_2, x_3\) are the projections of the data points onto the first principal component, which of the following is correct?"** Mar24 Q11, Aug24 Q13, Dec24 Q14, Mar25 Q13.
4. **"Let the SVD form of A be \(A = Q_1 \Sigma Q_2^T\). Which of the following is true?"** asked separately about \(Q_1\), about \(\Sigma\), and about \(Q_2^T\). Mar24 Q5 and Q6, Aug24 Q5 to Q7, Dec24 Q9 to Q11, Mar25 Q14 and Q15, Aug25 Q11 to Q13.
5. **"Using gradient descent with initial guess \((a,b)\) and learning rate \(\eta\), what is the value after two iterations?"** Mar24 Q13, Dec24 Q7, Mar25 Q9, Aug25 Q7, Apr26 Q11, Aug24 Q15.
6. **"Which of the following statements is true about the matrix A?"** with the four options being positive definite, positive semi definite, negative definite, negative semi definite. Mar24 Q12, Dec24 Q16, Aug25 Q4.

Six templates. Six papers. If you can execute these six templates flawlessly you are looking at roughly 25 marks before you touch anything unfamiliar.

## 0.4 The one convention you must fix in your head right now

This trips up more students than any single concept, so we settle it before we begin.

**In this exam, the sample covariance matrix divides by n, the number of data points, not by n minus 1.**

I verified this against every paper. In Apr26 Q12 the dataset has four points and the covariance divides by 4, giving an answer of 8, which is exactly the official key. In the five papers with three point datasets, every correct option carries a factor of one third. There is no ambiguity. Divide by n.

Write this on the front of your rough sheet on exam day.

---

# PART 1: PCA, THE HEAVIEST TOPIC IN THE PAPER

## 1.1 What PCA actually is, in plain language

Imagine you have a cloud of data points floating in three dimensional space, and you are told you must flatten this cloud onto a single straight line, then throw away everything else. You get to choose the line. Which line do you choose?

You choose the line along which the cloud is most stretched out. That is the entire idea. If the cloud is a long thin cigar, the sensible line is the axis of the cigar, because projecting onto that axis preserves the differences between points. Projecting onto a line perpendicular to the cigar would squash every point onto nearly the same spot and destroy all the information.

"Most stretched out" has a precise name: **maximum variance**. So Principal Component Analysis is the procedure for finding the direction of maximum variance in your data. That is what makes option A the answer in the following question, and this is exactly how the exam phrases it.

> ### PYQ [2024 Aug 04, Q10, 2 marks, MCQ]
> **What is the primary goal of Principal Component Analysis (PCA)?**
>
> A. To find the directions that capture the maximum variance in the data.
> B. To find directions that capture the minimum variance in the data.
> C. To increase the dimensionality of the data.
> D. To reduce the number of data points.
>
> **Answer: A**
>
> **Why:** PCA is a *dimensionality* reduction technique, not a *data point* reduction technique, which kills D immediately. It reduces rather than increases dimension, which kills C. And the whole engineering purpose is to keep the informative directions, which are the high variance ones, so B is exactly backwards. Two marks, five seconds, no arithmetic.

Now, why does variance turn into eigenvectors? Here is the honest one line answer. The variance of your data measured along a unit direction \(u\) is the number \(u^T C u\), where \(C\) is the covariance matrix. Maximising \(u^T C u\) subject to \(u\) having length one is a classical constrained optimisation problem, and its solution is the eigenvector of \(C\) with the largest eigenvalue. The maximum value achieved is that largest eigenvalue itself.

Hold on to those two sentences. They generate every PCA question in this exam:

- **The principal direction is the top eigenvector of \(C\).**
- **The variance captured along an eigenvector is its eigenvalue.**

## 1.2 The four step PCA machine

Every PCA block in every paper is this machine, sometimes stopped early.

**Step 1. Compute the mean vector.** Add up all data points componentwise, divide by \(n\).

**Step 2. Centre the data.** Subtract the mean from every data point. Call the results the centred points. This step is not optional and skipping it is the most common way students lose the whole block.

**Step 3. Compute the covariance matrix.** \(C\) equals one over \(n\) times the sum, over all points, of the centred point times its own transpose. In matrix language, if you stack the centred points as rows of a matrix \(X\), then \(C = \frac{1}{n} X^T X\).

**Step 4. Eigendecompose C.** The eigenvector with the largest eigenvalue is the first principal component direction. Normalise it to unit length. Projections and variances follow from there.

### The Exam Trick for Step 3

Doing a full matrix multiplication for a three by three covariance is slow and error prone under time pressure. Do this instead.

**Trick 1.1: Compute only the top left entry and one off diagonal entry, then match against the options.** The covariance entry \(C\) at position \((i,j)\) is one over \(n\) times the sum over all points of (centred coordinate \(i\)) times (centred coordinate \(j\)). Compute \(C\) at \((1,1)\) and \(C\) at \((1,2)\). In every PYQ I examined, those two numbers alone uniquely identified the correct option.

**Trick 1.2: The covariance matrix is always symmetric.** If an option is not symmetric, delete it without computing anything. This alone often removes one or two distractors.

**Trick 1.3: Diagonal entries of a covariance matrix are variances, and variances are never negative.** If an option has a negative number on the diagonal, delete it. In Aug24 Q11, options C and D both have negative diagonals, so half the paper's options die before you have computed a single thing.

Let us watch these tricks work on the real questions.

> ### PYQ [2024 Aug 04, Q11, 3 marks, MCQ]
> **Context:** Consider the following dataset: \(\{(1,1,1), (0,2,0), (2,0,2)\}\) written as column vectors. Suppose we want to project the above dataset onto a one dimensional space using PCA.
>
> **Compute the sample covariance matrix C for the given dataset.**
>
> A. \(C = \frac{1}{3}\) times the matrix with all entries equal to 2
> B. \(C = \frac{1}{3}\begin{bmatrix} 2 & -2 & 2 \\ -2 & 2 & -2 \\ 2 & -2 & 2 \end{bmatrix}\)
> C. \(C = \frac{1}{3}\begin{bmatrix} -2 & 2 & -2 \\ 2 & -2 & 2 \\ -2 & 2 & -2 \end{bmatrix}\)
> D. \(C = \begin{bmatrix} -2 & 2 & -2 \\ 2 & -2 & 2 \\ -2 & 2 & -2 \end{bmatrix}\)
>
> **Answer: B**
>
> **Full solution.**
>
> Mean equals \(\left(\frac{1+0+2}{3}, \frac{1+2+0}{3}, \frac{1+0+2}{3}\right) = (1, 1, 1)\).
>
> Centred points: \((1,1,1) - (1,1,1) = (0,0,0)\). Next, \((0,2,0) - (1,1,1) = (-1,1,-1)\). Next, \((2,0,2) - (1,1,1) = (1,-1,1)\).
>
> Now \(C_{11}\) equals one third times the sum of the squares of the first coordinates, which is one third times \((0 + 1 + 1)\) equals two thirds. So the \((1,1)\) entry is \(\frac{2}{3}\), which matches the form \(\frac{1}{3}\) times 2.
>
> And \(C_{12}\) equals one third times the sum over points of (first coordinate times second coordinate), which is one third times \((0 \times 0 - 1 \times 1 + 1 \times (-1))\) equals one third times \((0 - 1 - 1)\) equals minus two thirds.
>
> So the matrix is \(\frac{1}{3}\) times a matrix with 2 on the diagonal and minus 2 in the \((1,2)\) slot. **That is B, and we never touched the other seven entries.**
>
> **Trick check:** Options C and D have minus 2 on the diagonal, which is a negative variance and therefore impossible. They were dead before we started. Option A has no negative entries at all, but our data clearly has coordinates moving in opposite directions, so a positive off diagonal everywhere is implausible. This question is genuinely a fifteen second question.

> ### PYQ [2024 Dec 01, Q12, 3 marks, MCQ]
> **Context:** Consider the following dataset: \(\{(2,1), (4,3), (6,5)\}\). Suppose we want to project the above dataset onto a 1 dimensional space using PCA.
>
> **The sample covariance matrix C for the given dataset is**
>
> A. \(C = \frac{1}{3}\begin{bmatrix} 8 & 8 \\ 8 & 8 \end{bmatrix}\)
> B. \(C = \frac{1}{3}\begin{bmatrix} 4 & 4 \\ 4 & 4 \end{bmatrix}\)
> C. \(C = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}\)
> D. \(C = \frac{1}{3}\begin{bmatrix} 2 & 2 \\ 2 & 2 \end{bmatrix}\)
>
> **Answer: A**
>
> **Full solution.** Mean equals \(\left(\frac{2+4+6}{3}, \frac{1+3+5}{3}\right) = (4, 3)\). Centred points: \((-2,-2), (0,0), (2,2)\).
>
> \(C_{11}\) equals one third times \((4 + 0 + 4)\) equals \(\frac{8}{3}\). Only option A has 8 in the numerator. Done.
>
> **Notice the structure.** All three centred points are multiples of the vector \((1,1)\). The data lies exactly on a straight line. This is not an accident, it is a deliberate design choice by the examiner, and it is the key to the whole family of these questions. We will exploit it heavily in a moment.

> ### PYQ [2025 Aug 03, Q14, 2 marks, MCQ]
> **Context:** Consider the following dataset: \(\{(1,2), (3,4), (5,6)\}\). Suppose we want to project the above dataset onto a 1 dimensional space using PCA.
>
> **The sample covariance matrix C for the given dataset is**
>
> A. \(C = \frac{1}{3}\begin{bmatrix} 8 & 8 \\ 8 & 8 \end{bmatrix}\)
> B. \(C = \frac{1}{3}\begin{bmatrix} 4 & 4 \\ 4 & 4 \end{bmatrix}\)
> C. \(C = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}\)
> D. \(C = \frac{1}{3}\begin{bmatrix} 2 & 2 \\ 2 & 2 \end{bmatrix}\)
>
> **Answer: A**
>
> Mean is \((3,4)\). Centred: \((-2,-2), (0,0), (2,2)\). Identical to the previous question. \(C_{11}\) equals \(\frac{8}{3}\). **A.**
>
> Note that this is literally the same answer as Dec 2024 with different raw numbers. The examiner reuses the centred configuration \((-2,-2), (0,0), (2,2)\) repeatedly.

> ### PYQ [2024 Mar 24, Q9, 3 marks, MCQ]
> **Context:** Consider the following dataset: \(\{(-1,-1), (1,1), (3,3)\}\). Suppose we want to project the above dataset onto a 1 dimensional space.
>
> **Compute the sample covariance matrix C for the given dataset.**
>
> A. \(C = \frac{1}{3}\begin{bmatrix} 8 & 8 \\ 8 & 8 \end{bmatrix}\)
> B. \(C = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}\)
> C. \(C = \frac{1}{3}\begin{bmatrix} 10 & 10 \\ 10 & 10 \end{bmatrix}\)
> D. \(C = \frac{1}{3}\begin{bmatrix} 11 & 11 \\ 11 & 11 \end{bmatrix}\)
>
> **Answer: A**
>
> Mean equals \((1,1)\). Centred: \((-2,-2), (0,0), (2,2)\). Again the same configuration. \(C_{11}\) equals \(\frac{4+0+4}{3} = \frac{8}{3}\). **A.**
>
> **This is the third appearance of the identical answer.** Learn this configuration by sight.

> ### PYQ [2025 Mar 16, Q11, 2 marks, MCQ]
> **Context:** Consider the following dataset of three points in \(\mathbb{R}^2\): \(\{(2,4), (3,6), (5,10)\}\). Suppose we want to project this dataset onto a one dimensional subspace using Principal Component Analysis (PCA).
>
> **Compute the sample covariance matrix C for the given dataset.**
>
> A. \(C = \frac{1}{3}\begin{bmatrix} 6 & 12 \\ 12 & 24 \end{bmatrix}\)
> B. \(C = \begin{bmatrix} 0 & 0 \\ 0 & 0 \end{bmatrix}\)
> C. \(C = \frac{1}{9}\begin{bmatrix} 14 & 28 \\ 28 & 56 \end{bmatrix}\)
> D. \(C = \frac{1}{9}\begin{bmatrix} 10 & 20 \\ 20 & 40 \end{bmatrix}\)
>
> **Answer: C**
>
> **Full solution.** Mean equals \(\left(\frac{2+3+5}{3}, \frac{4+6+10}{3}\right) = \left(\frac{10}{3}, \frac{20}{3}\right)\). This one has fractional means, which is why the answer carries a ninth rather than a third.
>
> Centred points: \(\left(2 - \frac{10}{3}, 4 - \frac{20}{3}\right) = \left(-\frac{4}{3}, -\frac{8}{3}\right)\). Then \(\left(3 - \frac{10}{3}, 6 - \frac{20}{3}\right) = \left(-\frac{1}{3}, -\frac{2}{3}\right)\). Then \(\left(5 - \frac{10}{3}, 10 - \frac{20}{3}\right) = \left(\frac{5}{3}, \frac{10}{3}\right)\).
>
> \(C_{11}\) equals one third times \(\left[\frac{16}{9} + \frac{1}{9} + \frac{25}{9}\right]\) equals one third times \(\frac{42}{9}\) equals \(\frac{14}{9}\).
>
> Only option C has \(\frac{14}{9}\) in the top left. **Done in one entry.**
>
> **Observe again:** every centred point is a multiple of \((1,2)\). The data is collinear once more.

> ### PYQ [2026 Apr 06, Q12, 2 marks, SA]
> **Context:** Consider the following dataset in \(\mathbb{R}^2\): \(\{(2,2), (-2,-2), (1,-1), (-1,1)\}\). Run PCA on this dataset.
>
> **If \(C = \begin{bmatrix} a & b \\ c & d \end{bmatrix}\) is the covariance matrix of the dataset, find \(a + b + c + d\). Enter the nearest integer as your answer.**
>
> **Answer: 8**
>
> **Full solution.** The mean is \((0,0)\) because the points come in plus minus pairs. This is a gift, it means the data is already centred. Always check for this.
>
> Now there are **four** points, so we divide by 4.
>
> \(a\) equals one quarter times \((4 + 4 + 1 + 1)\) equals \(\frac{10}{4} = 2.5\).
> \(d\) equals one quarter times \((4 + 4 + 1 + 1)\) equals \(2.5\).
> \(b = c\) equals one quarter times \([(2)(2) + (-2)(-2) + (1)(-1) + (-1)(1)]\) equals one quarter times \((4 + 4 - 1 - 1)\) equals \(\frac{6}{4} = 1.5\).
>
> Sum equals \(2.5 + 1.5 + 1.5 + 2.5 = \mathbf{8}\).
>
> **This question is the proof that the divisor is \(n\) and not \(n-1\).** With \(n-1 = 3\) you would get 10.67, which is not an integer and does not match the key. Fix the convention.

## 1.3 Finding the principal direction

Once you have C, you need its top eigenvector. In principle that means solving a characteristic polynomial. In this exam, you almost never have to.

### The Exam Trick for principal directions

**Trick 1.4, the collinearity shortcut.** In five of the six papers, the centred data points are all scalar multiples of a single vector. When that happens the covariance matrix has rank one, one eigenvalue is nonzero and all others are exactly zero, and **the principal direction is simply that common vector, normalised.** You can read it off the centred data in two seconds without touching \(C\).

**Trick 1.5, the rank one eigenvalue shortcut.** If \(C\) has rank one, then the single nonzero eigenvalue equals the trace of \(C\), because trace equals the sum of eigenvalues and all the others are zero. So for a rank one covariance matrix, **the top eigenvalue is just the sum of the diagonal entries.**

**Trick 1.6, sign and normalisation.** Eigenvectors are only defined up to a sign and a scale. The options will always be normalised to unit length, so check the norm to eliminate. If two options differ only by an overall sign, look at the other options, since the examiner always makes exactly one of them appear.

> ### PYQ [2024 Aug 04, Q12, 3 marks, MCQ]
> **Context:** dataset \(\{(1,1,1), (0,2,0), (2,0,2)\}\), project onto one dimension using PCA.
>
> **Which is the principal direction that is chosen for performing PCA?**
>
> A. \(\left(\frac{1}{\sqrt3}, -\frac{1}{\sqrt3}, -\frac{1}{\sqrt3}\right)\)
> B. \(\left(\frac{1}{\sqrt2}, \frac{1}{\sqrt2}, 0\right)\)
> C. \(\left(-\frac{1}{\sqrt2}, \frac{1}{\sqrt2}, 0\right)\)
> D. \(\left(\frac{1}{\sqrt3}, -\frac{1}{\sqrt3}, \frac{1}{\sqrt3}\right)\)
>
> **Answer: D**
>
> **Full solution using Trick 1.4.** From the previous question, the centred data is \((0,0,0), (-1,1,-1), (1,-1,1)\). Both nonzero centred points are multiples of the vector \((1, -1, 1)\). The data therefore lies on the line spanned by \((1,-1,1)\), and that is the principal direction.
>
> Normalise: the length of \((1,-1,1)\) is \(\sqrt{1+1+1} = \sqrt3\). So the unit principal direction is \(\left(\frac{1}{\sqrt3}, -\frac{1}{\sqrt3}, \frac{1}{\sqrt3}\right)\). **That is exactly option D.**
>
> **Why B and C die instantly:** they have a zero in the third coordinate, but our data clearly varies in the third coordinate. Why A dies: the sign pattern is plus, minus, minus, but our data moves as plus, minus, plus. Total time: under thirty seconds, with no eigenvalue computation at all.

> ### PYQ [2024 Mar 24, Q10, 3 marks, MCQ]
> **Context:** dataset \(\{(-1,-1), (1,1), (3,3)\}\), project onto a 1 dimensional space.
>
> **Which is the principal direction that is chosen for performing PCA?**
>
> A. \(\left(-\frac{1}{\sqrt2}, \frac{1}{\sqrt2}\right)\)
> B. \(\left(\frac{1}{\sqrt2}, \frac{1}{\sqrt2}\right)\)
> C. \((1, 0)\)
> D. \((0, 1)\)
>
> **Answer: B**
>
> Centred data is \((-2,-2), (0,0), (2,2)\), all multiples of \((1,1)\). Normalised: \(\left(\frac{1}{\sqrt2}, \frac{1}{\sqrt2}\right)\). **B.**
>
> Options C and D are not even normalised in a way that reflects any spread in the data, and A points along the direction of *zero* variance, which is the classic trap: the examiner offers you the eigenvector of the *smallest* eigenvalue. Always ask yourself which direction the data actually stretches along.

> ### PYQ [2025 Mar 16, Q12, 3 marks, MCQ]
> **Context:** dataset \(\{(2,4), (3,6), (5,10)\}\), project onto a one dimensional subspace using PCA.
>
> **What is the principal direction chosen for PCA?**
>
> A. \(\frac{1}{\sqrt5}(2, 1)\)
> B. \(\frac{1}{\sqrt5}(1, 2)\)
> C. \((1, 0)\)
> D. \((0, 1)\)
>
> **Answer: B**
>
> Centred data: \(\left(-\frac{4}{3}, -\frac{8}{3}\right), \left(-\frac{1}{3}, -\frac{2}{3}\right), \left(\frac{5}{3}, \frac{10}{3}\right)\). Every one is a multiple of \((1, 2)\). Length of \((1,2)\) is \(\sqrt5\). Principal direction is \(\frac{1}{\sqrt5}(1,2)\). **B.**
>
> **Trap analysis:** option A is \((2,1)\) instead of \((1,2)\), which is the coordinate swapped decoy. The examiner uses this every single time there is an asymmetric direction. Read the order of coordinates carefully.

> ### PYQ [2025 Aug 03, Q16, 3 marks, MCQ]
> **Context:** dataset \(\{(1,2), (3,4), (5,6)\}\), project onto a 1 dimensional space using PCA.
>
> **The first principal component is**
>
> A. \((1, 1)\)
> B. \((1, -1)\)
> C. \(\frac{1}{\sqrt2}(1, 1)\)
> D. \(\frac{1}{\sqrt2}(1, -1)\)
>
> **Answer: C**
>
> Centred data is \((-2,-2), (0,0), (2,2)\), direction \((1,1)\), normalised to \(\frac{1}{\sqrt2}(1,1)\). **C.**
>
> **This question is a pure normalisation test.** Option A has the right direction but is not a unit vector. Principal components are by definition unit vectors. If you see the same direction offered both normalised and unnormalised, take the normalised one. Option D points along the direction of zero variance, the standard decoy.

## 1.4 Eigenvalues of the covariance matrix

> ### PYQ [2024 Dec 01, Q13, 3 marks, MCQ]
> **Context:** dataset \(\{(2,1), (4,3), (6,5)\}\), project onto a 1 dimensional space using PCA.
>
> **The eigenvalues of the covariance matrix are**
>
> A. \(\lambda_1 = 16, \lambda_2 = 0\)
> B. \(\lambda_1 = 4, \lambda_2 = 0\)
> C. \(\lambda_1 = 1, \lambda_2 = 0\)
> D. \(\lambda_1 = \frac{16}{3}, \lambda_2 = 0\)
>
> **Answer: D**
>
> **Full solution using Trick 1.5.** We found \(C = \frac{1}{3}\begin{bmatrix} 8 & 8 \\ 8 & 8 \end{bmatrix}\). The two rows are identical, so \(C\) is rank one, so one eigenvalue is zero. The nonzero one equals the trace, which is \(\frac{8}{3} + \frac{8}{3} = \frac{16}{3}\). **D.**
>
> **Sanity check the long way.** For a two by two matrix, eigenvalues satisfy \(\lambda^2 - (\text{trace})\lambda + (\text{determinant}) = 0\). Determinant is \(\left(\frac{8}{3}\right)\left(\frac{8}{3}\right) - \left(\frac{8}{3}\right)\left(\frac{8}{3}\right) = 0\). So \(\lambda\left(\lambda - \frac{16}{3}\right) = 0\), giving \(\frac{16}{3}\) and \(0\). Same answer, more work. Use the trace shortcut.
>
> Notice that every single option offers \(\lambda_2 = 0\). The examiner is telling you the matrix is rank one. That confirmation is free information: take it, and then you only need the trace.

> ### PYQ [2026 Apr 06, Q13, 3 marks, SA]
> **Context:** dataset in \(\mathbb{R}^2\): \(\{(2,2), (-2,-2), (1,-1), (-1,1)\}\). Run PCA on this dataset.
>
> **Let v be the unit norm eigenvector corresponding to the smallest eigenvalue of the covariance matrix. Find the variance of the dataset along the direction v. Enter the nearest integer as your answer.**
>
> **Answer: 1**
>
> **This question is a definition test disguised as a computation.** Recall the fundamental identity: the variance of the data along a unit direction \(u\) equals \(u^T C u\). If \(u\) happens to be an eigenvector of \(C\) with eigenvalue \(\lambda\), then \(Cu = \lambda u\), and so \(u^T C u = \lambda u^T u = \lambda\), because \(u\) is a unit vector.
>
> **The variance along an eigenvector direction is exactly its eigenvalue.** Therefore the answer is simply the smallest eigenvalue of \(C\).
>
> From Q12 we have \(C = \begin{bmatrix} 2.5 & 1.5 \\ 1.5 & 2.5 \end{bmatrix}\). Trace equals 5, determinant equals \(6.25 - 2.25 = 4\). So \(\lambda^2 - 5\lambda + 4 = 0\), giving \(\lambda = 4\) and \(\lambda = \mathbf{1}\).
>
> Smallest eigenvalue is 1, so the variance along \(v\) is **1**.
>
> **Trick 1.7, the matrix of the form \(\begin{bmatrix} a & b \\ b & a \end{bmatrix}\).** This shape appears constantly. Its eigenvalues are always **\(a+b\) and \(a-b\)**, with eigenvectors \((1,1)\) and \((1,-1)\) respectively. No characteristic polynomial required. Here \(a = 2.5\) and \(b = 1.5\), giving 4 and 1 immediately. Memorise this.

## 1.5 Projections onto the first principal component

This is where students lose marks, so read this section slowly.

The projection of a point onto a line through the origin spanned by unit vector \(u\) is the vector \((x \cdot u)u\). That is the standard formula. But there is a subtlety in PCA: we centred the data first, so the line passes through the *mean*, not the origin.

The full projection of an original data point \(x\) onto the first principal component line is therefore:

\[ \text{proj}(x) = \bar{x} + \left[(x - \bar{x}) \cdot u\right] u \]

### The Exam Trick

**Trick 1.8, the collinear collapse.** Here is the observation that makes every one of these questions trivial in this exam. When the centred data all lies on the line spanned by u, projecting a point onto that line *does not move it at all*. The point is already on the line. Therefore:

**When the data is collinear, the projections are exactly the original data points.**

Check the centred points. If they are all multiples of one vector, look for the option that simply reproduces the original dataset. It has been the answer every time this configuration appeared.

> ### PYQ [2024 Dec 01, Q14, 3 marks, MCQ]
> **Context:** dataset \(\{(2,1), (4,3), (6,5)\}\), project onto a 1 dimensional space using PCA.
>
> **If \(x_1, x_2\) and \(x_3\) are the projections of the data points onto the first principal component, then which among the following is correct?**
>
> A. \(x_1 = (2,1), x_2 = (4,3), x_3 = (6,5)\)
> B. \(x_1 = (-1,1), x_2 = (1,1), x_3 = (3,1)\)
> C. \(x_1 = \left(\frac12, \frac12\right), x_2 = \left(1, 1\right), x_3 = \left(\frac32, \frac12\right)\)
> D. \(x_1 = (2,0), x_2 = (4,0), x_3 = (6,0)\)
>
> **Answer: A**
>
> **Full solution.** Centred points are \((-2,-2), (0,0), (2,2)\), all along \(u = (1,1)/\sqrt2\). Every data point already lies on the line through the mean \((4,3)\) in direction \((1,1)\). Projecting a point onto a line it already lies on returns the point itself.
>
> Formally: for \(x_1 = (2,1)\), the centred version is \((-2,-2)\), and its dot with \(u\) is \((-2-2)/\sqrt2 = -4/\sqrt2\). Times \(u\) gives \((-4/\sqrt2)(1,1)/\sqrt2 = (-2,-2)\). Add back the mean \((4,3)\): \((2,1)\). **The original point.**
>
> **A.** Option D is the trap of projecting onto the \(x\) axis rather than onto the principal component.

> ### PYQ [2024 Mar 24, Q11, 3 marks, MCQ]
> **Context:** dataset \(\{(-1,-1), (1,1), (3,3)\}\), project onto a 1 dimensional space.
>
> **If \(x_1, x_2\) and \(x_3\) are the projections of the data points onto the first principal component, then which among the following are true?**
>
> A. \(x_1 = (-1,1), x_2 = (1,1), x_3 = (3,1)\)
> B. \(x_1 = (1,1), x_2 = (1,1), x_3 = (1,1)\)
> C. \(x_1 = \left(-\frac12, \frac12\right), x_2 = \left(\frac12, \frac12\right), x_3 = \left(\frac32, \frac12\right)\)
> D. \(x_1 = (-1,-1), x_2 = (1,1), x_3 = (3,3)\)
>
> **Answer: D**
>
> Same reasoning. Data is collinear along \((1,1)\) through the mean \((1,1)\), so projections equal the original points: \((-1,-1), (1,1), (3,3)\). **D.**
>
> Notice options A, B and C all have a suspicious second coordinate of 1 or \(\frac12\) everywhere, which would mean the projected points do not lie on a line through the mean in direction \((1,1)\). A quick collinearity check kills all three: **the projections must be collinear**, since by construction they all lie on one line. In option A the points \((-1,1), (1,1), (3,1)\) are collinear along \((1,0)\), not \((1,1)\), so they are projections onto the wrong line.

> ### PYQ [2025 Mar 16, Q13, 3 marks, MCQ]
> **Context:** dataset of three points in \(\mathbb{R}^2\): \(\{(2,4), (3,6), (5,10)\}\), project onto a one dimensional subspace using PCA.
>
> **Compute the projections \(x_1, x_2, x_3\) of the data points onto the first principal component. Which of the following is correct?**
>
> A. \(x_1 = (2,4), x_2 = (3,6), x_3 = (5,10)\)
> B. \(x_1 = \left(\frac{1}{\sqrt5}, \frac{2}{\sqrt5}\right), x_2 = \left(\frac{2}{\sqrt5}, \frac{4}{\sqrt5}\right), x_3 = \left(\frac{4}{\sqrt5}, \frac{8}{\sqrt5}\right)\)
> C. \(x_1 = (-2,-4), x_2 = (-3,-6), x_3 = (-5,-10)\)
> D. \(x_1 = \left(\frac{2}{\sqrt5}, \frac{4}{\sqrt5}\right), x_2 = \left(\frac{3}{\sqrt5}, \frac{6}{\sqrt5}\right), x_3 = \left(\frac{5}{\sqrt5}, \frac{10}{\sqrt5}\right)\)
>
> **Answer: A**
>
> Every centred point is a multiple of \((1,2)\), so the data is collinear and the projections are the original points. **A.**
>
> **The trap here is options B and D**, which divide by \(\sqrt5\). Students who compute the *scalar coefficient* \((x \cdot u)\) and then forget to multiply by \(u\) again produce exactly this kind of answer. The projection is a **vector**, not a scalar. Multiplying by \(u\) a second time is what restores the correct magnitude.

## 1.6 PCA in the sample space versus the feature space

One paper goes deeper, and this is worth understanding because it is the conceptual heart of PCA and SVD being the same object.

> ### PYQ [2025 Aug 03, Q5, 3 marks, MCQ]
> **Let \(A \in \mathbb{R}^{n \times d}\) be a centered data matrix, where \(d\) is greater than \(n\). Which of the following statements about the eigenvalues of \(AA^T \in \mathbb{R}^{n \times n}\) and \(A^TA \in \mathbb{R}^{d \times d}\) is true?**
>
> A. \(AA^T\) and \(A^TA\) have different sets of non zero eigenvalues.
> B. The non zero eigenvalues of \(AA^T\) and \(A^TA\) are equal.
> C. All eigenvalues of \(A^TA\) are zero.
> D. \(A^TA\) has more non zero eigenvalues than \(AA^T\).
>
> **Answer: B**
>
> **Why this is true, and it is worth knowing the proof because it is one line.** Suppose \(A^TA v = \lambda v\) with \(\lambda\) nonzero and \(v\) nonzero. Multiply both sides on the left by \(A\): \(AA^T(Av) = \lambda(Av)\). So \(Av\) is an eigenvector of \(AA^T\) with the same eigenvalue \(\lambda\), and \(Av\) is nonzero because otherwise \(A^TA v\) would be zero. The argument runs symmetrically in the other direction. Therefore the nonzero eigenvalues match exactly, including multiplicity.
>
> **The practical consequence, which is the point of this question.** If you have 5 data points in 1000 dimensions, \(A^TA\) is a 1000 by 1000 monster but \(AA^T\) is a friendly 5 by 5. They carry the same nonzero eigenvalues. So compute the small one. This is called the dual formulation of PCA and it is why PCA is tractable on high dimensional data.
>
> Option D is worth a moment: \(A^TA\) is \(d \times d\) and \(AA^T\) is \(n \times n\) with \(d\) bigger than \(n\), so \(A^TA\) does have more eigenvalues *in total*, but the extra ones are all **zero**. The statement says more *non zero* eigenvalues, which is false. That word "non zero" is the entire question.

> ### PYQ [2025 Aug 03, Q6, 3 marks, MCQ]
> **Let \(A \in \mathbb{R}^{n \times d}\) be a centered data matrix, where \(d\) is greater than \(n\). Let \(u_i \in \mathbb{R}^n\) be an eigenvector of \(AA^T\) corresponding to the eigenvalue \(\lambda_i > 0\), representing the i-th principal component in the sample space. Let \(v_i \in \mathbb{R}^d\) denote the corresponding principal component direction in the feature space (that is, the eigenvector of \(A^TA\)). Which of the following correctly computes \(v_i\) from \(u_i\)?**
>
> A. \(v_i = u_i\)
> B. \(v_i = A u_i\)
> C. \(v_i = \frac{1}{\sqrt{\lambda_i}} A^T u_i\)
> D. \(v_i = \frac{1}{\lambda_i} A^T u_i\)
>
> **Answer: C**
>
> **Full derivation.** From the proof above, if \(u_i\) is an eigenvector of \(AA^T\) then \(A^T u_i\) is an eigenvector of \(A^TA\). The only question is the normalisation constant.
>
> Compute the squared length of \(A^T u_i\). It equals \((A^T u_i)^T (A^T u_i) = u_i^T AA^T u_i = u_i^T(\lambda_i u_i) = \lambda_i\), using the fact that \(u_i\) is a unit vector.
>
> So the length of \(A^T u_i\) is \(\sqrt{\lambda_i}\). To make it a unit vector we divide by \(\sqrt{\lambda_i}\). **Option C.**
>
> **Trick 1.9, dimensional sanity checking.** Even without the derivation you can kill three options. Option A is impossible because \(u_i\) lives in \(\mathbb{R}^n\) and \(v_i\) lives in \(\mathbb{R}^d\), and \(d\) is not \(n\). Option B, \(Au_i\), has \(A\) being \(n \times d\) acting on a vector in \(\mathbb{R}^n\), which is dimensionally illegal. That leaves C and D, differing only in whether you divide by \(\sqrt{\lambda}\) or \(\lambda\). Since a normalisation of a vector of length \(\sqrt{\lambda}\) must divide by \(\sqrt{\lambda}\), it is C. **Dimensional analysis alone gets you to a coin flip, and one line of algebra gets you the rest.**

---

# PART 2: SINGULAR VALUE DECOMPOSITION

## 2.1 What SVD actually is

Every matrix, of any shape, no matter how ugly, can be written as

\[ A = Q_1 \Sigma Q_2^T \]

where \(Q_1\) is a square orthogonal matrix, \(Q_2\) is a square orthogonal matrix, and \(\Sigma\) is a rectangular matrix that is zero everywhere except on its main diagonal, where the entries are non negative and listed in decreasing order.

Here is what this means geometrically, and I want you to carry this picture rather than the algebra. Any linear map, however complicated, is really just three simple operations performed in sequence: **rotate, then stretch along the axes, then rotate again.** \(Q_2^T\) does the first rotation, \(\Sigma\) does the stretching, \(Q_1\) does the second rotation. That is all a matrix ever does. The singular values, which are the diagonal entries of \(\Sigma\), are the stretch factors.

This is not a small fact. It is arguably the most important theorem in applied linear algebra, and it is why the exam asks about it in every paper.

## 2.2 The mechanical recipe, and where the exam attacks

There are three sub-objects, and the exam asks about each of them separately, usually as three linked questions on one matrix. Here is how to get each.

**To get \(\Sigma\).** Compute \(AA^T\) (this is the smaller of the two products when \(A\) is wide). Find its eigenvalues. The singular values are the **square roots** of those eigenvalues, arranged in decreasing order. Place them on the diagonal of a matrix with the same shape as \(A\).

**To get \(Q_1\).** The columns of \(Q_1\) are the orthonormal eigenvectors of \(AA^T\), ordered to match the singular values.

**To get \(Q_2\).** The columns of \(Q_2\) are the orthonormal eigenvectors of \(A^TA\), in the same order. Equivalently, and much faster in an exam, the i-th column of \(Q_2\) is \(\frac{1}{\sigma_i} A^T u_i\), where \(u_i\) is the i-th column of \(Q_1\).

### The Exam Tricks for SVD

**Trick 2.1: singular values are always non negative and always real.** Any option containing a negative entry on the diagonal of \(\Sigma\) is dead. In Aug24 Q7 both options A and C carry a minus \(\sqrt2\), so half the options vanish on sight.

**Trick 2.2: \(\Sigma\) has the same shape as \(A\).** If \(A\) is 2 by 3, \(\Sigma\) is 2 by 3. An option with the wrong shape is dead.

**Trick 2.3: check the sum of squares.** The sum of the squares of the singular values equals the sum of the squares of all entries of \(A\). This is called the Frobenius identity and it is a superb verification. If \(A\) has entries \(3, 2, -2, 2, 3, 2\), the sum of squares is \(9+4+4+4+9+4 = 34\), and the singular values 5 and 3 satisfy \(25 + 9 = 34\). Instant confirmation.

**Trick 2.4: \(Q_1\) and \(Q_2\) must be orthogonal matrices, so every column has length one.** Scan the options and compute the length of the first column only. Options that are not normalised die immediately. In practice the examiner offers the same matrix with four different scale factors: \(1, \frac{1}{\sqrt2}, \frac{1}{\sqrt3}, \sqrt2\). Only one normalises the columns.

**Trick 2.5, the most powerful one: when \(AA^T\) is a multiple of the identity, everything degenerates.** If \(AA^T = cI\), then every singular value equals \(\sqrt{c}\) and **every** orthonormal basis is a valid \(Q_1\). The exam exploits this to make questions look hard when they are not. But be careful, because \(Q_1\) and \(Q_2\) must then be chosen *consistently*, and the exam has occasionally slipped up here. More on that in Part 11.

Let us grind through the real questions.

## 2.3 The SVD block from 2024 August 04

**Shared context for Q5, Q6, Q7:** Consider a matrix \(A = \begin{bmatrix} 1 & 0 & 1 \\ 1 & 0 & -1 \end{bmatrix}\). Let the singular value decomposition (SVD) form of \(A\) be written as \(A = Q_1 \Sigma Q_2^T\).

**Set up once, answer three times.** \(AA^T\) equals \(\begin{bmatrix} 1 & 0 & 1 \\ 1 & 0 & -1 \end{bmatrix}\) times its own transpose. Row one dotted with row one is \(1 + 0 + 1 = 2\). Row one dotted with row two is \(1 + 0 - 1 = 0\). Row two dotted with row two is 2. So

\[ AA^T = \begin{bmatrix} 2 & 0 \\ 0 & 2 \end{bmatrix} = 2I \]

Eigenvalues are 2 and 2. Singular values are \(\sqrt2\) and \(\sqrt2\). This is the degenerate case from Trick 2.5.

> ### PYQ [2024 Aug 04, Q7, 1 mark, MCQ]
> **Which of the following options is true?**
>
> A. \(\Sigma = \begin{bmatrix} \sqrt2 & 0 & 0 \\ 0 & -\sqrt2 & 0 \end{bmatrix}\)
> B. \(\Sigma = \begin{bmatrix} 2 & 0 & 0 \\ 0 & 2 & 0 \end{bmatrix}\)
> C. \(\Sigma = \begin{bmatrix} -\sqrt2 & 0 & 0 \\ 0 & -\sqrt2 & 0 \end{bmatrix}\)
> D. \(\Sigma = \begin{bmatrix} \sqrt2 & 0 & 0 \\ 0 & \sqrt2 & 0 \end{bmatrix}\)
>
> **Answer: D**
>
> Singular values are \(\sqrt2\) and \(\sqrt2\), both positive. Options A and C contain negative entries and die by Trick 2.1. Option B lists 2 rather than \(\sqrt2\), which is the classic error of forgetting the square root: 2 is the *eigenvalue* of \(AA^T\), not the singular value. **D.**

> ### PYQ [2024 Aug 04, Q5, 2 marks, MCQ]
> **Which of the following options is true?**
>
> A. \(Q_1 = \begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}\)
> B. \(Q_1 = \frac{1}{\sqrt2}\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}\)
> C. \(Q_1 = \frac{1}{\sqrt3}\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}\)
> D. \(Q_1 = \sqrt2\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}\)
>
> **Answer: B**
>
> All four options are the same matrix with different scale factors, which is Trick 2.4 in its purest form. The column \((1,1)\) has length \(\sqrt2\), so to normalise we multiply by \(\frac{1}{\sqrt2}\). **B.**
>
> **This question requires zero understanding of \(A\).** It is a normalisation reflex. Train it.

> ### PYQ [2024 Aug 04, Q6, 2 marks, MCQ]
> **Which of the following options is true?**
>
> A. \(Q_2 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 0 & 1 \\ 0 & 1 & 0 \end{bmatrix}\)
> B. \(Q_2 = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 1 \\ 0 & 1 & 0 \end{bmatrix}\)
> C. \(Q_2 = \begin{bmatrix} 1 & 1 & 0 \\ 0 & 0 & 1 \\ 0 & 1 & 0 \end{bmatrix}\)
> D. \(Q_2 = \begin{bmatrix} -1 & 0 & 0 \\ 0 & 0 & 1 \\ 0 & 1 & 0 \end{bmatrix}\)
>
> **Answer: A**
>
> **Fast route.** \(Q_2\) must be an orthogonal matrix, so all columns must be unit length and mutually perpendicular. Option B has second column \((0,1,1)\) of length \(\sqrt2\), not one. Dead. Option C has first column \((1,0,0)\) and second column \((1,0,1)\), which are not perpendicular. Dead. That leaves A and D, which differ only in the sign of the \((1,1)\) entry.
>
> **Resolve the sign by multiplying out.** With \(Q_1 = \frac{1}{\sqrt2}\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}\) and \(\Sigma = \begin{bmatrix} \sqrt2 & 0 & 0 \\ 0 & \sqrt2 & 0 \end{bmatrix}\), the product \(Q_1 \Sigma\) equals \(\begin{bmatrix} 1 & 1 & 0 \\ 1 & -1 & 0 \end{bmatrix}\). Now multiply on the right by \(Q_2^T\). For option A, \(Q_2\) is a symmetric permutation matrix that swaps columns two and three. Applying it gives \(\begin{bmatrix} 1 & 0 & 1 \\ 1 & 0 & -1 \end{bmatrix}\), which is exactly \(A\). **A confirmed.** Option D would flip the sign of the first column and give \(\begin{bmatrix} -1 & 0 & 1 \\ -1 & 0 & -1 \end{bmatrix}\), which is not \(A\).
>
> **Trick 2.6:** when two options differ by a single sign, do not agonise. Just multiply out the one product entry that the sign affects. Here, the \((1,1)\) entry of the reconstructed \(A\). Thirty seconds.

## 2.4 The SVD block from 2024 December 01

**Shared context for Q9, Q10, Q11:** Consider the matrix \(A = \begin{bmatrix} 1 & 0 & 1 \\ -1 & 1 & 0 \end{bmatrix}\). Let the SVD form be \(A = Q_1 \Sigma Q_2^T\).

**Set up.** \(AA^T\): row one dotted with itself is \(1 + 0 + 1 = 2\). Row one dotted with row two is \(-1 + 0 + 0 = -1\). Row two dotted with itself is \(1 + 1 + 0 = 2\). So

\[ AA^T = \begin{bmatrix} 2 & -1 \\ -1 & 2 \end{bmatrix} \]

By Trick 1.7, a matrix of the form \(\begin{bmatrix} a & b \\ b & a \end{bmatrix}\) has eigenvalues \(a+b\) and \(a-b\), with eigenvectors \((1,1)\) and \((1,-1)\). Here \(a = 2, b = -1\), so eigenvalues are **1** and **3**, with the eigenvalue 3 belonging to \((1,-1)\) and the eigenvalue 1 belonging to \((1,1)\).

Ordering decreasingly: \(\sigma_1 = \sqrt3\) with \(u_1 = (1,-1)/\sqrt2\), and \(\sigma_2 = 1\) with \(u_2 = (1,1)/\sqrt2\).

> ### PYQ [2024 Dec 01, Q11, 2 marks, MCQ]
> **Which of the following options is true?**
>
> A. \(\Sigma = \begin{bmatrix} \sqrt3 & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix}\)
> B. \(\Sigma = \begin{bmatrix} 3 & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix}\)
> C. \(\Sigma = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \end{bmatrix}\)
> D. \(\Sigma = \begin{bmatrix} \sqrt3 & 0 & 0 \\ 0 & \sqrt3 & 0 \end{bmatrix}\)
>
> **Answer: A**
>
> Singular values are \(\sqrt3\) and 1. **A.** Option B is the forgot-the-square-root trap again. Verify with Trick 2.3: sum of squares of entries of \(A\) equals \(1+0+1+1+1+0 = 4\), and \(3 + 1 = 4\). Confirmed.

> ### PYQ [2024 Dec 01, Q9, 2 marks, MCQ]
> **Which of the following options is/are true?**
>
> A. \(Q_1 = \begin{bmatrix} 1 & 1 \\ -1 & 1 \end{bmatrix}\)
> B. \(Q_1 = \frac{1}{\sqrt2}\begin{bmatrix} 1 & 1 \\ -1 & 1 \end{bmatrix}\)
> C. \(Q_1 = \frac{1}{\sqrt2}\begin{bmatrix} 1 & 1 \\ -1 & -1 \end{bmatrix}\)
> D. \(Q_1 = \sqrt2\begin{bmatrix} -1 & 1 \\ 1 & 1 \end{bmatrix}\)
>
> **Answer: B**
>
> The columns of \(Q_1\) are \(u_1 = (1,-1)/\sqrt2\) and \(u_2 = (1,1)/\sqrt2\), in that order because \(\sqrt3\) exceeds 1. Assembling them as columns gives \(\frac{1}{\sqrt2}\begin{bmatrix} 1 & 1 \\ -1 & 1 \end{bmatrix}\). **B.**
>
> **Note the order matters.** If you had put the eigenvalue 1 first, you would get the columns swapped and would be looking for a different option. The rule is: **\(\Sigma\) is ordered decreasingly, and \(Q_1\) must follow that order.**
>
> Option C is not even orthogonal, since its two columns \((1,-1)\) and \((1,-1)\) are identical. Option A is unnormalised, option D is unnormalised and reordered.

> ### PYQ [2024 Dec 01, Q10, 2 marks, MCQ]
> **Which of the following options is/are true?**
>
> A. \(Q_2^T = \frac{1}{\sqrt6}\begin{bmatrix} 2 & -1 & 1 \\ 0 & \sqrt3 & \sqrt3 \\ -\sqrt2 & 1 & \sqrt2 \end{bmatrix}\)
> B. \(Q_2^T = \frac{1}{\sqrt6}\begin{bmatrix} 2 & -1 & 1 \\ 0 & \sqrt3 & \sqrt3 \\ -\sqrt2 & -\sqrt2 & -\sqrt2 \end{bmatrix}\)
> C. \(Q_2^T = \frac{1}{\sqrt6}\begin{bmatrix} 2 & -1 & 1 \\ 0 & \sqrt3 & \sqrt3 \\ \sqrt2 & -\sqrt2 & \sqrt2 \end{bmatrix}\)
> D. \(Q_2^T = \frac{1}{\sqrt6}\begin{bmatrix} 2 & -1 & 1 \\ 0 & \sqrt3 & \sqrt3 \\ -\sqrt2 & -\sqrt2 & \sqrt2 \end{bmatrix}\)
>
> **Answer: D**
>
> **This is the hardest SVD question in the six papers, so let us do it properly.**
>
> All four options share the same first two rows, so the examiner is testing only the third row. That is a gift: **compute only the third row.**
>
> The first two rows of \(Q_2^T\) are the right singular vectors \(v_1\) and \(v_2\), obtained from \(v_i = \frac{1}{\sigma_i} A^T u_i\). Let us verify row one to build confidence:
>
> \(v_1 = \frac{1}{\sqrt3} A^T \cdot \frac{(1,-1)}{\sqrt2}\). Now \(A^T\) times \((1,-1)\) means one times the first row of \(A\) minus one times the second row of \(A\), which is \((1,0,1) - (-1,1,0) = (2,-1,1)\). So \(v_1 = \frac{(2,-1,1)}{\sqrt3 \cdot \sqrt2} = \frac{(2,-1,1)}{\sqrt6}\). **Matches all options.** Good, the method is right.
>
> Now the third row, \(v_3\). It is the remaining orthonormal vector, which must be **orthogonal to both \(v_1\) and \(v_2\)** and, since it corresponds to singular value zero, it must lie in the **null space of \(A\)**. That second characterisation is far faster.
>
> Solve \(Ax = 0\). From row one: \(x_1 + x_3 = 0\). From row two: \(-x_1 + x_2 = 0\). So \(x_2 = x_1\) and \(x_3 = -x_1\). Taking \(x_1 = -1\) gives \((-1, -1, 1)\). Normalise: length is \(\sqrt3\), so \(v_3 = (-1,-1,1)/\sqrt3\).
>
> Now convert to the sixth-root form the options use. Multiply numerator and denominator by \(\sqrt2\): \((-\sqrt2, -\sqrt2, \sqrt2)/\sqrt6\). **That is exactly option D.**
>
> **Trick 2.7, the null space shortcut.** Whenever \(\Sigma\) has a zero singular value, the corresponding column of \(Q_2\) is a null vector of \(A\). Solving \(Ax = 0\) is vastly faster than eigendecomposing \(A^TA\), which here would be a three by three problem. Look for this every time \(A\) is wide (more columns than rows), because a wide matrix always has a null space.

## 2.5 The SVD block from 2024 March 24

**Shared context for Q5, Q6:** Consider a matrix \(A = \begin{bmatrix} 2 & 1 \\ 1 & 0 \\ 0 & 1 \end{bmatrix}\). Let \(A = Q_1 \Sigma Q_2^T\) be the SVD form of \(A\).

Here \(A\) is tall, three by two, so the small product is \(A^TA\), which is two by two.

\(A^TA\): first column of \(A\) dotted with itself is \(4 + 1 + 0 = 5\). First dotted with second is \(2 + 0 + 0 = 2\). Second dotted with itself is \(1 + 0 + 1 = 2\). So

\[ A^TA = \begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix} \]

Trace is 7, determinant is \(10 - 4 = 6\). So \(\lambda^2 - 7\lambda + 6 = 0\), giving \(\lambda = 6\) and \(\lambda = 1\). Singular values are \(\sqrt6\) and \(1\).

> ### PYQ [2024 Mar 24, Q5, 3 marks, MSQ]
> **Which of the following options is/are true?**
>
> A. \(A^TA = \begin{bmatrix} 5 & 2 \\ 3 & 2 \end{bmatrix}\)
> B. Eigenvalues of \(A^TA\) are 6 and 2.
> C. An eigenvector of \(A^TA\) corresponding to eigenvalue 6 is \((2, 1)\).
> D. Orthonormalized eigenvectors of \(A^TA\) are \(\left(\frac{2\sqrt5}{5}, \frac{\sqrt5}{5}\right)\) and \(\left(-\frac{\sqrt5}{5}, \frac{2\sqrt5}{5}\right)\).
>
> **Answers: C and D**
>
> **Option A is false.** We computed \(\begin{bmatrix} 5 & 2 \\ 2 & 2 \end{bmatrix}\). The given option has a 3 in the lower left. And here is the instant kill: \(A^TA\) is always symmetric, so any non symmetric option is automatically wrong. You do not even need the computation.
>
> **Option B is false.** Eigenvalues are 6 and 1, not 6 and 2. Fast check via trace: \(6 + 2 = 8\), but the trace of \(A^TA\) is \(5 + 2 = 7\). Mismatch. **Trick 2.8: verify any claimed eigenvalue pair against the trace before doing anything else.**
>
> **Option C is true.** Substitute: \((A^TA - 6I) = \begin{bmatrix} -1 & 2 \\ 2 & -4 \end{bmatrix}\). Apply to \((2,1)\): first component is \(-2 + 2 = 0\), second is \(4 - 4 = 0\). So \((2,1)\) is indeed in the null space, hence an eigenvector for eigenvalue 6. **Verified.**
>
> **Option D is true.** The eigenvector \((2,1)\) has length \(\sqrt5\), so normalised it is \((2/\sqrt5, 1/\sqrt5)\). Rationalising, \(2/\sqrt5 = \frac{2\sqrt5}{5}\) and \(1/\sqrt5 = \frac{\sqrt5}{5}\). That matches the first vector in D. The second eigenvector must be perpendicular to \((2,1)\) in two dimensions, which forces it to be a multiple of \((-1,2)\), normalising to \(\left(-\frac{\sqrt5}{5}, \frac{2\sqrt5}{5}\right)\). Matches. **Verified.**
>
> **Trick 2.9, the perpendicular shortcut in two dimensions.** If \((a,b)\) is one eigenvector of a two by two symmetric matrix, the other is always \((-b, a)\). You never need to solve a second system. This saves genuine minutes across a paper.

> ### PYQ [2024 Mar 24, Q6, 3 marks, MSQ]
> **Which of the following options is/are true?**
>
> A. \(\Sigma = \begin{bmatrix} \sqrt6 & 0 \\ 0 & \sqrt2 \\ 0 & 0 \end{bmatrix}\)
> B. \(\Sigma = \begin{bmatrix} \sqrt6 & 0 \\ 0 & 1 \\ 0 & 0 \end{bmatrix}\)
> C. \(Q_2 = \begin{bmatrix} \frac{2\sqrt5}{5} & -\frac{\sqrt5}{5} \\ \frac{\sqrt5}{5} & \frac{2\sqrt5}{5} \end{bmatrix}\)
> D. \(Q_2 = \begin{bmatrix} \frac{2\sqrt5}{5} & \frac{\sqrt5}{5} \\ \frac{\sqrt5}{5} & \frac{2\sqrt5}{5} \end{bmatrix}\)
>
> **Answers: B and C**
>
> **Sigma:** singular values \(\sqrt6\) and 1, and \(\Sigma\) must be three by two to match \(A\). **B**, not A. Verify with Frobenius: entries of \(A\) squared sum to \(4+1+1+0+0+1 = 7\), and \(6 + 1 = 7\). Confirmed.
>
> **\(Q_2\):** its columns are the orthonormal eigenvectors of \(A^TA\), in the order \(\sqrt6\) first. Column one is \((2,1)/\sqrt5\) and column two is \((-1,2)/\sqrt5\). Assembled: \(\begin{bmatrix} \frac{2\sqrt5}{5} & -\frac{\sqrt5}{5} \\ \frac{\sqrt5}{5} & \frac{2\sqrt5}{5} \end{bmatrix}\). **C.**
>
> **Option D is not orthogonal at all.** Its two columns are \((2,1)/\sqrt5\) and \((1,2)/\sqrt5\), whose dot product is \((2+2)/5 = 4/5\), not zero. **Trick 2.10: always dot the first two columns of a claimed orthogonal matrix. If it is not zero, the option is dead.** This one check disposes of D in five seconds.

## 2.6 The SVD block from 2025 August 03

**Shared context for Q11, Q12, Q13:** Consider the matrix \(A = \begin{bmatrix} 3 & 2 & -2 \\ 2 & 3 & 2 \end{bmatrix}\). Let the SVD form be \(A = Q_1 \Sigma Q_2^T\).

**Set up.** \(AA^T\): row one with itself is \(9 + 4 + 4 = 17\). Row one with row two is \(6 + 6 - 4 = 8\). Row two with itself is \(4 + 9 + 4 = 17\).

\[ AA^T = \begin{bmatrix} 17 & 8 \\ 8 & 17 \end{bmatrix} \]

Trick 1.7 applies: eigenvalues are \(17 + 8 = 25\) with eigenvector \((1,1)\), and \(17 - 8 = 9\) with eigenvector \((1,-1)\). Singular values are **5 and 3**.

Frobenius check: \(9+4+4+4+9+4 = 34\), and \(25 + 9 = 34\). Confirmed.

> ### PYQ [2025 Aug 03, Q13, 2 marks, MCQ]
> **Which of the following options is true?**
>
> A. \(\Sigma = \begin{bmatrix} 2 & 0 & 0 \\ 0 & 3 & 0 \end{bmatrix}\)
> B. \(\Sigma = \begin{bmatrix} -5 & 0 & 0 \\ 0 & 3 & 0 \end{bmatrix}\)
> C. \(\Sigma = \begin{bmatrix} 5 & 0 & 0 \\ 0 & 3 & 0 \end{bmatrix}\)
> D. \(\Sigma = \begin{bmatrix} 5 & 0 & 0 \\ 0 & 0 & 3 \end{bmatrix}\)
>
> **Answer: C**
>
> Singular values 5 and 3, non negative, placed on the main diagonal of a 2 by 3 matrix. **C.** Option B has a negative singular value, dead by Trick 2.1. Option D places 3 off the main diagonal, in position \((2,3)\), which is not the diagonal of a 2 by 3 matrix. Dead by definition of \(\Sigma\).

> ### PYQ [2025 Aug 03, Q11, 3 marks, MCQ]
> **Which of the following options is/are true?**
>
> A. \(Q_1 = \begin{bmatrix} 1 & -1 \\ 1 & 1 \end{bmatrix}\)
> B. \(Q_1 = \frac{1}{\sqrt2}\begin{bmatrix} 1 & 1 \\ -1 & 1 \end{bmatrix}\)
> C. \(Q_1 = \frac{1}{\sqrt2}\begin{bmatrix} 1 & -1 \\ 1 & 1 \end{bmatrix}\)
> D. \(Q_1 = \sqrt2\begin{bmatrix} -1 & 1 \\ 1 & 1 \end{bmatrix}\)
>
> **Answer: C**
>
> Columns of \(Q_1\) are the unit eigenvectors of \(AA^T\) in decreasing eigenvalue order: \((1,1)/\sqrt2\) for 25, then \((1,-1)/\sqrt2\) for 9. That gives \(\frac{1}{\sqrt2}\begin{bmatrix} 1 & 1 \\ 1 & -1 \end{bmatrix}\).
>
> Option C is \(\frac{1}{\sqrt2}\begin{bmatrix} 1 & -1 \\ 1 & 1 \end{bmatrix}\), whose columns are \((1,1)/\sqrt2\) and \((-1,1)/\sqrt2\). The second column is the negative of what I derived, and **that is entirely acceptable**, because eigenvectors are defined only up to sign, and the corresponding sign flip is absorbed into \(Q_2\). Option C has the right first column, which is the column tied to the dominant singular value, and is properly orthonormal. **C.**
>
> Option A is unnormalised, option D is unnormalised, option B has first column \((1,-1)/\sqrt2\) which belongs to the *smaller* singular value and so is in the wrong order. **The ordering test kills B; the normalisation test kills A and D.**

> ### PYQ [2025 Aug 03, Q12, 3 marks, MCQ]
> **Which of the following options is/are true?**
>
> A. The matrix with columns \(\left(\frac{\sqrt2}{2}, \frac{\sqrt2}{2}, 0\right)\), \(\left(-\frac{\sqrt2}{6}, \frac{\sqrt2}{6}, \frac{2\sqrt2}{3}\right)\), \(\left(\frac{2}{3}, -\frac{2}{3}, \frac{1}{3}\right)\)
> B. Same but with second row entries \(\left(\frac{\sqrt2}{2}, -\frac{\sqrt2}{6}, -\frac{2}{3}\right)\) and third row \(\left(0, \frac{2\sqrt2}{3}, \frac{1}{3}\right)\)
> C. Same but with \((1,2)\) entry positive \(\frac{\sqrt2}{6}\) and \((2,2)\) entry negative \(\frac{\sqrt2}{6}\)
> D. Same as A but with bottom right entry \(\frac{1}{2}\) instead of \(\frac{1}{3}\)
>
> **Answer: A**
>
> (The four options are four near identical three by three matrices differing in a handful of signs and one entry. The examiner's intent is that you compute the right singular vectors and match.)
>
> **Method.** \(v_i = \frac{1}{\sigma_i} A^T u_i\).
>
> \(v_1 = \frac{1}{5} A^T \cdot \frac{(1,1)}{\sqrt2}\). Now \(A^T\) times \((1,1)\) equals the sum of the two rows of \(A\), which is \((3+2, 2+3, -2+2) = (5, 5, 0)\). So \(v_1 = \frac{(5,5,0)}{5\sqrt2} = \frac{(1,1,0)}{\sqrt2} = \left(\frac{\sqrt2}{2}, \frac{\sqrt2}{2}, 0\right)\).
>
> \(v_2 = \frac{1}{3} A^T \cdot \frac{(-1,1)}{\sqrt2}\) (using the sign convention of option C for \(Q_1\)). \(A^T\) times \((-1,1)\) equals row two minus row one equals \((2-3, 3-2, 2+2) = (-1, 1, 4)\). So \(v_2 = \frac{(-1,1,4)}{3\sqrt2} = \left(-\frac{\sqrt2}{6}, \frac{\sqrt2}{6}, \frac{2\sqrt2}{3}\right)\) after rationalising, since \(\frac{1}{3\sqrt2} = \frac{\sqrt2}{6}\) and \(\frac{4}{3\sqrt2} = \frac{4\sqrt2}{6} = \frac{2\sqrt2}{3}\).
>
> \(v_3\) is the null vector of \(A\). Solve \(3x + 2y - 2z = 0\) and \(2x + 3y + 2z = 0\). Add them: \(5x + 5y = 0\), so \(y = -x\). Substitute into the first: \(3x - 2x - 2z = 0\), so \(x = 2z\). Taking \(z = 1\) gives \((2, -2, 1)\), length 3, normalised \(\left(\frac{2}{3}, -\frac{2}{3}, \frac{1}{3}\right)\).
>
> Those three vectors are precisely the columns of option A. **A.**
>
> **Notice how Trick 2.7 saved you again.** The third vector came from a two equation null space solve, not from a three by three eigendecomposition. Also notice that option D changes only the last entry from \(\frac{1}{3}\) to \(\frac{1}{2}\), which breaks normalisation since \(\frac{4}{9} + \frac{4}{9} + \frac{1}{4}\) is not 1. **Trick 2.11: when options differ in one entry, test normalisation of the affected column.**

## 2.7 SVD from 2025 March 16, and a warning

**Shared context for Q14, Q15:** Consider the matrix \(M = \begin{bmatrix} 2 & 1 & 0 \\ 1 & -2 & 0 \end{bmatrix}\). Let the SVD form be \(M = Q_1 \Sigma Q_2^T\).

**Set up.** \(MM^T\): row one with itself is \(4 + 1 + 0 = 5\). Row one with row two is \(2 - 2 + 0 = 0\). Row two with itself is \(1 + 4 + 0 = 5\).

\[ MM^T = \begin{bmatrix} 5 & 0 \\ 0 & 5 \end{bmatrix} = 5I \]

This is the fully degenerate case of Trick 2.5. Both singular values equal \(\sqrt5\), and **every** orthonormal two by two matrix is a valid \(Q_1\), provided \(Q_2\) is chosen to match.

> ### PYQ [2025 Mar 16, Q14, 3 marks, MCQ]
> **Which of the following options is/are true for \(Q_1\)?**
>
> A. \(Q_1 = \begin{bmatrix} 1 & 1 \\ 1 & 1 \end{bmatrix}\)
> B. \(Q_1 = \frac{1}{\sqrt2}\begin{bmatrix} 1 & 1 \\ 0 & 1 \end{bmatrix}\)
> C. \(Q_1 = \frac{1}{\sqrt2}\begin{bmatrix} 1 & 1 \\ -1 & -1 \end{bmatrix}\)
> D. \(Q_1 = \begin{bmatrix} 1 & 0 \\ 0 & 1 \end{bmatrix}\)
>
> **Answer: D**
>
> Because \(MM^T = 5I\), the identity matrix is a perfectly valid choice of \(Q_1\). Check the others: A is not orthogonal (identical columns, unnormalised). B has columns \((1,0)/\sqrt2\) and \((1,1)/\sqrt2\), the first of which has length \(1/\sqrt2\), not 1. C has identical columns again. **Only D is an orthogonal matrix at all.** So D, by elimination, in about ten seconds.
>
> **Trick 2.12: in any \(Q_1\) or \(Q_2\) question, first ask which options are even orthogonal matrices.** In this question that single filter answers it outright.

> ### PYQ [2025 Mar 16, Q15, 3 marks, MCQ]
> **Which of the following options is/are true for \(Q_2^T\)?**
>
> A. \(Q_2^T = \frac{1}{\sqrt6}\begin{bmatrix} 3 & -1 & 1 \\ 0 & \sqrt3 & \sqrt3 \\ -\sqrt2 & 1 & \sqrt2 \end{bmatrix}\)
> B. \(Q_2^T = \begin{bmatrix} 3 & -1 & 1 \\ 0 & \sqrt3 & \sqrt3 \\ -\sqrt2 & -\sqrt2 & -\sqrt2 \end{bmatrix}\)
> C. \(Q_2^T = \frac{1}{\sqrt6}\begin{bmatrix} 3 & -1 & 1 \\ 0 & \sqrt3 & \sqrt3 \\ \sqrt2 & -\sqrt2 & \sqrt2 \end{bmatrix}\)
> D. \(Q_2^T = \begin{bmatrix} 1 & 0 & 0 \\ 0 & 1 & 0 \\ 0 & 0 & 1 \end{bmatrix}\)
>
> **Official answer: D. See Part 11, this key is inconsistent with the key for Q14.**
>
> **Here is the correct mathematics, which you should understand because the concept is examinable even though this particular pairing is broken.**
>
> If \(Q_1\) equals the identity, then \(M = \Sigma Q_2^T\), so \(\Sigma Q_2^T\) must equal \(M\). With \(\Sigma = \begin{bmatrix} \sqrt5 & 0 & 0 \\ 0 & \sqrt5 & 0 \end{bmatrix}\), the first two rows of \(Q_2^T\) must be the rows of \(M\) divided by \(\sqrt5\), that is \((2,1,0)/\sqrt5\) and \((1,-2,0)/\sqrt5\), with the third row being \((0,0,1)\). The identity is not that matrix.
>
> Conversely, **if \(Q_2^T\) equals the identity**, then \(M = Q_1 \Sigma\), which forces \(Q_1 = \frac{1}{\sqrt5}\begin{bmatrix} 2 & 1 \\ 1 & -2 \end{bmatrix}\). That is a perfectly valid orthogonal matrix and it is a genuinely correct SVD.
>
> **So exactly one of the two answers can be right, not both.** The examiner appears to have accepted the identity for both slots. In an exam, if you meet a degenerate case like this, pick the identity, because that is evidently the intended answer, but understand the actual constraint. This is worth internalising because it is exactly the kind of question a well prepared student overthinks and loses time on.
>
> Options A, B and C in this question are copied from the December 2024 paper, where the matrix was different. Rows of A do not even have unit norm: \((3,-1,1)/\sqrt6\) has squared length \(11/6\), not 1. So they were never candidates.

---

# PART 3: COMPLEX MATRICES, HERMITIAN AND UNITARY

## 3.1 The three definitions you must know cold

Let \(A^*\), also written \(A^H\), denote the **conjugate transpose**: transpose the matrix and conjugate every entry. In the exam it is written both ways, and Dec 2024 even adds a note explaining it. It is the complex analogue of the ordinary transpose.

**\(A\) is Hermitian if \(A^* = A\).** This is the complex version of "symmetric". Concretely: the diagonal entries must be real, and the entry at \((i,j)\) must be the complex conjugate of the entry at \((j,i)\).

**\(A\) is unitary if \(A^*A = I\).** This is the complex version of "orthogonal". Concretely: the columns form an orthonormal set under the complex inner product.

**\(A\) is normal if \(A^*A = AA^*\).** Both Hermitian and unitary matrices are normal. Normality is the exact condition under which a matrix has an orthonormal basis of eigenvectors.

## 3.2 The consequence table, which is the whole exam

Here is what you must be able to recite. I have marked which properties are actually asked.

| If A is | Then its eigenvalues | Then its eigenvectors | Then A is diagonalisable |
| --- | --- | --- | --- |
| **Hermitian** | are all **real** | are **orthogonal** for distinct eigenvalues | **yes**, unitarily |
| **Unitary** | all have **absolute value 1** | are **orthogonal** for distinct eigenvalues | **yes**, unitarily |
| **Normal** | may be anything | are **orthogonal** for distinct eigenvalues | **yes**, unitarily |
| any square matrix | may be anything | may fail to be orthogonal | not necessarily |

### The Exam Tricks

**Trick 3.1, the Hermitian check in three seconds.** Look at the diagonal. If any diagonal entry has an imaginary part, the matrix is not Hermitian and you are done. If the diagonal is real, check exactly one off diagonal pair. That is enough to eliminate almost every wrong option.

**Trick 3.2, "eigenvalues are real" is nearly always true.** Because the examiner overwhelmingly favours Hermitian matrices, when the option "all eigenvalues of A are real" appears, it is correct roughly eighty percent of the time in these six papers. Verify quickly, but expect it.

**Trick 3.3, Hermitian implies diagonalisable, always.** So the option "A is not diagonalizable" appearing alongside a Hermitian matrix is a guaranteed wrong answer. It appears as a distractor in Dec24 Q3, Mar24 Q4, Aug25 Q9, and Dec24 Q4. Four free eliminations across the papers.

**Trick 3.4, the trace test for eigenvalue options.** The sum of the eigenvalues equals the trace, that is, the sum of the diagonal entries. When an option offers you a list of eigenvalues, add them and compare to the trace. This alone resolves several questions instantly.

**Trick 3.5, the determinant test.** The product of the eigenvalues equals the determinant. Useful when the trace test leaves a tie.

## 3.3 The worked questions

> ### PYQ [2024 Aug 04, Q4, 4 marks, MSQ]
> **Consider a matrix \(A = \begin{bmatrix} 1 & 1+i & 2i & 9 \\ 1-i & 3 & 4 & 7-i \\ -2i & 4 & 5 & i \\ 9 & 7+i & -i & 7 \end{bmatrix}\). Which of the following options is/are true?**
>
> A. \(A\) is a Hermitian matrix.
> B. \(A\) is diagonalizable.
> C. All eigenvalue of \(A\) real.
> D. \(A\) has eigenvalues that are neither real nor purely imaginary.
>
> **Answers: A, B, C**
>
> **Check Hermitian efficiently.** Diagonal is 1, 3, 5, 7, all real. Good sign. Now the off diagonal pairs. Position \((1,2)\) is \(1+i\) and position \((2,1)\) is \(1-i\), which are conjugates. Position \((1,3)\) is \(2i\) and position \((3,1)\) is \(-2i\), conjugates. Position \((1,4)\) is 9 and \((4,1)\) is 9, conjugates since 9 is real. Position \((2,3)\) is 4 and \((3,2)\) is 4, fine. Position \((2,4)\) is \(7-i\) and \((4,2)\) is \(7+i\), conjugates. Position \((3,4)\) is \(i\) and \((4,3)\) is \(-i\), conjugates. **\(A\) is Hermitian.** Option A true.
>
> Hermitian implies diagonalisable, so **B true**. Hermitian implies real eigenvalues, so **C true**, and therefore **D false**, since D asserts the eigenvalues are not real.
>
> **The structure of this question is worth noting: once you establish Hermitian, three of the four options resolve automatically.** This is the standard architecture of MSQ questions in this paper. Find the one structural property, then read off the consequences. Do not compute eigenvalues. Never compute eigenvalues of a four by four in an exam.

> ### PYQ [2024 Dec 01, Q2, 3 marks, MSQ]
> **Note: \(B^H\) is a conjugate transpose of \(B\).**
>
> **Consider the matrix \(B = \begin{bmatrix} 4 & -2i & -1 \\ 2i & 0 & -i \\ -1 & i & 4 \end{bmatrix}\). Which of the following options is/are true with respect to B?**
>
> A. \(B^2 = -B^H\)
> B. \(B = B^H\)
> C. Every eigenvalue of \(B\) is real.
> D. The determinant of \(B\) is zero.
>
> **Answers: B and C**
>
> **Hermitian check.** Diagonal 4, 0, 4, all real. Position \((1,2)\) is \(-2i\) and \((2,1)\) is \(2i\), conjugates. Position \((1,3)\) is \(-1\) and \((3,1)\) is \(-1\), both real, conjugates. Position \((2,3)\) is \(-i\) and \((3,2)\) is \(i\), conjugates. **\(B\) is Hermitian**, so option B is true and option C follows immediately.
>
> **Option A is false.** \(B^2\) would have a leading entry of \(16 + 4 + 1 = 21\) (compute row one dotted with column one: \(4 \times 4\), plus \((-2i)(2i)\) which is \(+4\), plus \((-1)(-1)\) which is \(+1\)). Meanwhile \(-B^H = -B\) has leading entry \(-4\). Not equal. **You only need one entry to disprove a matrix identity. Always attack the \((1,1)\) entry first.**
>
> **Option D is false.** Expand the determinant along the first row: \(4 \det\begin{bmatrix} 0 & -i \\ i & 4 \end{bmatrix} - (-2i)\det\begin{bmatrix} 2i & -i \\ -1 & 4 \end{bmatrix} + (-1)\det\begin{bmatrix} 2i & 0 \\ -1 & i \end{bmatrix}\). First: \(4(0 - (-i)(i)) = 4(0-1) = -4\). Second: plus \(2i(8i - i) = 2i \cdot 7i = -14\). Third: minus \(1(2i \cdot i - 0) = -1(-2) = +2\). Total: \(-4 - 14 + 2 = \mathbf{-16}\). Nonzero, so D is false. I verified this numerically as well.
>
> **Trick 3.6:** the "determinant is zero" option is a favourite distractor. It is true only when the matrix is singular, which the examiner does sometimes arrange (see Mar25 Q6 below), so you must actually check rather than assume.

> ### PYQ [2024 Dec 01, Q3, 3 marks, MSQ]
> **Consider a unitary matrix \(A\). Let \(\alpha\) be an eigenvalue of \(A\), then which of the following options is/are true?**
>
> A. \(|\alpha| = 1\).
> B. \(\alpha\) is an eigenvalue of \(A^H\), where \(A^H\) is a hermitian matrix.
> C. Eigenvectors of \(A\) are orthonormal.
> D. \(A\) is not diagonalizable.
>
> **Answers: A, B, C** (per the official key; see the note below on B)
>
> **Why A is true, and this proof is short enough to remember.** Let \(Av = \alpha v\) with \(v\) a unit vector. Unitary matrices preserve length, so the length of \(Av\) equals the length of \(v\), which is 1. But the length of \(\alpha v\) is \(|\alpha|\) times 1. Hence \(|\alpha| = 1\). **Every eigenvalue of a unitary matrix lies on the unit circle.**
>
> **Why C is true.** Unitary matrices are normal, and normal matrices have an orthonormal eigenbasis. So C holds.
>
> **Why D is false.** Same reason: normal implies unitarily diagonalisable.
>
> **A remark on B.** For a unitary \(A\), \(A^H = A^{-1}\), whose eigenvalues are \(1/\alpha\). Since \(|\alpha| = 1\), \(1/\alpha\) equals the conjugate of \(\alpha\). So strictly, the conjugate of \(\alpha\) is an eigenvalue of \(A^H\), and \(\alpha\) itself is one only when \(\alpha\) is real. The official key marks B correct, evidently reading it as the conjugate statement. **Answer as keyed, but know the precise version, because Mar 2025 Q5 asks exactly this and expects the conjugate.**

> ### PYQ [2025 Mar 16, Q5, 2 marks, MCQ]
> **Let \(A\) be a complex square matrix. What is the relationship between the eigenvalues of \(A\) and its conjugate transpose \(A^*\)?**
>
> A. The eigenvalues of \(A^*\) are the complex conjugates of the eigenvalues of \(A\).
> B. The eigenvalues of \(A^*\) are the same as the eigenvalues of \(A\).
> C. The eigenvalues of \(A^*\) are the reciprocals of the eigenvalues of \(A\).
> D. The eigenvalues of \(A^*\) correspond to the square roots of the eigenvalues of \(A\).
>
> **Answer: A**
>
> **Proof in one line.** The characteristic polynomial of \(A^*\) is \(\det(A^* - \lambda I)\), which equals the conjugate of \(\det(A - \bar\lambda I)\). So \(\lambda\) is a root for \(A^*\) exactly when \(\bar\lambda\) is a root for \(A\). **Conjugation, always.**
>
> **Sanity check with a familiar case:** if \(A\) is Hermitian then \(A^* = A\), so the eigenvalues must be their own conjugates, meaning they are real. That is consistent with everything we know, which is a good confirmation that A is the right option.

> ### PYQ [2024 Mar 24, Q2, 3 marks, MSQ]
> **Consider two complex matrices A and B such that both are the Hermitian matrices. Which of the following statements is/are true?**
>
> A. \(A+B\) is also a Hermitian matrix.
> B. \(\overline{A+B}\) is a Hermitian matrix, where \(\overline{A+B}\) is a conjugate of \(A+B\).
> C. \(AB\) is also a Hermitian matrix.
> D. \(\overline{AB}\) is Hermitian matrix, where \(\overline{AB}\) is conjugate of \(AB\).
>
> **Answers: A and B**
>
> **A is true.** \((A+B)^* = A^* + B^* = A + B\). The conjugate transpose distributes over addition, so Hermitian matrices are closed under addition.
>
> **B is true, and this is the subtle one.** For a Hermitian \(A\), the conjugate of \(A\) equals the transpose of \(A\). And the transpose of a Hermitian matrix is again Hermitian. Concretely, if \(M = \overline{A+B}\), then \(M^* = \overline{(A+B)^T} = A+B\)... more directly, \(M^T = \overline{A+B}\) itself since \(A+B\) is Hermitian. So \(M^* = M\). **True.**
>
> **C is false, and here is why, because this is the classic trap.** \((AB)^* = B^*A^* = BA\). The conjugate transpose **reverses the order of a product.** So \(AB\) is Hermitian only when \(BA = AB\), that is, only when \(A\) and \(B\) commute, which is not given. **General matrices do not commute, so C fails.**
>
> **D is false** by the same order reversal argument.
>
> **Trick 3.7, the order reversal rule, and it is worth writing on your rough sheet:** \((AB)^* = B^*A^*\). Every question about products of Hermitian or unitary matrices turns on this. Sums preserve the property, products generally do not.

> ### PYQ [2024 Mar 24, Q3, 3 marks, MSQ]
> **Consider a matrix \(A = \begin{bmatrix} 1 & -i \\ i & 1 \end{bmatrix}\). Which of the following statements is/are true about A?**
>
> A. \(A\) is the Hermitian matrix.
> B. \(A\) is the Unitary matrix.
> C. All eigenvalues are real.
> D. Eigenvalues are complex.
>
> **Answers: A and C**
>
> **Hermitian:** diagonal 1, 1 real; \((1,2)\) is \(-i\) and \((2,1)\) is \(i\), conjugates. **Yes, Hermitian.** So A true, C true, D false.
>
> **Unitary?** Compute \(A^*A\). Since \(A\) is Hermitian, \(A^* = A\), so \(A^*A = A^2\). \(A^2\) equals \(\begin{bmatrix} 1 & -i \\ i & 1 \end{bmatrix}\) times \(\begin{bmatrix} 1 & -i \\ i & 1 \end{bmatrix}\). The \((1,1)\) entry is \(1 \times 1 + (-i)(i) = 1+1 = 2\). That is not 1, so \(A^*A\) is not the identity. **Not unitary.** B false.
>
> **Trick 3.8:** a matrix cannot be both Hermitian and unitary unless its eigenvalues are all plus or minus 1 (real and on the unit circle simultaneously). Here the eigenvalues are 0 and 2, so unitarity was impossible.

> ### PYQ [2024 Mar 24, Q4, 3 marks, MSQ]
> **Consider a matrix \(A = \begin{bmatrix} 1 & -i \\ i & 1 \end{bmatrix}\). Which of the following statements is/are true about A?**
>
> A. \(A = \begin{bmatrix} -\frac{i\sqrt2}{2} & \frac{i\sqrt2}{2} \\ \frac{\sqrt2}{2} & \frac{\sqrt2}{2} \end{bmatrix} \begin{bmatrix} 2 & 0 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} -\frac{i\sqrt2}{2} & \frac{\sqrt2}{2} \\ \frac{i\sqrt2}{2} & \frac{\sqrt2}{2} \end{bmatrix}\)
> B. \(A^2 = \begin{bmatrix} -\frac{i\sqrt2}{2} & \frac{i\sqrt2}{2} \\ \frac{\sqrt2}{2} & \frac{\sqrt2}{2} \end{bmatrix} \begin{bmatrix} 4 & 0 \\ 0 & 0 \end{bmatrix} \begin{bmatrix} -\frac{i\sqrt2}{2} & \frac{\sqrt2}{2} \\ \frac{i\sqrt2}{2} & \frac{\sqrt2}{2} \end{bmatrix}\)
> C. \((i, 1)\) is an eigenvector of \(A\).
> D. \(A\) is not diagonalizable.
>
> **Answers: A, B, C**
>
> **This question is testing spectral decomposition, and there is a beautiful shortcut. Do not multiply out three matrices.**
>
> First, find the eigenvalues of \(A\): trace is 2, determinant is \(1 \times 1 - (-i)(i) = 1 - 1 = 0\). So \(\lambda^2 - 2\lambda = 0\), giving \(\lambda = 2\) and \(\lambda = 0\).
>
> **Option A** claims \(A = Q\Lambda Q^*\) with \(\Lambda = \text{diag}(2, 0)\). Those are exactly the eigenvalues we found, and the outer matrices are unitary (check: column \((-i,1)/\sqrt2\) has squared length \(\frac12+\frac12=1\)). **A is true**, and you established it purely by matching eigenvalues, no multiplication.
>
> **Option B** claims \(A^2\) equals the same decomposition with \(\text{diag}(4, 0)\). Since \(A = Q\Lambda Q^*\), we get \(A^2 = Q\Lambda^2 Q^*\), and \(\Lambda^2 = \text{diag}(4, 0)\). **B is true**, and again by structure alone.
>
> **Option C.** Test directly: \(A\) times \((i, 1)\) gives first component \(i \times 1 + (-i)(1) = i - i = 0\), second component \(i \times i + 1 \times 1 = -1 + 1 = 0\). So \(A(i,1)\) equals the zero vector, which is \(0 \times (i,1)\). **It is an eigenvector with eigenvalue 0. True.**
>
> **Option D is false** because \(A\) is Hermitian, hence diagonalisable. Trick 3.3.
>
> **Trick 3.9, the spectral decomposition shortcut:** to check a claimed decomposition \(A = Q\Lambda Q^*\), you only need to (i) confirm the diagonal of \(\Lambda\) contains the true eigenvalues and (ii) confirm \(Q\) is unitary. Never multiply the three matrices out.

> ### PYQ [2024 Aug 04, Q9, 4 marks, MSQ]
> **Consider a matrix \(A = \begin{bmatrix} 1/\sqrt2 & 1/\sqrt2 \\ i/\sqrt2 & -i/\sqrt2 \end{bmatrix}\). Which of the following options is/are true?**
>
> A. \(A\) is a unitary matrix.
> B. Let \(v\) be any vector in \(\mathbb{R}^2\). Then \(\|Av\| = \|v\|\) may or may not be true.
> C. Eigenvectors of \(A\) are orthogonal.
> D. Let \(\alpha\) be an eigenvalue of \(A\). Then \(|\alpha| = 1\).
>
> **Answers: A, C, D**
>
> **Unitary check.** Column one is \((1/\sqrt2, i/\sqrt2)\). Its squared norm under the complex inner product is the sum of the squared absolute values: \(\frac12+\frac12=1\). Good. Column two is \((1/\sqrt2, -i/\sqrt2)\), also unit length. Their inner product is \(\overline{(1/\sqrt2)}(1/\sqrt2) + \overline{(i/\sqrt2)}(-i/\sqrt2) = \frac12 + (-i/\sqrt2)(-i/\sqrt2) = \frac12 + \frac{i^2}{2} = \frac12 - \frac12 = 0\). **Orthonormal columns, so \(A\) is unitary.** True.
>
> **Option B is false, and it is the well designed trap.** Unitary matrices preserve norms **always**, not sometimes. The phrase "may or may not be true" is what makes it false. Do not be lulled by the hedged language, which sounds safe. **Trick 3.10: in these MSQs, hedged options such as "may or may not" are almost always the wrong answer, because the underlying theorem is absolute.**
>
> **Options C and D are true** by the unitary consequence table: normal implies orthogonal eigenvectors, unitary implies eigenvalues on the unit circle. I verified numerically that the eigenvalues here have modulus exactly 1 and the eigenvectors are orthogonal.

> ### PYQ [2025 Mar 16, Q6, 3 marks, MSQ]
> **Consider a matrix \(A = \begin{bmatrix} 1 & 1 & i \\ 1 & -1 & -i \\ -i & -i & 1 \end{bmatrix}\). Which of the following options is/are true?**
>
> A. \(A\) is a unitary matrix.
> B. \(A = A^*\).
> C. Every eigenvalue of \(A\) is real.
> D. The determinant of \(A\) is zero.
>
> **Answers: C and D**
>
> **This is the most instructive complex matrix question in all six papers, because it breaks the pattern.**
>
> **Is \(A\) Hermitian?** Check position \((2,3)\) which is \(-i\), against position \((3,2)\) which is \(-i\). The conjugate of \(-i\) is \(+i\), which does not equal \(-i\). **Not Hermitian.** So option B is false.
>
> **Is \(A\) unitary?** Column one is \((1, 1, -i)\), squared norm \(1+1+1=3\), not 1. **Not unitary.** Option A false.
>
> **So both structural shortcuts fail, and you must actually work.** This is why the question is worth 3 marks.
>
> **Determinant.** Expand along the first row: \(1 \cdot \det\begin{bmatrix} -1 & -i \\ -i & 1 \end{bmatrix} - 1 \cdot \det\begin{bmatrix} 1 & -i \\ -i & 1 \end{bmatrix} + i \cdot \det\begin{bmatrix} 1 & -1 \\ -i & -i \end{bmatrix}\).
> First minor: \((-1)(1) - (-i)(-i) = -1 - (i^2) = -1+1 = 0\).
> Second minor: \((1)(1) - (-i)(-i) = 1+1 = 2\).
> Third minor: \((1)(-i) - (-1)(-i) = -i - i = -2i\).
> Total: \(1 \times 0 - 1 \times 2 + i \times (-2i) = 0 - 2 + 2 = \mathbf{0}\). **Option D is true.**
>
> **Eigenvalues.** Since the determinant is zero, one eigenvalue is zero. The trace is \(1-1+1=1\), so the remaining two sum to 1. I verified numerically that the eigenvalues are 2, -1, and 0, all real. **Option C is true.**
>
> **The lesson.** A non Hermitian matrix can still have real eigenvalues. Hermitian is sufficient for real eigenvalues but not necessary. Do not reason backwards. Also note this: **the determinant being zero was detectable much faster.** Look at columns one and two: \((1,1,-i)\) and \((1,-1,-i)\). Look at column three: \((i,-i,1)\). Notice that \(i\) times column one plus something... in fact the fastest route was simply the cofactor expansion above, which took thirty seconds because the first minor vanished.

> ### PYQ [2025 Aug 03, Q9, 3 marks, MSQ]
> **Consider a Hermitian matrix \(A\). Let \(\alpha\) and \(\beta\) be the eigenvalues of \(A\). Which of the following options is/are true?**
>
> A. \(\alpha\) and \(\beta\) both are real.
> B. if \(\alpha \neq \beta\), then the corresponding eigenvectors are linearly independent.
> C. If \(\alpha \neq \beta\), then the corresponding eigenvectors are orthogonal.
> D. \(A\) is not diagonalizable.
>
> **Answers: A, B, C**
>
> Straight from the consequence table. Hermitian gives real eigenvalues (A), and for **any** matrix, eigenvectors for distinct eigenvalues are linearly independent (B). For Hermitian and more generally normal matrices they are additionally orthogonal (C). D is false by Trick 3.3.
>
> **Understand the distinction between B and C**, because the examiner tests it. Linear independence for distinct eigenvalues holds for **every** matrix. Orthogonality requires **normality**. B is the weaker statement and holds more broadly.

> ### PYQ [2025 Aug 03, Q8, 3 marks, MSQ]
> **Consider a matrix \(A = \begin{bmatrix} i & 1 \\ -1 & i \end{bmatrix}\). Which of the following options is/are true?**
>
> A. \(A\) is a Hermitian matrix.
> B. \(A\) is a unitary matrix.
> C. All eigenvalues of \(A\) are not real.
> D. Eigenvectors corresponding to different eigenvalues of \(A\) are not orthogonal.
>
> **Official answers: C and D. Option D is mathematically false. See Part 11.**
>
> **Correct analysis.** The diagonal entries are \(i\), which is not real, so \(A\) is not Hermitian and option A is false. Compute \(A^*A\): \(A^*\) is \(\begin{bmatrix} -i & -1 \\ 1 & -i \end{bmatrix}\), and the \((1,1)\) entry of \(A^*A\) is \((-i)(i) + (-1)(-1) = 1+1 = 2\), not 1, so \(A\) is not unitary and B is false.
>
> **Eigenvalues.** The characteristic equation is \((i-\lambda)^2 + 1 = 0\), so \((i-\lambda)^2 = -1\), giving \(i - \lambda = \pm i\), hence \(\lambda = 0\) or \(\lambda = 2i\). The key marks C as correct, reading it as "the eigenvalues are not all real", which is fair since \(2i\) is not real, though strictly 0 is real.
>
> **On option D.** Compute \(A^*A\) and \(AA^*\). Both equal \(\begin{bmatrix} 2 & -2i \\ 2i & 2 \end{bmatrix}\). Since they are equal, \(A\) is a normal matrix, and normal matrices have orthogonal eigenvectors. The eigenvectors are \((-i, 1)/\sqrt2\) and \((1, -i)/\sqrt2\), whose complex inner product is \(\overline{(-i)}\times 1 + \overline{1}\times(-i) = i - i = 0\). **They are orthogonal, so option D is false as stated.** The key says otherwise. Answer as keyed if this exact question reappears, but be aware.

> ### PYQ [2026 Apr 06, Q3, 3 marks, MCQ]
> **Let \(A = \begin{bmatrix} 2 & a+i \\ b-i & 3 \end{bmatrix}\) be a Hermitian matrix. Which of the following options is correct for the values of a and b?**
>
> A. \(a - b = 2\)
> B. \(a = -b\)
> C. \(a = b\), with \(a\) and \(b\) real
> D. \(a = 1, b = 0\)
>
> **Answer: C**
>
> **Direct application of the definition.** For \(A\) to be Hermitian we need the \((1,2)\) entry to equal the conjugate of the \((2,1)\) entry. The \((2,1)\) entry is \(b-i\), whose conjugate is \(b+i\). Setting \(a+i\) equal to \(b+i\) gives \(a = b\), and both must be real for the conjugation to work out as stated. **C.**
>
> Option D is a special case of C, but C is the general and therefore correct answer. **Trick 3.11: when one option is a special case of another, the general one is the answer.**

> ### PYQ [2026 Apr 06, Q1, 4 marks, MCQ]
> **Consider a vector \(u \in \mathbb{C}^n\) such that \(u^*u = 1\). Let \(A = I - 2uu^*\), where \(I\) is the identity matrix. Which of the following is true?**
>
> A. \(A\) is Hermitian and unitary.
> B. \(A\) is Hermitian but not unitary.
> C. \(A\) is unitary but not Hermitian.
> D. \(A\) is neither Hermitian nor unitary.
>
> **Answer: A**
>
> **This matrix has a name: it is the Householder reflector, and it is worth knowing because it is the building block of the QR algorithm.** Geometrically it reflects space through the hyperplane perpendicular to \(u\).
>
> **Hermitian check.** \(A^* = (I - 2uu^*)^* = I^* - 2(uu^*)^* = I - 2uu^*\), because \((uu^*)^* = u^{**}u^* = uu^*\). So \(A^* = A\). Hermitian.
>
> **Unitary check.** Since \(A\) is Hermitian, \(A^*A = A^2\). Compute:
> \(A^2 = (I - 2uu^*)(I - 2uu^*) = I - 4uu^* + 4u(u^*u)u^*\).
> But \(u^*u = 1\) by hypothesis, so the last term is \(4uu^*\).
> Therefore \(A^2 = I - 4uu^* + 4uu^* = I\). Unitary.
>
> **A.** I verified this numerically with a random complex unit vector in four dimensions and both properties held exactly.
>
> **The intuition worth carrying:** a reflection undone twice is the identity, so of course \(A^2 = I\). And a reflection is its own inverse, so \(A = A^{-1} = A^*\), so of course it is Hermitian. **Geometry gives you the answer before algebra does.**

> ### PYQ [2026 Apr 06, Q7, 3 marks, MSQ]
> **Consider the following matrix for \(m \neq 0\): \(B = \frac{1}{m}\begin{bmatrix} 1 & i \\ i & 1 \end{bmatrix}\). Which of the following options is/are correct?**
>
> A. \(B\) is unitary for all real values of \(m\) other than 0.
> B. \(B\) is unitary for \(m = 2\).
> C. \(B\) is unitary for \(m = \sqrt2\).
> D. If \(m = \sqrt2\), then all eigenvalues of \(B\) satisfy \(|\lambda| = 1\).
> E. If \(m\) is any non zero real value, then all eigenvalues of \(B\) satisfy \(|\lambda| = 1\).
>
> **Answers: C and D**
>
> **Compute \(BB^*\).** The inner matrix \(M = \begin{bmatrix} 1 & i \\ i & 1 \end{bmatrix}\). Its conjugate transpose \(M^* = \begin{bmatrix} 1 & -i \\ -i & 1 \end{bmatrix}\). Then \(MM^*\) has \((1,1)\) entry \(1 \times 1 + i \times (-i) = 1+1 = 2\), and \((1,2)\) entry \(1 \times(-i) + i \times 1 = -i+i = 0\). By symmetry \(MM^* = 2I\).
>
> So \(BB^* = \frac{1}{m^2} \times 2I\). **This equals the identity exactly when \(m^2 = 2\), that is \(m = \sqrt2\)** (taking the positive root). **C is true, A and B are false.**
>
> **D follows from C:** if \(B\) is unitary then its eigenvalues lie on the unit circle. **True.**
>
> **E is false** because for other \(m\) the matrix is not unitary and the eigenvalues scale by \(1/m\). Indeed the eigenvalues of \(M\) are \(1+i\) and \(1-i\), each of modulus \(\sqrt2\), so the eigenvalues of \(B\) have modulus \(\sqrt2/m\), which is 1 only when \(m = \sqrt2\).
>
> **Trick 3.12, the scaling rule for unitarity.** If \(MM^* = cI\), then \(M/\sqrt{c}\) is unitary. This turns a whole family of questions into a single division. Compute \(c\) by taking the squared norm of one column.

---

# PART 4: QUADRATIC FORMS AND DEFINITENESS

## 4.1 What a quadratic form is

A quadratic form is a polynomial in several variables in which **every term has total degree exactly two**. So terms like \(x^2\), \(y^2\), and \(xy\) are allowed. Terms like \(x\), or a constant, or \(x^3\), are not.

Any such polynomial can be written in the compact matrix form \(x^T A x\), where \(x\) is the column vector of variables and \(A\) is a square matrix. The reason we bother is that all the questions we care about, namely whether the form is always positive, always negative, or neither, become questions about the **eigenvalues of \(A\)**, which we know how to handle.

## 4.2 Converting a polynomial into its matrix, which is asked in three papers

Here is the rule, and it is short.

**The diagonal entry \(A_{ii}\) is the coefficient of \(x_i^2\).**

**The off diagonal entries \(A_{ij}\) and \(A_{ji}\) together must sum to the coefficient of the cross term \(x_i x_j\).** If you want a **symmetric** matrix, which is what the exam wants unless it explicitly says otherwise, you split the cross term coefficient in half and put half in each of the two symmetric positions.

Let me make this concrete. The form \(3x^2 + 4xy\) has \(A_{11} = 3\), and the coefficient of \(xy\) is 4, so \(A_{12} = A_{21} = 2\).

### The Exam Trick

**Trick 4.1, the "halve the cross terms" rule.** Diagonal takes the square coefficients as they are. Off diagonal takes **half** the cross coefficients. Forgetting to halve is the single most common error, and the examiner always includes an option with the unhalved value.

**Trick 4.2, check only one entry.** As with covariance matrices, computing one diagonal entry and one off diagonal entry always uniquely identified the correct option in the PYQs.

> ### PYQ [2024 Aug 04, Q2, 2 marks, MCQ]
> **Context:** Consider the quadratic form \(f(x_1, x_2, x_3) = (x_1\ x_2\ x_3) A (x_1\ x_2\ x_3)^T = 2x_1x_2 + 4x_2x_3 - x_1^2 - 5x_2^2 - 3x_3^2\), where \(A\) is a matrix.
>
> **Which of the following options represents matrix A?**
>
> A. \(\begin{bmatrix} 1 & 1 & 0 \\ 1 & -5 & 2 \\ 0 & 2 & -3 \end{bmatrix}\)
> B. \(\begin{bmatrix} -1 & -1 & 0 \\ 1 & -5 & 2 \\ 0 & 2 & -3 \end{bmatrix}\)
> C. \(\begin{bmatrix} -1 & 1 & 0 \\ 1 & -5 & 2 \\ 0 & 2 & -3 \end{bmatrix}\)
> D. \(\begin{bmatrix} 1 & -1 & 0 \\ 1 & -5 & 2 \\ 0 & 2 & -3 \end{bmatrix}\)
>
> **Answer: C**
>
> **Solution.** The coefficient of \(x_1^2\) is minus 1, so \(A_{11}\) must be \(-1\). That immediately kills options A and D, which both have \(+1\) there.
>
> Between B and C, the difference is the \((1,2)\) entry. The coefficient of \(x_1x_2\) in \(f\) is 2, and the matrix contributes \(A_{12} + A_{21}\) to that coefficient. All options have \(A_{21} = 1\). So we need \(A_{12} = 1\). Option B has \(-1\), giving a total of 0, wrong. Option C has \(+1\), giving 2, correct. **C.**
>
> **Verification of the rest, so you trust the method:** \(A_{22} = -5\) matches the \(-5x_2^2\). \(A_{33} = -3\) matches. \(A_{23} + A_{32} = 2+2 = 4\), matching \(4x_2x_3\). \(A_{13} + A_{31} = 0\), and there is indeed no \(x_1x_3\) term. Everything checks.

> ### PYQ [2024 Dec 01, Q6, 3 marks, MCQ]
> **Given the quadratic form \(Q(x,y,z) = 3x^2 + 2y^2 + z^2 + 4xy + 2xz + 4yz\), expressed in matrix form as \(Q(x,y,z) = (x\ y\ z) M (x\ y\ z)^T\). Which of the following is M?**
>
> A. \(\begin{bmatrix} 3 & 2 & 1 \\ 2 & 2 & 2 \\ 1 & 2 & 1 \end{bmatrix}\)
> B. \(\begin{bmatrix} 3 & 2 & 2 \\ 2 & 2 & 2 \\ 2 & 2 & 1 \end{bmatrix}\)
> C. \(\begin{bmatrix} 2 & 3 & 1 \\ 3 & 2 & 1 \\ 1 & 1 & 1 \end{bmatrix}\)
> D. None of these.
>
> **Answer: A**
>
> **Solution.** Diagonal must be the square coefficients: 3, 2, 1. Option C has 2, 2, 1 on the diagonal, so it is dead. Options A and B both have 3, 2, 1.
>
> Cross term \(xy\) has coefficient 4, so the symmetric entries are 2 and 2. Both A and B have that.
> Cross term \(xz\) has coefficient 2, so the symmetric entries are 1 and 1. Option A has 1, option B has 2. **A is correct.**
> Confirm with \(yz\): coefficient 4, symmetric entries 2 and 2. Option A has 2 at \((2,3)\) and 2 at \((3,2)\). Correct.
>
> **A.** Note how the halving rule resolved this: the \(xz\) coefficient of 2 becomes 1 in the matrix, and B's failure to halve it is exactly the trap.

> ### PYQ [2024 Mar 24, Q7, 2 marks, MCQ]
> **Context:** Consider a quadratic function \(f_1(x_1, x_2) = (x_1\ x_2) A (x_1\ x_2)^T = 2x_1^2 + 12x_1x_2 + 7x_2^2\), where \(A\) is a matrix.
>
> **Which of the following options represents matrix A?**
>
> A. \(\begin{bmatrix} 2 & 6 \\ 6 & 7 \end{bmatrix}\)
> B. \(\begin{bmatrix} 2 & -6 \\ -6 & 7 \end{bmatrix}\)
> C. \(\begin{bmatrix} -2 & 6 \\ 6 & -7 \end{bmatrix}\)
> D. \(\begin{bmatrix} -2 & -6 \\ -6 & -7 \end{bmatrix}\)
>
> **Answer: A**
>
> Diagonal must be 2 and 7, killing C and D. Cross coefficient is \(+12\), halved is \(+6\), so the off diagonals are \(+6\) not \(-6\), killing B. **A.** Ten seconds.

## 4.3 Definiteness, and how to test it fast

Given a symmetric matrix A, we classify it as follows.

| Classification | Eigenvalue condition | Meaning for the form \(x^T A x\) |
| --- | --- | --- |
| **Positive definite** | all eigenvalues strictly greater than 0 | strictly positive for every nonzero x |
| **Positive semi definite** | all eigenvalues greater than or equal to 0 | never negative, but can be zero for some nonzero x |
| **Negative definite** | all eigenvalues strictly less than 0 | strictly negative for every nonzero x |
| **Negative semi definite** | all eigenvalues less than or equal to 0 | never positive |
| **Indefinite** | some positive and some negative | takes both signs |

### The Exam Tricks for definiteness

**Trick 4.3, the two by two test, which handles most questions.** For a symmetric two by two matrix, use trace and determinant:
- If **determinant is negative**, the eigenvalues have opposite signs, so the matrix is **indefinite**. Done, no further work.
- If **determinant is positive**, the eigenvalues have the same sign, and the trace tells you which. Positive trace means positive definite, negative trace means negative definite.
- If **determinant is zero**, one eigenvalue is zero, so it is **semi definite**, and the trace tells you which side.

This single trick answers Mar24 Q8, Dec24 Q16, and half of the others.

**Trick 4.4, the leading principal minor test for larger matrices.** Compute the determinants of the top left one by one, two by two, three by three blocks, and so on.
- All positive means **positive definite**.
- Alternating in sign starting negative, that is minus, plus, minus, plus, means **negative definite**.
- Anything else, and it is not definite.

**Trick 4.5, the fastest negative definite check.** \(A\) is negative definite exactly when \(-A\) is positive definite. So if the diagonal is all negative, suspect negative definite and check by flipping all signs and applying the positive definite test.

**Trick 4.6, the instant disqualifier.** For a positive definite matrix, **every diagonal entry must be positive**, and for negative definite, every diagonal entry must be negative. If the diagonal has mixed signs, the matrix is indefinite immediately. No computation whatsoever.

> ### PYQ [2024 Aug 04, Q3, 2 marks, MCQ]
> **Context:** the same quadratic form as Q2, with \(A = \begin{bmatrix} -1 & 1 & 0 \\ 1 & -5 & 2 \\ 0 & 2 & -3 \end{bmatrix}\).
>
> **The matrix A is**
>
> A. positive definite.
> B. negative definite.
>
> **Answer: B**
>
> **Fast route, Trick 4.6 and 4.5.** Every diagonal entry is negative, so positive definite is impossible. With only two options, we are done. **B.**
>
> **Rigorous route via Trick 4.4.** Leading minors: first is \(-1\), negative. Second is \(\det\begin{bmatrix} -1 & 1 \\ 1 & -5 \end{bmatrix} = 5-1=4\), positive. Third is the full determinant: expand along the first row, \(-1(15-4) - 1(-3-0) + 0 = -11+3 = \mathbf{-8}\), negative. Pattern is minus, plus, minus. **Negative definite confirmed.** I verified numerically that the eigenvalues are approximately \(-6.37, -2\), and \(-0.63\), all negative.

> ### PYQ [2024 Mar 24, Q8, 3 marks, MCQ]
> **Context:** \(f_1(x_1,x_2) = 2x_1^2 + 12x_1x_2 + 7x_2^2\), with \(A = \begin{bmatrix} 2 & 6 \\ 6 & 7 \end{bmatrix}\).
>
> **Which of the following options is/are true?**
>
> A. \(A\) is a negative definite matrix.
> B. \(A\) is a positive definite matrix.
> C. \(A\) is a negative semi definite matrix.
> D. \(A\) is a positive semi definite matrix.
> E. \(A\) is a indefinite matrix.
>
> **Answer: E**
>
> **Determinant equals \(2 \times 7 - 6 \times 6 = 14-36=-22\).** Negative determinant means the eigenvalues have opposite signs, so the matrix is **indefinite**. **E.** One multiplication and one subtraction.
>
> **Confirm the intuition:** put \(x_2 = 0\) and you get \(2x_1^2\), positive. Put \(x_1=1\) and \(x_2=-1\) and you get \(2-12+7=-3\), negative. The form takes both signs, which is exactly what indefinite means.

> ### PYQ [2024 Dec 01, Q16, 2 marks, MCQ]
> **Which of the following statements is true about the matrix \(A = \begin{bmatrix} 1 & 4 \\ 4 & 16 \end{bmatrix}\)?**
>
> A. \(A\) is positive definite.
> B. \(A\) is positive semi-definite.
> C. \(A\) is negative definite.
> D. \(A\) is negative semi-definite.
>
> **Answer: B**
>
> **Determinant equals \(16-16=0\).** So one eigenvalue is zero, which rules out both "definite" options. Trace is 17, positive, so the other eigenvalue is 17, positive. Eigenvalues 17 and 0 means **positive semi definite**. **B.**
>
> **Trick 4.7, spot the rank one structure.** The matrix \(\begin{bmatrix} 1 & 4 \\ 4 & 16 \end{bmatrix}\) equals \((1,4)(1,4)^T\). Any matrix of the form \(vv^T\) is automatically positive semi definite and never positive definite, because it is singular for dimension above one. Recognising this pattern gives you the answer with no arithmetic at all. Look for it: rows proportional to each other.

> ### PYQ [2024 Mar 24, Q12, 2 marks, MCQ]
> **Which of the following statements is true about the matrix \(A = \begin{bmatrix} 3 & 2 \\ -2 & -1 \end{bmatrix}\)?**
>
> A. \(A\) is positive definite.
> B. \(A\) is positive semi-definite.
> C. \(A\) is negative definite.
> D. \(A\) is negative semi-definite.
>
> **Answer: A** (see the note, this one is convention dependent)
>
> **The mathematics.** This matrix is **not symmetric**, which is unusual for a definiteness question. Its eigenvalues are found from trace 2 and determinant \((3)(-1) - (2)(-2) = -3+4=1\). So \(\lambda^2 - 2\lambda + 1 = 0\), giving \(\lambda = 1\), twice. Both eigenvalues are positive, so under the eigenvalue definition of definiteness the matrix is **positive definite**, which is the official key.
>
> **A warning you should understand.** If instead you evaluate the quadratic form directly, \(x^T A x = 3x^2 + 2xy - 2xy - y^2 = 3x^2 - y^2\), which takes both signs and is therefore indefinite. The two criteria disagree because the matrix is not symmetric, and for non symmetric matrices only the symmetric part governs the quadratic form.
>
> **What to do in the exam.** This course clearly applies the **eigenvalue criterion**. Use eigenvalues. But now you know why the question feels strange, and you will not lose thirty seconds being confused by it.

> ### PYQ [2025 Aug 03, Q4, 3 marks, MCQ]
> **Which of the following statements is true about the matrix \(A = \begin{bmatrix} 2 & -1 & 0 \\ -1 & 2 & -1 \\ 0 & -1 & 2 \end{bmatrix}\)?**
>
> A. \(A\) is positive definite.
> B. \(A\) is positive semi-definite.
> C. \(A\) is negative definite.
> D. \(A\) is negative semi-definite.
>
> **Answer: A**
>
> **Trick 4.4 applied to a three by three, and this is the cleanest possible example.**
>
> First leading minor: 2. Positive.
> Second: \(\det\begin{bmatrix} 2 & -1 \\ -1 & 2 \end{bmatrix} = 4-1=3\). Positive.
> Third: the full determinant. Expand along the first row: \(2\det\begin{bmatrix} 2 & -1 \\ -1 & 2 \end{bmatrix} - (-1)\det\begin{bmatrix} -1 & -1 \\ 0 & 2 \end{bmatrix} + 0\). That is \(2 \times 3 + 1(-2-0) = 6-2 = \mathbf{4}\). Positive.
>
> All three positive, so **positive definite. A.** I verified the eigenvalues numerically as approximately 0.59, 2, and 3.41, all positive.
>
> **This matrix is worth recognising on sight:** the tridiagonal matrix with 2 on the diagonal and \(-1\) above and below. It is the discrete Laplacian, it shows up everywhere in numerical analysis, and it is always positive definite.

> ### PYQ [2025 Aug 03, Q3, 2 marks, MCQ]
> **Given the quadratic form \(Q(x,y,z) = x^2 + 2xy - 2xz\). Which of the following is true?**
>
> A. \(Q\) is positive definite.
> B. \(Q\) is positive semi-definite.
> C. \(Q\) is negative definite.
> D. \(Q\) is negative semi-definite.
> E. None of these.
>
> **Answer: E**
>
> **Build the matrix.** Diagonal: coefficient of \(x^2\) is 1, of \(y^2\) is 0, of \(z^2\) is 0. So diagonal is \((1, 0, 0)\). Cross term \(xy\) has coefficient 2, halved gives 1 at positions \((1,2)\) and \((2,1)\). Cross term \(xz\) has coefficient \(-2\), halved gives \(-1\) at positions \((1,3)\) and \((3,1)\). No \(yz\) term.
>
> \[ M = \begin{bmatrix} 1 & 1 & -1 \\ 1 & 0 & 0 \\ -1 & 0 & 0 \end{bmatrix} \]
>
> **Trick 4.6 gives it away immediately:** the diagonal contains zeros, so the matrix cannot be positive definite or negative definite. Could it be semi definite? For positive semi definite you need every eigenvalue non negative. But here is a fast disproof: set \(x=0\) and \(y\) and \(z\) arbitrary. Then \(Q=0\). Set \(y=1, z=0, x=-1\): \(Q = 1-2=-1\), negative. Set \(y=0, z=-1, x=1\): \(Q=1+0+2=3\), positive. **\(Q\) takes both signs, hence indefinite, hence none of the listed options. E.**
>
> I verified the eigenvalues numerically: \(-1, 0\), and \(2\). Indefinite confirmed.
>
> **Trick 4.8, the two point test.** To show a form is indefinite, you only need to exhibit one input where it is positive and one where it is negative. Try simple vectors like \((1,0,0), (0,1,0), (1,1,0), (1,-1,0)\). This is far faster than eigenvalues and it is complete proof.

> ### PYQ [2026 Apr 06, Q4, 3 marks, MCQ]
> **Let \(A = \begin{bmatrix} k & b \\ b & 1 \end{bmatrix}\). Find the condition on \(k\) and \(b\) for which the matrix \(A\) is positive-definite.**
>
> A. \(k > 0\) and \(k < b^2\)
> B. \(k > b^2\)
> C. \(k < 0\) and \(k < b^2\)
> D. \(k < 0\) and \(k > b^2\)
>
> **Answer: B**
>
> **Apply Trick 4.4 symbolically.** First leading minor is \(k\), so we need \(k > 0\). Second leading minor is the determinant, \(k \times 1 - b \times b = k - b^2\), so we need \(k > b^2\).
>
> Now notice: since \(b^2\) is always non negative, the condition \(k > b^2\) **already implies** \(k > 0\) whenever \(b\) is nonzero, and when \(b = 0\) the condition reads \(k > 0\). So the single condition \(k > b^2\) captures everything. **B.**
>
> Options C and D require \(k\) negative, which contradicts the first minor. Option A requires \(k < b^2\), which makes the determinant negative and gives an indefinite matrix. **B.**

## 4.4 Second order optimality, the bridge to calculus

> ### PYQ [2025 Aug 03, Q2, 2 marks, MCQ]
> **Let \(f : \mathbb{R}^n \to \mathbb{R}\) be a \(n\) times continuously differentiable function. Suppose that \(\nabla f(x^*) = 0\) and the Hessian of \(f\) at \(x^*\) is greater than 0. Note: Hessian greater than 0 means the hessian matrix is positive definite. What can we conclude about \(x^*\)?**
>
> A. \(x^*\) is a local maximum
> B. \(x^*\) is a saddle point
> C. \(x^*\) is a local minimum
> D. Nothing can be concluded
>
> **Answer: C**
>
> **This is the multivariable version of the second derivative test, and here is the intuition that makes it obvious.** In one variable, if the first derivative is zero and the second derivative is positive, the curve is smiling upward at that point, so you are at a local minimum. In many variables, the Hessian being positive definite means the surface curves upward **in every direction** from \(x^*\). A point that is a minimum along every direction is a local minimum. **C.**
>
> **Complete the table in your head, because the examiner can ask any row of it:**
> - Gradient zero and Hessian positive definite gives a **local minimum**.
> - Gradient zero and Hessian negative definite gives a **local maximum**.
> - Gradient zero and Hessian **indefinite** gives a **saddle point**.
> - Gradient zero and Hessian singular, meaning some eigenvalue is zero, gives **no conclusion** from second order information alone.
>
> **This is why definiteness is on the syllabus at all.** It is the tool that classifies critical points, which is the tool that tells you whether gradient descent is converging to something useful. The whole course hangs together at this point.

---

# PART 5: GRADIENT DESCENT

## 5.1 The single most reliable marks in the paper

Gradient descent appears in **all six papers** as a numeric computation worth 3 or 4 marks. The mathematics required is: compute a gradient, then substitute numbers. That is it. There is no cleverness, only care.

The update rule is:

\[ x_{\text{new}} = x_{\text{old}} - \eta \nabla f(x_{\text{old}}) \]

where \(\eta\) is the learning rate. In several papers the learning rate **changes each iteration** according to a formula involving the iteration counter \(t\), and this is where nearly all errors come from.

## 5.2 The procedure that makes this error proof

Do exactly this, every time, on paper, in a table.

1. Write down the two partial derivatives symbolically. Do this first, before touching any numbers.
2. Draw a small table with columns: iteration \(t\), learning rate \(\eta\), current \(x\), current \(y\), gradient at that point, new \(x\), new \(y\).
3. Fill one row at a time. Never do two iterations in your head.
4. Check the indexing of \(t\). **Read whether the paper says \(t = 1, 2, 3\) and so on, or \(t = 0, 1, 2\) and so on.** This one detail changes the answer and it is the trap in three of the six papers.

### The Exam Trick

**Trick 5.1, the sign check.** Gradient descent moves **against** the gradient, so it moves **toward** the minimum. If your first iteration moves the point away from the obvious minimum, you have dropped a minus sign. For example, in \(f = (x-1)^2 + (y-2)^2\), the minimum is obviously at \((1,2)\), so after one step from \((0,0)\) both coordinates should have **increased**.

**Trick 5.2, look at where the answer options cluster.** If three options are near the true minimum and one is wildly off, the wildly off one usually corresponds to a sign error the examiner anticipated. This helps you sanity check but do not rely on it.

**Trick 5.3, for the special learning rate \(\eta = 1\) with a separable quadratic.** If \(f = (x-a)^2 + (y-b)^2\) and \(\eta = 1\), then the update \(x_{\text{new}} = x - 1 \times 2(x-a) = 2a - x\), which is the **reflection** of \(x\) about \(a\). Reflecting twice returns you to the start. Recognising this saves time in Aug 2025 Q7.

## 5.3 Every gradient descent question, worked

> ### PYQ [2024 Aug 04, Q15, 3 marks, SA]
> **Consider a function \(f(x,y) = (x-1)^2 + (y-2)^2\). Using a gradient descent algorithm, with an initial guess of \((0, 0)\) and learning rate of 0.1, what will be the absolute difference between the value of the function after first and second iteration? Enter the answer correct to three decimal places.**
>
> **Answer: 1.149 to 1.155**
>
> **Gradients.** Partial with respect to \(x\) is \(2(x-1)\). Partial with respect to \(y\) is \(2(y-2)\).
>
> **Start.** \((x_0, y_0) = (0, 0)\), and \(f(0,0) = 1+4 = 5\).
>
> **Iteration 1.** Gradient at \((0,0)\) is \((2(0-1), 2(0-2)) = (-2, -4)\).
> \(x_1 = 0 - 0.1(-2) = \mathbf{0.2}\).
> \(y_1 = 0 - 0.1(-4) = \mathbf{0.4}\).
> \(f(0.2, 0.4) = (0.2-1)^2 + (0.4-2)^2 = 0.64+2.56 = \mathbf{3.2}\).
>
> **Iteration 2.** Gradient at \((0.2, 0.4)\) is \((2(0.2-1), 2(0.4-2)) = (-1.6, -3.2)\).
> \(x_2 = 0.2 + 0.16 = \mathbf{0.36}\).
> \(y_2 = 0.4 + 0.32 = \mathbf{0.72}\).
> \(f(0.36, 0.72) = (0.36-1)^2 + (0.72-2)^2 = 0.4096+1.6384 = \mathbf{2.048}\).
>
> **Absolute difference:** \(3.2 - 2.048 = \mathbf{1.152}\). Inside the accepted range. Verified numerically.
>
> **Read the question carefully:** it asks for the difference between the function values after the **first and second** iterations, not between the initial and first. Students who answer \(5 - 3.2 = 1.8\) have read too fast. **This misreading is the entire point of the question.**

> ### PYQ [2024 Dec 01, Q7, 3 marks, MCQ]
> **Consider a function \(f(x, y) = 3x^2 - 6xy + y^2 + 4\). Using gradient descent algorithm, with an initial guess of \((1, 2)\) and learning rate of \(1/t^2\), where \(t = 1, 2, 3\), and so on. What will be the value of \((x, y)\) after two iterations?**
>
> A. \(x = 7, y = 4\)
> B. \(x = 2.5, y = 12.5\)
> C. \(x = 4, y = 6\)
> D. \(x = 3.5, y = 10\)
>
> **Answer: B**
>
> **Gradients.** Partial with respect to \(x\) is \(6x - 6y\). Partial with respect to \(y\) is \(-6x + 2y\).
>
> **Iteration 1, with \(t=1\) so \(\eta = 1/1^2 = 1\).**
> Gradient at \((1, 2)\): \((6-12, -6+4) = \mathbf{(-6, -2)}\).
> \(x_1 = 1 - 1(-6) = \mathbf{7}\).
> \(y_1 = 2 - 1(-2) = \mathbf{4}\).
>
> Notice that \((7, 4)\) is option A. **This is the trap for anyone who stops after one iteration.** The examiner always includes the after-one-iteration answer as a distractor. Do not fall for it.
>
> **Iteration 2, with \(t=2\) so \(\eta = 1/4 = 0.25\).**
> Gradient at \((7, 4)\): \((42-24, -42+8) = \mathbf{(18, -34)}\).
> \(x_2 = 7 - 0.25 \times 18 = 7-4.5 = \mathbf{2.5}\).
> \(y_2 = 4 - 0.25 \times (-34) = 4+8.5 = \mathbf{12.5}\).
>
> **\((2.5, 12.5)\), which is B.** Verified numerically.

> ### PYQ [2024 Mar 24, Q13, 3 marks, MCQ]
> **Consider a function \(f(x, y) = x^2 - 4x + 2y + 1\). Using gradient descent algorithm, with an initial guess of \((3, 2)\) and learning rate of \(1/(t+1)\), where \(t = 1, 2, 3\), and so on. What will be the value of \((x, y)\) after two iterations?**
>
> A. \(x = 0.5, y = 0\)
> B. \(x = 2.512, y = 1.612\)
> C. \(x = 0, y = 0\)
> D. \(x = 2, y = 0.33\)
>
> **Answer: D**
>
> **Gradients.** Partial with respect to \(x\) is \(2x-4\). Partial with respect to \(y\) is **2**, a constant. Note that this function has no minimum in \(y\), it decreases forever, which is fine, gradient descent still runs.
>
> **Iteration 1, \(t=1\) so \(\eta = 1/2\).**
> Gradient at \((3, 2)\): \((2\times3-4, 2) = \mathbf{(2, 2)}\).
> \(x_1 = 3 - 0.5\times2 = \mathbf{2}\).
> \(y_1 = 2 - 0.5\times2 = \mathbf{1}\).
>
> **Iteration 2, \(t=2\) so \(\eta = 1/3\).**
> Gradient at \((2, 1)\): \((2\times2-4, 2) = \mathbf{(0, 2)}\).
> \(x_2 = 2 - 0 = \mathbf{2}\).
> \(y_2 = 1 - \frac13\times2 = 1-0.667 = \mathbf{0.333}\).
>
> **\((2, 0.33)\), which is D.** Verified numerically.
>
> **Note the elegance:** \(x\) reached its optimum of 2 after the first step, so the \(x\) gradient became zero and \(x\) stopped moving. That is what convergence looks like. Recognising this let you skip half the second iteration.

> ### PYQ [2025 Mar 16, Q9, 3 marks, SA]
> **For the function \(f(x,y) = x^2 + 3y^2 - 4xy + 5\), using the initial values \(x_0 = 2\) and \(y_0 = 3\), perform one iteration of gradient descent with a learning rate of 0.1. What is the value of \(f(x,y)\) after this iteration? Enter the answer correct to two decimal places.**
>
> **Answer: 2.41 to 2.47**
>
> **Gradients.** Partial with respect to \(x\) is \(2x - 4y\). Partial with respect to \(y\) is \(6y - 4x\).
>
> **One iteration, \(\eta = 0.1\).**
> Gradient at \((2, 3)\): \((4-12, 18-8) = \mathbf{(-8, 10)}\).
> \(x_1 = 2 - 0.1(-8) = 2+0.8 = \mathbf{2.8}\).
> \(y_1 = 3 - 0.1\times10 = 3-1 = \mathbf{2}\).
>
> **Evaluate \(f\) at \((2.8, 2)\).** \(2.8^2 = 7.84\). Three times \(2^2\) equals 12. Minus four times \(2.8 \times 2\) equals \(-22.4\). Plus 5.
> Total: \(7.84+12-22.4+5 = \mathbf{2.44}\). Verified numerically.
>
> **Read carefully: the question asks for the value of \(f\), not for the value of \((x,y)\).** Another comprehension trap. Always underline what is being asked before you compute.

> ### PYQ [2025 Aug 03, Q7, 3 marks, MCQ]
> **Consider the function \(f(x, y) = (x-1)^2 + (y+2)^2\). Using the gradient descent algorithm with an initial guess \((x_0, y_0) = (3, -1)\) and learning rate \(\eta_t = 1/(t+1)\), where \(t = 0, 1, 2\), and so on, what will be the value of \((x, y)\) after two iterations?**
>
> A. \(x = 1, y = -2\)
> B. \(x = 2, y = -2\)
> C. \(x = 1.5, y = -2.5\)
> D. \(x = 1.625, y = -2.375\)
>
> **Answer: A**
>
> **Critical detail: here \(t\) starts at 0, not 1.** So the first iteration uses \(\eta = 1/(0+1) = \mathbf{1}\), not one half. If you assume \(t\) starts at 1 you will get a different and wrong answer. **This is the trap.**
>
> **Gradients.** Partial with respect to \(x\) is \(2(x-1)\). Partial with respect to \(y\) is \(2(y+2)\).
>
> **Iteration 1, \(t=0\) so \(\eta=1\).**
> Gradient at \((3, -1)\): \((2\times2, 2\times1) = \mathbf{(4, 2)}\).
> \(x_1 = 3-4 = \mathbf{-1}\).
> \(y_1 = -1-2 = \mathbf{-3}\).
>
> Note the reflection predicted by Trick 5.3: \(x\) reflected about 1, going from 3 to \(-1\). \(y\) reflected about \(-2\), going from \(-1\) to \(-3\). The step overshot the minimum entirely, which is exactly what a learning rate of 1 does on this function.
>
> **Iteration 2, \(t=1\) so \(\eta=1/2\).**
> Gradient at \((-1, -3)\): \((2\times(-2), 2\times(-1)) = \mathbf{(-4, -2)}\).
> \(x_2 = -1 - 0.5(-4) = -1+2 = \mathbf{1}\).
> \(y_2 = -3 - 0.5(-2) = -3+1 = \mathbf{-2}\).
>
> **\((1, -2)\), which is A, and note that this is exactly the true minimum.** The decreasing learning rate landed perfectly. Verified numerically.

> ### PYQ [2026 Apr 06, Q11, 4 marks, SA]
> **A function \(f(x) = x^2 - 6x + 5\) is minimized using the gradient descent algorithm. Let \(x^*\) denote the value of \(x\) at which \(f(x)\) is minimized. Starting from the initial point \(x_0 = 4\), one iteration of gradient descent is performed with a learning rate of \(\eta = 0.1\). If \(x_1\) denotes the point obtained after this iteration, find the value of \(|x_1 - x^*|\). Enter the answer correct to one decimal place.**
>
> **Answer: 0.7 to 0.9**
>
> **Step one, find the true minimum.** \(f'(x) = 2x-6 = 0\) gives \(x^* = \mathbf{3}\).
>
> **Step two, one gradient descent iteration.** \(f'(4) = 8-6 = \mathbf{2}\).
> \(x_1 = 4 - 0.1\times2 = \mathbf{3.8}\).
>
> **Step three.** \(|3.8 - 3| = \mathbf{0.8}\). Verified numerically.
>
> **This question is testing whether you know that the analytic minimum and the gradient descent iterate are different things.** Many students compute \(x_1\) and stop, or compute \(x^*\) and stop. Read the target expression.

## 5.4 The conceptual gradient descent questions

> ### PYQ [2024 Aug 04, Q14, 2 marks, MCQ]
> **Which of the following statements about choosing the learning rate in gradient descent is incorrect?**
>
> A. A small learning rate can lead to slow convergence.
> B. A large learning rate can cause the loss function to fluctuate around the minimum.
> C. A large learning rate can cause divergence.
> D. A small learning rate always causes the training to progress very quickly.
>
> **Answer: D**
>
> **Note the word "incorrect" in the question.** You are hunting the false statement, not the true one. Underline it.
>
> A, B and C are the standard and correct facts about learning rates: too small and you crawl, too large and you oscillate or blow up. D asserts the opposite of A and contains the word "always", which is a strong universal claim. **D is the false statement, hence the answer.**
>
> **Trick 5.4:** in a "which is incorrect" question, the answer very often contains an absolute word such as always, never, must, or cannot. Scan for those words first.

> ### PYQ [2026 Apr 06, Q8, 4 marks, MSQ]
> **Consider a function \(f : \mathbb{R} \to \mathbb{R}\) whose graph is shown below. \(x=a\) and \(x=b\) correspond to local minima of \(f\). We run two separate instances of gradient descent with the same learning rate \(\eta\) but different initial points. (1) Starting from the point \(x_0 = a - \delta\). (2) Starting from the point \(x_0 = b + \delta\). Assume that \(\delta\) and \(\eta\) are very small positive quantities. Which of the following is/are true if we run gradient descent for a large number of iterations?**
>
> **(The figure shows a W shaped curve with a shallow local minimum at \(a\), a bump between, and a deeper local minimum at \(b\).)**
>
> A. Instance (1) will converge to the point \(x = a\)
> B. Instance (2) will converge to the point \(x = b\)
> C. Both instances (1) and (2) will converge to \(x = a\)
> D. Both instances (1) and (2) will converge to \(x = b\)
> E. Instance (1) will not converge to \(x = a\), but will diverge to negative infinity
> F. Instance (2) will not converge to \(x = b\), but will diverge to infinity
>
> **Answers: A and B**
>
> **This is the most conceptually important gradient descent question in the six papers, and it tests one idea: gradient descent is a local method.**
>
> Starting at \(a - \delta\), you are a hair to the left of the local minimum \(a\). The function is decreasing to the right there, meaning the derivative is negative, so gradient descent steps to the right, toward \(a\). With \(\eta\) very small, each step is tiny and you never jump out of the valley containing \(a\). **You converge to \(a\).** Option A true.
>
> Starting at \(b + \delta\), you are a hair to the right of \(b\). The derivative there is positive, so gradient descent steps left, toward \(b\), and again you stay in \(b\)'s valley. **You converge to \(b\).** Option B true.
>
> C and D are false because the two instances converge to **different** points, which is the entire lesson: **gradient descent finds a local minimum determined by where you started, not the global minimum.** E and F are false because with a small learning rate on a function that curves upward at the far ends, nothing diverges.
>
> **The idea in one sentence, and remember this sentence:** gradient descent falls into whichever basin of attraction it starts in. This is why initialisation matters in machine learning, and it is why practitioners run training multiple times from different starting points.

---

# PART 6: EIGENVALUES, DIAGONALISATION, AND SCHUR

## 6.1 The core facts, compressed

Given a square matrix \(A\), a nonzero vector \(v\) is an **eigenvector** with **eigenvalue** \(\lambda\) if \(Av = \lambda v\). The eigenvalues are the roots of \(\det(A - \lambda I) = 0\).

You will almost never need to expand a characteristic polynomial in this exam, because of these four facts.

**Fact 1: the sum of the eigenvalues equals the trace.** Add the diagonal entries.

**Fact 2: the product of the eigenvalues equals the determinant.**

**Fact 3: the eigenvalues of a triangular matrix are its diagonal entries.** No work at all.

**Fact 4: for a two by two matrix, \(\lambda^2 - (\text{trace})\lambda + (\text{determinant}) = 0\).** This is the only characteristic polynomial you should ever write down.

Additional facts the exam uses:

- **\(A\) is diagonalisable** if it has a full set of linearly independent eigenvectors. Distinct eigenvalues guarantee this. Hermitian and unitary matrices are always diagonalisable.
- **Eigenvalues of \(A\) raised to a power \(k\) are the eigenvalues of \(A\) raised to that power.** So the eigenvalues of \(A^2\) are the squares of the eigenvalues of \(A\).
- **Eigenvalues of \(cA\) are \(c\) times the eigenvalues of \(A\).** Hence \(\det(cA) = c^n \det(A)\) for an \(n \times n\) matrix, which is exactly what Apr26 Q2 asks.
- **\(A\) is invertible if and only if no eigenvalue is zero, equivalently the determinant is nonzero.**

### The Exam Tricks

**Trick 6.1, the trace filter.** Given four options each listing a set of eigenvalues, sum each set and compare to the trace. In Dec24 Q4 this single test isolates the answer.

**Trick 6.2, plug in rather than solve.** To verify a claimed eigenvector, just multiply the matrix by it and see if the result is a scalar multiple. Far faster than solving for eigenvectors from scratch.

**Trick 6.3, triangular means read the diagonal.** If the matrix has zeros below or above the diagonal, you have the eigenvalues instantly.

> ### PYQ [2024 Dec 01, Q4, 3 marks, MCQ]
> **Consider the following matrix: \(A = \begin{bmatrix} 2 & -i & i \\ i & 2 & -i \\ -i & i & 2 \end{bmatrix}\). Diagonalize it as \(A = Q\Lambda Q^T\), then \(\Lambda\) is given by**
>
> A. \(\text{diag}(3, 3+\sqrt2, 3-\sqrt2)\)
> B. \(\text{diag}(2, 2+\sqrt3, 2-\sqrt3)\)
> C. \(\text{diag}(3, 2+\sqrt3, 2-\sqrt3)\)
> D. The given matrix is not diagonalizable.
>
> **Answer: B**
>
> **Trick 6.1 solves this in ten seconds.** The trace of \(A\) is \(2+2+2 = \mathbf{6}\). Now sum each option:
> A: \(3 + (3+\sqrt2) + (3-\sqrt2) = \mathbf{9}\). Rejected.
> B: \(2 + (2+\sqrt3) + (2-\sqrt3) = \mathbf{6}\). Matches.
> C: \(3 + (2+\sqrt3) + (2-\sqrt3) = \mathbf{7}\). Rejected.
> D: \(A\) is Hermitian (diagonal real, and \((1,2)\) equals \(-i\) while \((2,1)\) equals \(i\), conjugates; check the rest similarly), so it is definitely diagonalisable. Rejected by Trick 3.3.
>
> **B, without computing a single eigenvalue.** I verified numerically that the eigenvalues are \(2, 2+\sqrt3 \approx 3.73\), and \(2-\sqrt3 \approx 0.27\).
>
> **This is the highest leverage trick in the entire document. Trace matching. Use it whenever eigenvalues are offered as options.**

> ### PYQ [2025 Mar 16, Q3, 3 marks, MCQ]
> **Consider the Hermitian matrix \(A = \begin{bmatrix} 3 & i \\ -i & 5 \end{bmatrix}\). Which of the following are the eigenvalues of A?**
>
> A. 3 and 5
> B. \(4+\sqrt2\) and \(4-\sqrt2\)
> C. \(4+i\) and \(4-i\)
> D. 2 and 6
>
> **Answer: B**
>
> **Trace is 8. Determinant is \(3 \times 5 - (i)(-i) = 15-1=14\).**
>
> Check the options against both:
> A: sum 8, correct trace. Product 15, but we need 14. Rejected.
> B: sum 8, correct. Product is \(16-2=14\), correct. **Accepted.**
> C: sum 8, correct. Product is \(16+1=17\). Rejected. Also \(A\) is Hermitian so eigenvalues must be real, killing C on sight.
> D: sum 8, correct. Product 12. Rejected.
>
> **B.** Notice that all four options had the correct trace, which is the examiner deliberately disabling Trick 6.1 and forcing you to use Trick 6.5, the determinant. **When trace fails to discriminate, go to determinant.** Between the two you almost never need the actual quadratic formula.
>
> **The direct route, for completeness:** \(\lambda^2 - 8\lambda + 14 = 0\) gives \(\lambda = \frac{8 \pm \sqrt{64-56}}{2} = \frac{8 \pm 2\sqrt2}{2} = 4 \pm \sqrt2\).

> ### PYQ [2024 Dec 01, Q5, 3 marks, MCQ]
> **Suppose \(A = \begin{bmatrix} 1+i & 2 \\ 0 & 3+i \end{bmatrix}\). Then, which of the following options represent the eigenvectors of A?**
>
> A. \((1, 0)\) and \((1, 1)\)
> B. \((0, -i)\) and \((i, i)\)
> C. \((1, 1)\) and \((-1, -1)\)
> D. \((-1, -1)\) and \((-i, -i)\)
>
> **Answer: A**
>
> **Step one, Trick 6.3.** \(A\) is upper triangular, so the eigenvalues are the diagonal entries: \(1+i\) and \(3+i\). No characteristic polynomial.
>
> **Step two, Trick 6.2, test the options.** Options C and D each offer two vectors that are scalar multiples of each other, so they span only a one dimensional space and cannot be a full eigenbasis for a matrix with two distinct eigenvalues. **Dead immediately, no computation.**
>
> Between A and B, test option A. Apply \(A\) to \((1, 0)\): first component is \((1+i)(1) + 2(0) = 1+i\), second component is 0. So \(A(1,0) = (1+i)(1,0)\). **Confirmed eigenvector for eigenvalue \(1+i\).**
> Apply \(A\) to \((1, 1)\): first component is \((1+i)+2=3+i\), second is \((3+i)(1)=3+i\). So \(A(1,1) = (3+i)(1,1)\). **Confirmed eigenvector for eigenvalue \(3+i\).**
>
> **A.** Both verified in seconds by direct substitution.

> ### PYQ [2024 Dec 01, Q15, 2 marks, MSQ]
> **Which of the following statements is true about the given matrix \(M = \begin{bmatrix} 2 & 4 \\ 1 & 2 \end{bmatrix}\)?**
>
> A. \(M\) is an invertible matrix.
> B. \(M\) is a singular matrix.
> C. The determinant of \(M\) is 4.
> D. \(M\) is diagonalizable.
>
> **Answers: B and D**
>
> **Determinant equals \(2 \times 2 - 4 \times 1 = 4-4=0\).** So the determinant is 0, not 4, killing C, and the matrix is **singular**, so B is true and A is false.
>
> **Is it diagonalisable?** Trace is 4, determinant is 0, so the eigenvalues are **4 and 0**, which are distinct. **Distinct eigenvalues always imply diagonalisability.** So D is true.
>
> **Trick 6.4, singular does not mean non diagonalisable.** These are completely unrelated properties, and the examiner is testing exactly that confusion. The zero matrix is singular and perfectly diagonalisable. A matrix fails to be diagonalisable only when an eigenvalue is repeated and lacks enough independent eigenvectors.

> ### PYQ [2026 Apr 06, Q2, 2 marks, MCQ]
> **If \(A\) is a 3 by 3 matrix with eigenvalues 2, 3 and 5, what is \(\det(2A)\)? Note: det denotes the determinant.**
>
> A. 240
> B. 60
> C. 90
> D. 80
>
> **Answer: A**
>
> **The rule: for an \(n \times n\) matrix, \(\det(cA) = c^n \det(A)\).** Here \(n=3\) and \(c=2\), so the factor is \(2^3 = 8\).
>
> \(\det(A)\) equals the product of the eigenvalues equals \(2 \times 3 \times 5 = \mathbf{30}\).
> \(\det(2A) = 8 \times 30 = \mathbf{240}\). **A.**
>
> **Why the factor is \(c^n\), and this makes it unforgettable:** multiplying \(A\) by \(c\) multiplies **every row** by \(c\), and each row scaling multiplies the determinant by \(c\). Three rows, three factors of 2, so 8.
>
> Option B, 60, is the answer you get if you wrongly use \(\det(2A) = 2\det(A)\). That is the trap and it catches most students. **The scalar comes out once per row, not once per matrix.**

## 6.2 Schur's theorem

**Schur's theorem states: every square matrix is unitarily similar to an upper triangular matrix.** That is, for any square \(A\) there exists a unitary \(U\) with \(U^*AU\) equal to an upper triangular matrix \(T\). The diagonal entries of \(T\) are the eigenvalues of \(A\).

Why does anyone care? Because diagonalisation can fail, but Schur triangularisation **never** fails. It is the universal fallback. And because triangular matrices are computationally easy, this is the theoretical basis of practical eigenvalue algorithms.

> ### PYQ [2025 Mar 16, Q7, 3 marks, MSQ]
> **Which of the following statements is/are True regarding Schur's Theorem?**
>
> A. Every square matrix is unitarily similar to an upper triangular matrix.
> B. The diagonal entries of the Schur form of a matrix are its eigenvalues.
> C. A square matrix with repeated eigenvalues cannot always be unitarily similar to an upper triangular matrix.
> D. Schur's Theorem holds only for square matrices, as it requires unitary similarity and the presence of eigenvalues.
>
> **Answers: A, B, D**
>
> A is the literal statement of the theorem. **True.**
>
> B is true because similar matrices share eigenvalues, and the eigenvalues of a triangular matrix are its diagonal entries.
>
> **C is false, and it is the whole point of the theorem.** Schur's theorem has **no hypotheses** beyond squareness. Repeated eigenvalues, defective matrices, none of it matters. The word "cannot always" is what makes C false. Contrast this with diagonalisation, which genuinely can fail for repeated eigenvalues. **The examiner is checking that you have not confused Schur with diagonalisation.**
>
> D is true: similarity transformations only make sense for square matrices, and non square matrices have no eigenvalues at all.

> ### PYQ [2025 Mar 16, Q4, 3 marks, MCQ]
> **Consider the complex matrix: \(A = \begin{bmatrix} 1 & 2+i \\ 0 & 3 \end{bmatrix}\). Using Schur's theorem, which of the following is the correct upper triangular form of A after a similarity transformation?**
>
> A. \(\begin{bmatrix} 1 & 2+i \\ 0 & 3 \end{bmatrix}\)
> B. \(\begin{bmatrix} 3 & 0 \\ 0 & 1 \end{bmatrix}\)
> C. \(\begin{bmatrix} 1 & 0 \\ 2+i & 3 \end{bmatrix}\)
> D. \(\begin{bmatrix} 1 & x \\ 0 & 3 \end{bmatrix}\), for some complex \(x\)
>
> **Answer: D**
>
> **Reasoning.** A Schur form must be upper triangular with the **eigenvalues on the diagonal**. The eigenvalues of \(A\), being triangular already, are 1 and 3.
>
> Option C is **lower** triangular, so it is not a Schur form at all. Rejected.
> Option B is diagonal with entries 3 and 1, which would mean \(A\) is diagonalisable by a unitary matrix, which is only true for normal matrices. \(A\) here is not normal, so B is wrong.
> Option A is the matrix itself, which is indeed already a valid Schur form (take \(U\) equal to the identity).
> **Option D is the general statement**: upper triangular, eigenvalues 1 and 3 on the diagonal, with an unspecified complex entry above. This covers option A as a special case and correctly reflects that the off diagonal entry depends on the choice of unitary \(U\).
>
> **D is keyed as the answer, and the reasoning is Trick 3.11: the general statement beats the special case.** The examiner wants you to recognise that the Schur form is not unique, and that only the diagonal is pinned down.

> ### PYQ [2024 Aug 04, Q8, 4 marks, MSQ]
> **Which of the following options is/are true?**
>
> A. Any matrix of order \(n \times m\) is similar to an upper triangular matrix.
> B. If a matrix \(A\) is not symmetric, then \(A^TA\) can not be a symmetric matrix.
> C. If \(A\) is a positive definite matrix then \(A^2 + I\) positive definite.
> D. For any matrix \(A\), \(A^TA\) is orthogonally diagonalizable.
>
> **Answers: C and D**
>
> **A is false.** Similarity requires square matrices, and the option says \(n \times m\), deliberately implying a rectangular shape. Schur's theorem needs squareness. **The word "\(n \times m\)" is the trap.**
>
> **B is false, and it is false in the strongest possible way.** \(A^TA\) is **always** symmetric, for every matrix \(A\), symmetric or not. Proof in one line: \((A^TA)^T = A^T(A^T)^T = A^TA\). **Memorise this identity, it appears in four of the six papers.**
>
> **C is true.** If \(A\) is positive definite with eigenvalues \(\lambda_i\) all positive, then \(A^2 + I\) has eigenvalues \(\lambda_i^2 + 1\), and squares are non negative so \(\lambda^2+1\) is at least 1, strictly positive. Also \(A^2 + I\) is symmetric. **Positive definite.**
>
> **D is true.** \(A^TA\) is real symmetric, and the spectral theorem says every real symmetric matrix is orthogonally diagonalisable. Always, no conditions.
>
> **This question is a pure theory question and it is worth 4 marks. Four marks for knowing that \(A^TA\) is symmetric and PSD. Learn these two facts.**

> ### PYQ [2026 Apr 06, Q6, 3 marks, MSQ]
> **If \(A\) is a real matrix of shape \(m \times n\), which of the following is/are true?**
>
> A. \(A^TA\) is a positive semi-definite matrix.
> B. \(AA^T\) is a positive semi-definite matrix.
> C. \(A^TA\) is positive semi-definite if and only if \(A\) is a symmetric matrix.
> D. \(AA^T\) is positive semi-definite if and only if \(A\) is a square matrix.
> E. \(A^TA = AA^T\)
>
> **Answers: A and B**
>
> **The proof of A, and it is two lines, and you should be able to reproduce it.** For any vector \(x\), consider \(x^T(A^TA)x\). Regroup as \((Ax)^T(Ax)\), which is the squared length of the vector \(Ax\). A squared length is never negative. Therefore \(x^T(A^TA)x \geq 0\) for all \(x\), which is exactly the definition of positive semi definite. **Done.**
>
> The same argument with \(A^T\) in place of \(A\) proves B.
>
> **C and D are false** because they attach unnecessary conditions. The result holds for **every** real matrix, with no hypothesis on shape or symmetry. The phrase "if and only if" is doing the damage.
>
> **E is false** in general. \(A^TA\) is \(n \times n\) and \(AA^T\) is \(m \times m\), so unless \(m = n\) they are not even the same size, and even for square \(A\) they differ unless \(A\) is normal.
>
> **Trick 6.6, the "if and only if" alarm.** In these theory MSQs, options that add an "if and only if" condition to a theorem that actually holds universally are wrong. The examiner uses this pattern in Aug24 Q8, Apr26 Q6, and Mar25 Q7.

## 6.3 Rank and singular values

> ### PYQ [2026 Apr 06, Q9, 3 marks, SA]
> **\(A\) is a real matrix of shape 10 by 7 with the following singular values: 5, 3, 1, 0, 0, 0, 0. Find the rank of A.**
>
> **Answer: 3**
>
> **The rule: the rank of a matrix equals the number of its non zero singular values.** Here the non zero ones are 5, 3, and 1. That is **3**.
>
> **Why this is true, in one sentence.** In the SVD, \(A = Q_1 \Sigma Q_2^T\) with \(Q_1\) and \(Q_2\) invertible, and multiplying by invertible matrices does not change rank, so the rank of \(A\) equals the rank of \(\Sigma\), which is just the count of its nonzero diagonal entries.
>
> **Sanity check on the count of singular values:** \(A\) is 10 by 7, so it has \(\min(10,7) = 7\) singular values, and the question lists exactly 7. Good, the question is consistent. **Always do this count, because a mismatch would signal a misread.**

> ### PYQ [2026 Apr 06, Q10, 3 marks, SA]
> **Consider the matrix \(A = \begin{bmatrix} 0 & 1 & 0 \\ 1 & 0 & 0 \end{bmatrix}\). Find the sum of all the singular values of A.**
>
> **Answer: 2**
>
> **Compute \(AA^T\).** Row one is \((0,1,0)\) and row two is \((1,0,0)\). Row one dotted with itself is 1. Row one dotted with row two is 0. Row two with itself is 1. So \(AA^T\) equals the identity.
>
> Eigenvalues are 1 and 1, so singular values are 1 and 1, and the sum is **2**.
>
> **Even faster:** \(A\) is a permutation-like matrix, it takes a standard basis vector to another standard basis vector, so it preserves lengths on the space it does not kill. Any such map has all singular values equal to 1. Recognise the structure and the arithmetic vanishes.

> ### PYQ [2025 Mar 16, Q8, 3 marks, MSQ]
> **Let \(A\) be an \(n \times n\) positive definite matrix with singular values \(\sigma_1, \sigma_2\), up to \(\sigma_n\). Which of the following is true?**
>
> A. \(\sigma_i \geq 0\) for all \(i\).
> B. \(A\) has at least one zero singular value.
> C. The eigenvalues of \(A\) must be negative.
> D. If \(\sigma_i = 0\) for all \(i\), then \(A\) is the zero matrix
>
> **Answers: A and D**
>
> **A is true, and in fact it is true for every matrix whatsoever**, since singular values are by definition non negative square roots. Note the option says "greater than or equal to", which is weaker than what is true here (for a positive definite matrix they are strictly positive), but a weaker true statement is still true. **Do not reject an option for being weaker than necessary.**
>
> **B is false.** A positive definite matrix is invertible, so it has no zero singular values.
>
> **C is false.** Positive definite means the eigenvalues are positive, which is the exact opposite.
>
> **D is true.** If all singular values are zero then \(\Sigma\) is the zero matrix, so \(A = Q_1 \times 0 \times Q_2^T = 0\).
>
> **Trick 6.7:** in MSQs, an option can be true without being tight. "\(\sigma \geq 0\)" is true even when the sharp statement is "\(\sigma > 0\)". Students reject these and lose marks. Ask "is this statement true", not "is this statement the best description".

---

# PART 7: TAYLOR SERIES AND LOCAL APPROXIMATION

## 7.1 The idea

A Taylor series replaces a complicated function near a point by a polynomial that matches its value, its slope, its curvature, and so on. Around the point \(a\), the expansion is

\[ f(x) \approx f(a) + f'(a)(x-a) + \frac{f''(a)}{2!}(x-a)^2 + \frac{f'''(a)}{3!}(x-a)^3 + \cdots \]

For machine learning this is not decoration. It is the justification for gradient descent, which uses the first order term, and for Newton's method, which uses the second order term.

### The Exam Tricks

**Trick 7.1, the two standard series you should simply know.**
- \(\frac{1}{1-x} = 1 + x + x^2 + x^3 + \cdots\). This is the geometric series and it is the most commonly asked.
- \(\frac{1}{1+x} = 1 - x + x^2 - x^3 + \cdots\). Alternating signs.

**Trick 7.2, the "check the constant term" filter.** Evaluate the proposed series at \(x = a\), where every term with \((x-a)\) vanishes. The result must equal \(f(a)\). This one substitution kills most wrong options.

**Trick 7.3, the "check the linear term" filter.** The coefficient of \((x-a)\) must equal \(f'(a)\). Compute one derivative and compare. Between Tricks 7.2 and 7.3 you resolve virtually every Taylor question in this exam.

**Trick 7.4, check the expansion point.** If the question says "around \(x=1\)", every term must involve \((x-1)\), not \((x+1)\) and not plain \(x\). An option using the wrong shift is free elimination.

> ### PYQ [2025 Mar 16, Q2, 3 marks, MCQ]
> **Which of the following represents the Taylor's series expansions up to the fourth degree term of \(f(x) = 1/x\) around \(x = 1\)?**
>
> A. \(1 + (x-1) - (x-1)^2 + (x-1)^3 - (x-1)^4\)
> B. \(1 - (x+1) + (x+1)^2 - (x+1)^3 + (x+1)^4\)
> C. \(1 - (x-1) + (x-1)^2 - (x-1)^3 + (x-1)^4\)
> D. \(1 + (x-1) + (x-1)^2 + (x-1)^3 + (x-1)^4\)
>
> **Answer: C**
>
> **Trick 7.4 first:** option B expands in powers of \((x+1)\), which corresponds to expanding around \(x=-1\), not \(x=1\). **Dead.**
>
> **Trick 7.3 next:** \(f(x) = 1/x\), so \(f'(x) = -1/x^2\), and \(f'(1) = \mathbf{-1}\). The coefficient of \((x-1)\) must therefore be \(-1\). Options A and D have \(+1\). **Both dead.**
>
> **Only C remains, and it is the answer.**
>
> **Full derivation for your understanding.** Substitute \(u = x-1\), so \(x = 1+u\) and \(1/x = 1/(1+u)\). By Trick 7.1, \(1/(1+u) = 1 - u + u^2 - u^3 + u^4\). Substituting back gives exactly option C. **This substitution technique is worth practising, it converts every "around \(x=a\)" question into a standard series.**

> ### PYQ [2026 Apr 06, Q5, 3 marks, MCQ]
> **Which of the following represents the Taylor series expansion up to the third degree term of \(f(x) = 1/(1-x)\) around \(x = 0\)?**
>
> A. \(1 + x + x^2 + x^3\)
> B. \(1 - x + x^2 - x^3\)
> C. \(1 - x - x^2 - x^3\)
> D. \(x + x^2 + x^3 + x^4\)
>
> **Answer: A**
>
> **This is the geometric series verbatim.** \(1/(1-x) = 1+x+x^2+x^3\). **A.**
>
> **If you have forgotten it, rebuild in ten seconds.** \(f(0) = 1\), so the constant is 1, killing D which has no constant term. \(f'(x) = 1/(1-x)^2\), so \(f'(0) = \mathbf{+1}\), killing B and C which both have \(-x\). **A.**

## 7.2 Second order approximation, the numeric version

Two papers ask a numerically flavoured version of the same idea. The formula is:

\[ f(a+h) \approx f(a) + f'(a)h + \frac12 f''(a)h^2 \]

> ### PYQ [2024 Aug 04, Q16, 3 marks, SA]
> **The value of a function at point 25 is 5. The values of the function's first and second order derivatives at this point are 0.1 and -0.002 respectively. What will be the function's approximate value at the point 25.1? Enter the answer correct up to three decimal places.**
>
> **Answer: 5.006 to 5.012**
>
> **Identify the pieces.** \(a=25\), \(f(a)=5\), \(f'(a)=0.1\), \(f''(a)=-0.002\), and \(h = 25.1-25 = \mathbf{0.1}\).
>
> **Substitute.**
> First term: 5.
> Second term: \(0.1 \times 0.1 = \mathbf{0.01}\).
> Third term: \(\frac12(-0.002)(0.1)^2 = -0.001 \times 0.01 = \mathbf{-0.00001}\).
>
> Total: \(5+0.01-0.00001 = \mathbf{5.00999}\). Verified numerically. Inside the accepted range.
>
> **Note how tiny the second order term is.** With \(h=0.1\), \(h^2=0.01\), so the curvature contributes almost nothing. That is the general lesson: **for small steps the linear term dominates**, which is precisely why gradient descent, a purely linear method, works at all.

> ### PYQ [2024 Mar 24, Q15, 3 marks, SA]
> **The value of a function at point 5 is 10. The values of the function's first and second order derivatives at this point are 5 and 2 respectively. What will be the function's approximate value at the point 5.1? Enter the answer correct up to two decimal places.**
>
> **Answer: 10.2 to 10.8**
>
> \(a=5\), \(f(a)=10\), \(f'=5\), \(f''=2\), \(h = \mathbf{0.1}\).
>
> \(10 + 5\times0.1 + \frac12\times2\times0.01 = 10+0.5+0.01 = \mathbf{10.51}\). Verified.
>
> **The accepted range 10.2 to 10.8 is wide**, which tells you the examiner accepts the purely first order answer of 10.5 as well. So even if you forget the second order term you score. But include it, since it costs one multiplication.

---

# PART 8: CONSTRAINED OPTIMISATION, THE CLOSEST POINT PROBLEMS

## 8.1 The universal method

Four of the six papers ask a variant of: "find the point on this curve closest to that point". Every one of them yields to the same three step method.

**Step 1. Write the squared distance, not the distance.** Minimising the distance and minimising its square give the same answer, and the square avoids a square root, which makes the derivative vastly cleaner. This one decision is the difference between a thirty second question and a three minute one.

**Step 2. Use the constraint to eliminate one variable.** If the curve is \(y\) equals something in \(x\), substitute so that the squared distance becomes a function of \(x\) alone.

**Step 3. Differentiate, set to zero, solve.**

### The Exam Trick

**Trick 8.1, when the options are given, substitute them.** For a multiple choice closest point question, you can often just compute the distance for each option and pick the smallest. With four options this is four arithmetic evaluations and it is completely reliable. Use it when the algebra looks messy.

**Trick 8.2, check that the candidate lies on the curve.** Some distractors are not even on the given curve. Test each option against the constraint equation first, since this is one substitution and can eliminate options instantly.

> ### PYQ [2024 Dec 01, Q8, 3 marks, MCQ]
> **Find the point on the line defined by \(y = 2x+1\) that is closest to the point \((4, 0)\).**
>
> A. \((3, 7)\)
> B. \((0.4, 1.8)\)
> C. \((0, 0)\)
> D. \((-1, 0)\)
>
> **Answer: B**
>
> **Trick 8.2 first.** Does each option satisfy \(y = 2x+1\)?
> A: \(2(3)+1 = 7\). Yes, it is on the line.
> B: \(2(0.4)+1 = 1.8\). Yes.
> C: \(2(0)+1 = 1\), but the option says \(y=0\). **Not on the line. Dead.**
> D: \(2(-1)+1 = -1\), but the option says 0. **Not on the line. Dead.**
>
> Two options gone with no calculus at all. Now compare distances from \((4, 0)\):
> A: \((3-4)^2+(7-0)^2 = 1+49=50\).
> B: \((0.4-4)^2+(1.8-0)^2 = 12.96+3.24=16.2\).
> **B is closer. Answer B.**
>
> **The full method, for a short answer version of this question.** Minimise \(D(x) = (x-4)^2 + (2x+1)^2\). Differentiate: \(2(x-4) + 4(2x+1) = 2x-8+8x+4 = 10x-4\). Set to zero: \(x = \mathbf{0.4}\), and then \(y=1.8\). Verified numerically.

> ### PYQ [2024 Mar 24, Q14, 3 marks, MCQ]
> **Find the point(s) on the circle \(y^2 = 4+x^2\) closest to the point \((3, 0)\).**
>
> A. \(-1.5, -2.5\)
> B. \(1.5, 2.5\)
> C. \(1.5, -2.5\)
> D. \(-1.5, 2.5\)
>
> **Answer: B**
>
> **Set up.** The squared distance from \((x, y)\) to \((3, 0)\) is \((x-3)^2 + y^2\). Use the constraint to replace \(y^2\) by \(4+x^2\):
>
> \[ D(x) = (x-3)^2 + 4 + x^2 \]
>
> **Differentiate.** \(D'(x) = 2(x-3) + 2x = 4x-6\). Set to zero: \(x = \mathbf{1.5}\).
>
> Then \(y^2 = 4+2.25=6.25\), so \(y = \pm \mathbf{2.5}\).
>
> **Both \((1.5, 2.5)\) and \((1.5, -2.5)\) are equidistant from \((3,0)\) by symmetry**, so strictly both B and C are closest points, which is presumably why the question says "point(s)". The key selects B. Options A and D have \(x=-1.5\), which is on the far side and therefore not closest. Verified numerically that the minimising \(x\) is 1.5.
>
> **Notice how elegant the substitution was.** Because \(y\) appeared only as \(y^2\), and the constraint gave \(y^2\) directly, the substitution required no square roots at all. **Always look for this: if the objective involves only \(y^2\) and the constraint gives \(y^2\), substitute immediately.**

> ### PYQ [2025 Aug 03, Q10, 3 marks, SA]
> **Find the point(s) on the parabola \(y = x^2\) that is closest to the point \((0, 2)\). If \((x, y)\) is the closest point, find the value of \(x^2+y^2\). Give your answer correct to two decimal places.**
>
> **Answer: 3.45 to 4.05**
>
> **Set up.** Squared distance equals \(x^2 + (y-2)^2\), and \(y = x^2\), so
>
> \[ D(x) = x^2 + (x^2-2)^2 \]
>
> **Differentiate.** \(D'(x) = 2x + 2(x^2-2)(2x) = 2x[1+2(x^2-2)] = 2x(2x^2-3)\).
>
> **Set to zero.** Either \(x=0\), or \(x^2 = \mathbf{3/2}\).
>
> **Test both.** At \(x=0\): \(D = 0+4=4\). At \(x^2=1.5\): \(D = 1.5+(1.5-2)^2 = 1.5+0.25 = \mathbf{1.75}\). The second is smaller, so the closest points are at \(x^2 = 1.5\), that is \(x = \pm\sqrt{1.5}\).
>
> **Now compute what is asked.** \(x^2+y^2\), with \(y = x^2 = 1.5\), so \(y^2 = 2.25\).
> \(x^2+y^2 = 1.5+2.25 = \mathbf{3.75}\). Verified numerically.
>
> **Two warnings this question is built around.** First, \(x=0\) is a genuine critical point but it is a **local maximum of closeness**, that is, a farther point, and students who take it lose the marks. **Always test every critical point.** Second, the question does not ask for the point, it asks for \(x^2+y^2\). Read the target.

> ### PYQ [2025 Mar 16, Q10, 3 marks, SA]
> **If the minimum value of the function \(f(x) = e^{x^2-8x+15}\) is \(e^{\alpha}\), then find the value of \(\alpha\).**
>
> **Answer: -1**
>
> **The trick that makes this trivial: the exponential function is strictly increasing.** Therefore \(e^{g(x)}\) is minimised exactly where \(g(x)\) is minimised. You never need to differentiate the exponential.
>
> Minimise \(g(x) = x^2-8x+15\). Either differentiate (\(2x-8=0\) gives \(x=4\)) or complete the square \((x-4)^2 - 1\).
>
> At \(x=4\): \(g(4) = 16-32+15 = \mathbf{-1}\).
>
> So the minimum value of \(f\) is \(e^{-1}\), and \(\alpha = \mathbf{-1}\).
>
> **Trick 8.3, the monotone wrapper rule.** If your objective has the form \(h(g(x))\) with \(h\) strictly increasing, such as an exponential, a logarithm, or a square root of a positive quantity, just optimise \(g\). This appears constantly and it saves a messy chain rule every time.

---

# PART 9: THE COMPLETE ANSWER KEY, ALL SIX PAPERS

Use this for rapid self testing. Cover the right column, attempt the paper, then check.

## 2024 March 24, QDD3, 40 marks

| Q | Type | Marks | Topic | Answer |
| --- | --- | --- | --- | --- |
| 1 | MCQ | 0 | confirmation | A (YES) |
| 2 | MSQ | 3 | Hermitian sums and products | A, B |
| 3 | MSQ | 3 | Hermitian properties of \(\begin{bmatrix}1 & -i \\ i & 1\end{bmatrix}\) | A, C |
| 4 | MSQ | 3 | spectral decomposition | A, B, C |
| 5 | MSQ | 3 | \(A^TA\), eigen | C, D |
| 6 | MSQ | 3 | SVD \(\Sigma\) and \(Q_2\) | B, C |
| 7 | MCQ | 2 | quadratic form to matrix | A |
| 8 | MCQ | 3 | definiteness | E (indefinite) |
| 9 | MCQ | 3 | PCA covariance | A |
| 10 | MCQ | 3 | PCA direction | B |
| 11 | MCQ | 3 | PCA projections | D |
| 12 | MCQ | 2 | definiteness of \(\begin{bmatrix}3 & 2 \\ -2 & -1\end{bmatrix}\) | A |
| 13 | MCQ | 3 | gradient descent | D |
| 14 | MCQ | 3 | closest point on curve | B |
| 15 | SA | 3 | second order approximation | 10.51 |

## 2024 August 04, QDF2, 40 marks

| Q | Type | Marks | Topic | Answer |
| --- | --- | --- | --- | --- |
| 1 | MCQ | 0 | confirmation | A |
| 2 | MCQ | 2 | quadratic form to matrix | C |
| 3 | MCQ | 2 | definiteness | B (negative definite) |
| 4 | MSQ | 4 | Hermitian 4 by 4 | A, B, C |
| 5 | MCQ | 2 | SVD \(Q_1\) | B |
| 6 | MCQ | 2 | SVD \(Q_2\) | A |
| 7 | MCQ | 1 | SVD \(\Sigma\) | D |
| 8 | MSQ | 4 | theory statements | C, D |
| 9 | MSQ | 4 | unitary matrix | A, C, D |
| 10 | MCQ | 2 | PCA goal | A |
| 11 | MCQ | 3 | PCA covariance | B |
| 12 | MCQ | 3 | PCA direction | D |
| 13 | MCQ | 3 | PCA projections | D (key disputed, see Part 11) |
| 14 | MCQ | 2 | learning rate theory | D |
| 15 | SA | 3 | gradient descent difference | 1.152 |
| 16 | SA | 3 | second order approximation | 5.010 |

## 2024 December 01, QDF3, 40 marks

| Q | Type | Marks | Topic | Answer |
| --- | --- | --- | --- | --- |
| 1 | MCQ | 0 | confirmation | A |
| 2 | MSQ | 3 | Hermitian matrix B | B, C |
| 3 | MSQ | 3 | unitary eigenvalues | A, B, C |
| 4 | MCQ | 3 | diagonalisation Lambda | B |
| 5 | MCQ | 3 | eigenvectors of triangular | A |
| 6 | MCQ | 3 | quadratic form to matrix | A |
| 7 | MCQ | 3 | gradient descent | B |
| 8 | MCQ | 3 | closest point on line | B |
| 9 | MCQ | 2 | SVD \(Q_1\) | B |
| 10 | MCQ | 2 | SVD \(Q_2^T\) | D |
| 11 | MCQ | 2 | SVD \(\Sigma\) | A |
| 12 | MCQ | 3 | PCA covariance | A |
| 13 | MCQ | 3 | PCA eigenvalues | D |
| 14 | MCQ | 3 | PCA projections | A |
| 15 | MSQ | 2 | singular and diagonalisable | B, D |
| 16 | MCQ | 2 | positive semi definite | B |

## 2025 March 16, QDD4, 40 marks

| Q | Type | Marks | Topic | Answer |
| --- | --- | --- | --- | --- |
| 1 | MCQ | 0 | confirmation | A |
| 2 | MCQ | 3 | Taylor of 1/x around 1 | C |
| 3 | MCQ | 3 | Hermitian eigenvalues | B |
| 4 | MCQ | 3 | Schur form | D |
| 5 | MCQ | 2 | eigenvalues of \(A^*\) | A |
| 6 | MSQ | 3 | complex matrix properties | C, D |
| 7 | MSQ | 3 | Schur theorem statements | A, B, D |
| 8 | MSQ | 3 | singular values of PD matrix | A, D |
| 9 | SA | 3 | gradient descent, value of f | 2.44 |
| 10 | SA | 3 | minimum of exponential | -1 |
| 11 | MCQ | 2 | PCA covariance | C |
| 12 | MCQ | 3 | PCA direction | B |
| 13 | MCQ | 3 | PCA projections | A |
| 14 | MCQ | 3 | SVD \(Q_1\) | D |
| 15 | MCQ | 3 | SVD \(Q_2^T\) | D (key disputed, see Part 11) |

## 2025 August 03, QDF4, 40 marks

| Q | Type | Marks | Topic | Answer |
| --- | --- | --- | --- | --- |
| 1 | MCQ | 0 | confirmation | A |
| 2 | MCQ | 2 | second order optimality | C |
| 3 | MCQ | 2 | quadratic form definiteness | E (none of these) |
| 4 | MCQ | 3 | definiteness 3 by 3 | A |
| 5 | MCQ | 3 | eigenvalues of \(AA^T\) | B |
| 6 | MCQ | 3 | PCA feature from sample space | C |
| 7 | MCQ | 3 | gradient descent | A |
| 8 | MSQ | 3 | complex matrix \(\begin{bmatrix}i & 1 \\ -1 & i\end{bmatrix}\) | C, D (D disputed) |
| 9 | MSQ | 3 | Hermitian eigen properties | A, B, C |
| 10 | SA | 3 | closest point on parabola | 3.75 |
| 11 | MCQ | 3 | SVD \(Q_1\) | C |
| 12 | MCQ | 3 | SVD \(Q_2^T\) | A |
| 13 | MCQ | 2 | SVD \(\Sigma\) | C |
| 14 | MCQ | 2 | PCA covariance | A |
| 15 | MCQ | 2 | PCA eigenvalues | A (key disputed, see Part 11) |
| 16 | MCQ | 3 | PCA first principal component | C |

## 2026 April 06, 40 marks

| Q | Type | Marks | Topic | Answer |
| --- | --- | --- | --- | --- |
| 1 | MCQ | 4 | Householder reflector | A |
| 2 | MCQ | 2 | \(\det(2A)\) from eigenvalues | A (240) |
| 3 | MCQ | 3 | Hermitian condition on a, b | C |
| 4 | MCQ | 3 | positive definite condition | B |
| 5 | MCQ | 3 | Taylor of 1/(1-x) | A |
| 6 | MSQ | 3 | \(A^TA\) positive semi definite | A, B |
| 7 | MSQ | 3 | scaled unitary matrix | C, D |
| 8 | MSQ | 4 | gradient descent basins | A, B |
| 9 | SA | 3 | rank from singular values | 3 |
| 10 | SA | 3 | sum of singular values | 2 |
| 11 | SA | 4 | gradient descent versus true minimum | 0.8 |
| 12 | SA | 2 | covariance entry sum | 8 |
| 13 | SA | 3 | variance along eigenvector | 1 |

---

# PART 10: THE COMPRESSED FORMULA SHEET

This is the page to read in the final thirty minutes before the exam. Nothing here is optional.

## Complex matrices

- \(A^*\) equals conjugate transpose.
- **Hermitian**: \(A^* = A\). Diagonal is real. Entry \((i,j)\) is the conjugate of entry \((j,i)\).
- **Unitary**: \(A^*A = I\). Columns are orthonormal.
- **Normal**: \(A^*A = AA^*\).
- Hermitian implies **real eigenvalues** and **orthogonal eigenvectors** and **diagonalisable**.
- Unitary implies **\(|\lambda|=1\) for every eigenvalue** and **orthogonal eigenvectors** and **diagonalisable**.
- \((AB)^* = B^*A^*\). Order reverses.
- Eigenvalues of \(A^*\) are the **conjugates** of the eigenvalues of \(A\).
- If \(MM^* = cI\), then \(M/\sqrt{c}\) is unitary.
- **Householder**: \(I - 2uu^*\) with \(u\) a unit vector is both Hermitian and unitary.

## Eigenvalues

- **Sum of eigenvalues equals trace.**
- **Product of eigenvalues equals determinant.**
- Two by two: \(\lambda^2 - (\text{trace})\lambda + (\det) = 0\).
- Special form \(\begin{bmatrix} a & b \\ b & a \end{bmatrix}\) has eigenvalues \(a+b\) with vector \((1,1)\) and \(a-b\) with vector \((1,-1)\).
- Triangular matrix: eigenvalues are the diagonal entries.
- \(\det(cA) = c^n \det(A)\) for an \(n \times n\) matrix.
- Eigenvalues of \(A^k\) are the \(k\)-th powers of the eigenvalues of \(A\).
- Distinct eigenvalues imply **linearly independent** eigenvectors. Normality additionally implies **orthogonal** ones.
- **Schur**: every square matrix is unitarily similar to an upper triangular matrix, always, no conditions. The diagonal holds the eigenvalues.

## Quadratic forms

- Diagonal entry equals the coefficient of \(x_i^2\). Off diagonal entries are **half** the cross coefficient each.
- **Two by two definiteness:** det negative means indefinite. det positive and trace positive means positive definite. det positive and trace negative means negative definite. det zero means semi definite, with the trace giving the sign.
- **Leading minors:** all positive means positive definite. Alternating minus, plus, minus means negative definite.
- Positive definite requires all diagonal entries positive.
- Gradient zero plus Hessian positive definite means local minimum. Hessian negative definite means local maximum. Hessian indefinite means saddle point.

## SVD, \(A = Q_1 \Sigma Q_2^T\)

- Singular values are the **square roots** of the eigenvalues of \(AA^T\), in decreasing order, all non negative.
- \(\Sigma\) has the **same shape as \(A\)**.
- Columns of \(Q_1\) are the orthonormal eigenvectors of \(AA^T\).
- Columns of \(Q_2\) are the orthonormal eigenvectors of \(A^TA\), obtained fastest as \(v_i = \frac{1}{\sigma_i} A^T u_i\).
- Columns of \(Q_2\) for zero singular values are **null vectors of \(A\)**.
- **Frobenius check:** sum of squares of the singular values equals the sum of squares of all entries of \(A\).
- **Rank equals the number of nonzero singular values.**
- \(AA^T\) and \(A^TA\) share the same nonzero eigenvalues.

## PCA

- Mean, then centre, then \(C = \frac{1}{n} X_c^T X_c\), dividing by \(n\).
- \(C\) is symmetric with non negative diagonal.
- Principal direction is the **unit eigenvector of the largest eigenvalue** of \(C\).
- **Variance along a unit direction \(u\) is \(u^T C u\)**, and for an eigenvector this is just its eigenvalue.
- If the centred data is collinear along \(v\), then \(C\) has **rank one**, its only nonzero eigenvalue equals the **trace**, the principal direction is \(v\) normalised, and the **projections are the original points**.
- Projection formula: \(\bar{x} + [(x-\bar{x})\cdot u]u\).
- Feature space direction from sample space: \(v_i = \frac{1}{\sqrt{\lambda_i}} A^T u_i\).

## Gradient descent

- Update: \(x_{\text{new}} = x_{\text{old}} - \eta \nabla f(x_{\text{old}})\).
- Watch whether \(t\) starts at 0 or at 1 when \(\eta\) depends on \(t\).
- Gradient descent converges to a **local** minimum in the basin of the starting point.
- Small \(\eta\) means slow. Large \(\eta\) means oscillation or divergence.

## Taylor

- \(f(a+h) \approx f(a) + f'(a)h + \frac12 f''(a)h^2\).
- \(\frac{1}{1-x} = 1+x+x^2+x^3+\cdots\).
- \(\frac{1}{1+x} = 1-x+x^2-x^3+\cdots\).
- Around \(x=a\), expand in powers of \((x-a)\). Substitute \(u = x-a\) and use a standard series.

## Optimisation

- Minimise the **squared** distance, never the distance.
- Eliminate a variable using the constraint, then differentiate.
- **Test every critical point**, since some are maxima.
- If the objective is \(h(g(x))\) with \(h\) increasing, optimise \(g\) alone.

---

# PART 11: QUESTIONS WHERE THE OFFICIAL KEY IS QUESTIONABLE

I am flagging these because you deserve to know the difference between what is true and what is keyed, and because being confused by a wrong key in the exam hall costs time you cannot afford. **If any of these exact questions reappears, answer as keyed. But understand the real mathematics, since the underlying concept will certainly be tested in some form.**

## 11.1 [2024 Aug 04, Q13] PCA projections

The dataset is \(\{(1,1,1), (0,2,0), (2,0,2)\}\) and the key selects option D, which reads \(x_1 = (4/3, -2/3, 1/3)\), \(x_2 = (-2/3, 4/3, -1/3)\), \(x_3 = (7/3, -1/3, 4/3)\).

**Why this cannot be right.** Projections onto a single line must be **collinear**. Check option D: the difference \(x_2 - x_1\) is \((-2, 2, -2/3)\) and the difference \(x_3 - x_1\) is \((1, 1/3, 1)\). These two vectors are not parallel, so the three claimed projections do not lie on any straight line. No set of projections onto a one dimensional subspace can look like this.

**What is actually true.** The centred data is \((0,0,0), (-1,1,-1), (1,-1,1)\), which is collinear along \((1,-1,1)\). Projecting a point that already lies on the line returns the point itself. So the projections, expressed in the original coordinates, are exactly \((1,1,1), (0,2,0), (2,0,2)\), the original dataset. This matches the convention used and keyed in Mar24 Q11, Dec24 Q14, and Mar25 Q13.

**How to handle it if this appears.** Look for the option reproducing the original data. If it is absent, choose the option whose three vectors are collinear, since that is at least structurally possible.

## 11.2 [2025 March 16, Q14 and Q15] SVD of a degenerate matrix

\(M = \begin{bmatrix} 2 & 1 & 0 \\ 1 & -2 & 0 \end{bmatrix}\), and \(MM^T = 5I\). The key marks the identity as correct for **both** \(Q_1\) (in Q14) and \(Q_2^T\) (in Q15).

**Why both cannot hold.** If \(Q_1\) equals the identity and \(Q_2^T\) equals the identity, then \(Q_1 \Sigma Q_2^T = \Sigma\), which is \(\begin{bmatrix} \sqrt5 & 0 & 0 \\ 0 & \sqrt5 & 0 \end{bmatrix}\). That is not \(M\).

**What is actually true.** There are two valid consistent pairings.
- \(Q_1\) equals the identity, and \(Q_2^T\) equals the matrix with rows \((2,1,0)/\sqrt5\), \((1,-2,0)/\sqrt5\), and \((0,0,1)\). This pairing makes the Q14 key correct and the Q15 key wrong.
- \(Q_2^T\) equals the identity, and \(Q_1 = \frac{1}{\sqrt5}\begin{bmatrix} 2 & 1 \\ 1 & -2 \end{bmatrix}\). This pairing makes the Q15 key correct and the Q14 key wrong.

Additionally, options A, B and C in Q15 are recycled from the December 2024 paper and do not even have unit norm rows for this matrix, so they were never candidates. The examiner appears to have keyed by elimination.

**How to handle it.** In each question independently, select the option that is a valid orthogonal matrix, and if the identity is the only orthogonal option, choose it. That reproduces the official key on both.

## 11.3 [2025 August 03, Q15] PCA eigenvalues

The dataset is \(\{(1,2), (3,4), (5,6)\}\) and Q14 correctly keys the covariance as \(C = \frac{1}{3}\begin{bmatrix} 8 & 8 \\ 8 & 8 \end{bmatrix}\). But Q15 keys the eigenvalues as \(\lambda_1 = 4, \lambda_2 = 0\).

**Why this is wrong.** \(C\) is rank one, so one eigenvalue is zero and the other equals the trace, which is \(\frac{8}{3} + \frac{8}{3} = \frac{16}{3}\), approximately 5.33. Option C in that question states exactly \(\frac{16}{3}\).

**Confirmation from the papers themselves.** December 2024 Q13 poses the identical situation with the identical covariance matrix \(\frac{1}{3}\begin{bmatrix} 8 & 8 \\ 8 & 8 \end{bmatrix}\) and keys the eigenvalues as \(\frac{16}{3}\) and 0. The two papers contradict each other, and the December version is the correct one.

**How to handle it.** Compute the trace. If the resulting value appears among the options, choose it. It is the mathematically correct answer and it is the answer keyed in the majority of appearances.

## 11.4 [2025 August 03, Q8] Orthogonality of eigenvectors

\(A = \begin{bmatrix} i & 1 \\ -1 & i \end{bmatrix}\), and the key marks option D, "eigenvectors corresponding to different eigenvalues of A are not orthogonal", as correct.

**Why this is wrong.** Compute \(A^*A\) and \(AA^*\). Both equal \(\begin{bmatrix} 2 & -2i \\ 2i & 2 \end{bmatrix}\). Since they agree, \(A\) is a normal matrix, and every normal matrix has orthogonal eigenvectors for distinct eigenvalues. Explicitly, the eigenvectors are \((-i, 1)/\sqrt2\) for eigenvalue 0 and \((1, -i)/\sqrt2\) for eigenvalue \(2i\), and their complex inner product is \(\overline{(-i)} \times 1 + \overline{1} \times (-i) = i - i = 0\). **They are orthogonal.**

**How to handle it.** If you see this question, answer as keyed, but the concept you must actually take away is the correct one: **normality, not Hermitian-ness, is what guarantees orthogonal eigenvectors.**

## 11.5 [2024 March 24, Q12] Definiteness of a non symmetric matrix

\(A = \begin{bmatrix} 3 & 2 \\ -2 & -1 \end{bmatrix}\) is not symmetric. Its eigenvalues are 1 and 1, both positive, and the key says positive definite. But the associated quadratic form \(x^T A x = 3x^2 - y^2\), which is indefinite.

**Resolution.** The two standard criteria for definiteness coincide only for symmetric matrices. This course applies the **eigenvalue criterion**. Use eigenvalues, and expect the examiner to do the same.

## 11.6 [2024 December 01, Q3, option B] Unitary eigenvalue statement

The option reads "\(\alpha\) is an eigenvalue of \(A^H\)". For a unitary \(A\), the eigenvalues of \(A^*\) are the **conjugates** of those of \(A\). Since the March 2025 paper asks precisely this and keys the conjugate answer, the December option is best read as intending the conjugate statement, and it is keyed correct.

---

# PART 12: THE SEVEN DAY PLAN

You have one week. Here is how to spend it. Total time required is roughly three to four hours per day, and less if you are already comfortable.

## Day 1: PCA, the biggest single block

Read Part 1 in full. Then, without looking at the solutions, work these six covariance matrix questions back to back and time yourself: Mar24 Q9, Aug24 Q11, Dec24 Q12, Mar25 Q11, Aug25 Q14, Apr26 Q12. **Target: all six correct in under twelve minutes.** If you are slower than two minutes each, you are computing all four entries instead of using Trick 1.1.

Then do the direction and projection questions: Mar24 Q10 and Q11, Aug24 Q12, Mar25 Q12 and Q13, Aug25 Q16, Dec24 Q14.

**End of day check:** can you state, without looking, what happens when the centred data is collinear? Three consequences, name them.

## Day 2: SVD

Read Part 2 in full. Work the four complete SVD blocks in order: Aug24 Q5 to Q7, Dec24 Q9 to Q11, Mar24 Q5 and Q6, Aug25 Q11 to Q13. Do each **block** in one sitting, since setting up \(AA^T\) once serves all three questions.

**End of day check:** given a two by three matrix, can you produce \(\Sigma\) in under ninety seconds? Can you find the third column of \(Q_2\) using the null space shortcut?

## Day 3: Complex matrices

Read Part 3 in full. Then rapid fire: for each of these matrices, decide Hermitian or not, unitary or not, normal or not, and state the consequences for eigenvalues and eigenvectors.

\(\begin{bmatrix}1 & -i \\ i & 1\end{bmatrix}\), \(\begin{bmatrix}4 & -2i & -1 \\ 2i & 0 & -i \\ -1 & i & 4\end{bmatrix}\), \(\begin{bmatrix}2 & -i & i \\ i & 2 & -i \\ -i & i & 2\end{bmatrix}\), \(\begin{bmatrix}3 & i \\ -i & 5\end{bmatrix}\), \(\begin{bmatrix}i & 1 \\ -1 & i\end{bmatrix}\), \(\begin{bmatrix}1 & 1 & i \\ 1 & -1 & -i \\ -i & -i & 1\end{bmatrix}\), \(\frac{1}{\sqrt2}\begin{bmatrix}1 & i \\ i & 1\end{bmatrix}\).

**Target: fifteen seconds per matrix for the Hermitian check.**

Then work Aug24 Q4 and Q9, Dec24 Q2 and Q3, Mar24 Q2 and Q3, Mar25 Q5 and Q6, Aug25 Q8 and Q9, Apr26 Q1, Q3, Q7.

## Day 4: Gradient descent and optimisation

Read Parts 5 and 8. Work all six gradient descent questions **on paper, in a table**, no shortcuts: Aug24 Q15, Dec24 Q7, Mar24 Q13, Mar25 Q9, Aug25 Q7, Apr26 Q11.

**Target: 100 percent accuracy. There is no excuse for an error here.** If you make one, identify whether it was a sign, a learning rate index, or a misread of the target quantity, and note which, because you will make the same one again.

Then the closest point questions: Dec24 Q8, Mar24 Q14, Aug25 Q10, Mar25 Q10.

## Day 5: Quadratic forms, definiteness, eigen theory, Taylor

Read Parts 4, 6, and 7. Work Aug24 Q2, Q3, Q8; Dec24 Q4, Q5, Q6, Q15, Q16; Mar24 Q4, Q7, Q8, Q12, Q15; Mar25 Q2, Q3, Q4, Q7, Q8; Aug25 Q2, Q3, Q4, Q5, Q6; Apr26 Q2, Q4, Q5, Q6, Q9, Q10.

**End of day check:** state the trace test and the determinant test for eigenvalue options. State the two by two definiteness rule.

## Day 6: Full mock runs under timed conditions

Sit the 2025 August 03 paper and the 2026 April 06 paper as clean timed attempts. Then sit 2024 December 01. Mark honestly against Part 9.

**For every question you got wrong, write one line in a notebook: what was the concept, and what was the specific slip.** Do not simply re-read the solution. The act of naming your own error is what stops you repeating it.

## Day 7: Consolidation

Morning: re-read Part 10, the formula sheet, twice. Then re-work only the questions you got wrong on Day 6.

Afternoon: sit the 2024 March 24 and 2024 August 04 papers. By now you should be finishing a paper in under half the allotted time.

Evening: read Part 10 once more and Part 11 once. Stop studying. Sleep properly. A rested brain outperforms an extra hour of revision by a wide margin, and this is not a platitude, it is well established in the sleep and memory literature.

---

# PART 13: EXAM DAY EXECUTION

Knowing the material is necessary. Executing well under time pressure is what converts knowledge into marks. Here is the protocol.

**1. Answer Q1 immediately.** It is the subject confirmation, worth zero marks, and the answer is YES.

**2. Do a first pass and harvest the certainties.** Go through the paper once and answer only what you can do in under sixty seconds. That includes the PCA covariance questions, the \(\Sigma\) questions, the theory MSQs, the definiteness questions. **You will typically bank 20 to 25 marks in the first ten minutes.** This does two things: it protects you against running out of time, and it settles your nerves, which measurably improves accuracy on the harder questions.

**3. On the second pass, do the blocks.** Blocks share setup. When you reach an SVD block, compute \(AA^T\) once, write it in the margin, and answer all three questions from it. Same for PCA blocks: compute the mean and the centred data once and keep it visible.

**4. Read what is being asked, twice, and underline it.** Across the six papers, at least four questions punish misreading rather than miscalculation. The difference between the function value and the point, between the first iteration and the second, between "is true" and "is incorrect". **Underline the target quantity in the question before you compute anything.**

**5. Use elimination aggressively on MCQs.** You do not get marks for solving. You get marks for selecting. Normalisation checks, symmetry checks, sign checks, trace checks, and shape checks will eliminate two or three options on most questions in this paper without any real computation.

**6. On MSQs, evaluate each option independently.** Do not assume exactly two are correct. Across the six papers I see MSQs with two correct, with three correct, and once with three of five. Judge each statement on its own merits, and remember Trick 6.7: a weaker true statement is still true.

**7. Watch these five specific traps, which recur:**
- Forgetting the square root when going from eigenvalues of \(AA^T\) to singular values.
- Forgetting to halve cross term coefficients when building a quadratic form matrix.
- Stopping after one gradient descent iteration when two were asked.
- Using n minus 1 instead of n in the covariance matrix.
- Choosing the unnormalised version of the correct eigenvector.

**8. For numeric short answers, look at the accepted range.** Several are given as ranges such as 1.149 to 1.155 or 10.2 to 10.8. A wide range means the examiner tolerates a first order approximation. Do not agonise over the third decimal place.

**9. Budget your time by marks.** A 2 mark question deserves under two minutes. A 4 mark MSQ deserves up to four. If a question exceeds its budget, mark it, move on, and return. **The single most expensive mistake in a short paper is spending eight minutes on a 3 mark question and running out of time on two 3 mark questions you could have done.**

---

# CLOSING NOTE

Let me tell you what I actually think about your position, because you asked for this to be self sufficient and honesty is part of that.

This exam is unusually predictable. Six papers, one consistent structure, six question templates that recur nearly verbatim, and a topic distribution so stable that PCA plus SVD plus complex matrices carries between half and two thirds of the marks in every single sitting. That predictability is your enormous advantage, and it is why working smart genuinely does beat working hard here. There is no reward for studying material the examiner has never once asked about.

But predictability cuts both ways. Because the questions are mechanical, the marks are lost to mechanical failures: a dropped minus sign, a forgotten square root, a covariance divided by the wrong number, a second iteration never performed. **The students who score in the thirties are not the ones who understand the most. They are the ones who execute the routine calculations without slipping.** So when you practise, practise the arithmetic with a pen, on paper, in a table, until the routine is boring. Boring is the goal.

Two more things. First, the tricks in this document are not substitutes for understanding, they are consequences of it. The trace test works because the trace is the sum of eigenvalues. The collinear collapse works because a projection onto a line containing the point is the identity. If you understand why each trick holds, you will apply it correctly and you will recognise when it does not apply. If you memorise them blindly, one unusual question will unravel you.

Second, Part 11 exists because a few of the official keys are wrong. That is not a reason for anxiety. It is a reason for confidence: if you disagree with a key during practice, you may well be right, and knowing where those landmines are means you will not lose composure over them in the hall.

Work the plan. Trust the arithmetic. You have enough time.
