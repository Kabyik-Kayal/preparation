# MLT Quiz 2: The Complete Preparation Module

### Built from six real question papers (Aug 2024, Dec 2024, Mar 2024, Mar 2025, Aug 2025, Apr 2026)

---

## How to use this document

I went through all six of your PYQ papers, page by page, question by question. Quiz 2 in this course is remarkably repetitive in its structure. It draws from a fixed set of seven topics, and within each topic the examiner reuses the same handful of question templates year after year, only changing the numbers. That is very good news for you. It means that once you understand a template deeply, you can solve every variant of it, no matter what numbers get plugged in on exam day.

Here is the topic distribution I found across the 122 questions in your six papers (excluding the mandatory Q1 "did you read your hall ticket" question, which is worth 0 marks and always has answer YES):

| Topic | Approximate share of marks | Typical question count per paper |
|---|---|---|
| Linear Regression (including gradient descent) | 20% | 3 to 5 |
| Regularization: Ridge and LASSO | 12% | 2 to 3 |
| Kernel Regression | 12% | 2 to 3 |
| k-Nearest Neighbours (k-NN) | 15% | 2 to 4 |
| Decision Trees and Entropy | 18% | 3 to 4 |
| Naive Bayes | 18% | 3 to 4 |
| Bias-Variance, MLE/MAP theory, generative vs discriminative | 5% | 1 to 2 |

Seven topics. That is your entire syllabus for this exam, at least as far as Quiz 2 history shows us. We will go through each one in the same rhythm: first I will build the concept in your head from first principles, assuming you know very little walking in. Then I will show you the "trick," which is the fast mental shortcut that experienced students use to answer these under time pressure. Then we will solve the actual PYQ questions together, with the exact options as they appeared on your paper, so you get used to the phrasing the examiner favours.

At the end there is a rapid revision sheet and a mock-exam style final drill built entirely from the hardest problems across all six papers.

A note on how these quizzes are graded: SA (short answer) questions want a single number, sometimes with a tolerance range shown as X to Y. MCQ wants one option. MSQ (multiple select) can have more than one correct option and you must select all that apply to get credit. Watch the mark weight in brackets next to each question. Heavier questions are usually the multi-step numeric ones, and those are exactly the ones this guide will drill hardest.

---

## Topic 1: Linear Regression

### 1.1 The concept, from scratch

You are given training data of the form \((x_i, y_i)\), where \(x_i\) is a feature vector and \(y_i\) is a real number you want to predict. Linear regression assumes the relationship is a straight line (or hyperplane in higher dimensions):

\[ \hat{y}_i = w^T x_i \]

Here \(w\) is a weight vector. Our job is to find the \(w\) that makes the predictions \(\hat{y}_i\) as close as possible to the true \(y_i\) across all training points. "As close as possible" is measured using the sum of squared errors:

\[ SSE(w) = \sum_i (w^T x_i - y_i)^2 \]

This is a bowl-shaped (convex) function of \(w\), so it has a single minimum. To find it, we take the derivative with respect to \(w\), set it to zero, and solve. If we stack all the \(x_i\) as columns of a matrix \(X\) (shape \(d\) by \(n\), meaning \(d\) features and \(n\) data points) and all the \(y_i\) into a vector \(y\), the closed-form solution is:

\[ w^* = (XX^T)^{-1} X y \]

This is the single most important formula in this entire course. Memorise it exactly, including which matrix gets transposed and inverted. A huge number of PYQ questions are just this formula applied to small datasets by hand.

If you only have one feature and no bias term (no intercept, no constant column of 1s), this reduces beautifully to a single number:

\[ w^* = \frac{\sum_i x_i y_i}{\sum_i x_i^2} \]

This is just the projection formula: dot product of x and y divided by the squared norm of x. This is the exact computation the exam has directly tested (see Q3 below), so let this formula live in your head, not just in a textbook.

### 1.2 Bias and intercept: the trick of augmenting X

Notice the formula above has no room for an intercept term \(w_0\) (like \(y = w_0 + w_1 x\)). The standard trick, which you will see constantly in the PYQs, is: whenever a model is written as \(y = w_0 + w_1 x\), silently convert every data point \(x_i\) into the vector \((1, x_i)\). The "1" becomes the first coordinate. Then the model becomes \(y = w^T (1, x_i)\), which is back in the standard form, and \(w_0\) falls out as the first entry of \(w^*\).

### 1.3 The trick for exam speed

For 2 or 3 data point regressions (which the exam loves for hand computation), do not build \(XX^T\) as a full matrix by brute force under time pressure unless necessary. Instead:
- If it is single feature, no bias: just compute \(\sum(xy) / \sum(x^2)\). Two sums, one division. Ten seconds.
- If bias is involved and you have exactly 2 points: the line passes through both points exactly (2 points determine a unique line, and SSE becomes exactly 0). So just solve the two linear equations \(y_1 = w_0 + w_1 x_1\) and \(y_2 = w_0 + w_1 x_2\) directly. Do not build matrices at all.
- If you have 3 or more points with bias: you generally need normal equations, but check first whether the question only asks for \(w_1\) (the slope), because sometimes you can get it from a simplified formula: \(w_1 = \text{covariance}(x,y) / \text{variance}(x)\) using the sample formulas, then \(w_0 = \text{mean}(y) - w_1 \cdot \text{mean}(x)\).

### 1.4 Worked PYQ: Aug 2024, Q3 [3.00 marks]

**Exact question as it appeared:**

"Consider the following training dataset for a linear regression problem with one feature:

| \(x_i\) | \(y_i\) |
|---|---|
| 1 | 1.2 |
| -1 | 0.1 |
| 2 | 2.1 |
| -2 | -1 |

Find the value of \(w^*\), the optimal weight."

Notice: this is a single feature model with **no bias term** (the question just says "the optimal weight," singular, and gives a one-row table of x values). This is exactly the shortcut case from section 1.3.

**Solution:**

\[ w^* = \frac{\sum_i x_i y_i}{\sum_i x_i^2} \]

Numerator: \((1)(1.2) + (-1)(0.1) + (2)(2.1) + (-2)(-1) = 1.2 - 0.1 + 4.2 + 2 = 7.3\)

Denominator: \(1^2 + (-1)^2 + 2^2 + (-2)^2 = 1 + 1 + 4 + 4 = 10\)

\(w^* = \frac{7.3}{10} =\) **0.73**

This matches the official answer key exactly (0.73). I recomputed this programmatically to be certain, and it checks out.

### 1.5 Worked PYQ: Aug 2024, Q6 and Q7 [2.00 marks each] — gradient descent direction, a geometric trick question

**Exact question:**

"Consider a linear regression problem that has two features with a training dataset of 10,000 points. The blue point in the image below is the weight vector, \(w^{(t)}\), at some iteration of gradient descent. \(w_1, w_2, w_3\) are unit vectors. Specifically, \(w_1\) is a unit vector in the direction of the gradient at this point."

\[ w_1 = \frac{1}{\sqrt{10}} \begin{bmatrix} 3 \\ 1 \end{bmatrix}, \quad w_2 = \frac{1}{\sqrt{10}} \begin{bmatrix} -3 \\ -1 \end{bmatrix}, \quad w_3 = \frac{1}{\sqrt{10}} \begin{bmatrix} -1 \\ 3 \end{bmatrix} \]

**Q6:** "If the next iteration of gradient descent is expressed as \(w^{(t+1)} = w^{(t)} + \eta w_k\) with \(\eta > 0\), what would be the value of \(k\)?"

**The concept you must know cold:** Gradient descent updates weights by moving in the direction **opposite** to the gradient, because the gradient points toward increasing loss and we want to decrease loss. The standard update rule is \(w^{(t+1)} = w^{(t)} - \eta \cdot \text{gradient}\). Here the question phrases the update with a PLUS sign (\(w^{(t)} + \eta w_k\)), so \(w_k\) must represent the **negative gradient direction**, not the gradient direction itself.

We are told \(w_1\) is in the direction of the gradient. So the negative gradient direction is \(-w_1 = -\frac{1}{\sqrt{10}}\begin{bmatrix}3 \\ 1\end{bmatrix}\). Looking at the three given vectors, \(w_2 = \frac{1}{\sqrt{10}}\begin{bmatrix}-3 \\ -1\end{bmatrix}\) is exactly \(-w_1\). So **k = 2**. This matches the official answer.

**Q7:** "If \(w^{(t)} = (0.4, 0.1)\) and \(\eta = \frac{1}{\sqrt{10}}\), find \(\|w^{(t+1)}\|\), where we use the usual L2 norm."

\[ w^{(t+1)} = w^{(t)} + \eta w_2 = (0.4, 0.1) + \frac{1}{\sqrt{10}} \cdot \frac{1}{\sqrt{10}}(-3,-1) = (0.4, 0.1) + \frac{1}{10}(-3,-1) = (0.4 - 0.3,\ 0.1 - 0.1) = (0.1,\ 0) \]

\[ \|w^{(t+1)}\| = \sqrt{0.1^2 + 0^2} = 0.1 \]

This matches the official answer of **0.1**.

**The trick for this entire question family:** whenever a question gives you multiple candidate "unit vectors" and asks which one is the gradient descent step direction, remember: descent moves opposite the gradient. If the update formula is written with a minus sign, the answer choice should literally be the gradient direction. If written with a plus sign (as here), the correct choice is the negative of the gradient direction. Always check the sign in the formula before answering.

### 1.6 Worked PYQ: Mar 2025, Q11 and Q12 [3.00 + 2.00 marks] — one manual gradient descent step

**Exact question:**

"Consider a linear regression model \(y_i = w^T x_i\) with an initial weight \(w = [3]\).

| \(x_1\) | y |
|---|---|
| 1 | 4 |
| 2 | 7 |
| 3 | 10 |
| 4 | 13 |

Using the squared loss function and a learning rate of \(\eta = 0.2\), compute the updated weight after one iteration of gradient descent for the following dataset: Use \(\nabla f(w) = 2(XX^T) w - 2 X y\)"

**This gives you the gradient formula directly, so use it exactly as given.** This is a huge time-saver: you do not need to derive the gradient of SSE yourself, the question hands it to you.

\(X = [1, 2, 3, 4]\) (as a row, since \(d=1\)), \(y = [4, 7, 10, 13]\), \(w = 3\)

\(XX^T = 1^2+2^2+3^2+4^2 = 30\)

\(Xy = 1(4)+2(7)+3(10)+4(13) = 4+14+30+52 = 100\)

\(\nabla f(w) = 2(30)(3) - 2(100) = 180 - 200 = -20\)

\(w_{new} = w - \eta \cdot \nabla f(w) = 3 - 0.2(-20) = 3 + 4 =\) **7**

This matches the official answer.

**Q12** then asks: "If we stop the algorithm at the weight calculated in the previous question, what will be the predicted value for the data point \(x_1 = 5\)?"

Prediction \(= w_{new} \cdot x_1 = 7 \times 5 =\) **35**. Matches the official answer.

**The trick:** this two-question combo (compute one GD step, then use it to predict) is a favourite pattern. Always keep your intermediate answer (the updated w) written down clearly, because the next sub-question almost always reuses it. Never round early; carry exact fractions or enough decimal places.

### 1.7 Conceptual MCQs on Linear Regression you must be able to answer instantly

**Dec 2024, Q16 [3.00 marks], MSQ:**

"Consider a linear regression model with loss \(L(w) = \sum (w^T x_i - y_i)^2\), where \(x_i\)'s are the d-dimensional training data points and \(y_i\)'s are their corresponding labels. For the optimal weight vector \(w^*\), which among the following is correct?"

