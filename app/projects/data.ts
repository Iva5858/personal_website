export interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  image: string;
  timeframe: string;
  interactive: boolean; // true for projects with interactive demos within the website
  demoUrl?: string; // internal path for interactive demos (e.g., '/projects/1/demo')
  externalLink?: string; // external URL (GitHub, external website, etc.) - doesn't mark as interactive
  githubUrl?: string; // GitHub repository URL
  details?: string; // Detailed information displayed in the Project Details section
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Grandma vs. Data Scientist Student: Information-Theoretic Wordle Solver',
    description: 'This project is an intelligent Wordle solver that uses information theory and optimization algorithms to play the New York Times Wordle game with high accuracy and efficiency. It models each guess as an information-gathering step, selecting words that maximize expected information gain and minimize the number of guesses needed to find the correct answer. I originally built it to compete playfully with my grandmother, a retired English professor and lifelong word-game enthusiast, and it has become a fun way for us to connect, compare strategies, and talk about language from two very different perspectives: hers as a human expert in words and mine as a data science student building algorithms.',
    technologies: ['Python', 'NumPy', 'Selenium', 'Scheduling', 'Pandas', 'Information Theory', 'Optimization'],
    category: 'Algorithms & Optimization',
    image: '/images/projects/project1/wordle_image.jpg',
    timeframe: 'April 2025 - Present',
    interactive: false,
    githubUrl: 'https://github.com/Iva5858/wordle_optimizer',
    details: `The core of the system is a data-driven optimization engine that treats Wordle as a sequential decision-making problem under uncertainty. 
    
    The model:
- Uses Shannon entropy to score each possible guess based on how much information it is expected to reveal about the hidden word.
- Maintains and updates a candidate set of valid answers after every guess by matching the observed color pattern (green, yellow, gray) against all remaining words.
- Combines multiple signals, including entropy, pattern consistency, letter-position frequencies, and a minimax-style worst-case score, into a single weighted score for each candidate guess.

To validate the approach, the optimizer was tested against 1,355 historical Wordle answers. It achieved a 98.3% win rate with an average of 3.57 guesses per solved game, and solved 84% of games in 3–4 guesses. The remaining difficult cases tend to be words with rare letter patterns or high ambiguity across multiple candidates.

Beyond the optimization engine, the project includes a Selenium-based automation layer that plays the game directly on the NYT website. This layer:
- Launches a headless browser, handles cookies and modals, and interacts with the on-screen keyboard.
- Sends each model-generated guess to the game and reads back the resulting color pattern from the board.
- Logs each game with both technical explanations (entropy, candidate reductions) and simple language explanations of why each guess was chosen. The logging format is intentionally split into a \"data scientist\" view and a \"grandma\" view: one focuses on bits of information, probability updates, and search space size, while the other explains in plain language which letters we learned about and why the next word makes sense. This makes it easy for my grandmother to follow the model's reasoning and has turned the logs into a shared artifact we can read together and discuss after each game.

Overall, the project showcases how concepts from information theory, probabilistic reasoning, and algorithm design can be used to build an end‑to‑end, automated game-playing system with measurable performance.

Limitations
While the optimizer achieves strong performance with a 98.3% win rate, there are several limitations to consider. The scoring weights (40% entropy, 20% pattern matching, etc.) are manually tuned and may not be optimal for all game states. The current implementation uses a greedy approach without deep lookahead, which can struggle with words that require strategic multi-move planning. Some failure cases involve unusual letter combinations (like "uvula", "kazoo", "snafu") that don't follow common English letter frequency patterns, or ambiguous words that share similar patterns with many other candidates. The system also doesn't learn from past games or adapt its strategy based on historical performance. Additionally, entropy calculations can be computationally expensive in early game states with many remaining possibilities, though multiprocessing helps mitigate this.

Next Steps
Future improvements planned for this project include implementing dynamic weight tuning using machine learning techniques to automatically optimize scoring weights based on game outcomes (Some of which I'm learning this year at university with my Machine Learning course). A minimax algorithm with configurable depth would enable deeper lookahead for challenging words that require strategic planning. Adding a learning component that learns from historical games could improve word selection, potentially using neural networks or decision trees. Performance could be enhanced through GPU acceleration for parallelizing entropy calculations, and more sophisticated caching strategies that persist across games. Additional features could interactive visualizations showing entropy calculations and decision trees, and comparative analysis tools to test different optimization strategies. Research directions include deeper analysis of failure cases to identify common patterns, exploration of alternative optimal starting words, and development of predictive models that estimate solve probability based on word characteristics.`,
  },
  {
    id: 2,
    title: 'Handwritten Digit Recognition with Neural Networks',
    description: 'This project is a neural network implementation from scratch for handwritten digit recognition. Built entirely using fundamental machine learning principles, it demonstrates the core concepts of feedforward neural networks, backpropagation, and gradient descent without relying on high-level deep learning frameworks. The project includes an interactive graphical user interface that allows users to draw digits on a canvas and receive real-time predictions from the trained model, making it both an educational tool and a practical demonstration of neural network capabilities.',
    technologies: ['Python', 'Matplotlib', 'NumPy', 'TKinter', 'PIL (Pillow)', 'Poetry'],
    category: 'Machine Learning',
    image: '/images/projects/project2/mnist_digits.png',
    timeframe: 'December 2023 - January 2024',
    interactive: false,
    githubUrl: 'https://github.com/Iva5858/neural-network-from-scratch-mnist',
    details: `The neural network architecture consists of a multi-layer feedforward design with two hidden layers. The input layer processes 28x28 pixel images (784 neurons total) from the MNIST dataset, which contains 60,000 training images of handwritten digits. The network structure flows from input through two hidden layers (40 and 20 neurons respectively) to an output layer with 10 neurons, each representing one digit class (0-9).

The implementation uses the sigmoid activation function throughout all layers, which transforms the weighted inputs into values between 0 and 1. Training is performed using the backpropagation algorithm, which calculates gradients through the network layers in reverse order to update weights and biases. The mean squared error (MSE) cost function measures the difference between predicted and actual outputs during training.

The training process runs for multiple epochs, processing each image in the dataset and adjusting network parameters using a learning rate of 0.07 (Found through trial and error, point of improvement). The model tracks accuracy after each epoch, providing feedback on the learning progress. Once trained, the network can classify handwritten digits with a high degree of accuracy.

A key feature of this project is the interactive graphical interface built with Tkinter. Users can draw digits on a 280x280 pixel black canvas using their mouse, and the application automatically resizes the drawing to 28x28 pixels to match the MNIST input format. When the user clicks "Save Image", the neural network processes the drawing through forward propagation and displays both the input image and a bar chart showing the probability distribution across all 10 digit classes, highlighting the model's prediction.

This project was of great educational value for me, since by implementing neural network fundamentals from scratch I was able to understand how neural networks work at a low level. All matrix operations, gradient calculations, and weight updates are performed manually using NumPy, providing transparency into the mathematical operations that power modern machine learning systems.

Limitations:
While this project is effective as a learning tool, and a very fun project to build, it has several limitations. The network architecture and training routine are intentionally simple and not optimized for maximum performance or speed, which means training can be relatively slow and accuracy may not match modern deep learning models built with specialized libraries like TensorFlow or PyTorch. The model is trained and evaluated only on the MNIST dataset, so it does not generalize to more complex or noisy real-world digit data. Additionally, the use of the sigmoid activation function and mean squared error loss is pedagogical rather than state-of-the-art, and there is no use of techniques such as regularization, advanced optimizers, or batching.

Possible Next Steps:
Potential next steps for this project include dynamic learning rate tuning, experimenting with different activation functions (such as ReLU) and loss functions (like cross-entropy) to improve training dynamics and accuracy. The architecture could be extended with additional layers or converted into a convolutional neural network (CNN) to better capture spatial patterns in image data. From an engineering perspective, batching, learning rate schedules, and more advanced optimization algorithms (e.g., Adam, RMSprop) could be added. As discussed before, I'm currently learning about Machine Learning at university, this project was made when all I knew was the very basics of Machine Learning, so I'm looking forward to implementing these techniques in this project and see how much I can improve it.
`,
  },
  {
    id: 3,
    title: 'Programming for Data Science Coursework: MCMC Algorithms & Flight Data Analysis (University of London)',
    description: 'A comprehensive statistical computing project completed for ST2195 (Programming for Data Science) at the University of London, consisting of two parts: (1) implementation and analysis of the Metropolis-Hastings MCMC algorithm for simulating random numbers from a Laplace distribution, and (2) analysis of commercial flight data from the 2009 ASA Statistical Computing and Graphics Data Expo. The project demonstrates proficiency in both R and Python, covering topics from Bayesian statistics and convergence diagnostics to logistic regression modeling and large-scale data analysis.',
    technologies: ['Python', 'R', 'Pandas', 'NumPy', 'Matplotlib'],
    category: 'Statistical Computing & Data Analysis',
    image: '/images/projects/project3/coursework_image.jpg',
    timeframe: 'September 2024 - April 2025',
    interactive: false,
    externalLink: 'https://doi.org/10.7910/DVN/HG7NV7', // dataset source
    details: `This project was completed as coursework for ST2195 (Programming for Data Science) at the University of London. To maintain academic integrity, I am not sharing links to my submitted work or the full assignment instructions. However, I can provide the dataset link and describe the project's scope and methodology.

Part 1: Metropolis-Hastings MCMC Algorithm
The first part of the project focused on implementing and analyzing the Metropolis-Hastings algorithm, specifically the random walk Metropolis variant. The goal was to simulate random numbers from a distribution with probability density function f(x) = (1/2)exp(-|x|), which is a Laplace distribution.

Key tasks included:
- Implementing the random walk Metropolis algorithm with N = 10,000 iterations and step size s = 1
- Constructing histograms and kernel density plots to visualize the generated samples
- Overlaying the theoretical density function to assess the quality of the estimates
- Computing Monte Carlo estimates of the mean and standard deviation
- Implementing convergence diagnostics using the R̂ (R-hat) statistic
- Analyzing convergence behavior across different step sizes (s values from 0.001 to 1) with multiple chains

The implementation required careful attention to numerical stability, using log-space calculations (log u < log r) to avoid underflow errors when computing acceptance ratios.

Part 2: Flight Data Analysis
The second part involved analyzing the 2009 ASA Statistical Computing and Graphics Data Expo dataset, which contains flight arrival and departure details for all commercial flights on major carriers within the USA from October 1987 to April 2008. This is a massive dataset with nearly 120 million records (12 GB uncompressed).

I selected a subset of five consecutive years and addressed three main research questions:

(a) Best times and days to minimize delays: Analyzed patterns in flight delays across different times of day and days of the week to identify optimal travel windows for minimizing delay risk.

(b) Aircraft age and delays: Evaluated whether older aircraft experience more delays on a year-to-year basis, requiring careful data wrangling to match aircraft information with flight records.

(c) Logistic regression for flight diversions: Built logistic regression models to predict the probability of flight diversions using features including:
- Departure date attributes (day of week, month, season)
- Scheduled departure and arrival times
- Geographic coordinates and distance between departure and arrival airports
- Carrier information

The models were fitted separately for each year, and coefficient visualizations were created to show how relationships between predictors and diversion probability evolved over time.

Technical Approach
The project required proficiency in both R and Python, with code organized in RMarkdown and Jupyter notebooks respectively. The workflow involved extensive data cleaning, feature engineering, statistical modeling, and visualization. For the flight data analysis, I implemented efficient data processing techniques to handle the large dataset size, including strategic subsetting, aggregation, and database-like operations.

The complete dataset and supplementary information can be accessed through the Harvard Dataverse link provided.`,
  },
  {
    id: 4,
    title: 'Machine Learning Analysis of Diabetes-Related Health Outcomes (University of London Coursework)',
    description: 'A machine learning coursework project for ST3189 (Machine Learning) at the University of London, applying unsupervised learning, classification, and regression to the 2024 CDC Behavioral Risk Factor Surveillance System (BRFSS) - a telephone survey of 457,670 US adults. PCA and K-means clustering reveal interpretable health dimensions and identify a high-risk subgroup with 55% diabetic prevalence. Seven classifiers achieve AUC scores of 0.75-0.81 for predicting diabetes status without clinical tests, and gradient boosting predicts physical health burden among confirmed diabetics with R-squared = 0.45.',
    technologies: ['R', 'PCA', 'K-Means Clustering', 'Logistic Regression', 'Random Forest', 'Gradient Boosting', 'SVM', 'LDA and QDA', 'Lasso, Ridge, Elastic Net', 'Neural Network', 'ROSE', 'ggplot2', 'Statistical Analysis'],
    category: 'Machine Learning',
    image: '/images/projects/project4/ML_coursework.jpg',
    timeframe: 'September 2025 - April 2026',
    interactive: false,
    externalLink: 'https://www.cdc.gov/brfss/annual_data/annual_data.htm',
    details: `This project was completed as coursework for ST3189 (Machine Learning) at the University of London, contributing 30% to the final course grade. To maintain academic integrity, I am not sharing links to my submitted work or code. However, I can describe the full methodology and results.

Personal Motivation
This project holds particular personal significance for me, as my family has a history of diabetes. The BRFSS dataset - the world's largest continuously conducted telephone health survey - offered a rare opportunity to explore diabetes risk at population scale using the machine learning techniques I was learning in the course.

Dataset
The 2024 BRFSS contains 457,670 respondents across 345 variables. From the full extract, 60 variables were retained spanning demographics, health status, chronic conditions, healthcare access, health behaviours, and social determinants. The binary classification target (confirmed diabetic vs. non-diabetic) had a 5.9:1 imbalance, addressed using ROSE synthetic oversampling applied strictly within training folds to prevent data leakage.

Part 1 - Unsupervised Learning: Population Structure

Principal Component Analysis
After one-hot encoding categorical variables, the dataset expanded to 113 features. The variance explained by each component decays gradually - the first two account for 4.8% and 3.9% respectively, with no single dominant factor. PC1 separates college-educated, physically active respondents from those with poor mental health and low activity. PC2 captures a healthcare access and age gradient. This diffuse structure directly explains why compressing the data before classification does not improve performance.

K-Means Clustering
K-means applied to the first ten PCs (K=6, silhouette score = 0.20, confirmed by Ward's hierarchical clustering) identifies six interpretable population subgroups. The highest-risk cluster - characterised by lower education, physical inactivity, and high comorbidity burden - has a diabetic prevalence of 55.34%, nearly three times higher than the lowest-risk cluster (19.99%).

Part 2 - Classification: Predicting Diabetes Status

Seven classifiers were trained on 50,000 respondents with an 80/20 train-test split:

Logistic Regression: AUC = 0.815, Sensitivity = 0.773 (best overall AUC)
LDA: AUC = 0.814, Sensitivity = 0.773
SVM with RBF kernel: AUC = 0.809, Sensitivity = 0.767
Random Forest (500 trees): AUC = 0.807, Sensitivity = 0.778 (best sensitivity)
Naive Bayes: AUC = 0.786, Sensitivity = 0.708
Decision Tree (pruned): AUC = 0.781, Sensitivity = 0.758
Neural Network (12 hidden units): AUC = 0.746, Sensitivity = 0.663

Results are broadly consistent with Xie et al.'s 2014 BRFSS benchmarks (AUC 0.718-0.795), confirming the survey-diabetes relationship has remained stable over a decade. The sensitivity improvement over the prior study (0.66-0.78 vs. 0.38-0.52) is methodological: ROSE shifts the decision threshold toward detecting the minority class, while AUC scores remain comparable.

Training classifiers on PCA-compressed inputs (61 PCs, 80% variance threshold) consistently reduces sensitivity by 3-8 percentage points - a meaningful negative result. However, compression enables QDA (Quadratic Discriminant Analysis), which cannot be estimated stably in the full 113-feature space. QDA achieves the highest sensitivity of any model tested (0.787) and the lowest missed-diagnosis rate (0.213), making it the preferred approach for population screening where missing a diabetic case carries far higher cost than a false referral. Five-fold cross-validation on the Random Forest confirms stable out-of-sample performance: mean AUC = 0.804, mean sensitivity = 0.749.

Part 3 - Regression: Physical Health Burden Among Diabetics

Among 63,454 confirmed diabetics, the regression target is the number of days in the past 30 that physical health was not good. The distribution is strongly zero-inflated (47% report zero bad days; 16% report all 30 days), so a square-root transformation was applied before modelling.

Eight regression approaches were compared on an 80/20 split:

GBM Gradient Boosting (246 trees by CV): RMSE = 1.581, R-squared = 0.445, best overall
OLS Linear Regression: RMSE = 1.590, R-squared = 0.439, nearly identical to GBM
Random Forest (300 trees): RMSE = 1.598, R-squared = 0.433
Lasso (51 predictors retained): RMSE = 1.623, R-squared = 0.415
Elastic Net: RMSE = 1.623, R-squared = 0.415
Ridge: RMSE = 1.631, R-squared = 0.410
Principal Components Regression (63 PCs): RMSE = 1.666, R-squared = 0.384
Weighted Least Squares: RMSE = 1.936, R-squared = 0.169, poor out-of-sample fit

GBM and OLS perform nearly identically, suggesting the non-linear patterns are modest and that OLS coefficients tell an equally complete interpretive story. The two dominant predictors - consistent across OLS and Random Forest variable importance - are poor self-rated general health (coefficient = 2.74, p < 0.001) and difficulty walking or climbing stairs (coefficient = 0.735, p < 0.001). Loneliness and inability to work due to illness are also significant positive predictors. Older age groups above 65 show negative associations, plausibly because those surviving to older age with diabetes represent a healthier-than-average subset. Five-fold CV on the Random Forest gives mean RMSE = 1.62 and mean R-squared = 0.43.

Key Takeaways

Survey-based diabetes screening is feasible without clinical tests, achieving AUC above 0.80 across multiple models. PCA compression does not improve accuracy for existing classifiers but enables QDA, which achieves the highest sensitivity of any model tested. Physical health burden among diabetics is predictable at R-squared of approximately 0.44 from survey responses alone; the remaining variance likely requires clinical or longitudinal data to capture. The near-equivalence of GBM and OLS reinforces that interpretable models can match complex ones when non-linear patterns are modest. A two-stage hurdle model is recommended for future work to better handle the high proportion of zero responses in the physical health target.

The complete BRFSS dataset and documentation can be accessed through the CDC link provided.`,
  },
  {
    id: 5,
    title: 'Project NoCap: AI-Powered Fact-Checking for Instagram',
    description:
      'An AI-powered fact-checking assistant for Instagram that helps users quickly assess the credibility of posts and reels. By forwarding content to the @project_nocap account, users receive an automated analysis that highlights potential misinformation, bias, and links to more reliable sources, making it easier to navigate the information overload on social media.',
    technologies: ['Python', 'LLMs', 'Prompt Engineering', 'CrewAI', 'API Development'],
    category: 'LLMs & Prompt Engineering',
    image: '/images/projects/project5/nocap_logo.png',
    timeframe: 'September 2024 - Present',
    interactive: false,
    externalLink: 'https://projectnocap.org', // public landing page
    details: `Project NoCap is an AI-powered fact-checking tool designed to help Instagram users verify the accuracy of posts and reels by leveraging large language models and carefully engineered prompts. The core idea is to make fact-checking as easy as sharing a post: users simply forward content to the @project_nocap account on Instagram, and in return they receive a structured, plain-language assessment of how trustworthy that content appears to be, along with additional context and sources.

Problem & Motivation
Misinformation spreads rapidly on social media, and studies show that false political content can be significantly more likely to be shared than true information. Many people struggle to judge whether what they see online is reliable. Project NoCap aims to lower the barrier to fact-checking by meeting users where they are, inside Instagram, and providing an on-demand credibility check that fits naturally into existing sharing workflows.

How It Works (High Level)
- Instagram users share a post or reel to the @project_nocap account.
- The backend service retrieves the content and associated caption/metadata.
- A fact-checking pipeline built around large language models analyzes the claim, checks for internal consistency, and searches for corroborating or contradicting information from more reputable sources.
- The system generates a response that:
  1. Flags potential red flags or misleading framing
  2. Highlights bias or emotional manipulation where applicable
  3. Suggests more trustworthy sources or neutral summaries
  4. Explains the reasoning in accessible, non-technical language

From a technical perspective, the project combines modern LLM capabilities with prompt engineering patterns tailored for fact-checking: separating claim extraction, evidence gathering, reasoning, and explanation into distinct stages, and enforcing transparency in the model's chain of thought in a user-friendly way (without exposing raw prompts to end users). The backend is implemented as a lightweight API service that can scale as usage grows.

Future Directions
We plan to implement Retrieval-Augmented Generation (RAG) and Model Context Protocol (MCP) to significantly improve the system's accuracy and efficiency. RAG will enable the system to retrieve relevant, up-to-date information from trusted knowledge bases before generating fact-checking responses, which should reduce hallucinations and improve the quality of evidence cited. MCP will help optimize the process time by streamlining how the model accesses and processes contextual information, making the fact-checking pipeline faster and more cost-effective.

The project is currently progressing at a slower pace compared to last academic year due to time constraints, as team members balance university work and other commitments. However, we remain committed to advancing the project as best as we can.
`,
  },
];

export function getProjectById(id: number): Project | undefined {
  return projects.find((project) => project.id === id);
}

