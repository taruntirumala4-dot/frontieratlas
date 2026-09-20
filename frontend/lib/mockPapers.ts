import { Paper } from "./paperApi";

export const FEATURED_PAPERS: Paper[] = [
  {
    "id": "spade-self-play-in-adaptive-synthetic-executable-environments",
    "slug": "spade-self-play-in-adaptive-synthetic-executable-environments",
    "title": "SPADE: Self-Play in Adaptive Synthetic Executable Environments",
    "thumbnail": "/thumbnails/spade-self-play-in-adaptive-synthetic-executable-environments.jpg",
    "authors": [
      {
        "name": "Bo Liu",
        "slug": "bo-liu"
      },
      {
        "name": "Simon Yu",
        "slug": "simon-yu"
      },
      {
        "name": "Yiding Jiang",
        "slug": "yiding-jiang"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "Continuous self-improvement requires an ever-expanding pool of self-generated, diverse, adaptive goals. For language agents, existing training environment pools (hand-curated, statically synthesized, or frozen-verifier) keep the goal distribution fixed as the learner scales. We introduce SPADE (Self-Play in Adaptive Synthetic Executable Environments), a self-play RL framework in which a single LLM plays two roles: an Environment Designer that writes complete, long-horizon training environments as executable code with an OpenAI Gym-style reset()/step() interface, and a Reasoning Agent that learns to act in them. Each is a stateful, multi-turn environment (state transitions, reward functions, and verification code), so one interface spans reasoning problems and multi-step agentic tool use. The Reasoning Agent&#x27;s regret is estimated using the gap between its reward with and without privileged hints; in optimizing this regret signal the Environment Designer learns to target environments at the edge of the agent&#x27;s capabilities while keeping them feasible. Through extensive experimentation, we find several components critical to success: grounding the Environment Designer on documents sampled from a large pretraining corpus, and giving it an accumulated environment memory. Scaling to 30B-parameter models, SPADE improves over the strongest fixed-environment baseline by +5.3 on average across eight held-out math, science, code, and reasoning benchmarks, and lifts the tool-use setting by +5.7 on BFCL-v4 multi-turn and +13.9 on ACEBench-Agent; on the games setting, the margin over the strongest baseline grows with model scale. By making environment design itself a learnable component, SPADE takes a concrete step toward open-ended self-improvement.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "205",
    "repo": "102",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "partialbigrasp-inferring-hidden-local-geometry-for-bimanual-grasping-from-partial-views",
    "slug": "partialbigrasp-inferring-hidden-local-geometry-for-bimanual-grasping-from-partial-views",
    "title": "PartialBiGrasp: Inferring Hidden Local Geometry for Bimanual Grasping from Partial Views",
    "thumbnail": "/thumbnails/partialbigrasp-inferring-hidden-local-geometry-for-bimanual-grasping-from-partial-views.jpg",
    "authors": [
      {
        "name": "Ayush Kaura",
        "slug": "ayush-kaura"
      },
      {
        "name": "Vignesh Vembar",
        "slug": "vignesh-vembar"
      },
      {
        "name": "Md Faizal Karim",
        "slug": "md-faizal-karim"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "Dual-arm robotic grasping is essential for manipulating large, heavy, and geometrically complex objects that cannot be reliably handled using a single manipulator. These large objects often contain only sparse graspable regions determined by local geometric properties such as thickness, edge structure, and gripper clearance. Prior bimanual grasping methods assume access to a full point cloud of the object which inherently contains this geometric information, but may not be accessible in real scenarios. This work proposes PartialBiGrasp, a dual-arm grasp generation framework that operates directly on partial point cloud observations. Our model learns geometric features implicitly through convolutional occupancy networks, enabling local reasoning about graspability, collision-free contact regions, and object thickness. We leverage this understanding to generate force-closure compliant grasp pairs, which are further refined using a sampling-based optimization to correct for ambiguity caused by incomplete geometry. We evaluate our approach using analytical force-closure metrics, large-scale simulation experiments, and real-world robot evaluations on noisy partial point clouds of novel objects, demonstrating robust and physically stable dual-arm grasp generation.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "112",
    "repo": "160",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "adept-accelerating-dexterity-via-pre-training-and-post-training-using-reinforcement-learning",
    "slug": "adept-accelerating-dexterity-via-pre-training-and-post-training-using-reinforcement-learning",
    "title": "ADEPT: Accelerating Dexterity via Pre-Training and Post-Training using Reinforcement Learning",
    "thumbnail": "/thumbnails/adept-accelerating-dexterity-via-pre-training-and-post-training-using-reinforcement-learning.jpg",
    "authors": [
      {
        "name": "Jayjun Lee",
        "slug": "jayjun-lee"
      },
      {
        "name": "Jessica Yin",
        "slug": "jessica-yin"
      },
      {
        "name": "Asif Rana",
        "slug": "asif-rana"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "We introduce Accelerating Dexterity via Pre-Training (ADEPT), a large-scale reinforcement learning (RL) framework for learning sim-to-real transferable dexterity across high degree-of-freedom (DoF) robot embodiments that can solve long-horizon tasks directly from raw visuo-tactile perception. ADEPT pretrains a dexterous policy on a generic object reposing task, then post-trains downstream policies with this pretrained behavior as a prior. ADEPT enables learning new behaviors that are otherwise difficult to discover from scratch on multi-fingered robots and avoids learning the same set of skills over again for every new downstream task. The pretrained policy zero-shots the reposing phase of downstream tasks, but naïve RL fine-tuning rapidly degrades this capability during transfer. We address this with a stable post-training recipe combining behavior-cloning distillation, critic warm-up, and conservative on-policy updates. To safely exploit the full kinematic dexterity, we introduce a joint-space Geometric Fabric that mediates between the RL policy and the robot. We distill post-trained teachers into perceptive students that zero-shot sim-to-real transfer on two embodiments: a 23 DoF Kuka-Allegro with two RGB cameras, and a 29 DoF Flexiv-Sharpa with two RGB cameras and five vision-based tactile sensors, and can solve long-horizon tasks from challenging initial states with dexterity at human-level speed.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "184",
    "repo": "44",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "beyond-teacher-likelihood-group-calibrated-on-policy-distillation-for-long-context-reasoning",
    "slug": "beyond-teacher-likelihood-group-calibrated-on-policy-distillation-for-long-context-reasoning",
    "title": "Beyond Teacher Likelihood: Group-Calibrated On-Policy Distillation for Long-Context Reasoning",
    "thumbnail": "/thumbnails/beyond-teacher-likelihood-group-calibrated-on-policy-distillation-for-long-context-reasoning.jpg",
    "authors": [
      {
        "name": "Zhu Zhang",
        "slug": "zhu-zhang"
      },
      {
        "name": "Jixun Wang",
        "slug": "jixun-wang"
      },
      {
        "name": "Xiaoang Xu",
        "slug": "xiaoang-xu"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "On-policy distillation (OPD) trains a student on its own responses using dense token-level guidance from a stronger teacher. In long-context tasks, however, token-level teacher support can favor locally plausible responses that omit evidence distributed across the input or violate global task constraints. Task-specific verifiers, in contrast, evaluate task completion at the response level and may return graded rewards that reflect partial success. We diagnose this mismatch on fixed responses from two representative long-context evidence-aggregation tasks. Across longer input ranges, trajectory-level OPD scores become progressively less aligned with verifier rewards, indicating teacher-verifier disagreement. Motivated by this observation, we introduce Group-Calibrated On-Policy Distillation (GC-OPD). GC-OPD separately normalizes verifier rewards and trajectory-level OPD scores within each rollout group and uses their difference as a signed teacher-verifier disagreement residual. Relative-advantage-based credit assignment (RACA) distributes this trajectory-level residual across tokens according to their relative OPD advantages while preserving the original OPD signal. Across five long-context benchmarks, post-training with GC-OPD raises the five-benchmark averages of the official Qwen3-4B and Qwen3-8B checkpoints from 29.08 to 40.47 and from 35.12 to 44.65, respectively. Vanilla OPD reaches 39.31 and 43.56 under the same setup. Controlled ablations show that the signed residual is more effective than either an additional OPD-derived term or direct group-normalized verifier reward addition, while RACA further improves over uniform token allocation. Together, these results demonstrate that group-relative residual calibration can incorporate verifier outcomes without discarding dense token-level guidance. Code is available at https://github.com/SolereZhang/GC-OPD.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "88",
    "repo": "75",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "image-guided-pavement-defect-recognition-in-gpr-data-with-novel-3d-deep-learning-architecture",
    "slug": "image-guided-pavement-defect-recognition-in-gpr-data-with-novel-3d-deep-learning-architecture",
    "title": "Image-Guided Pavement Defect Recognition in GPR Data with novel 3D Deep Learning Architecture",
    "thumbnail": "/thumbnails/image-guided-pavement-defect-recognition-in-gpr-data-with-novel-3d-deep-learning-architecture.jpg",
    "authors": [
      {
        "name": "Yuandong Pan",
        "slug": "yuandong-pan"
      },
      {
        "name": "Linjun Lu",
        "slug": "linjun-lu"
      },
      {
        "name": "Mudan Wang",
        "slug": "mudan-wang"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "Ground Penetrating Radar (GPR) is a widely adopted non-destructive sensing technology for subsurface inspection in civil and transportation engineering. Despite its potential for pavement condition assessment, the large-scale application of GPR in automated inspection has two key challenges: the scarcity of annotated real-world datasets and the lack of deep learning models designed for the unique characteristics of 3-Dimensional (3D) GPR data. This study addresses these limitations by firstly introducing a cost-effective data preparation pipeline that integrates orthomosaic Red Green Blue (RGB) imagery with 3D GPR scans to generate annotated 3D GPR datasets. The proposed method uses the aligned segments of RGB and GPR data, using pavement surface images as a reference to transfer labels of surface-visible defects to corresponding GPR segments, enabling efficient large-scale annotation in a real-world dataset collected on a highway section under operation. In addition to the dataset contribution, we propose a specialised 3D Convolutional Neural Network (CNN) architecture incorporating residual connections, mixed convolutional kernel sizes, and both depthwise and channelwise attention mechanisms to enhance feature representation and defect classification. The model is evaluated on binary classification tasks for detecting patch and crack defects in pavement structures. Experimental results demonstrate that the proposed network outperforms baseline architectures across multiple evaluation metrics. Ablation studies further confirm the effectiveness of the designed architectural components. This work contributes a scalable and practical method for real-world dataset generation, along with a novel deep learning framework.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "124",
    "repo": "44",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "finetuning-strategies-for-querying-sounds-by-vocal-imitation",
    "slug": "finetuning-strategies-for-querying-sounds-by-vocal-imitation",
    "title": "Finetuning Strategies for Querying Sounds by Vocal Imitation",
    "thumbnail": "/thumbnails/finetuning-strategies-for-querying-sounds-by-vocal-imitation.jpg",
    "authors": [
      {
        "name": "Aditya Bhattacharjee",
        "slug": "aditya-bhattacharjee"
      },
      {
        "name": "Christos Plachouras",
        "slug": "christos-plachouras"
      },
      {
        "name": "Sungkyun Chang",
        "slug": "sungkyun-chang"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "This technical report describes our winning submission to the AES AIMLA 2025 Challenge on querying sound effects by vocal imitation. We investigate two complementary fine-tuning strategies: contrastive learning with a frozen, pretrained CED encoder, and joint contrastive-triplet learning with semi-hard negatives using a MobileNetV3 encoder. This report has been updated for posterity to include details released after the challenge.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "85",
    "repo": "86",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "levy-attention-single-pass-predictive-uncertainty-for-continuous-time-attention",
    "slug": "levy-attention-single-pass-predictive-uncertainty-for-continuous-time-attention",
    "title": "Lévy Attention: Single-Pass Predictive Uncertainty for Continuous-Time Attention",
    "thumbnail": "/thumbnails/levy-attention-single-pass-predictive-uncertainty-for-continuous-time-attention.jpg",
    "authors": [
      {
        "name": "Sotirios P. Chatzis",
        "slug": "sotirios-p-chatzis"
      },
      {
        "name": "Loukas Papadoulas",
        "slug": "loukas-papadoulas"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "Deep models for irregularly-sampled time series answer queries at arbitrary continuous timestamps, yet report nothing about how far each answer should be trusted. We show the attention layer itself can close that gap: with the right stochastic formulation, the pass that makes each prediction also reports, in closed form and at no extra cost, how far it should be trusted. We introduce Lévy Attention, a cross-attention operator whose output is a stochastic integral against an inhomogeneous Poisson random measure: query-key compatibilities assemble an intensity over a continuous (time x channel) index space, the measure scatters atoms under it, and the output averages an interpolated value field at those atoms. In expectation it reduces to a mollified cosine-kernel attention, so it replaces a softmax layer and trains with exact gradients.   What softmax discards, the Poisson construction preserves in closed form: the evidence $Λ_q$ (total compatibility mass) and the disagreement $\\mathrm{tr}\\,Σ_V(q)$ (value spread). An exact variance identity makes their combination $\\hatσ(q)=\\sqrt{\\mathrm{tr}\\,Σ_V(q)\\,\\varphi(Λ_q)}$ the root-mean-square deviation of the sampled operator, emitted by the deterministic pass with no trained head.   Empirically, disagreement carries the signal, while the evidence factor swings from uninformative on dense data to strongly informative on sparse. On t-PatchGNN the operator swap costs at most 5.6% accuracy against a matched control and nothing on the sparsest dataset. The free disagreement signal improves on 20-pass MC dropout across matched five-seed suites, and $\\hatσ$ scales a calibrated Gaussian whose zero-sample CRPS beats a fifty-draw sampler; a split-conformal wrapper reaches nominal coverage at every level, and one pass ranks 3,383 unseen patients by trust in 1.4 seconds.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "228",
    "repo": "136",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "learned-then-lost-a-measured-single-example-counterfactual-in-pre-training",
    "slug": "learned-then-lost-a-measured-single-example-counterfactual-in-pre-training",
    "title": "Learned, Then Lost: A Measured Single-Example Counterfactual in Pre-training",
    "thumbnail": "/thumbnails/learned-then-lost-a-measured-single-example-counterfactual-in-pre-training.jpg",
    "authors": [
      {
        "name": "Zachary Speck",
        "slug": "zachary-speck"
      },
      {
        "name": "Asa Shepard",
        "slug": "asa-shepard"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "A single training example&#x27;s contribution to a finished model is normally estimated rather than measured, because measuring it takes two expensive full pre-training runs that differ in one row of one batch. We ran that counterfactual 24 times at a small scale. We trained 32 GPT-2 models at 124M parameters from scratch on OpenWebText, over four conditions and eight seeds. At step 200 of 9,536, at peak learning rate, we replaced one row of a 256-row batch with a fixed context injection carrying a 194-token passage. The three injected conditions are: 1. fluent prose with a corpus-attested subject, 2. fluent prose with a fabricated subject matched to it within 0.14% on full-batch gradient delta, and 3. random keyboard characters. The fourth condition is an uninjected twin. The passage is learned from one exposure and then decays. Fifty steps after injection, the arm that saw a passage predicts it better than the arm that did not by 0.039 and 0.044 nats of cross-entropy on the passage, at eight of eight seeds with p &lt; $10^{-4}$. At the final step we do not detect that difference for either passage, at p = 0.25 and p = 0.71, against minimum detectable effects of 0.025 and 0.079 nats, nor between the two passages, at p=0.54. Every geometric measure we report is taken after that decay. Our pre-registered contrast on interpolation loss barrier is +0.0068 with p = 0.509, against a minimum detectable effect of 0.032 barrier units. Held-out cross-entropy is $-0.00044$ with p = 0.310. Per-layer centered kernel alignment does not detectably separate any condition at any layer. Weight displacement reaches 44.1% of the seed-to-seed Euclidean distance and is 92% settled by the midpoint of training, while the barrier reaches 3.0% of the seed-to-seed barrier. Those two figures sit roughly 15 times apart, and that is a lower bound. The injection relocates the model within its basin without moving it out.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "92",
    "repo": "162",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "childsafeads-shared-task-2026-commercial-content-in-child-facing-youtube-videos",
    "slug": "childsafeads-shared-task-2026-commercial-content-in-child-facing-youtube-videos",
    "title": "ChildSafeAds Shared Task 2026: Commercial Content in Child-Facing YouTube Videos",
    "thumbnail": "/thumbnails/childsafeads-shared-task-2026-commercial-content-in-child-facing-youtube-videos.jpg",
    "authors": [
      {
        "name": "Thales Bertaglia",
        "slug": "thales-bertaglia"
      },
      {
        "name": "Catalina Goanta",
        "slug": "catalina-goanta"
      },
      {
        "name": "Gerasimos Spanakis",
        "slug": "gerasimos-spanakis"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "ChildSafeAds is a shared task on commercial content in YouTube videos likely to reach children and teenagers. It contains 3,360 videos from 939 channels. Each instance begins with a segment submitted to SponsorBlock, an open-source crowdsourced browser extension whose users mark sponsor segments so that others can skip them. We pair the segment with its available transcript, video and channel information, and a sales or service page linked from the video description. Systems determine what kind of offer is being promoted (ST1), assign product categories (ST2), and identify legal risk flags (ST3). The evidence is divided into four cumulative access levels, from the transcript to the linked page, so results can be compared against the cost of collecting the data. 45.5\\% of videos in our data failed to properly use the in-platform ad disclosure method (the ``Includes paid promotion&#x27;&#x27; label). GPT-5.4 produced the labels after the expert organiser team reviewed samples and iterated on the taxonomy, prompts and model choices. GPT-5.6-luna independently labelled the development set. This report describes the task, data and evaluation. An updated version will add participating systems and shared-task results.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "85",
    "repo": "78",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "interpretable-ai-predicts-a-2026-summer-dry-anomaly-in-central-china",
    "slug": "interpretable-ai-predicts-a-2026-summer-dry-anomaly-in-central-china",
    "title": "Interpretable AI predicts a 2026 summer dry anomaly in central China",
    "thumbnail": "/thumbnails/interpretable-ai-predicts-a-2026-summer-dry-anomaly-in-central-china.jpg",
    "authors": [
      {
        "name": "Anran Wang",
        "slug": "anran-wang"
      },
      {
        "name": "Wen Shi",
        "slug": "wen-shi"
      },
      {
        "name": "Yong Luo",
        "slug": "yong-luo"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "Seasonal precipitation anomalies are largely regulated by atmospheric circulation, which dynamical models predict with greater reliability than precipitation itself. Here, we employ a deep learning model that translates dynamical circulation predictions into precipitation estimates. Predictions initialized from March to May consistently indicate a dry anomaly over central China in summer 2026. Retrospective evaluations revealed higher predictive skill in the analogue years, which also tended to feature central equatorial Pacific warming persisting from the preceding winter into summer. This warming favors an anomalous cyclonic circulation over the western North Pacific-South China Sea-South China region, which induces northerly winds and moisture divergence that jointly suppress rainfall over central China. Supporting this mechanism, layer-wise relevance propagation (LRP) independently identifies these northerly winds as the dominant driver of the prediction among all model inputs. Perturbation tests supported this attribution: removing LRP-identified features effectively eliminates the dry anomaly. Our framework thus provides physically interpretable explanations for AI-derived regional climate projections, facilitating evidence-based assessment before observational data become available.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "117",
    "repo": "91",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "beyond-the-transcript-detecting-covert-co-ordination-in-latent-multi-agent-communication",
    "slug": "beyond-the-transcript-detecting-covert-co-ordination-in-latent-multi-agent-communication",
    "title": "Beyond the Transcript: Detecting Covert Co ordination in Latent Multi-Agent Communication",
    "thumbnail": "/thumbnails/beyond-the-transcript-detecting-covert-co-ordination-in-latent-multi-agent-communication.jpg",
    "authors": [
      {
        "name": "Ramneet Kaur",
        "slug": "ramneet-kaur"
      },
      {
        "name": "Pradyumna Chari",
        "slug": "pradyumna-chari"
      },
      {
        "name": "Ramesh Raskar",
        "slug": "ramesh-raskar"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "Language-model agents can communicate through continuous hidden states that are invisible in public transcripts, creating opportunities for covert harmful coordination. We introduce Verifiable Latent Alignments (VLA), an activation-aware framework for monitoring and steering these private communication channels. For every monitored decision, VLA links the private latent-state record and channel status to the resulting public action using a shared event identifier, enabling matched causal analysis. Our first contribution is a neutral-only three-layer monitor combining representation anomaly detection, counterfactual action-distribution influence, and sparse-autoencoder interpretation support. Our second contribution is a steerability framework spanning black-box behavioral instructions and white-box matched-neutral counterfactuals. Our third contribution is an evaluation on a controlled multi-agent auction benchmark covering homogeneous and heterogeneous model pairs, many-agent scalability, and intervention effectiveness. The sequential monitor achieves mean area under the receiver operating characteristic curve (AUROC) of 0.993 for homogeneous agents and 0.854 for heterogeneous pairs when text- and latent-collusion rows are pooled as positives. In Qwen3-0.6B auctions with 25-100 bidders, monitoring requires only a small normalized load relative to all possible directed pairs, while full white-box steering achieves 100% bid-distribution recovery and reduces collusive low-bid behavior by 47.3 percentage points. Because full white-box steering replays the matched neutral counterfactual, its exact recovery is a sanity check by construction. Overall, the controlled study shows that the evaluated private channel attacks can be monitored without training the primary monitor on attack examples and mitigated when matched counterfactual access is available.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "51",
    "repo": "142",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "continuous-time-reinforcement-learning-for-controlled-hawkes-jump-diffusions",
    "slug": "continuous-time-reinforcement-learning-for-controlled-hawkes-jump-diffusions",
    "title": "Continuous-Time Reinforcement Learning for Controlled Hawkes Jump-Diffusions",
    "thumbnail": "/thumbnails/continuous-time-reinforcement-learning-for-controlled-hawkes-jump-diffusions.jpg",
    "authors": [
      {
        "name": "Tomasz R. Bielecki",
        "slug": "tomasz-r-bielecki"
      },
      {
        "name": "Thibaut Mastrolia",
        "slug": "thibaut-mastrolia"
      },
      {
        "name": "Haoze Yan",
        "slug": "haoze-yan"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "We study stochastic control of multivariate Hawkes-driven stochastic differential equations with machine learning algorithms in a non-Markovian setting. Due to the path dependence of the memory of the Hawkes intensity, this problem does not fall within classical stochastic control theory outside particular Markovian kernels. We first develop a finite-dimensional Markovianization procedure and algorithm to approximate multivariate Hawkes processes with mixtures of exponential kernels. We prove the convergence of the Markovianized approximation of the Hawkes process, its intensity, and the value of the problem to the original non-Markovian processes and the value of the primal problem. We then formulate continuous-time deterministic policy gradient learning on the Markovianized approximation of the problem, called Hawkes-CT DDPG. We propose a model-free algorithm to solve the non-Markovian Hawkes-driven optimization by observing only the event times of the process, the realization of the solution to the SDE, and a chosen set of decay filters, while the Hawkes kernel coefficients remain unknown. We compare our continuous time reinforcement learning Hawkes-CT DDPG method with discrete time reinforcement learning techniques under three different types of kernels: simple exponential, Erlang, and power-law kernels.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "157",
    "repo": "22",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "pre-compiled-pipeline-shards-for-distributed-llm-inference-on-intel-ai-pc-fleets",
    "slug": "pre-compiled-pipeline-shards-for-distributed-llm-inference-on-intel-ai-pc-fleets",
    "title": "Pre-Compiled Pipeline Shards for Distributed LLM Inference on Intel AI PC Fleets",
    "thumbnail": "/thumbnails/pre-compiled-pipeline-shards-for-distributed-llm-inference-on-intel-ai-pc-fleets.jpg",
    "authors": [
      {
        "name": "Tate Berenbaum",
        "slug": "tate-berenbaum"
      },
      {
        "name": "Muthaiah Venkatachalam",
        "slug": "muthaiah-venkatachalam"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "Modern Intel AI PCs ship capable integrated GPUs and NPUs with 16+ GB of unified memory, and they spend considerable time idle. That is not enough memory to fit a large model such as a 70B-parameter LLM. We show that a handful of AIPCs, working together over an ordinary network, can serve models beyond the capability of any single one. We use pipeline parallelism: a model is split by layer into per-stage shards, each pre-compiled into an OpenVINO graph, so that every machine runs one shard and passes activations to the next. Three techniques make this fast enough to be useful. First, we recover the speed of the unsplit model: a naive per-stage export runs well below monolithic inference because it misses an OpenVINO GPU optimization, and injecting a beam_idx Gather into each shard triggers that optimization (the IndirectKVCache fusion) and brings the shards to parity. Second, we leverage speculative decoding on stateful OpenVINO models. Third, the pipeline serves several users at once by interleaving their requests across the stages, each request carrying its own cache (micro-batching). Together, a two-node Llama 3.1 8B INT4 pipeline serves two concurrent users at 1.79x the single-user throughput of the unsplit model on the same hardware, and the gap widens under simulated wide-area latency. The same design scales to a 70B model that no single fleet member can hold: a four-node deployment of Lunar Lake AI PCs on Intel Tiber Cloud serves a single user at interactive speed, with output token-for-token identical to the same four-node pipeline decoding without speculation. Code, raw benchmark logs, and reproduction scripts ship as a self-contained package at https://github.com/labscommunity/pipeline-sharded-inference-paper (in the top-level reproduction/ directory).",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "196",
    "repo": "39",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "geometric-iterative-retrieval-for-neural-audio-codec-resynthesis",
    "slug": "geometric-iterative-retrieval-for-neural-audio-codec-resynthesis",
    "title": "Geometric Iterative Retrieval for Neural Audio Codec Resynthesis",
    "thumbnail": "/thumbnails/geometric-iterative-retrieval-for-neural-audio-codec-resynthesis.jpg",
    "authors": [
      {
        "name": "Leo Schmidt-Traub",
        "slug": "leo-schmidt-traub"
      },
      {
        "name": "Frédéric Berdoz",
        "slug": "fr-d-ric-berdoz"
      },
      {
        "name": "Luca A. Lanzendörfer",
        "slug": "luca-a-lanzend-rfer"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "Neural audio codecs based on Residual Vector Quantization (RVQ) have become the dominant discrete representation for token-based general audio generation, yet resynthesizing high-quality audio from coarse codec tokens remains an open problem and bounds the fidelity of every system that generates them. Prior work has framed resynthesis as a choice between discrete token prediction and continuous regression. We argue that this dichotomy is incomplete and introduce geometric iterative retrieval, a paradigm that uses the RVQ layer hierarchy itself as a natural iterative decomposition in continuous codebook space. Rather than classifying over discrete vocabularies or regressing to a single target vector, our method performs contrastive retrieval in the codebook&#x27;s geometric space. We evaluate our method on codec restoration tasks across speech and music, and show improvements over both single-pass token prediction and one-step regression baselines.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "185",
    "repo": "28",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "grouping-the-stochastic-machine-precision-not-capability-as-the-frontier-metric-for-ai-systems",
    "slug": "grouping-the-stochastic-machine-precision-not-capability-as-the-frontier-metric-for-ai-systems",
    "title": "Grouping the Stochastic Machine: Precision, Not Capability, as the Frontier Metric for AI Systems",
    "thumbnail": "/thumbnails/grouping-the-stochastic-machine-precision-not-capability-as-the-frontier-metric-for-ai-systems.jpg",
    "authors": [
      {
        "name": "George Andrikopoulos",
        "slug": "george-andrikopoulos"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "Frontier language models are compared, marketed, and benchmarked on capability -- what their best or average output can achieve. I argue this measures the wrong axis. The models have saturated accuracy: their mean output lands on the target. What now separates one system from another in practice is precision: how tightly concentrated their outputs are around that target across repeated, identical requests. Borrowing the marksman&#x27;s distinction, capability is where the average shot lands; reliability is the size of the group. I make three claims. First, precision, not capability, is the frontier differentiator between systems, and benchmark culture systematically fails to measure it, reporting central tendency rather than spread. Second, precision is measurable, cheaply and without circularity, by running a fixed suite of deterministically scored tasks many times at fixed temperature and computing the per-task consistency of outcomes -- no model-in-the-loop grader required. Third, the measurement is not merely descriptive but decision-guiding: it separates consistent failures (a tight group off-centre, correctable by the operating discipline of Paper 1 -- a sight adjustment) from scattered failures (a wide group, correctable only by changing the model or its sampling -- a rifle problem). I define a grouping metric, specify a harness, and show how tracking a human-AI pair&#x27;s grouping over time yields the compounding signal that Paper 1&#x27;s field study requires. A first real run, since replicated, illustrates both the method and its most important limit: one measured gap was closed completely by a single rule (0/5 -&gt; 5/5), while a suite of tasks authored from the rules themselves found no value, because a frontier model already embodies explicit good practice -- establishing that a discipline&#x27;s worth is found by measurement on real work, not constructed from its own rulebook.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "243",
    "repo": "76",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "autonomous-cyber-defense-in-connected-vehicles-a-multi-agent-approach-to-v2x-security",
    "slug": "autonomous-cyber-defense-in-connected-vehicles-a-multi-agent-approach-to-v2x-security",
    "title": "Autonomous Cyber Defense in Connected Vehicles: A Multi-Agent Approach to V2X Security",
    "thumbnail": "/thumbnails/autonomous-cyber-defense-in-connected-vehicles-a-multi-agent-approach-to-v2x-security.jpg",
    "authors": [
      {
        "name": "Krishna Teja Medam",
        "slug": "krishna-teja-medam"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "A connected vehicle has roughly 100 milliseconds to decide whether an incoming Basic Safety Message is real or fabricated. If a false emergency braking alert reaches the planning pipeline in time, the car brakes - a safety failure triggered by a security failure. Existing intrusion detection systems are not designed to handle that coupling. They operate per vehicle, per message, with static rules - blind to attack patterns that only emerge across a fleet or over time, and blind to the fundamental tension between dropping a suspicious message and dropping a real emergency alert. We propose a three-tier multi-agent architecture that treats this timing constraint as a hard design requirement, not a performance target. At the vehicle level, an onboard agent classifies each incoming V2X message into one of four actions - Accept, Drop, Quarantine, or Escalate - within a 10-millisecond budget, deliberately biased toward Escalate when uncertain, passing ambiguous cases to the roadside edge agent rather than risking a dropped legitimate alert. The edge agent operates across a roadside unit zone with a 50-millisecond budget, fusing threat assessments from multiple vehicles and resolving safety-security conflicts using complementary sensor observations. The cloud tier refines detection models through Byzantine fault-tolerant federated learning and redistributes updated weights to the fleet. Every timing constraint derives directly from the 100-millisecond Basic Safety Message cycles mandated by SAE J2735 and ETSI EN 302 637-2. No existing framework simultaneously assigns standards-grounded latency budgets to all three deployment tiers while treating safety-security conflict resolution as a first-class design constraint. Remaining open problems - adversarial poisoning at the edge and the absence of regulatory frameworks for autonomous security response - are discussed as future work.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "126",
    "repo": "42",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "score-subject-coordinate-recovery-for-label-free-cross-subject-eeg-to-image-retrieval",
    "slug": "score-subject-coordinate-recovery-for-label-free-cross-subject-eeg-to-image-retrieval",
    "title": "SCORE: Subject Coordinate Recovery for Label-Free Cross-Subject EEG-to-Image Retrieval",
    "thumbnail": "/thumbnails/score-subject-coordinate-recovery-for-label-free-cross-subject-eeg-to-image-retrieval.jpg",
    "authors": [
      {
        "name": "Zhenyao Cui",
        "slug": "zhenyao-cui"
      },
      {
        "name": "Siyuan Kan",
        "slug": "siyuan-kan"
      },
      {
        "name": "Siyang Li",
        "slug": "siyang-li"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "Accurate visual decoding can reveal how the brain represents visual information and recover perceived content from neural signals such as electroencephalography (EEG), with potential for neural communication. However, current EEG-to-image retrieval methods perform far below their within-subject counterparts for new users without labeled calibration, limiting real-world deployment. To understand this gap, we analyze EEG features across subjects and find that different subjects preserve similar relationships among concepts but express them along different coordinate directions. We therefore propose Subject Coordinate Recovery (SCORE), a target label-free framework combining recovery-aware source training with coordinate alignment at deployment. During training, SCORE aligns source subject EEG with a common image space and simulates unseen-subject recovery through source-only episodes. At deployment, with both encoders frozen, SCORE selects reliable EEG-image landmarks through hubness-corrected matching and estimates an orthogonal transformation to recover target EEG coordinates without source data or target labels. In 200-way retrieval on two public benchmarks, SCORE outperforms the unadapted baseline for every target subject and achieves the best overall accuracy. It reaches 53.23%/83.55% and 12.01%/32.16% Top-1/Top-5 on THINGS-EEG2 and Alljoined-1.6M, respectively, surpassing the strongest baselines by 17.45/15.70 and 3.08/4.62 percentage points. Without target labels or encoder updates, SCORE brings brain-based visual decoding closer to robust, practical, low-latency deployment across users.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "82",
    "repo": "135",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "comment-level-topic-drift-analysis-in-the-reddit-corpus",
    "slug": "comment-level-topic-drift-analysis-in-the-reddit-corpus",
    "title": "Comment-level Topic Drift Analysis in the Reddit Corpus",
    "thumbnail": "/thumbnails/comment-level-topic-drift-analysis-in-the-reddit-corpus.jpg",
    "authors": [
      {
        "name": "Steven Morse",
        "slug": "steven-morse"
      },
      {
        "name": "Daniel Runfola",
        "slug": "daniel-runfola"
      },
      {
        "name": "Trenton W. Ford",
        "slug": "trenton-w-ford"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "We present a novel application of embedding-based dynamic topic modeling techniques to detect and quantify topic drift at the comment level in a massive corpus. By leveraging pretrained language models to generate contextualized semantic embeddings for short text, we analyzed 12.7 billion Reddit comments spanning 2006 to 2022. Using unsupervised methods on these embeddings, we identify dynamically evolving topic clusters over time. Our primary contribution is a methodology for analysis of semantic drift and discourse evolution in the embedding space itself. We also demonstrate modifications to existing methods that enable this analysis at scale, and we propose and demonstrate a null model comparison test to filter spurious dynamics. Key findings suggest that politically and socially contentious topics exhibit significant directional drift in embedding space, with inter-topic distances changing systematically over time beyond what the null model can explain, whereas domains such as music and sports remain comparatively stable.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "194",
    "repo": "106",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "beyond-trial-averaging-anchoring-neural-and-visual-representations-for-few-repetition-brain-to-image",
    "slug": "beyond-trial-averaging-anchoring-neural-and-visual-representations-for-few-repetition-brain-to-image",
    "title": "Beyond Trial Averaging: Anchoring Neural and Visual Representations for Few-Repetition Brain-to-Image Retrieval",
    "thumbnail": "/thumbnails/beyond-trial-averaging-anchoring-neural-and-visual-representations-for-few-repetition-brain-to-image.jpg",
    "authors": [
      {
        "name": "Zhenyao Cui",
        "slug": "zhenyao-cui"
      },
      {
        "name": "Siyuan Kan",
        "slug": "siyuan-kan"
      },
      {
        "name": "Dingkun Liu",
        "slug": "dingkun-liu"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "Decoding visual information from brain signals probes neural representations and enables neuro-rehabilitation and dream decoding. Recent brain-to-image retrieval approaches have achieved promising performance, typically by averaging many (up to 80) neural trials per image, requiring repeated stimulus presentation that increases latency, cost, and user burden. When only one or a few repetitions are available, the retrieval accuracy drops sharply. This drop is commonly attributed to query noise because averaging suppresses noise and increases signal stability. However, we find a non-transitive alignment pattern: the low-repetition query signal and the image representation each align with the high-repetition center, but not directly with each other. This pattern shows that query noise is only part of the problem and that gallery placement also affects retrieval. We therefore propose a neural-anchor-based retrieval (NEAR) framework that treats the high-repetition center as an anchor and approaches it from both sides: a denoiser pulls the noisy query toward the true anchor, and a small network predicts each candidate&#x27;s pseudo anchor from its image and pulls the image toward it. Across four datasets spanning EEG, MEG and fMRI, NEAR consistently improved retrieval in the few-repetition regime. On THINGS-EEG2, it improved 200-way Top-1 accuracy by 5.7 and 9.3 percentage points respectively, when averaging one and four repetitions. By anchoring neural and visual representations, NEAR reduces reliance on repeated acquisition and brings neural retrieval closer to real-world deployment.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "216",
    "repo": "88",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  },
  {
    "id": "leaf-values-as-coordinates-exact-contrastive-explanation-for-gradient-boosted-ensembles",
    "slug": "leaf-values-as-coordinates-exact-contrastive-explanation-for-gradient-boosted-ensembles",
    "title": "Leaf Values as Coordinates: Exact Contrastive Explanation for Gradient-Boosted Ensembles",
    "thumbnail": "/thumbnails/leaf-values-as-coordinates-exact-contrastive-explanation-for-gradient-boosted-ensembles.jpg",
    "authors": [
      {
        "name": "Emanuele Luzio",
        "slug": "emanuele-luzio"
      }
    ],
    "date": "Aug 19, 2026",
    "description": "A gradient-boosted ensemble predicts by summing one leaf value per tree. Read   those values as coordinates rather than as intermediate results, and every   instance becomes a point in R^M on which the model acts linearly: the score is   the sum of the coordinates.   This small change of view makes contrastive explanation exact. The difference   between two instances is a vector that is identically zero wherever they share   a leaf, so the gap between a rejected applicant and an accepted one is carried   by a handful of coordinates, each traceable to a real split in a real tree.   Nothing is fitted, sampled, or assumed additive in features -- the additivity   is already there, in the right space.   We build a recourse method on this representation and evaluate it on five   tabular datasets under repeated cross-validation. Its recommendation   reconstructs the model&#x27;s own decision to 6.2 x 10^-15, so an auditor can   re-check the arithmetic without the model. On the credit datasets it is   Pareto-non-dominated on effort against realism. And when recommendations are   restricted to changes the subject could actually make -- not their age, not a   settled delinquency -- it retains 58% of its validity where the strongest   baseline retains 41%, a distinction the standard evaluation cannot see because   it never asks whether a recommendation can be carried out.",
    "sota": "",
    "tags": [
      "Artificial Intelligence",
      "Machine Learning"
    ],
    "additionalTags": [],
    "upvotes": "64",
    "repo": "150",
    "github_hourly_increase": 0,
    "citations": 0,
    "githubUrl": "https://github.com",
    "pdfUrl": "https://arxiv.org"
  }
];