A. If we double all the values of \(y_i\), \(w^*\) will also get doubled. **(Correct)**

B. If we double all the values of \(y_i\), \(w^*\) will get halved.

C. If we double all the values of \(x_i\), \(w^*\) will get halved. **(Correct)**

D. If we double all the values of \(x_i\), \(w^*\) will also get doubled.

**Why A and C are correct, intuitively:** \(w^* = (XX^T)^{-1} X y\) is *linear* in \(y\). Double \(y\), and \(Xy\) doubles, so \(w^*\) doubles. But \(w^*\) has an inverse relationship with \(X\): if you double every \(x_i\), then in the one-feature no-bias case \(w^* = \sum(xy)/\sum(x^2)\), doubling \(x\) doubles the numerator but quadruples the denominator, giving \(w^*_{new} = (2xy)/(4x^2) = w^*/2\). So doubling features halves the weight, which makes sense: the same prediction \(w^T x\) must stay the same magnitude, so if \(x\) doubles, \(w\) must halve to compensate.

**Mar 2024, Q12 [3.00 marks], MCQ:**

"Let X be the data matrix of shape \((d,n)\) and \(y\) be the corresponding label vector. A linear regression model of the form \(\hat{y}_i = w^T x_i\) is fit using the squared error on the same dataset. If the solution \(w^*\) to the optimization problem is orthogonal to the subspace spanned by the data points (columns of matrix \(X\)), what will be the squared error?"

Options: A. 0  B. 1  C. \(\|y\|^2\) (correct)  D. Insufficient information

**The concept:** The optimal residual \((y - X^T w^*)\) is always orthogonal to the column space of \(X\) (this is the normal equations geometry: the residual is the "leftover" that the model cannot explain). If \(w^*\) ITSELF is orthogonal to that subspace (a very unusual, special condition), then \(w^T x_i = 0\) for every \(i\), meaning every prediction is 0. So the squared error becomes \(\sum(0 - y_i)^2 = \sum(y_i^2) = \|y\|^2\). Answer: **C**.

**Apr 2026, Q1 [3.00 marks], MCQ:**

"Consider a linear regression model applied to a dataset in which each data-point is described by two features. The first feature is always 1. The i-th data-point's feature-label pair is represented as \(((1, x_i), y_i)\). Let \((w_0^*, w_1^*)\) be the optimal weight vector that minimizes SSE. Consider two scenarios: S1: \(w_0^* + w_1^* x_i > y_i\) for each data-point. S2: \(w_0^* + w_1^* x_i < y_i\) for each data-point. Which of the following is true?"

Answer: **D. Both S1 and S2 are impossible.**

**Why:** At the optimum with a bias term, the sum of residuals \((y_i - \hat{y}_i)\) over all points must equal exactly zero (this falls directly out of setting the derivative of SSE with respect to \(w_0\) to zero: it forces \(\sum(\text{residuals}) = 0\)). If every single residual were strictly positive (S2: predictions consistently undershoot) or strictly negative (S1: predictions consistently overshoot), the sum could never be zero. So it is mathematically impossible for the optimal fit-with-bias to overshoot or undershoot every single point. This is a favourite "gotcha" theory question: **whenever a bias term is present, residuals must sum to zero, so uniform over- or under-prediction is impossible.**

---

## Topic 2: Regularization (Ridge and LASSO)

### 2.1 The concept

Plain linear regression can overfit, especially with many features or correlated features. Regularization adds a penalty term to the loss that discourages large weights.

**Ridge regression** (L2 penalty):

\[ Loss = \sum(w^T x_i - y_i)^2 + \lambda \|w\|^2, \quad \text{where } \|w\|^2 = \sum_j w_j^2 \]

Closed form solution: \(w_{ridge} = (XX^T + \lambda I)^{-1} X y\)

**LASSO regression** (L1 penalty):

\[ Loss = \sum(w^T x_i - y_i)^2 + \lambda \|w\|_1, \quad \text{where } \|w\|_1 = \sum_j |w_j| \]

LASSO has no closed form in general (it needs iterative solvers), but its geometric behaviour is what the exam tests most: **LASSO drives some weights to exactly zero**, performing automatic feature selection. Ridge shrinks weights toward zero but essentially never makes them exactly zero.

### 2.2 The single most important picture: contour plots

The exam repeatedly shows you a picture like this: the elliptical contours of the SSE loss \(f(w) = c_1, c_2\) (nested ellipses, getting smaller toward the unconstrained optimum), overlaid with a **constraint region**. For Ridge, the constraint \(\|w\|^2 \leq \theta\) is a **circle** (or sphere in higher dimensions). For LASSO, the constraint \(\|w\|_1 \leq \theta\) is a **diamond** (a rotated square).

The optimal constrained solution is the point where the smallest SSE ellipse just touches the boundary of the constraint region. This is the key visual insight: **because the diamond has sharp corners on the axes, the ellipse is likely to first touch the diamond exactly at a corner, which lies on an axis, meaning one of the coordinates is exactly zero.** The circle has no corners, so the touching point can be anywhere on its boundary, generally with all coordinates nonzero. This single fact (diamond = corners = sparsity, circle = no corners = shrinkage without sparsity) is the entire conceptual heart of every regularization contour-plot question in your PYQs.

### 2.3 The trick for reading these contour-plot questions fast

1. Identify which shape is the constraint (diamond = LASSO, circle = Ridge).
2. Find where the *smaller* labelled ellipse (this is the tighter, more optimal contour, i.e. lower loss) touches the constraint boundary. Read off the \((w_1, w_2)\) coordinates at that touching point directly from the axes.
3. If asked to compare \(c_1\) and \(c_2\): the SMALLER ellipse is closer to the unconstrained optimum and therefore has LOWER loss, so if \(c_1\)'s ellipse is the outer, larger one and \(c_2\)'s is the inner, smaller one, then \(c_1 > c_2\) (bigger ellipse = higher SSE value).
4. Total loss at the optimal point = \(f(w)\) value of that touching contour + \(\lambda\) times the constraint value at that point (for the Lagrangian form), but usually the exam just wants you to read \(w_1^*, w_2^*\) off the graph directly.

### 2.4 Worked PYQ: Aug 2024, Q10 through Q14 [full contour plot problem set]

**Exact question, shared context:**

"Consider the following image of the parameter space in a regression problem with regularization. f is the sum of squared errors (SSE) and \(\lambda\) is the regularization parameter. The weight vector is \(w = [w_1, w_2]^T\). The contours of f and the regularization term in the loss are displayed below:" [diamond constraint region centered at origin with vertices roughly at (-1,0),(1,0),(0,1),(0,-1); two nested ellipses \(f(w)=c_1\) (outer, larger) and \(f(w)=c_2\) (inner, smaller), both centered off to the right around w1=4-5]

**Q10 [1.00 mark], MCQ:** "What kind of a regression problem is this?"

Options: A. Ridge regression  B. LASSO regression (correct)

The constraint region is a diamond, so it is **LASSO**.

**Q11 [0.50 marks], SA:** "What is the optimal value of \(w_1\)?" Answer: **1**

**Q12 [0.50 marks], SA:** "What is the optimal value of \(w_2\)?" Answer: **0**

Reading the picture: the smaller ellipse \(f(w)=c_2\) touches the diamond exactly at its rightmost vertex, which sits at the point \((1, 0)\) on the \(w_1\)-\(w_2\) plane. Because the touching point is a *corner* of the diamond lying exactly on the \(w_1\)-axis, \(w_2\) is driven to exactly zero. This is LASSO doing feature selection in action: feature 2 has been eliminated entirely from the model.

**Q13 [1.00 mark], MCQ:** "Which of the following statements is true?"

A. Feature-1 can be discarded. B. **Feature-2 can be discarded (correct).** C. Any one of the two features can be discarded. D. Both features are equally important and neither can be discarded.

Since \(w_2^* = 0\), feature 2 contributes nothing to the prediction, so it can be discarded. Feature 1 has weight 1, so it matters. Answer: **B**.

**Q14 [2.00 marks], MSQ:** "Which of the following statements are true? Exactly two options are correct."

A. \(c_1 > c_2\) **(Correct)**
B. \(c_1 < c_2\)
C. Total loss at optimal point is \(c_1 + \lambda\) **(Correct)**
D. Total loss at optimal point is \(c_2 + \lambda\)

Since \(c_1\) is the outer (larger) ellipse and \(c_2\) is the inner (smaller, tighter) ellipse and the optimal touching point lies exactly ON the \(c_1\) contour (from the picture, the outer ellipse \(c_1\) is the one passing through the touching point \((1,0)\), not \(c_2\)), the SSE value at the optimum equals \(c_1\). The picture actually shows the outer ellipse \(f(w) = c_1\) as the one grazing the diamond vertex (the point of tangency), with the smaller, inner ellipse \(c_2\) representing an unreachable lower-loss region strictly inside the feasible area. So total loss \(= SSE(w^*) + \lambda \|w^*\|_1 = c_1 + \lambda(1) = c_1 + \lambda\) (since the diamond boundary value is \(\theta=1\) at that vertex, and by construction of the Lagrangian form, the penalty contributes \(\lambda\)). Also, since \(c_1\)'s ellipse is larger (further out) it must represent a higher, i.e. worse, SSE value than \(c_2\), confirming \(c_1 > c_2\).

**The trick to remember for this whole family:** the ellipse that actually touches the boundary constraint is the one whose "c" value equals the true optimal loss. Don't assume it is always the smaller ellipse; check the picture carefully; sometimes the smaller ellipse lies entirely inside the feasible region (meaning it is unreachable given the constraint, and hence not the answer) while the larger one is the one that is tangent to the boundary.

### 2.5 Worked PYQ: Mar 2025, Q2 [3.00 marks], MCQ — Ridge with explicit weight vector candidates

**Exact question:**

"Below is the constrained version of the ridge regression optimization problem: minimize \(\sum(w^T x_i - y_i)^2\) subject to \(\|w\|^2 \leq \theta\). Following are the weight vectors to be considered, along with the mean squared error (MSE) produced by each:

\(w_1 = (1,1,1,1)^T\), MSE=2
\(w_2 = (0,2,1,3)^T\), MSE=7
\(w_3 = (1,2,0,1)^T\), MSE=1
\(w_4 = (2,1,1,2)^T\), MSE=8

If \(\theta = 10\), which of the following weight vectors will be selected as the final weight vector by ridge regression?"

**The concept:** we must pick the weight vector with the **lowest MSE among all vectors satisfying the constraint \(\|w\|^2 \leq \theta\)**. First check feasibility (the norm-squared constraint), THEN among feasible options pick the one with lowest MSE (do not just pick lowest MSE blindly, and do not just pick smallest norm blindly).

\(\|w_1\|^2 = 1+1+1+1 = 4 \leq 10\), feasible.
\(\|w_2\|^2 = 0+4+1+9 = 14 > 10\), infeasible, discard.
\(\|w_3\|^2 = 1+4+0+1 = 6 \leq 10\), feasible.
\(\|w_4\|^2 = 4+1+1+4 = 10 \leq 10\), feasible (boundary, still satisfies \(\leq\)).

Among feasible \(\{w_1 \text{ (MSE 2)}, w_3 \text{ (MSE 1)}, w_4 \text{ (MSE 8)}\}\), the lowest MSE is \(w_3\) with MSE = 1.

Answer: **w3**. This matches the official key.

**The trick:** this question format (given several candidate weight vectors with their MSEs, pick the ridge-optimal one under a norm budget) always reduces to: (1) filter by the constraint, (2) minimize the objective among survivors. Students who forget step 1 and just pick globally lowest MSE will get this wrong when the lowest-MSE vector is infeasible.

### 2.6 Worked PYQ: Dec 2024, Q12 through Q13 [Bayesian view of regularization]

**Q12 [2.00 marks], MCQ:**

"Consider the following linear regression model: \(y_i | x_i = w^T x_i + \epsilon_i\), where the noise \(\epsilon \sim \mathcal{N}(0,1)\). For some \(\lambda > 0\), where \(\lambda \in \mathbb{R}\), MSE of \(\hat{w}_{ML}\) is greater than MSE of \(\hat{w}_{Ridge}\)."

Options: A. TRUE (correct) B. FALSE

**Why this is TRUE, conceptually:** the ML (maximum likelihood, which equals ordinary least squares here) estimator is unbiased but tends to have high variance, especially with limited or noisy data. Ridge regression introduces a small amount of bias but substantially reduces variance. This is the bias-variance tradeoff: for well-chosen lambda > 0, the total mean squared error of the Ridge estimator (bias^2 + variance) can be strictly lower than that of the unbiased ML estimator (which has zero bias but potentially high variance). This is a classical and famous statistical result (James-Stein phenomenon in spirit), and the exam expects you to know it as a TRUE statement, not to derive it from scratch.

**Q13 [4.00 marks], MCQ:** "Consider the Bayesian formulation of the linear regression problem, where the prior for w is assumed to be \(w \sim \text{Laplace}(0, 2/\lambda)\). Then, which among the following is true? Hint: If \(X \sim \text{Laplace}(\mu, b)\), then \(f_X(x) = \frac{1}{2b} e^{-|x-\mu|/b}\)"

The correct answer (option C) is: \(\hat{w}_{MAP} = \arg\min_w \left[ \sum(w^T x_i - y_i)^2 + \lambda \|w\|_1 \right]\), where \(\|w\|_1 = \sum |w_i|\)

**The concept, and why this is such an elegant trick to remember for the whole exam:** MAP estimation combines the likelihood and the prior. Taking the negative log of a Gaussian likelihood gives you the squared error term (this is where "Gaussian noise leads to L2 loss" comes from). Taking the negative log of a **Laplace prior** on w gives you a term proportional to \(|w_i|\), i.e., the L1 norm. So: **Gaussian prior on weights leads to Ridge (L2) regularization. Laplace prior on weights leads to LASSO (L1) regularization.** This is one of the most elegant and most-tested facts in the whole course: regularization is not an arbitrary "add a penalty" trick, it is literally doing Bayesian MAP estimation with a specific prior belief about the weights. Memorise this mapping cold: Gaussian likelihood + Gaussian prior = Ridge. Gaussian likelihood + Laplace prior = LASSO.

---

## Topic 3: Kernel Regression

### 3.1 The concept, from scratch

Sometimes a straight line just cannot fit your data well; the true relationship is curved. One elegant fix is to transform your features into a higher-dimensional space via a mapping \(\phi(x)\), fit a LINEAR model in that transformed space, and the result, when mapped back to the original space, looks like a curved, nonlinear fit.

The catch: computing \(\phi(x)\) explicitly can be very expensive if the transformed space has huge dimension. The **kernel trick** sidesteps this. Instead of ever computing \(\phi(x)\) explicitly, we define a kernel function \(K(x, x') = \phi(x)^T \phi(x')\), which directly gives us the dot product in the transformed space, computed cheaply using only the original \(x\) and \(x'\).

The most common kernel you will see in your papers is the **polynomial kernel**:

\[ K(x, x') = (1 + x^T x')^d \]

for degree \(d\) (sometimes written without the "+1", as \((x^T x')^d\); always check exactly which form the question specifies)

### 3.2 How predictions actually work: the weight vector via \(\alpha\)

In kernel regression, instead of computing \(w\) directly (which may live in an impossibly huge space), we express the weight vector as a combination of the transformed training points:

\[ w = \phi(X) \alpha \]

where \(\alpha\) is a vector of \(n\) coefficients (one per training point) and \(\phi(X)\) is the matrix whose columns are \(\phi(x_i)\)

The \(\alpha\) vector itself is found by solving \(\alpha = K^{-1} y\), where \(K\) is the \(n\) by \(n\) **kernel matrix** with \(K_{ij} = K(x_i, x_j)\).

The prediction for a new point \(x_{test}\) is:

\[ \hat{y}(x_{test}) = w^T \phi(x_{test}) = \alpha^T [K(x_1, x_{test}), K(x_2, x_{test}), \ldots, K(x_n, x_{test})]^T = \sum_i \alpha_i K(x_i, x_{test}) \]

**This formula, "prediction equals sum of alpha_i times kernel of training point i with the test point," is the single most exam-relevant fact in this whole topic.** You will use it over and over.

### 3.3 The trick for building the kernel matrix fast by hand

Given data points as columns of \(X\) (each \(x_i\) is a column), to build \(K\) with \(K(x,x') = (1 + x^T x')^d\):
1. Compute all pairwise dot products \(x_i^T x_j\) first (this is just \(X^T X\) if points are columns).
2. Add 1 to every entry.
3. Raise every entry to the power \(d\).

Do this systematically, entry by entry, in a small table. Do not try to shortcut it mentally for anything beyond 2x2; write the matrix out.

### 3.4 Worked PYQ: Dec 2024, Q2 [3.00 marks] and Q3 [4.00 marks] — building K and predicting

**Exact question (Q2):**

"Kernel regression with a polynomial kernel is applied on the following dataset with two features: \(X = \begin{bmatrix}1 & 0 & 0\\ 0 & 1 & 0\end{bmatrix}\), \(y = (2,1,2)^T\). Weight vector can be written as \(w = \phi(X)\alpha\), where \(\phi\) is the transformation mapping corresponding to the kernel \(k(x_i, x_j) = (1 + x_i^T x_j)^2\). The vector \(\alpha\) is given by \(K^{-1} y\), where \(K\) is the kernel matrix. Compute \(K\)."

Points (columns of X): \(x_1 = (1,0)\), \(x_2 = (0,1)\), \(x_3 = (0,0)\)

\(x_1^T x_1 = 1\), \(x_1^T x_2 = 0\), \(x_1^T x_3 = 0\)
\(x_2^T x_2 = 1\), \(x_2^T x_3 = 0\)
\(x_3^T x_3 = 0\)

\(K_{ij} = (1 + x_i^T x_j)^2\):

\(K_{11} = (1+1)^2 = 4\), \(K_{12} = (1+0)^2 = 1\), \(K_{13} = (1+0)^2 = 1\)
\(K_{22} = (1+1)^2 = 4\), \(K_{23} = (1+0)^2 = 1\)
\(K_{33} = (1+0)^2 = 1\)

\[ K = \begin{bmatrix} 4 & 1 & 1 \\ 1 & 4 & 1 \\ 1 & 1 & 1 \end{bmatrix} \]

Comparing against the given options, this exactly matches **Option D**: \(\begin{bmatrix} 4 & 1 & 1 \\ 1 & 4 & 1 \\ 1 & 1 & 1 \end{bmatrix}\). Confirmed correct.

**Q3:** "What will be the prediction for the data point \((1,-1)^T\)? Enter the answer correct to two decimal places." Answer key: **2.31 to 2.35** (a range, meaning the exact value should land inside).

I solved this in full: \(\alpha = K^{-1} y = (0, -0.333, 2.333)\) (approximately), and the kernel vector between the three training points and the test point \((1,-1)\) is \([(1+1(1)+0(-1))^2, (1+0(1)+1(-1))^2, (1+0)^2] = (4, 0, 1)\). Prediction \(= \alpha^T (4,0,1) = 0(4) + (-0.333)(0) + 2.333(1) =\) **2.333**, which sits inside the given range 2.31 to 2.35. Confirmed correct by direct computation.

**The trick for these two-part questions:** always build \(K\) first (part 1), invert it to get \(\alpha\) (this you often do not need to write out fully, since the question typically only asks for \(K\) itself as an MCQ, then gives you the actual prediction as an SA in the next part, meaning you must still do the full \(\alpha\) computation even though it was not asked for explicitly in part 1). Keep exact fractions rather than rounding \(\alpha\), since prediction errors compound quickly with 2 decimal place answers.

### 3.5 Worked PYQ: Mar 2025, Q9 [4.00 marks] — kernel prediction with given \(\alpha\) (the easy version)

**Exact question:**

"Consider a kernel regression problem on the following dataset with two features: \(\{(x_1,y_1),(x_2,y_2),(x_3,y_3)\}\) where \(x_1=(1,2)^T\), \(y_1=3\), \(x_2=(2,3)^T\), \(y_2=5\), \(x_3=(3,4)^T\), \(y_3=7\). The kernel function is given as \(K(x,x') = (1+x^Tx')^2\) and the optimal coefficients \(\alpha_i\) are given as: \(\alpha = (0.5, 1.0, 1.5)^T\). Then, what will be the predicted value for the data point \((2,2)^T\)?"

This is the "easy version" of the family because \(\alpha\) is given directly, so you skip inverting K entirely and jump straight to the prediction formula.

\(K(x_1, x_t) = (1 + 1\cdot2+2\cdot2)^2 = (1+2+4)^2 = 7^2 = 49\)
\(K(x_2, x_t) = (1 + 2\cdot2+3\cdot2)^2 = (1+4+6)^2 = 11^2 = 121\)
\(K(x_3, x_t) = (1 + 3\cdot2+4\cdot2)^2 = (1+6+8)^2 = 15^2 = 225\)

Prediction \(= 0.5(49) + 1.0(121) + 1.5(225) = 24.5 + 121 + 337.5 =\) **483**

This matches the official answer of 483 exactly, verified by direct computation.

**The trick:** whenever \(\alpha\) is handed to you directly, this becomes a two-minute problem: compute the kernel value between each training point and the test point, multiply by the corresponding \(\alpha\), sum. Do not waste time trying to reconstruct \(w\) or \(\phi(x)\) explicitly; you never need to.

### 3.6 Worked PYQ: Aug 2024, Q4 [3.00 marks] — solving BACKWARD for an unknown \(\alpha\) coefficient

**Exact question:**

"Consider the following dataset for a kernel regression problem with a polynomial kernel of degree two along with the coefficient vector \(\alpha\): \(X = \begin{bmatrix}1 & 0 & -1 & 0 \\ 0 & 1 & 0 & -1\end{bmatrix}\), \(y=(1,-1,2,-2)^T\), \(\alpha = (\alpha_1, -0.625, \alpha_3, \alpha_4)^T\). If the prediction for the data-point \((1,1)^T\) is 0, find the value of \(\alpha_1\)."

Notice this kernel is written simply as \(k(x,x') = (x^Tx')^2\) (no "+1" inside, degree two, "polynomial kernel of degree two" without further clarification given in this particular paper's phrasing, though always double check the exact formula stated). Points: \(x_1=(1,0)\), \(x_2=(0,1)\), \(x_3=(-1,0)\), \(x_4=(0,-1)\). Test point \(x_t=(1,1)\).

\(K(x_1,x_t) = (1\cdot1+0\cdot1)^2 = 1\)
\(K(x_2,x_t) = (0\cdot1+1\cdot1)^2 = 1\)
\(K(x_3,x_t) = (-1\cdot1+0\cdot1)^2 = 1\)
\(K(x_4,x_t) = (0\cdot1+(-1)\cdot1)^2 = 1\)

Prediction \(= \alpha_1(1) + (-0.625)(1) + \alpha_3(1) + \alpha_4(1) = 0\)

This alone is not enough to isolate \(\alpha_1\) unless the paper's earlier sub-parts pin down \(\alpha_3\) and \(\alpha_4\) (this question is part of a multi-part context problem; on the actual exam, earlier sub-parts of the same context typically fix these other values, often via the same \(K^{-1}y\) relationship, or the problem intends a kernel that gives different coefficients per point so that only \(\alpha_1\) survives). The official answer key states the answer is **0.625**. Working backward: this requires \(\alpha_3 = \alpha_4 = 0\) given the structure of the problem (which is consistent if the polynomial kernel used is actually \((1+x^Tx')^2\), giving nonzero cross terms that differentiate the points; recomputing \(K(x_1,x_t) = (1+1)^2=4\), \(K(x_2,x_t)=(1+1)^2=4\), \(K(x_3,x_t)=(1-1)^2=0\), \(K(x_4,x_t)=(1-1)^2=0\), giving \(4\alpha_1 - 0.625(4) + 0 + 0 = 0\), so \(\alpha_1 = 0.625\)). This matches the official key.

**The important lesson here, and the real trick:** always use the kernel formula **exactly as stated in that specific question**, including whether there is a "+1" inside or not, since this dramatically changes which points end up with zero kernel value (and hence which alpha terms vanish from the equation). A "+1" inside a polynomial kernel is what allows lower-degree interaction terms to survive; without it, orthogonal points always give kernel value 0, which is often the deliberate structure the question is testing.

### 3.7 Conceptual MCQs on kernels

**Mar 2025, Q7 [3.00 marks], MSQ:** "Polynomial kernel in kernel regression model is expressed as \(K(x,x') = (x^Tx' + 1)^d\). What role does \(K(x,x')\) play in kernel regression?"

Correct answers: B. "It computes the similarity between data points in a transformed feature space." and C. "It allows the model to capture non-linear relationships by mapping data to a higher-dimensional space." Both correct simultaneously; this is the core conceptual definition of a kernel, memorise both halves of it.

**Apr 2026, Q14 [2.00 marks], MCQ:** "Let the linear regression model's solution be written as \(w^* = X\alpha\), where \(\alpha = (\alpha_1,\ldots,\alpha_n)^T \in \mathbb{R}^n\). Let \(k: \mathbb{R}^d \times \mathbb{R}^d \to \mathbb{R}\) be a valid kernel function. What will be the prediction for an unseen data point \(x_{test}\)?"

Correct answer: \(\sum_{i=1}^{n} \alpha_i k(x_i, x_{test})\). This is exactly the prediction formula from section 3.2; the exam directly tests whether you have it memorised as a standalone fact, no computation needed.

---

## Topic 4: k-Nearest Neighbours (k-NN)

### 4.1 The concept, from scratch

k-NN is refreshingly simple among the models tested: to predict the label of a new point, find the k closest training points (by Euclidean distance, unless stated otherwise), and:
- For **classification**: take a majority vote among their labels.
- For **regression**: take the average of their y-values.

There is no training phase in the usual sense; the "model" is just the stored training data. This is called a "lazy" or "instance-based" learner.

### 4.2 The trick for computing distances fast

Euclidean distance between two points \(a\) and \(b\) in \(d\) dimensions is \(\sqrt{\sum_j (a_j - b_j)^2}\). You almost never need the square root itself for comparison purposes; comparing squared distances is equivalent and saves you a step, since the square root function is monotonic. Only take the square root at the very end if the question explicitly asks for a distance value.

### 4.3 A subtle but heavily tested trick: "each point is its own neighbour" during LOOCV / training error evaluation

Several of your PYQs include the specific instruction: "each point is considered its own neighbour during classification," or discuss k-NN training error. Here is the key insight: **when evaluating training error with k-NN where each point counts as its own neighbour, a point's own label is always included among its k nearest neighbours (distance 0 to itself).** This means for odd k, if a point's own label matches the majority of the remaining k-1 real neighbours, or if the point's own vote alone can tip a close vote, training error tends to be very low or even zero, especially for small k. This is exactly why questions like "what's the minimum number of misclassifications" so often have the answer **0**: with the point itself always voting for its own correct label, it becomes very hard for it to be misclassified except in specific adversarial configurations.

### 4.4 Worked PYQ: Dec 2024, Q10 and Q11, and the nearly identical Mar 2024, Q3 [MCQ / SA pattern]

**Exact question (Dec 2024, Q10 and Q11, and repeated with 80/40 points in Mar 2024, Q2 and Q3):**

"Consider a binary classification problem with a training dataset of 100 points, evenly distributed between two classes (50 points in each class). You decide to train a k-NN algorithm with k=3. Each point is considered its own neighbor during classification. What is the minimum number of misclassifications that can occur in the training dataset when using this k-NN algorithm?"

Answer: **0**

**Why:** because each point counts itself as a neighbour, and with k=3, a point plus any 2 same-labelled neighbours (which we can always arrange to exist favourably in the minimum-error scenario) forms a majority. Since we are asked for the MINIMUM possible misclassifications (i.e., the best-case arrangement of the data, not a worst case), we can always construct or imagine a data layout where same-class points cluster together so tightly that every point's 2 nearest actual neighbours share its label, achieving zero training error.

**The related TRUE/FALSE flip (Dec 2024, Q11 and Mar 2024, Q3):**

"Assuming there are outliers, the decision boundary becomes smoother with decreasing value of k in a k-NN algorithm." Answer: **FALSE** in Dec 2024's phrasing (decreasing k does NOT smooth the boundary), and correspondingly the Mar 2024 paper phrases it as "the decision boundary becomes smoother with INCREASING value of k" with fill in 1 for yes, and the correct answer is **1 (yes)**.

**The concept behind this, which is one of the most fundamental facts in all of k-NN:** small k (like k=1) makes the decision boundary highly jagged and sensitive to individual points, including outliers and noise, because each region is governed by just one or a few nearby points. Large k averages over more neighbours, smoothing the boundary and making it less sensitive to individual outliers, though too-large k can cause underfitting (oversmoothing, ignoring local structure). So: **smaller k = more jagged, more overfit-prone, more sensitive to outliers. Larger k = smoother, more stable, more underfit-prone.** This single fact answers a huge fraction of the conceptual TRUE/FALSE and MCQ questions on k-NN across all six papers.

### 4.5 Worked PYQ: Aug 2024, Q2 [3.00 marks], MSQ — which classifiers can always achieve zero training error

**Exact question:**

"Which of the following classifiers are certainly capable of achieving zero training error for any binary classification problem with features in \(\mathbb{R}^2\)? Note: while computing the training error for k-NN, each data-point is its own neighbor."

Options: A. Decision tree (Correct) B. KNN with k=1 (Correct) C. KNN with k=5 D. Naive Bayes

**Why A and B, and not C or D:** A decision tree, grown without depth restriction, can always keep splitting until every leaf contains points of a single class (unless there are literally duplicate feature vectors with conflicting labels), so it can always achieve zero training error. **k-NN with k=1** always predicts each training point as its own single nearest neighbour (distance zero to itself, which strictly beats any other point's distance unless there is an exact duplicate location), so it trivially achieves zero training error. But **k-NN with k=5** averages over 5 neighbours (including itself only as 1 of the 5 votes), so if the surrounding 4 real neighbours disagree with the point's own label, misclassification is possible; k=5 is NOT guaranteed to achieve zero error. **Naive Bayes** makes a strong independence assumption about features, and its decision boundary is constrained by this assumption (in the Gaussian case, for instance, it is often not flexible enough to perfectly separate arbitrary data), so it too is not guaranteed to achieve zero training error.

**The trick:** whenever this "certainly / guaranteed to achieve zero training error" phrasing appears, mentally check each model against this checklist: unrestricted decision trees, yes; k=1 nearest neighbour, yes; any model with a rigid, low-flexibility assumption (Naive Bayes, plain unregularized-but-underparametrized linear models, or k-NN with k > 1), generally no, unless the specific dataset happens to cooperate.

### 4.6 Worked PYQ: Aug 25, Q10, Apr 2026, Q15 — 3-NN regression with distance computation

**Exact question (Aug 2025, Q10):**

"Perform a 3-NN regressor for the following dataset:

| \(x_1\) | \(x_2\) | y |
|---|---|---|
| 1 | 2 | 3.5 |
| 2 | 1 | 2.8 |
| 3 | 3 | 5.1 |
| 4 | 2 | 4.7 |
| 5 | 3 | 6.2 |
| 6 | 1 | 5.9 |

where \(x = (x_1, x_2)^T\) is a feature vector and y is the label. What will be the predicted value for the test data point \((3, 2)^T\)? Enter the answer correct to one decimal place."

**Solution:** compute the Euclidean distance from (3,2) to each point:

To (1,2): \(\sqrt{2^2+0^2}=2.000\)
To (2,1): \(\sqrt{1^2+1^2}=1.414\)
To (3,3): \(\sqrt{0^2+1^2}=1.000\)
To (4,2): \(\sqrt{1^2+0^2}=1.000\)
To (5,3): \(\sqrt{2^2+1^2}=2.236\)
To (6,1): \(\sqrt{3^2+1^2}=3.162\)

The three smallest distances are to (3,3) [dist 1.000, y=5.1], (4,2) [dist 1.000, y=4.7], and (2,1) [dist 1.414, y=2.8].

Prediction \(= \text{average}(5.1, 4.7, 2.8) = 12.6/3 =\) **4.2**

This matches the official answer of 4.2 exactly, confirmed by direct computation.

**Apr 2026, Q15** is the same template with a different dataset (points at (2,3),(1,4),(4,2),(3,5),(5,2),(2,1) with y values 4.1,3.2,5.5,6.8,7.1,3.9, and test point (2,2)). The three nearest points are (2,3) [dist 1.0], (2,1) [dist 1.0], and (4,2) [dist 2.0], giving a tie for third place with (1,4) at distance \(\sqrt{1+4}=2.236\), so the closest three unambiguously are (2,3), (2,1), and then whichever of (4,2)/(others) is genuinely closest at distance 2.0 versus 3.0 versus 2.236; working through it carefully, the three nearest are (2,3) d=1.0, (2,1) d=1.0, (1,4) d=2.236 is actually beaten by (4,2) at d=2.0, so the three nearest are (2,3),(2,1),(4,2) with y-values 4.1, 3.9, 5.5, giving average \(= 13.5/3 = 4.5\), matching the official answer of **4.5**.

**The trick for k-NN regression:** always build a small table of (point, distance, y-value), sort by distance, take the top k, average their y column. Do not skip writing the table; under exam pressure this is where arithmetic slips happen.

### 4.7 Worked PYQ: Mar 2025, Q13 and Q14 [LOOCV with k-NN, the hardest k-NN question type]

**Exact question:**

"Consider the following 2D data points along with its labels:

| x | y |
|---|---|
| (1,1) | 1 |
| (1,-1) | 1 |
| (2,1) | 1 |
| (2,2) | 1 |
| (2,-2) | 0 |
| (3,-3) | 0 |
| (4,-1) | 1 |

**Q13:** If we use a k-NN algorithm with k=3, what would be the predicted label for \(x_{test} = (4,0)^T\)?"

Distances from (4,0) to each point: to (1,1): \(\sqrt{9+1}=3.16\); to (1,-1): \(\sqrt{9+1}=3.16\); to (2,1): \(\sqrt{4+1}=2.24\); to (2,2): \(\sqrt{4+4}=2.83\); to (2,-2): \(\sqrt{4+4}=2.83\); to (3,-3): \(\sqrt{1+9}=3.16\); to (4,-1): \(\sqrt{0+1}=1.00\).

Three nearest: (4,-1) (d=1.00, label 1), (2,1) (d=2.24, label 1), then a near-tie between (2,2) and (2,-2) (both d=2.83, labels 1 and 0 respectively). Taking the officially-listed nearest three as (4,-1), (2,1), (2,-2) (label 1,1,0) gives majority label **1**, matching the official answer key of 1.

**Q14 [3.00 marks]: "Compute the Leave-one-out cross validation (LOOCV) error for the 3-nearest neighbour (3-NN) algorithm on this dataset. Enter the answer correct to two decimal places."**

This is the single most labour-intensive k-NN question type in your papers, and it is worth understanding the procedure precisely because it reappears in Mar 2025 Q15 as a genuine follow-up ("is it possible to reduce the CV error by changing some labels", answer YES) and shows up conceptually elsewhere too.

**LOOCV procedure:** for EACH point in the dataset, temporarily remove it, find its 3 nearest neighbours among the REMAINING points only, predict its label by majority vote of those 3, and check if that prediction matches the true label. Do this for every point, count the number of mismatches, divide by total number of points, and that fraction is your LOOCV error.

I carried out this full computation programmatically for all 7 points, and found that under leave-one-out, points at index 4 (the point (2,-2), true label 0) and index 5 ((3,-3), true label 0) and index 6 ((4,-1), true label 1) get misclassified when their own vote is removed from consideration (their nearest surviving neighbours are dominated by the majority class 1), giving 3 misclassifications out of 7 points, for a LOOCV error of \(3/7 \approx\) **0.4286**, which falls inside the official answer range of 0.41 to 0.45. Confirmed correct.

**The trick and the warning:** LOOCV with k-NN is fundamentally different from ordinary training-set evaluation, because you are NOT allowed to let a point vote for itself (unlike the "each point is its own neighbour" training-error questions in section 4.3 to 4.5). This is the number one point of confusion students have between these two question families. Always ask: does the question say "training error" (point counts as its own neighbour, error is often 0) or "leave-one-out cross validation error" (point is excluded from its own neighbour search, error is typically nonzero and must be computed point by point)? These are two completely different computations that use very similar-sounding language.

---

## Topic 5: Decision Trees and Entropy

### 5.1 The concept, from scratch

A decision tree classifies data by asking a sequence of yes/no questions about feature values (like "is \(x_1 \leq 1.5\)?"), splitting the data at each node into two (or more) child nodes, until it reaches "pure" leaf nodes where (ideally) all points share the same label, or some stopping criterion is met.

The central question in building a tree is: **at each node, which question should we ask?** We want the question that gives us the greatest reduction in "impurity." Impurity is most commonly measured by **entropy**:

\[ E(p) = -p \log_2(p) - (1-p) \log_2(1-p) \]

where \(p\) is the fraction of positive-class (label 1) points in that node. Entropy is 0 when the node is completely pure (\(p=0\) or \(p=1\), meaning \(\log_2(0)\) is treated as contributing 0 to that term) and reaches its maximum value of 1 when \(p = 0.5\) (maximum uncertainty, a perfect 50-50 mix).

**Information gain** measures how much a proposed split reduces entropy:

\[ IG = Entropy(parent) - \left[ \frac{n_{left}}{n_{total}} Entropy(left) + \frac{n_{right}}{n_{total}} Entropy(right) \right] \]

The best question to ask at a node is the one that maximizes information gain (equivalently, minimizes the weighted average entropy of the resulting children).

### 5.2 The trick: p=0.5 is always the worst case, and you can eyeball many entropy comparisons without a calculator

Since entropy is maximized exactly at \(p=0.5\) and decreases symmetrically as \(p\) moves toward 0 or 1, you can often answer "which split is better" questions purely by eyeballing how far each resulting node's \(p\) is from 0.5, without computing exact log values. A node with \(p=0.9\) or \(p=0.1\) is much purer (lower entropy) than a node with \(p=0.6\) or \(p=0.4\). This lets you answer many "which question is better for this split" MCQs by inspection.

### 5.3 Worked PYQ: Mar 2025, Q4 and Q6 [conceptual entropy facts, MCQ]

**Q4 [2.00 marks]:** "p is the proportion of points with label 1 in some node in a decision tree. Which of the following statements are true?"

Correct answer: **D. \(p = 0.5\) corresponds to the case of maximum impurity.** (Not A or B, which wrongly claim impurity monotonically increases or decreases across the whole 0-to-1 range; it is actually a symmetric hump peaking at 0.5. Not C, since impurity absolutely does depend on \(p\).)

**Q6 [4.00 marks], "which question is better for the root node," a fully worked entropy comparison:**

"Consider the following feature (x) along with its label (y):

| x | y |
|---|---|
| 1 | 1 |
| -1 | 1 |
| 2 | 1 |
| -2 | 0 |
| 3 | 0 |
| 4 | 1 |

If you are provided with the following two questions, which one should you choose for the first (top) node of the decision tree? (a) \(x \leq -2\) (b) \(x \leq -1\). Recall: Information gain \(= Entropy(D) - \gamma \cdot Entropy(D_{Yes}) - (1-\gamma) Entropy(D_{No})\). Use \(\log_2(3/4)=-0.41\), \(\log_2(4/5)=-0.32\), \(\log_2(1/5)=-2.32\), \(\log_2(1/4)=-2\), \(\log_2(1/2)=-1\)."

Root: 4 positive (label 1), 2 negative (label 0) out of 6, so \(p_{root} = 4/6 = 2/3\).

\(E(root) = -(2/3)\log_2(2/3) - (1/3)\log_2(1/3)\). Using the hint values is the key trick here: the exam gives you exact log values to plug in so you never need a calculator; just match the fractions you compute to the ones given in the hint.

**For split (a) \(x \leq -2\):** Only \(x=-2\) satisfies this (1 point, label 0). \(D_{Yes} = \{\text{label } 0\}\), pure, entropy 0. \(D_{No}\) = the other 5 points {1,1,1,0,1} i.e. 4 positive 1 negative, \(p=4/5\). \(E(D_{No})\) uses \(\log_2(4/5)\) and \(\log_2(1/5)\), both given in the hint. \(\gamma = 1/6\).

**For split (b) \(x \leq -1\):** \(x=-2\) and \(x=-1\) satisfy this (2 points: label 0 and label 1). \(D_{Yes}\) has 1 positive, 1 negative, \(p=0.5\), which is the WORST possible entropy (E=1, maximum impurity) by the very fact from Q4 above. \(D_{No}\) = remaining 4 points {1,1,0,1}, 3 positive, 1 negative, \(p=3/4\), using \(\log_2(3/4)\) from the hint.

Because split (a) produces one perfectly pure child (entropy exactly 0) and a fairly skewed second child (\(p=4/5\), fairly pure), while split (b) produces a maximally impure child (\(p=0.5\), the worst possible), split (a) intuitively gives more information gain. The official answer confirms: **(a)** is correct.

**The trick:** before grinding through the arithmetic, always check first whether one candidate split produces a perfectly pure child (entropy 0) while the other does not, or whether one produces a p=0.5 child (worst possible). These extreme cases usually let you shortcut straight to the answer without computing exact information gain numbers, though you should still show the computation for full marks on SA-format sub-questions.

### 5.4 Worked PYQ: Aug 2024, Q15 to Q19 [the decision tree from a table plus a drawn tree diagram, a five-part mega-question]

**Exact shared context:**

"Consider the following training dataset for a binary classification problem with the data-points in \(\mathbb{R}^2\), the labels in the set {0,1} and a decision tree grown from it that achieves zero training error:

\(X = \begin{bmatrix}-2 & -0.9 & 0.9 & 2 & -2 & -0.9 & 0.9 & 2 \\ 1 & 0.9 & 0.9 & 1 & -1 & -0.9 & -0.9 & -1\end{bmatrix}\), \(y=(1,1,0,0,0,1,1,0)^T\)

[A drawn tree: root question \(x_1 < a\); left child asks \(x_2 < b\), right child asks \(x_2 < b\); four leaves are 0,1,1,0 reading left to right]"

**Q15 and Q16, "if a and b are integers... what is the value of a? What is the value of b?"** Both answers are **0**.

**How to find this without heavy computation, just by plotting mentally (the question's own hint says "plotting the dataset helps"):** the 8 points sit at x1 values of either -2, -0.9, 0.9, or 2 (four points with x2 around +1, four with x2 around -1). The root splits on x1 < a. Looking at labels: points with x1 in {-2,-0.9} (negative x1) versus x1 in {0.9,2} (positive x1) show a clean pattern when combined with the sign of x2. Since a and b must be integers and the actual x-values cluster tightly around -0.9, 0.9 (never crossing 0 except in sign), the only integer values that correctly separate the clusters by sign are **a=0 and b=0**. This is really testing whether you can read "the data splits cleanly by the SIGN of each coordinate" and realize the threshold integer that captures a sign-split is simply 0.

**Q17 [1.00 mark]: "Find the entropy of the root node. Use \(\log_2\)."** Answer: **1**. With 4 positive and 4 negative labels out of 8 (count them: \(y=(1,1,0,0,0,1,1,0)\), that is four 1s and four 0s), \(p=0.5\) exactly, so entropy is at its maximum value of exactly 1 bit. This is another instance of the p=0.5 shortcut: you should recognize this immediately without any log computation once you count 4-and-4.

**Q18 [2.00 marks]: "If \(E_R\) is the entropy of the root and \(E_L\) is the weighted entropy of all the leaves, what is \(E_R - E_L\)? Use \(\log_2\)."** Answer: **1**. Since the tree achieves ZERO training error (stated explicitly in the problem), every leaf must be perfectly pure, meaning every leaf has entropy exactly 0. So \(E_L\) (the weighted average of all leaf entropies) = 0 automatically, no matter what the weights are. Therefore \(E_R - E_L = E_R - 0 = E_R = 1\) (from Q17). **This is the single most valuable shortcut in this entire section: whenever a problem explicitly tells you the tree achieves zero training error, EVERY leaf has entropy 0, and the full information gain of the entire tree equals the root entropy alone.** Do not waste time computing each leaf's entropy separately; it is provably zero by the zero-training-error condition.

**Q19 [1.00 mark]: "What is the predicted label of the test data-point \((3,-4)^T\)?"** Answer: **1**. Trace the tree: root asks \(x_1 < 0\)? Test point has \(x_1=3\), so "No" branch, going to the right child which asks \(x_2 < 0\). Test point has \(x_2=-4\), so "Yes" branch (since \(-4 < 0\)), landing at the leaf reading "1" (reading the tree diagram's right-side subtree, Yes branch leaf). Answer: **1**, matching the key.

### 5.5 Worked PYQ: Apr 2026, Q8, Q9, Q10 [entropy and information gain, full manual computation]

**Exact question:**

"Consider a node in a decision tree that has 5 data-points. The i-th data-point is represented by a feature-label pair \((x_i, y_i)\), where \(y_i \in \{-1, 1\}\). Consider the split \(x \leq 7\) at the parent node resulting in left and right child nodes. The left child node has all data points for which \(x \leq 7\) is true. Entropy is used to determine the purity of the nodes. Recall the formula \(E(p) = -p\log_2 p - (1-p)\log_2(1-p)\), where \(p\) is the fraction of positive data-points in the node. Use at least three digits after the decimal point.

| i | \(x_i\) | \(y_i\) |
|---|---|---|
| 1 | 4 | -1 |
| 2 | 10 | 1 |
| 3 | 13 | 1 |
| 4 | 25 | 1 |
| 5 | 38 | -1 |

**Q8: Find the entropy of the parent node.**"

Parent has 5 points, 3 positive (y=1) and 2 negative (y=-1), so \(p = 3/5 = 0.6\).

\(E(0.6) = -0.6\log_2(0.6) - 0.4\log_2(0.4) = -0.6(-0.737) - 0.4(-1.322) = 0.4422 + 0.5288 =\) **0.971**

This falls inside the official answer range 0.87 to 1.07. Confirmed by direct computation.

**Q9: Find the entropy of the right child.**

Split \(x \leq 7\): left child = {point 1, x=4}, which has only y=-1 (one point, pure). Right child = {points 2,3,4,5, i.e. x=10,13,25,38}, with y-values [1,1,1,-1], so 3 positive out of 4, \(p=0.75\).

\(E(0.75) = -0.75\log_2(0.75) - 0.25\log_2(0.25) = -0.75(-0.415) - 0.25(-2) = 0.311 + 0.5 =\) **0.811**

This falls inside the official range 0.71 to 0.91. Confirmed.

**Q10: Find the information gain.**

Left child entropy = 0 (pure, single point). Right child entropy = 0.811 (from Q9), with weight 4/5. Left weight is 1/5.

\(IG = E(parent) - \left[\frac{1}{5}(0) + \frac{4}{5}(0.811)\right] = 0.971 - 0.649 =\) **0.322**

This falls inside the official range 0.22 to 0.42. Confirmed.

**The trick for this whole family:** always compute the parent entropy first (it gets reused across multiple sub-questions), then split the data by the given threshold, count positives and negatives in each child carefully (this is where students most often slip: miscounting which points land in which child), compute each child's entropy, and combine using the sample-count weights (NOT equal weights unless the split happens to be even).

### 5.6 Worked PYQ: Aug 2025, Q15 and Q16 [medical diagnosis, root entropy and information gain with unequal splits]

**Exact question:**

"Suppose you want to build a decision tree to help diagnose a certain disease based on patient data. You have a dataset of 1000 patients labeled as either positive or negative. Here, positive represents patients with the disease and negative represents no disease. One of the features used to diagnose is headache. Below is the breakdown of the patients reporting headache: Headache present: 300 positive, 50 negative. Headache not present: 100 positive, 550 negative.

**Q15: What is the entropy of the root node? Enter the answer correct to two decimal places.**"

Total positive = 300+100 = 400. Total negative = 50+550 = 600. Total = 1000. \(p = 400/1000 = 0.4\).

\(E(0.4) = -0.4\log_2(0.4) - 0.6\log_2(0.6) = -0.4(-1.32) - 0.6(-0.74) = 0.528+0.444 =\) **0.97**, matching the official range 0.95 to 0.99.

**Q16: What is the information gain for choosing the feature "headache" for splitting at the root node?**

Headache present: 350 points total (300 pos, 50 neg), \(p=300/350=0.857\).
Headache absent: 650 points total (100 pos, 550 neg), \(p=100/650=0.154\).

\(E(0.857)\): using the hint \(\log_2(0.86)=-0.22\) and its complement \(\log_2(0.14)=-2.84\): \(E \approx -0.857(-0.22)-0.143(-2.84) \approx 0.1885+0.406=0.5947\), roughly matching my precise computation of 0.5917.

\(E(0.154)\): using hint \(\log_2(0.15)=-2.74\) and \(\log_2(0.85)=-0.23\): \(E \approx -0.154(-2.74)-0.846(-0.23) \approx 0.422+0.195=0.617\), close to my precise 0.6194.

\(IG = 0.97 - \left[\frac{350}{1000}(0.5917) + \frac{650}{1000}(0.6194)\right] = 0.97 - [0.207+0.4026] = 0.97-0.6096 =\) **0.36**, matching the official range 0.34 to 0.38.

**The trick:** whenever a question gives you a table of counts broken down by a candidate feature (like "headache present/absent"), treat each category as a child node, compute p for each using ITS OWN counts (not the overall dataset counts), weight by the fraction of the total dataset each category represents, and always use the provided log hint values rather than trying to compute logs from scratch, since the hint values are calibrated exactly to the fractions you will need. If your own computed fraction does not exactly match a hint value, round to the nearest one given; the exam's tolerance ranges account for this.

### 5.7 Worked PYQ: Aug 2025, Q11 and Q12, and Dec 2024 Q9 [reading a tree diagram directly, and true/false tree facts]

**Aug 2025, Q11 [3.00 marks], MCQ:** "Consider the following decision tree for a binary classification problem with two features f1 and f2 [root: \(f_1 \leq 1.5\); Yes-> node \(f_1<0\); No-> node \(f_2<0\); and so on down to four leaves]. Which among the following represents the correct decision boundary for the decision tree?" This asks you to translate a tree into a 2D partitioned rectangle picture. **Answer: option B.** The trick here is purely mechanical: draw the \(f_1=1.5\) vertical line first (this is the very first, most dominant split, so it should be the LONGEST line in your picture, cutting across the full range of \(f_2\)). Then within each half, draw the secondary lines (\(f_1<0\) within the left region, \(f_2<0\) within the right region) only within their respective half-planes, not across the whole picture. Many wrong options in these MCQs draw a secondary split line extending across the entire plot instead of confining it to the correct half; watch for that specific error type when eliminating options.

**Dec 2024, Q9 [4.00 marks], MSQ, "select all true statements" about trees and kNN together (a mixed conceptual question):**

A. "In Decision tree, if a question Q1 is 'better' than question Q2, then information gain for Q1 is greater than information gain for Q2 always." **(Correct)** — this is essentially the definition of "better" in this context; a tautology once you accept that "better" is being defined via information gain.

D. "The depth of the tree is a hyperparameter and has to be chosen using cross validation." **(Correct)** — tree depth is not learned from the training data directly the way weights are; it is a hyperparameter controlling model complexity, and like any hyperparameter it should be tuned via cross-validation to avoid both underfitting (too shallow) and overfitting (too deep).

E. "Decision trees are prone to underfit if the maximum depth is set too low." **(Correct)** — a shallow tree cannot capture complex patterns, causing underfitting. (Careful: the Mar 2024 paper phrases a very similar option E as "prone to OVERFIT if maximum depth is set too LOW," which is the WRONG pairing and correctly marked as NOT correct in that paper; always read the direction of the word pairing (underfit-with-low-depth is correct; overfit-with-low-depth is incorrect) extremely carefully, since this exact flip is clearly a deliberately placed trap across different versions of the same question bank.)

B (Dec 2024 version, marked NOT correct there): "The training dataset is not required while predicting the label of a test-point in the k-NN algorithm." This is FALSE, since k-NN is instance-based and needs the full training set at prediction time (there is no compact learned model). Interestingly, the Mar 2024 version of this same question flips the wording to "The training dataset IS required..." and marks THAT as correct, again showing the exam bank likes to invert true/false phrasing between sittings. Always read the exact wording on your specific paper rather than pattern-matching from memory to a previous version.

C (both versions, NOT correct): "A question of the form \(f_k \leq \theta\) always partitions the dataset into two non-empty sets." This is FALSE in general: if \(\theta\) is smaller than every value of \(f_k\) in the dataset, or larger than every value, one of the two resulting partitions is empty. The word "always" is the giveaway red flag in this option; watch for absolute words like "always," "never," "certainly," "guaranteed" in decision tree true/false statements, since they are frequently the trap.

---

## Topic 6: Naive Bayes

### 6.1 The concept, from scratch

Naive Bayes is a **generative** classification model (see Topic 7 for the generative-versus-discriminative distinction). Instead of directly modelling the decision boundary, it models how the data was probabilistically generated, separately for each class, and then uses Bayes' rule to flip that around into a classification decision.

For a binary label \(y \in \{0,1\}\) and features \(f_1, f_2, \ldots, f_m\), the "naive" part of Naive Bayes is the assumption that all features are **conditionally independent given the class label**:

\[ P(f_1, f_2, \ldots, f_m \mid y) = P(f_1|y) \cdot P(f_2|y) \cdots P(f_m|y) \]

This is a strong and often unrealistic assumption (features are rarely truly independent), but it dramatically simplifies both the number of parameters needed and the computation, and works surprisingly well in practice.

To classify a new point \(x_{test} = (f_1, f_2, \ldots, f_m)\), compute, for each class \(y\):

\[ Score(y) = P(y) \cdot P(f_1|y) \cdot P(f_2|y) \cdots P(f_m|y) \]

and predict whichever class has the higher score. (Technically this is proportional to the posterior \(P(y|x)\) by Bayes' rule; you do not need to normalize by \(P(x)\) since it is the same for every class and does not affect which score is larger.)

### 6.2 Parameters: binary features versus Gaussian features

If a feature \(f_i\) is **binary** (0 or 1), then \(P(f_i=1 \mid y)\) is estimated directly as the fraction of training points in class \(y\) that have \(f_i=1\) (this is the maximum likelihood estimate, simply a sample proportion). This is written \(p_i^y\) in your exam's notation.

If a feature is **continuous / Gaussian**, then \(P(f_i \mid y)\) is modelled as a Normal distribution with some mean and variance, and you estimate the sample mean and variance from the training points in that class.

### 6.3 The trick for counting parameters (a very frequently and reliably tested question type)

**How many parameters does a Naive Bayes model need?** This is one of the single most reliable question types across ALL SIX of your papers, appearing in slightly different clothing every time. Here is the master formula.

For \(k\) classes and \(m\) binary features:
- We need \((k-1)\) parameters to specify \(P(y)\) (since the probabilities across \(k\) classes must sum to 1, only \(k-1\) are free; for binary classification \(k=2\), this is just 1 parameter: \(p = P(y=1)\)).
- For EACH class, and EACH feature, we need 1 parameter: \(P(f_i=1|y)\). With \(m\) features and \(k\) classes, that is \(km\) parameters.
- Total: \((k-1) + km\)

For binary classification (\(k=2\)) specifically, this simplifies to \(1 + 2m\).

**Compare this to the number of parameters needed WITHOUT the conditional independence (naive) assumption**, i.e., for a fully general joint distribution over \(m\) binary features: you would need, for each class, \((2^m - 1)\) free parameters to specify the full joint distribution over all \(2^m\) possible feature combinations (again minus 1 because probabilities sum to 1), plus \((k-1)\) for the class prior. Total: \((k-1) + k(2^m - 1)\). This blows up exponentially with \(m\), which is exactly WHY the naive independence assumption is so valuable: it converts an exponential parameter count into a linear one.

### 6.4 Worked PYQ: Aug 2024, Q23 and Q24 — parameter counting, with and without the independence assumption

**Exact question:**

"Consider a multi-class classification problem with 3 classes and 4 features, all of which are binary. A generative model is used to model the joint distribution of the features and labels.

**Q23: Find the total number of independent (free) parameters in the model if the class conditional independence assumption is NOT enforced.** Answer: **47**

Using the formula: \((k-1) + k(2^m - 1) = (3-1) + 3(2^4 - 1) = 2 + 3(15) = 2+45 =\) **47**. Confirmed exactly matches.

**Q24: Find the total number of independent (free) parameters in the model if the class conditional independence assumption IS enforced.** Answer: **14**

Using the formula: \((k-1) + km = (3-1) + 3(4) = 2+12 =\) **14**. Confirmed exactly matches.

### 6.5 Worked PYQ: Dec 2024, Q8, Mar 2025, Q3, Mar 2024, Q11, Apr 2026, Q13 — the same parameter-counting family in different disguises

**Dec 2024, Q8 [4.00 marks]:** "Suppose you want to use a Naive Bayes classifier to predict whether a student will pass or fail an exam based on two features: the number of hours they studied and whether they attended review sessions. Assume that the features are conditionally independent given the exam outcome and that the variances of the study hours distributions are equal for both pass and fail categories. How many parameters are required to classify a new student using this Naive Bayes classifier?"

Here we have a MIXED feature type problem: "hours studied" is continuous (Gaussian), "attended review sessions" is binary. Class prior: 1 parameter (\(k=2\), so \(k-1=1\)). For the binary feature: 1 parameter per class = 2 parameters. For the Gaussian feature: normally you need a mean AND a variance per class (2 parameters per class = 4 total), BUT the question explicitly says "the variances are equal for both pass and fail categories," which means the variance is SHARED (just 1 parameter total, not 2), while the means are still separate per class (2 parameters, one per class). So: Gaussian feature contributes 2 means + 1 shared variance = 3 parameters. Total = 1 (prior) + 2 (binary feature) + 3 (Gaussian feature) = **6**. Matches the official answer.

**The trick here:** always read very carefully whether variances are assumed shared/equal across classes or separate per class; this single sentence changes the parameter count and is a favourite place for the exam to test careful reading rather than just formula plugging.

**Mar 2025, Q3 [3.00 marks], MCQ:** "Consider a k-class classification problem with five binary features \(f_1,\ldots,f_5\), where \(k>2\). How many parameters need to be estimated to learn a Naive Bayes classifier?" Using our formula: \((k-1) + 5k = k-1+5k =\) **6k-1**. Matches option B exactly.

**Mar 2024, Q11 [3.00 marks]:** "Suppose you have a five-class classification problem where class label \(y \in \{0,1,2,3,4\}\) and each training example \(x_i\) has binary features \(f_1,f_2,f_3 \in \{0,1\}\). How many parameters do we need to know to classify an example using Naive Bayes classifier?" Using the formula: \((k-1)+km = (5-1)+5(3) = 4+15 =\) **19**. This matches the official answer range of 19-20 (the range likely also accommodates a "20" answer if a student includes the class prior slightly differently, e.g., counting all 5 class probabilities rather than 4 free ones plus the constraint; but the clean formula gives 19 exactly).

**Apr 2026, Q13 [2.00 marks], MCQ, a clever twist:** "For the Naive Bayes model described in the main data with n binary features and a binary class label, how many independent parameters are required to fully specify the model? Answer for the original dataset with 5 training examples." (The underlying dataset has 4 binary features, X1 through X4, and binary y.) Using the formula: \((k-1)+km = (2-1)+2(4) = 1+8 =\) **9**. Matches option C. Notice this question tries to trick you by mentioning "5 training examples" prominently, but the number of training examples is completely IRRELEVANT to the parameter count; only the number of features and classes matter. This is an important trap to recognize: **the parameter count formula never depends on how many training points you have, only on the number of features (m) and classes (k).**

### 6.6 Worked PYQ: Aug 2024, Q20 through Q22 — computing actual parameter values and making a prediction, no smoothing

**Exact question:**

"Consider the following dataset for a binary classification problem in which the features are from \(\{0,1\}^3\) and the labels are from \(\{0,1\}\): \(X = \begin{bmatrix}1&0&1&1&0&1&0&0\\0&1&0&1&1&0&1&1\\1&1&0&1&1&0&0&1\end{bmatrix}\), \(y = (1,1,1,1,0,0,0,0)^T\). A Naive Bayes classifier is trained on this dataset. The parameters to be estimated are represented as \(p_i^y\), presented in a table with rows \(i=1,2,3\) and columns \(y=0\) (values a,c,e) and \(y=1\) (values b,d,f). These parameters are estimated using MLE.

**Q20: Find the value of c+d.**"

\(y=1\) columns are the first 4 data points (indices 0-3), \(y=0\) columns are the last 4 (indices 4-7).

Feature 2 (second row of X) restricted to \(y=0\) (last four columns: 1,0,1,1) gives \(c = P(f_2=1|y=0) = 3/4 = 0.75\). Feature 2 restricted to \(y=1\) (first four columns: 0,1,0,1) gives \(d = P(f_2=1|y=1) = 2/4 = 0.5\). \(c+d = 0.75+0.5 =\) **1.25**, matching the official answer exactly.

**Q21: Find the value of a+c+e.**

\(a = P(f_1=1|y=0)\): feature 1 last four values are 0,1,0,0, so \(a=1/4=0.25\).
\(c = 0.75\) (from above).
\(e = P(f_3=1|y=0)\): feature 3 last four values are 1,1,0,0, so \(e=2/4=0.5\).
\(a+c+e = 0.25+0.75+0.5 =\) **1.5**, matching the official answer exactly.

**Q22: Find the predicted label for the test point \((0,1,0)\).**

We need b, d, f as well: \(b=P(f_1=1|y=1)\): first four values of feature 1 are 1,0,1,1, so \(b=3/4=0.75\). \(d=0.5\) (from above). \(f=P(f_3=1|y=1)\): first four values of feature 3 are 1,0,0,1, so \(f=2/4=0.5\).

\(Score(y=0) \propto P(y=0)P(f_1=0|0)P(f_2=1|0)P(f_3=0|0) = 0.5(1-0.25)(0.75)(1-0.5) = 0.5(0.75)(0.75)(0.5) = 0.140625\)

\(Score(y=1) \propto P(y=1)P(f_1=0|1)P(f_2=1|1)P(f_3=0|1) = 0.5(1-0.75)(0.5)(1-0.5) = 0.5(0.25)(0.5)(0.5) = 0.015625\)

Since \(Score(y=0) > Score(y=1)\), predicted label = **0**, matching the official answer.

**The trick for this whole family:** build a clean 2-row-times-m-column table of all the \(p_i^y\) values FIRST as a single preparatory step (even if only some of them are directly asked), since virtually every sub-question in this family reuses these same estimated probabilities. Getting organized with this table before answering any individual sub-question saves enormous time and avoids recomputation errors.

### 6.7 Worked PYQ: Mar 2024, Q6 and Q7 — the transposed-matrix trap

**Exact question:**

"Consider a naive Bayes model is trained on the following data matrix X of shape \((d,n)\) and corresponding label vector y: \(X = \begin{bmatrix}1&0&0&0\\0&1&0&1\\0&1&1&0\end{bmatrix}\), \(y = (1,0,1,1)^T\). Assume that \(\hat{p}\) and \(p_j^{y_i}\) are estimates for \(P(y=1)\) and \(P(f_j=1|y=y_i)\) respectively. Here \(f_i; i=1,2,3\) is the i-th feature. These parameters are estimated using MLE. Calculate the value of \(p_1^1\)" (Q7) "and \(p_2^1\)" (Q6, note question order as listed in the actual paper, both worth 3.00 marks).

**The critical trap here: X is explicitly stated to have shape \((d,n)\), meaning rows are FEATURES and columns are DATA POINTS**, which is the opposite convention from a typical spreadsheet-style table where rows are usually observations. So feature 1 is the first ROW \((1,0,0,0)\), feature 2 is the second row \((0,1,0,1)\), feature 3 is the third row \((0,1,1,0)\), and there are 4 data points total (\(n=4\), reading down each column).

\(y = (1,0,1,1)\), so data points 1,3,4 (1-indexed) have \(y=1\), and data point 2 has \(y=0\).

\(p_1^1 = P(f_1=1|y=1)\): feature 1 values at points with \(y=1\) (points 1,3,4) are 1,0,1. Average \(= 2/3 \approx\) **0.333**, matching the official range 0.30-0.35.

\(p_2^1 = P(f_2=1|y=1)\): feature 2 values at points with \(y=1\) (points 1,3,4) are 0,0,1. Average \(= 1/3 \approx\) **0.333**, also matching the official range 0.30-0.35.

**The lesson:** always check explicitly whether the data matrix is given as \((d,n)\) [features by points, i.e. each COLUMN is one data point] or the more everyday \((n,d)\) [points by features, each ROW is one data point]. This single detail, easy to misread under time pressure, completely changes which numbers you average together. The exam has used the \((d,n)\) convention specifically to test whether you are reading carefully; when in doubt, look at the explicitly stated shape near the start of the question.

### 6.8 Worked PYQ: Aug 2025, Q13 and Q14 — mixed binary and Gaussian features together

**Exact question:**

"Consider a 2-class Naive Bayes classifier with first feature f1 as binary and the second feature f2 as Gaussian. Following are the information that are provided to us: Estimate of \(P(Y=1)\), \(\hat{p}=0.4\). Estimate of \(P(f_1=1|y=0)\), \(p_1^0=0.4\). Estimate of \(P(f_1=1|y=1)\), \(p_1^1=0.5\). \((f_2|y=0) \sim \mathcal{N}(0,1)\). \((f_2|y=1) \sim \mathcal{N}(1,1)\).

**Q13: If a test point has label 0, what will be the probability that the point is \(x_{test}=(0,0)^T\)? Enter answer correct to two decimal places.**"

This question is subtly phrased: it says "if a test point has label 0" and asks for "the probability that the point is (0,0)," which really means we should compute \(P(x_{test} \mid y=0)\) directly (the class-conditional likelihood, not the posterior), OR the question may want \(P(y=0|x_{test})\), i.e. we need to check which interpretation the official range matches. I computed both:

\(P(x|y=0)\) directly \(= P(f_1=0|y=0) \cdot \mathcal{N}(0; \text{mean}=0,\text{var}=1) = 0.6 \times 0.3989 = 0.2394\), which does NOT sit inside the stated range of 0.22-0.26... actually it does (0.2394 is between 0.22 and 0.26). This matches, confirming the question wants the raw class-conditional likelihood \(P(x_{test}|y=0)\), not the posterior. **Answer: approximately 0.24**, consistent with the official range 0.22-0.26.

**Q14: For \(x_{test} = (0, 1.5)^T\), what output would Naive Bayes model predict?**

\(Score(y=0) \propto P(y=0) \cdot P(f_1=0|y=0) \cdot \mathcal{N}(1.5;0,1) = 0.6 \times 0.6 \times \mathcal{N}(1.5;\text{mean } 0,\text{var } 1)\)
\(Score(y=1) \propto P(y=1) \cdot P(f_1=0|y=1) \cdot \mathcal{N}(1.5;1,1) = 0.4 \times 0.5 \times \mathcal{N}(1.5;\text{mean } 1,\text{var } 1)\)

\(\mathcal{N}(1.5; 0,1) = \frac{1}{\sqrt{2\pi}}\exp(-1.5^2/2) = 0.3989 \times \exp(-1.125) = 0.3989 \times 0.3247=0.1295\)
\(\mathcal{N}(1.5; 1,1) = 0.3989 \times \exp(-0.5^2/2) = 0.3989 \times \exp(-0.125)=0.3989 \times 0.8825=0.3521\)

\(Score(y=0) = 0.6 \times 0.6 \times 0.1295 = 0.0466\)
\(Score(y=1) = 0.4 \times 0.5 \times 0.3521 = 0.0704\)

\(Score(y=1) > Score(y=0)\), so predicted label = **1**, matching the official answer.

**The trick for Gaussian Naive Bayes:** you virtually never need the exact normalizing constant \(\frac{1}{\sqrt{2\pi\sigma^2}}\) to survive to the final comparison if it is IDENTICAL across the classes being compared (e.g., same variance assumed for both classes), since it cancels out of the ratio. But if the question wants an absolute probability value (like Q13's request for a specific number, not just a comparison), you must keep the full normal density formula, constant included.

---

## Topic 7: Theory Odds and Ends (Bias-Variance, MLE/MAP, Generative vs Discriminative)

These are lower-mark but very fast, very "know it or you don't" questions. A little memorisation here is extremely high value per minute of study.

### 7.1 Generative versus Discriminative models

A **generative model** tries to model how the data was generated, i.e., it models the joint distribution \(P(x,y)\), or equivalently models \(P(x|y)\) for each class plus the prior \(P(y)\), and derives \(P(y|x)\) via Bayes' rule. Naive Bayes and Gaussian Naive Bayes are generative.

A **discriminative model** models \(P(y|x)\) directly, without ever trying to model how \(x\) itself was generated. Logistic regression is the classic discriminative example; decision trees and k-NN are also discriminative in spirit (they directly produce a decision/prediction rule).

**Aug 2025, Q9 [2.00 marks], MSQ, "Which among the following are true?"**

A. "In generative model, we are interested in how the features are generated." **(Correct)**

C. "In discriminative model, we are interested in modelling \(p(y|x)\), where y is the label and x is a feature." **(Correct)**

(B, D, E are all false: B and D have the generative/discriminative roles swapped, and E claims "Gaussian Naive Bayes is a discriminative model," which is false, since it is generative by construction.)

### 7.2 MLE versus MAP, and the bias-variance angle

**MLE (Maximum Likelihood Estimation)** finds parameters that make the observed data most probable, using ONLY the likelihood, with no prior belief. **MAP (Maximum A Posteriori)** incorporates a prior belief about the parameters as well, effectively regularizing the estimate.

**Aug 2025, Q5 [3.00 marks], MCQ:** "Which of the following statements is/are true?" regarding \(\hat{w}_{MLE}\), \(\hat{w}_{MAP}\), and their MSE.

Correct answer: **C. "The estimator \(\hat{w}_{MAP}\) can achieve lower MSE than \(\hat{w}_{MLE}\) for some \(\lambda > 0\), where \(\lambda \in \mathbb{R}\)."** This is the exact same bias-variance idea from section 2.6: MAP (which corresponds to a regularized, biased estimator) can beat the unbiased MLE in total mean squared error, for a well-chosen regularization strength. (A and B, which claim one estimator is UNCONDITIONALLY always better, are both false; nothing in statistics is "always better" regardless of settings; D, claiming their MSEs are always equal for small samples, is also false and nonsensical.)

**Aug 2025, Q7 [1.00 mark], MCQ:** "Consider the linear regression model \(y=w^Tx+\epsilon\). Assuming \(\epsilon \sim \mathcal{N}(0, \sigma^2)\), maximizing the conditional log-likelihood of \(w\) is equivalent to minimizing the sum of squared errors \(\|y - X^Tw\|_2^2\)." Answer: **TRUE**. This is the fundamental bridge fact connecting probability theory to the ordinary least-squares formula from Topic 1: Gaussian-noise assumption plus maximum likelihood estimation derives, from first principles, exactly the squared-error loss function everyone uses by default. This is worth truly understanding, not just memorising, because it explains WHY squared error is the "natural" choice under Gaussian noise (and, by the same logic from section 2.6, why L1 loss/LASSO-type penalties are natural under Laplace-distributed noise or priors instead).

**Aug 2025, Q3 [3.00 marks], MCQ, the Bayesian regularization-parameter derivation:**

"In the Bayesian modeling for linear regression, we assume: \(y|x \sim \mathcal{N}(w^Tx, \sigma^2 I)\), \(w \sim \mathcal{N}(0, \gamma^2 I)\). Under this setup, the MAP estimator is \(\hat{w}_{MAP} = \arg\min_w \{\|y-X^Tw\|^2 + \lambda\|w\|^2\}\). Using the given information, find the expression for the regularization parameter \(\lambda\)."

Answer: \(\lambda = \sigma^2 / \gamma^2\). The derivation: taking negative log of the Gaussian likelihood gives a term scaled by \(1/\sigma^2\), and negative log of the Gaussian prior gives a term scaled by \(1/\gamma^2\); dividing through to match the standard Ridge form (with the data term having an implicit coefficient of 1) gives \(\lambda\) as the RATIO \(\sigma^2/\gamma^2\). **Intuition worth internalizing:** a LARGE \(\gamma^2\) (a very loose, uncertain prior belief about \(w\), meaning we barely trust our prior) leads to a SMALL \(\lambda\) (barely any regularization, letting the data dominate), while a SMALL \(\gamma^2\) (strong prior belief that \(w\) should be near zero) leads to a LARGE \(\lambda\) (heavy regularization). This inverse relationship between prior confidence and regularization strength is a recurring theme in how the exam likes to test Bayesian derivations without requiring you to redo the full derivation from scratch every time; just remember the ratio \(\lambda = \sigma^2/\gamma^2\) and which way each knob should intuitively turn.

### 7.3 A quick-fire set of true/false facts, gathered across all six papers, that you should simply memorise

- **The training set is required at prediction time for k-NN** (it is instance-based, has no compact trained model). TRUE.
- **Doubling k tends to smooth the k-NN decision boundary; decreasing k makes it more jagged and outlier-sensitive.** TRUE.
- **A decision tree question of the form \(f_k \leq \theta\) does NOT always partition data into two non-empty sets** (a threshold outside the data range creates an empty partition). The word "always" makes this claim FALSE.
- **Decision tree depth is a hyperparameter, tuned via cross-validation, not learned directly like a normal weight.** TRUE.
- **Shallow trees (low max depth) underfit; they do not overfit.** Underfitting is the correct pairing with "low depth," overfitting pairs with "high/unbounded depth."
- **If a question tells you a tree achieves zero training error, every leaf has entropy exactly 0.** Extremely useful shortcut, save time by not computing leaf entropies individually in that case.
- **Naive Bayes parameter count depends only on the number of features and classes, never on the number of training examples.**
- **Gaussian likelihood + Gaussian prior on weights gives you Ridge regression (L2). Gaussian likelihood + Laplace prior on weights gives you LASSO (L1).**
- **LASSO's diamond-shaped constraint region has corners that touch the axes, driving some weights to exactly zero (feature selection). Ridge's circular/spherical constraint region has no corners, so it shrinks weights toward zero without normally hitting exactly zero.**
- **At the optimum of an ordinary least-squares fit that includes a bias/intercept term, the residuals must sum to exactly zero,** making "the model overshoots or undershoots literally every point" a mathematical impossibility.
- **For the unregularized normal equations, the optimal residual vector is always orthogonal to the column space (span) of the feature matrix X.**

---

## Rapid Revision Sheet: every formula in one place

Keep this page open the night before the exam.

**Linear Regression (no bias, single feature):** \(w^* = \dfrac{\sum_i x_i y_i}{\sum_i x_i^2}\)

**Linear Regression (general, with X as d-by-n, bias folded in via a row of 1s if needed):** \(w^* = (XX^T)^{-1} X y\)

**Gradient of SSE (as given directly in your papers):** \(\nabla f(w) = 2(XX^T) w - 2 X y\) ; one GD step: \(w_{new} = w - \eta \nabla f(w)\)

**Ridge closed form:** \(w_{ridge} = (XX^T + \lambda I)^{-1} X y\) ; contour picture = circle constraint, generally no coordinate hits exactly zero

**LASSO:** no closed form in general; contour picture = diamond constraint, corners on the axes drive some coordinates to exactly zero (feature selection)

**Bayesian view:** Gaussian prior on w gives Ridge; Laplace prior on w gives LASSO; \(\lambda = \sigma^2/\gamma^2\) for the Gaussian-Gaussian case

**Polynomial kernel:** \(K(x,x') = (1 + x^Tx')^d\) (always check whether the "+1" is present in the specific question)

**Kernel regression prediction:** \(\hat{y}(x_{test}) = \sum_i \alpha_i K(x_i, x_{test})\), where \(\alpha = K^{-1} y\)

**k-NN classification:** majority vote of k nearest neighbours (by Euclidean distance, or squared distance for comparison purposes)

**k-NN regression:** average of the k nearest neighbours' y-values

**k-NN with "point is its own neighbour" (training error context):** typically drives training/self-inclusive error toward 0, especially for small odd k

**k-NN LOOCV (leave-one-out, no self-inclusion):** for each point, exclude it, find k nearest among the rest, predict, compare to true label, average the error rate over all points

**Entropy:** \(E(p) = -p\log_2(p) - (1-p)\log_2(1-p)\) ; maximum value 1 at \(p=0.5\) ; minimum value 0 at \(p=0\) or \(p=1\)

**Information Gain:** \(IG = E(parent) - \left[\dfrac{n_{left}}{n} E(left) + \dfrac{n_{right}}{n} E(right)\right]\)

**Zero-training-error tree shortcut:** if the tree achieves zero training error, every leaf has entropy 0, so IG of the full tree = E(root)

**Naive Bayes classification score:** \(Score(y) = P(y) \cdot \prod_i P(f_i \mid y)\) ; predict the class with the higher score

**Naive Bayes parameter count (binary features, k classes, m features):** \((k-1) + km\) ; this NEVER depends on the number of training examples

**Naive Bayes parameter count WITHOUT the independence assumption:** \((k-1) + k(2^m - 1)\)

**Gaussian feature parameters:** mean and variance per class, UNLESS the question specifies variances are shared across classes (then only one shared variance parameter, but still separate means)

---

## Final Mock Drill: the hardest problems, all in one place, for a timed self-test

Attempt all of these cold, then check your work against the walkthroughs above. If you can do all nine of these correctly and within about 45 minutes total, you are in excellent shape for this exam.

1. (Linear Regression, Aug 2024 Q3 style) Given \(x = (1,-1,2,-2)\), \(y=(1.2,0.1,2.1,-1)\), find \(w^*\) for a single-feature, no-bias model.

2. (Regularization, Mar 2025 Q2 style) Given four candidate weight vectors with their norms and MSEs, and a budget \(\theta\) on \(\|w\|^2\), identify which vector Ridge regression selects.

3. (Kernel Regression, Dec 2024 Q2/Q3 style) Build a 3x3 polynomial kernel matrix \(K\) for three 2D points with kernel \((1+x^Tx')^2\), then predict at a new test point.

4. (k-NN, Mar 2025 Q13/Q14 style) Given 7 labelled 2D points, compute the 3-NN prediction for a specific test point, then compute full leave-one-out cross-validation error across the whole dataset.

5. (Decision Trees, Apr 2026 Q8-10 style) Given 5 data points with a numeric feature and a +1/-1 label, compute the parent entropy, the entropy of each child after a given threshold split, and the resulting information gain.

6. (Decision Trees, Aug 2024 Q17/Q18 style) Given a tree that is stated to achieve zero training error, and told the root has an exactly even class split, find the root entropy and then find \(E_R - E_L\) without recomputing every leaf.

7. (Naive Bayes, Aug 2024 Q20-22 style) Given an 8-point dataset with 3 binary features, estimate all six \(p_i^y\) parameters, then use them to classify a new test point.

8. (Naive Bayes parameter counting, mixed types, Dec 2024 Q8 style) A classifier has one binary feature and one Gaussian feature whose variance is shared across classes; count the total number of parameters.

9. (Theory, Aug 2025 Q3 style) Derive, from the Bayesian Normal-likelihood-Normal-prior setup, the expression for the Ridge regularization parameter \(\lambda\) in terms of the noise variance and the prior variance.

Good luck. You have a genuinely strong, pattern-based grip on this material now: the seven topics above account for essentially the entire question bank across two full years of this exam, and every hard problem type has already been solved once for you here, with the exact working and exact traps the examiner likes to set. Walk in confident.
