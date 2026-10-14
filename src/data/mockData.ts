import {
  User,
  StudentStats,
  RecommendedModule,
  AIRecommendation,
  ActivityItem,
  AptitudeQuestion,
  AptitudeCategory,
  CodingProblem,
  TechnicalTopic,
  TechnicalQuestion,
  InterviewType,
  RoadmapStage,
  Company,
  ResumeData,
  AdminStudentOverview
} from '@/types';

export const initialStudent: User = {
  id: 'usr_shivam_01',
  name: 'Shivam Nival',
  email: 'shivam.nival@engg.edu',
  role: 'student',
  college: 'National Institute of Engineering & Technology',
  branch: 'Computer Science and Engineering',
  gradYear: 2026,
  currentSkillLevel: 'Intermediate',
  joinedDate: 'Jan 2026',
  cgpa: 8.82,
  activeBacklogs: 0,
  preferredJobRoles: ['Software Development Engineer', 'Full Stack Developer', 'Cloud Engineer'],
  targetCompanyIds: ['amazon', 'tcs', 'infosys', 'accenture'],
  dailyPrepMinutes: 120, // 2 hours daily study commitment
  placementTargetDate: '2026-11-15'
};

export const studentStats: StudentStats = {
  readinessScore: 72,
  aptitudeScore: 78,
  codingScore: 65,
  technicalScore: 70,
  interviewScore: 74,
  currentStreak: 7,
  problemsSolved: 84,
  testsCompleted: 32,
  mockInterviews: 8,
  weeklyHours: [2.5, 4.0, 3.2, 5.0, 4.5, 6.0, 3.5]
};

export const recommendedModules: RecommendedModule[] = [
  {
    id: 'm1',
    title: 'DSA: Arrays & Two Pointers',
    category: 'Coding',
    progress: 70,
    totalItems: 30,
    completedItems: 21,
    href: '/coding'
  },
  {
    id: 'm2',
    title: 'Logical Reasoning: Syllogisms & Blood Relations',
    category: 'Aptitude',
    progress: 55,
    totalItems: 40,
    completedItems: 22,
    href: '/aptitude'
  },
  {
    id: 'm3',
    title: 'DBMS: Normalization & Indexing',
    category: 'Technical',
    progress: 40,
    totalItems: 25,
    completedItems: 10,
    href: '/technical'
  },
  {
    id: 'm4',
    title: 'Quantitative: Time & Distance, Probability',
    category: 'Aptitude',
    progress: 80,
    totalItems: 50,
    completedItems: 40,
    href: '/aptitude'
  }
];

export const aiRecommendations: AIRecommendation[] = [
  {
    id: 'rec1',
    title: 'Improve DBMS Mastery',
    description: 'DBMS index queries scored 45% in your last practice test. Practice 10 SQL & B-Tree questions.',
    type: 'practice',
    badge: 'High Priority',
    actionText: 'Review DBMS',
    href: '/technical'
  },
  {
    id: 'rec2',
    title: 'Practice Medium-Level DSA',
    description: 'Boost coding score from 65% to 75% with sliding window and dynamic programming problems.',
    type: 'practice',
    badge: 'Placement Core',
    actionText: 'Solve 3 Problems',
    href: '/coding'
  },
  {
    id: 'rec3',
    title: 'Take an Aptitude Mock Test',
    description: 'Infosys & TCS mock drive open this weekend. Test your speed across 40 timed questions.',
    type: 'quiz',
    badge: 'Weekly Goal',
    actionText: 'Start Test',
    href: '/aptitude'
  },
  {
    id: 'rec4',
    title: 'Try a Technical Mock Interview',
    description: 'Practice answering OOP, System Design fundamentals, and project trade-offs with AI feedback.',
    type: 'interview',
    badge: 'Interview Prep',
    actionText: 'Launch Session',
    href: '/interview'
  }
];

export const recentActivities: ActivityItem[] = [
  {
    id: 'act1',
    title: 'TCS NQT Full Aptitude Simulation',
    category: 'Aptitude',
    timestamp: '2 hours ago',
    score: '84%',
    status: 'passed'
  },
  {
    id: 'act2',
    title: 'Longest Substring Without Repeating Characters',
    category: 'Coding',
    timestamp: 'Yesterday',
    score: 'All Testcases Passed (42ms)',
    status: 'excellent'
  },
  {
    id: 'act3',
    title: 'Operating Systems Virtual Memory Quiz',
    category: 'Technical',
    timestamp: '2 days ago',
    score: '18 / 20 Correct',
    status: 'passed'
  },
  {
    id: 'act4',
    title: 'Amazon SDE Mock Technical Interview (Round 1)',
    category: 'Interview',
    timestamp: '3 days ago',
    score: 'Overall 76%',
    status: 'completed'
  }
];

export const aptitudeCategories: AptitudeCategory[] = [
  {
    id: 'quant',
    title: 'Quantitative Aptitude',
    description: 'Time & Work, Percentages, Profit & Loss, Speed & Distance, Probability, Permutations.',
    questionCount: 180,
    avgTimeMins: 30,
    topics: ['Time & Work', 'Percentages', 'Profit & Loss', 'Permutations & Combinations', 'Probability', 'Averages']
  },
  {
    id: 'logical',
    title: 'Logical Reasoning',
    description: 'Syllogisms, Blood Relations, Seating Arrangements, Coding-Decoding, Direction Sense.',
    questionCount: 150,
    avgTimeMins: 25,
    topics: ['Syllogism', 'Blood Relations', 'Seating Arrangements', 'Data Sufficiency', 'Series Completion']
  },
  {
    id: 'verbal',
    title: 'Verbal Ability',
    description: 'Reading Comprehension, Sentence Correction, Para Jumbles, Vocabulary, Spotting Errors.',
    questionCount: 120,
    avgTimeMins: 20,
    topics: ['Sentence Correction', 'Para Jumbles', 'Reading Comprehension', 'Fillers & Cloze Test']
  },
  {
    id: 'di',
    title: 'Data Interpretation',
    description: 'Tables, Bar Graphs, Pie Charts, Line Graphs, and Mixed Caselets for corporate test formats.',
    questionCount: 95,
    avgTimeMins: 35,
    topics: ['Pie Charts', 'Bar Graphs', 'Tabular DI', 'Caselets']
  }
];

export const sampleAptitudeQuestions: AptitudeQuestion[] = [
  {
    id: 'q1',
    topic: 'Quantitative Aptitude',
    difficulty: 'Medium',
    question: 'A train 240 m long passes a pole in 24 seconds. How long will it take to pass a platform 650 m long?',
    options: ['65 seconds', '89 seconds', '100 seconds', '75 seconds'],
    correctAnswer: 1,
    explanation: 'Speed of train = 240 / 24 = 10 m/s. Total distance to cross platform = 240 + 650 = 890 m. Time taken = 890 / 10 = 89 seconds.'
  },
  {
    id: 'q2',
    topic: 'Quantitative Aptitude',
    difficulty: 'Easy',
    question: 'If 15 men can complete a project in 20 days, how many days will 25 men take to complete the same work?',
    options: ['10 days', '12 days', '14 days', '16 days'],
    correctAnswer: 1,
    explanation: 'M1 * D1 = M2 * D2. Hence, 15 * 20 = 25 * D2 => 300 = 25 * D2 => D2 = 12 days.'
  },
  {
    id: 'q3',
    topic: 'Logical Reasoning',
    difficulty: 'Medium',
    question: 'Pointing to a photograph, Rohit said, "She is the daughter of the only son of my grandfather." How is Rohit related to the girl?',
    options: ['Brother', 'Uncle', 'Father', 'Cousin'],
    correctAnswer: 0,
    explanation: 'Grandfather\'s only son is Rohit\'s father. The girl is the daughter of Rohit\'s father, so Rohit is her brother.'
  },
  {
    id: 'q4',
    topic: 'Logical Reasoning',
    difficulty: 'Hard',
    question: 'Statements: All laptops are screens. Some screens are portable. Conclusions: I. Some laptops are portable. II. Some portable items are screens.',
    options: ['Only I follows', 'Only II follows', 'Both I and II follow', 'Neither follows'],
    correctAnswer: 1,
    explanation: 'Since "Some screens are portable" is a basic relation, by conversion "Some portable items are screens" is logically true. Laptop and portable have no direct linkage.'
  },
  {
    id: 'q5',
    topic: 'Verbal Ability',
    difficulty: 'Medium',
    question: 'Select the option that correctly replaces the phrase: "The panel was unanimous in their verdict."',
    options: [
      'The panel were unanimous in their verdict.',
      'The panel was unanimous in its verdict.',
      'The panel have been unanimous in its verdict.',
      'No correction required.'
    ],
    correctAnswer: 1,
    explanation: 'When a collective noun acts as a single cohesive unit with unanimous agreement, it takes a singular pronoun: "its verdict".'
  }
];

export const codingProblems: CodingProblem[] = [
  {
    id: 'prob-1',
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Arrays', 'Hash Table'],
    acceptance: '53.4%',
    solved: true,
    description: 'Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].'
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]'
      }
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      'Only one valid answer exists.'
    ],
    starterCode: {
      cpp: 'class Solution {\npublic:\n    vector<int> twoSum(vector<int>& nums, int target) {\n        // Write your code here\n    }\n};',
      python: 'class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        seen = {}\n        for i, num in enumerate(nums):\n            diff = target - num\n            if diff in seen:\n                return [seen[diff], i]\n            seen[num] = i\n        return []',
      java: 'class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Write your code here\n        return new int[]{};\n    }\n}',
      javascript: 'function twoSum(nums, target) {\n    const map = new Map();\n    for (let i = 0; i < nums.length; i++) {\n        const complement = target - nums[i];\n        if (map.has(complement)) return [map.get(complement), i];\n        map.set(nums[i], i);\n    }\n    return [];\n}'
    },
    testCases: [
      { input: '[2,7,11,15], 9', expected: '[0,1]' },
      { input: '[3,2,4], 6', expected: '[1,2]' },
      { input: '[3,3], 6', expected: '[0,1]' }
    ]
  },
  {
    id: 'prob-2',
    title: 'Longest Substring Without Repeating Characters',
    difficulty: 'Medium',
    tags: ['Strings', 'Sliding Window', 'Hash Table'],
    acceptance: '34.8%',
    solved: true,
    description: 'Given a string s, find the length of the longest substring without duplicate characters.',
    examples: [
      {
        input: 's = "abcabcbb"',
        output: '3',
        explanation: 'The answer is "abc", with the length of 3.'
      },
      {
        input: 's = "bbbbb"',
        output: '1',
        explanation: 'The answer is "b", with the length of 1.'
      }
    ],
    constraints: [
      '0 <= s.length <= 5 * 10^4',
      's consists of English letters, digits, symbols and spaces.'
    ],
    starterCode: {
      cpp: 'class Solution {\npublic:\n    int lengthOfLongestSubstring(string s) {\n        // Your code here\n    }\n};',
      python: 'class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        char_set = set()\n        l = 0\n        res = 0\n        for r in range(len(s)):\n            while s[r] in char_set:\n                char_set.remove(s[l])\n                l += 1\n            char_set.add(s[r])\n            res = max(res, r - l + 1)\n        return res',
      java: 'class Solution {\n    public int lengthOfLongestSubstring(String s) {\n        // Your code here\n        return 0;\n    }\n}',
      javascript: 'function lengthOfLongestSubstring(s) {\n    let left = 0, maxLen = 0;\n    const set = new Set();\n    for (let right = 0; right < s.length; right++) {\n        while (set.has(s[right])) {\n            set.delete(s[left++]);\n        }\n        set.add(s[right]);\n        maxLen = Math.max(maxLen, right - left + 1);\n    }\n    return maxLen;\n}'
    },
    testCases: [
      { input: '"abcabcbb"', expected: '3' },
      { input: '"bbbbb"', expected: '1' },
      { input: '"pwwkew"', expected: '3' }
    ]
  },
  {
    id: 'prob-3',
    title: 'Reverse Linked List',
    difficulty: 'Easy',
    tags: ['Linked List', 'Recursion'],
    acceptance: '75.2%',
    solved: false,
    description: 'Given the head of a singly linked list, reverse the list, and return the reversed list.',
    examples: [
      {
        input: 'head = [1,2,3,4,5]',
        output: '[5,4,3,2,1]'
      }
    ],
    constraints: [
      'The number of nodes in the list is the range [0, 5000].',
      '-5000 <= Node.val <= 5000'
    ],
    starterCode: {
      cpp: 'ListNode* reverseList(ListNode* head) {\n    ListNode *prev = nullptr, *curr = head;\n    while (curr) {\n        ListNode* next = curr->next;\n        curr->next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}',
      python: 'def reverseList(head):\n    prev = None\n    curr = head\n    while curr:\n        nxt = curr.next\n        curr.next = prev\n        prev = curr\n        curr = nxt\n    return prev',
      java: 'public ListNode reverseList(ListNode head) {\n    ListNode prev = null, curr = head;\n    while (curr != null) {\n        ListNode next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}',
      javascript: 'function reverseList(head) {\n    let prev = null, curr = head;\n    while (curr) {\n        let next = curr.next;\n        curr.next = prev;\n        prev = curr;\n        curr = next;\n    }\n    return prev;\n}'
    },
    testCases: [
      { input: '[1,2,3,4,5]', expected: '[5,4,3,2,1]' },
      { input: '[1,2]', expected: '[2,1]' }
    ]
  },
  {
    id: 'prob-4',
    title: 'Coin Change (Min Coins)',
    difficulty: 'Medium',
    tags: ['Dynamic Programming', 'Breadth-First Search'],
    acceptance: '43.1%',
    solved: false,
    description: 'You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.\n\nReturn the fewest number of coins that you need to make up that amount. If that amount of money cannot be made up by any combination of the coins, return -1.',
    examples: [
      {
        input: 'coins = [1,2,5], amount = 11',
        output: '3',
        explanation: '11 = 5 + 5 + 1'
      }
    ],
    constraints: [
      '1 <= coins.length <= 12',
      '1 <= coins[i] <= 2^31 - 1',
      '0 <= amount <= 10^4'
    ],
    starterCode: {
      cpp: 'int coinChange(vector<int>& coins, int amount) {\n    // Implement dynamic programming solution\n}',
      python: 'def coinChange(coins: list[int], amount: int) -> int:\n    dp = [float("inf")] * (amount + 1)\n    dp[0] = 0\n    for c in coins:\n        for i in range(c, amount + 1):\n            dp[i] = min(dp[i], dp[i - c] + 1)\n    return dp[amount] if dp[amount] != float("inf") else -1',
      java: 'public int coinChange(int[] coins, int amount) {\n    // DP tabulation\n    return 0;\n}',
      javascript: 'function coinChange(coins, amount) {\n    const dp = new Array(amount + 1).fill(Infinity);\n    dp[0] = 0;\n    for (const c of coins) {\n        for (let i = c; i <= amount; i++) {\n            dp[i] = Math.min(dp[i], dp[i - c] + 1);\n        }\n    }\n    return dp[amount] === Infinity ? -1 : dp[amount];\n}'
    },
    testCases: [
      { input: '[1,2,5], 11', expected: '3' },
      { input: '[2], 3', expected: '-1' },
      { input: '[1], 0', expected: '0' }
    ]
  }
];

export const technicalTopics: TechnicalTopic[] = [
  {
    id: 'dsa',
    title: 'Data Structures',
    shortDesc: 'Trees, Graphs, Hash Tables, Heaps, Priority Queues, Complexity Analysis.',
    questionsCount: 140,
    difficulty: 'Medium',
    bestScore: 82,
    subtopics: ['Binary Search Trees', 'Graph Traversal (BFS/DFS)', 'Min/Max Heaps', 'Asymptotic Notation'],
    iconName: 'Network'
  },
  {
    id: 'dbms',
    title: 'Database Management Systems',
    shortDesc: 'ACID properties, Normalization (1NF to BCNF), SQL Joins, Indexing, Transactions.',
    questionsCount: 120,
    difficulty: 'Medium',
    bestScore: 58,
    subtopics: ['Normalization', 'SQL Complex Queries', 'Concurrency Control', 'Indexing (B+ Trees)'],
    iconName: 'Database'
  },
  {
    id: 'os',
    title: 'Operating Systems',
    shortDesc: 'Processes vs Threads, CPU Scheduling, Deadlocks, Paging, Virtual Memory.',
    questionsCount: 110,
    difficulty: 'Medium',
    bestScore: 78,
    subtopics: ['Virtual Memory & Paging', 'Deadlock Detection & Prevention', 'CPU Scheduling Algorithms', 'Semaphores'],
    iconName: 'Cpu'
  },
  {
    id: 'cn',
    title: 'Computer Networks',
    shortDesc: 'OSI & TCP/IP layers, Routing algorithms, DNS, HTTP/HTTPS, Subnetting, Socket programming.',
    questionsCount: 95,
    difficulty: 'Easy',
    bestScore: 75,
    subtopics: ['TCP 3-Way Handshake', 'Subnet Mask Calculation', 'OSI Layers', 'DNS & HTTP Protocols'],
    iconName: 'Server'
  },
  {
    id: 'oop',
    title: 'Object-Oriented Programming',
    shortDesc: 'Polymorphism, Inheritance, Encapsulation, Abstraction, SOLID principles, Design Patterns.',
    questionsCount: 105,
    difficulty: 'Easy',
    bestScore: 88,
    subtopics: ['Virtual Functions & Polymorphism', 'SOLID Principles', 'Abstract Classes vs Interfaces', 'Singleton Pattern'],
    iconName: 'Layers'
  },
  {
    id: 'se',
    title: 'Software Engineering',
    shortDesc: 'Agile vs Waterfall, CI/CD pipelines, Software Testing (Unit, Integration), Git workflows.',
    questionsCount: 75,
    difficulty: 'Easy',
    bestScore: 70,
    subtopics: ['Agile Scrum Ceremonies', 'Black Box vs White Box Testing', 'Git Version Control', 'Software Lifecycle'],
    iconName: 'Code'
  },
  {
    id: 'co',
    title: 'Computer Architecture',
    shortDesc: 'Pipelining, Cache memory mapping, Instruction sets, RISC vs CISC, Memory hierarchy.',
    questionsCount: 80,
    difficulty: 'Hard',
    bestScore: 62,
    subtopics: ['Cache Mapping Techniques', 'Instruction Pipelining & Hazards', 'RISC vs CISC', 'Interrupt Handling'],
    iconName: 'HardDrive'
  }
];

export const sampleTechQuestions: TechnicalQuestion[] = [
  {
    id: 'tq1',
    topicId: 'dbms',
    question: 'Which normal form is specifically designed to eliminate transitive functional dependencies?',
    options: ['First Normal Form (1NF)', 'Second Normal Form (2NF)', 'Third Normal Form (3NF)', 'Boyce-Codd Normal Form (BCNF)'],
    correctAnswer: 2,
    explanation: '3NF requires that a relation is in 2NF and no non-prime attribute is transitively dependent on the primary key.',
    difficulty: 'Medium'
  },
  {
    id: 'tq2',
    topicId: 'os',
    question: 'Which of the following is NOT a necessary condition for a deadlock to occur?',
    options: ['Mutual Exclusion', 'Preemption Allowed', 'Hold and Wait', 'Circular Wait'],
    correctAnswer: 1,
    explanation: 'The four Coffman conditions are Mutual Exclusion, Hold and Wait, No Preemption, and Circular Wait. If preemption is allowed, deadlock is prevented.',
    difficulty: 'Medium'
  },
  {
    id: 'tq3',
    topicId: 'cn',
    question: 'In TCP connection establishment, what is the correct sequence of packets in the 3-way handshake?',
    options: ['SYN -> ACK -> SYN-ACK', 'SYN -> SYN-ACK -> ACK', 'ACK -> SYN -> ACK', 'FIN -> ACK -> FIN-ACK'],
    correctAnswer: 1,
    explanation: 'The client sends SYN, the server responds with SYN-ACK, and the client confirms with ACK.',
    difficulty: 'Easy'
  },
  {
    id: 'tq4',
    topicId: 'oop',
    question: 'In object-oriented design, what does the "L" in SOLID principles stand for?',
    options: ['Linear Inheritance Principle', 'Liskov Substitution Principle', 'Late Binding Principle', 'Loose Coupling Principle'],
    correctAnswer: 1,
    explanation: 'Liskov Substitution Principle (LSP) states that objects of a superclass should be replaceable with objects of its subclasses without breaking application behavior.',
    difficulty: 'Easy'
  }
];

export const interviewTypes: InterviewType[] = [
  {
    id: 'hr',
    title: 'HR Interview',
    description: 'Behavioral, background verification, culture fit, strengths, conflict resolution, and career objectives.',
    rounds: 1,
    avgDuration: '20 mins',
    difficulty: 'Standard',
    tags: ['STAR Method', 'Culture Fit', 'Soft Skills'],
    questions: [
      {
        id: 'hr_q1',
        question: 'Tell me about yourself, your academic background, and why you are interested in this software engineer role.',
        role: 'Senior Talent Partner',
        tips: ['Focus on your education, key projects, your technical passion, and what excites you about building high-impact software. Keep within 90 seconds.']
      },
      {
        id: 'hr_q2',
        question: 'Describe a situation where you had a disagreement with a team member during a project. How did you resolve it?',
        role: 'Senior Talent Partner',
        tips: ['Use the STAR approach (Situation, Task, Action, Result). Emphasize empathy, professional communication, and data-backed resolution.']
      },
      {
        id: 'hr_q3',
        question: 'Where do you see yourself in the next 3 to 5 years in your engineering career?',
        role: 'Director of People',
        tips: ['Highlight your commitment to deep technical mastery, owning end-to-end features, and taking on mentorship responsibilities.']
      }
    ]
  },
  {
    id: 'tech',
    title: 'Technical Interview',
    description: 'Core Computer Science fundamentals: OS, DBMS, OOP, Computer Networks, and System Architecture.',
    rounds: 2,
    avgDuration: '45 mins',
    difficulty: 'Challenging',
    tags: ['CS Core', 'System Design', 'Query Optimization'],
    questions: [
      {
        id: 'tech_q1',
        question: 'Explain how indexing works in relational databases. What is the difference between Clustered and Non-Clustered index?',
        role: 'Lead Architect',
        tips: ['Discuss B+ Tree structures, disk I/O reduction, row storage order in clustered vs pointers in non-clustered, and when NOT to index.']
      },
      {
        id: 'tech_q2',
        question: 'What is the difference between a Process and a Thread? How do they handle memory space and context switching?',
        role: 'Senior Systems Engineer',
        tips: ['Cover address space sharing (heap/code vs stack/registers), context switch overhead, and IPC vs synchronization primitives.']
      },
      {
        id: 'tech_q3',
        question: 'Explain the ACID properties of database transactions with a banking funds-transfer example.',
        role: 'Lead Architect',
        tips: ['Walk through debit + credit scenario step by step. Highlight rollbacks, write-ahead logging (WAL), and isolation anomalies.']
      }
    ]
  },
  {
    id: 'coding',
    title: 'Coding & DSA Interview',
    description: 'Live problem solving, algorithmic complexity analysis, edge cases, and code optimization.',
    rounds: 2,
    avgDuration: '45 mins',
    difficulty: 'Expert',
    tags: ['Algorithms', 'Data Structures', 'Time/Space Analysis'],
    questions: [
      {
        id: 'code_q1',
        question: 'How would you detect a cycle in a linked list? Can you explain Floyd\'s Cycle-Finding Algorithm and its space complexity?',
        role: 'Senior Algorithm Specialist',
        tips: ['Explain slow and fast pointer pointers moving at 1x and 2x speeds, proof of meeting in cycle, and O(1) auxiliary memory.']
      },
      {
        id: 'code_q2',
        question: 'How does a Hash Map handle collisions under the hood, and how does Java 8+ optimize bucket collisions?',
        role: 'Senior Algorithm Specialist',
        tips: ['Talk about separate chaining vs open addressing, load factor rehashing, and treeification into Red-Black trees at threshold 8.']
      }
    ]
  },
  {
    id: 'behavioral',
    title: 'Behavioral & Leadership Interview',
    description: 'Evaluates ownership, handling high pressure, ambiguous problem statements, and team collaboration.',
    rounds: 1,
    avgDuration: '30 mins',
    difficulty: 'Standard',
    tags: ['Amazon Leadership Principles', 'Ownership', 'Ambiguity'],
    questions: [
      {
        id: 'behav_q1',
        question: 'Tell me about a time when you missed a project deadline or made a critical mistake in code. What happened and how did you handle it?',
        role: 'Engineering Manager',
        tips: ['Own up directly without deflecting blame. Detail your rapid remediation, post-mortem analysis, and preventive measures implemented.']
      }
    ]
  }
];

export const roadmapStages: RoadmapStage[] = [
  {
    id: 1,
    title: 'Diagnostic Assessment',
    description: 'Baseline evaluation across all 4 key placement dimensions to discover strengths and identify weak areas.',
    status: 'completed',
    progress: 100,
    topics: ['Full Skill Assessment Test', 'Aptitude Diagnostic', 'Core Coding Benchmark'],
    nextAction: 'Completed on Jan 14. Starting Score: 58%',
    estimatedWeeks: 'Week 1'
  },
  {
    id: 2,
    title: 'Aptitude & Logical Mastery',
    description: 'Sharpen speed and accuracy on Quantitative Aptitude, Logical Reasoning, and Data Interpretation.',
    status: 'completed',
    progress: 100,
    topics: ['Arithmetic Shortcuts', 'Syllogisms & Analytical Puzzles', 'Corporate DI Caselets'],
    nextAction: 'Passed target benchmark with 78% accuracy.',
    estimatedWeeks: 'Weeks 2-4'
  },
  {
    id: 3,
    title: 'DSA Fundamentals & Problem Solving',
    description: 'Master core data structures and high-frequency placement coding patterns.',
    status: 'in-progress',
    progress: 65,
    topics: ['Arrays, Strings & Two Pointers', 'Linked Lists & Stacks/Queues', 'Binary Trees & Recursion', 'Sliding Window & DP Basics'],
    nextAction: 'Current focus: Solve 5 medium-level Array & DP problems.',
    estimatedWeeks: 'Weeks 5-9'
  },
  {
    id: 4,
    title: 'Technical Subjects (CS Core)',
    description: 'Comprehensive review of DBMS, Operating Systems, Computer Networks, and OOP for campus tech rounds.',
    status: 'in-progress',
    progress: 70,
    topics: ['SQL Queries & ACID / Indexing', 'OS Concurrency & Paging', 'Networking Protocols', 'OOP & Design Patterns'],
    nextAction: 'Recommended: Take DBMS practice quiz to boost from 58% to 75%.',
    estimatedWeeks: 'Weeks 10-12'
  },
  {
    id: 5,
    title: 'Company Mock Tests & Timed Drills',
    description: 'Simulate full company-specific online tests (TCS, Infosys, Accenture, Amazon) under exam pressure.',
    status: 'upcoming',
    progress: 20,
    topics: ['Timed Full Mocks', 'Sectional Cutoff Training', 'Negative Marking Strategy'],
    nextAction: 'Unlock after reaching 75% in DSA Fundamentals.',
    estimatedWeeks: 'Weeks 13-14'
  },
  {
    id: 6,
    title: 'Mock Interviews & Behavioral Drills',
    description: 'One-on-one AI mock interviews with automated rubrics for Communication, Tech depth, and STAR storytelling.',
    status: 'upcoming',
    progress: 15,
    topics: ['HR Behavioral Rounds', 'Technical Deep Dives', 'Live Coding Explanations', 'Resume Project Defense'],
    nextAction: 'Scheduled 2 mock technical sessions this week.',
    estimatedWeeks: 'Weeks 15-16'
  },
  {
    id: 7,
    title: 'Placement Ready Certification',
    description: 'Final placement readiness validation, resume verification, and campus drive shortlist confidence.',
    status: 'upcoming',
    progress: 0,
    topics: ['Comprehensive Exit Simulation', 'Placed Student AMA Notes', 'Recruiter Connect Prep'],
    nextAction: 'Target Readiness Score: 85%+',
    estimatedWeeks: 'Placement Season'
  }
];

export const sampleCompanies: Company[] = [
  {
    id: 'tcs',
    name: 'TCS (Tata Consultancy Services)',
    logoText: 'TCS',
    tagline: 'TCS NQT Ninja & Digital Roles',
    tier: 'Services',
    packageRange: '₹3.6 LPA - ₹7.5 LPA',
    overview: 'TCS is India\'s largest IT services company. The national qualifier test (NQT) tests aptitude, reasoning, advanced coding, and verbal ability.',
    rounds: [
      { roundNumber: 1, title: 'TCS NQT Written Test', description: 'Cognitive (Aptitude, Verbal, Logical) + Advanced Coding (2 problems)', duration: '180 mins' },
      { roundNumber: 2, title: 'Technical Interview', description: 'Project discussion, C/C++/Java basics, DBMS, OOP principles', duration: '30-40 mins' },
      { roundNumber: 3, title: 'MR & HR Interview', description: 'Behavioral assessment, flexibility with locations, communication skills', duration: '20 mins' }
    ],
    pattern: {
      aptitudeWeight: '40%',
      codingWeight: '40%',
      technicalWeight: '20%',
      interviewRounds: 2
    },
    aptitudeTopics: ['Time & Work', 'Percentages', 'Syllogisms', 'Data Arrangement', 'Sentence Completion'],
    codingDifficulty: 'Medium',
    technicalTopics: ['OOP in Java/C++', 'Basic SQL Queries', 'Pointers in C', 'Stack & Queue operations'],
    faqs: [
      { q: 'Is there negative marking in TCS NQT?', a: 'No, there is usually no negative marking, but accuracy affects the percentile score.' },
      { q: 'What is the cutoff for TCS Digital upgrade?', a: 'High percentile in both Cognitive and solving both Advanced Coding problems qualifies you for Digital interviews.' }
    ],
    previousQuestions: [
      { title: 'Count pairs with given sum in array', type: 'Coding', difficulty: 'Easy-Medium' },
      { title: 'Difference between Primary Key and Unique Key', type: 'Technical', difficulty: 'Easy' },
      { title: 'Subarray with zero sum', type: 'Coding', difficulty: 'Medium' }
    ]
  },
  {
    id: 'infosys',
    name: 'Infosys',
    logoText: 'INFY',
    tagline: 'System Engineer & Specialist Programmer (SP)',
    tier: 'Services',
    packageRange: '₹3.6 LPA - ₹9.5 LPA',
    overview: 'Infosys conducts InfyTQ and campus drives for System Engineer, DSE, and SP roles. Strict sectional time limits are enforced.',
    rounds: [
      { roundNumber: 1, title: 'Online Test', description: 'Reasoning Ability, Technical Ability, Verbal, Pseudo-code & Puzzle Solving', duration: '100 mins' },
      { roundNumber: 2, title: 'Technical + HR Interview', description: 'DSA, Resume projects, database normalization, puzzle queries', duration: '35 mins' }
    ],
    pattern: {
      aptitudeWeight: '35%',
      codingWeight: '45%',
      technicalWeight: '20%',
      interviewRounds: 1
    },
    aptitudeTopics: ['Cryptarithmetic Puzzles', 'Data Sufficiency', 'Critical Reasoning', 'Algebra'],
    codingDifficulty: 'Medium',
    technicalTopics: ['Pseudocode Tracing', 'Algorithm Complexity', 'Java Collection Framework', 'RDBMS'],
    faqs: [
      { q: 'What are Cryptarithmetic puzzles?', a: 'Letters replace digits in mathematical equations (e.g. SEND + MORE = MONEY). Infosys heavily tests this in Reasoning.' }
    ],
    previousQuestions: [
      { title: 'Solve SEND + MORE = MONEY mapping', type: 'Puzzles', difficulty: 'Medium' },
      { title: 'Longest Palindromic Substring', type: 'Coding', difficulty: 'Medium' }
    ]
  },
  {
    id: 'accenture',
    name: 'Accenture',
    logoText: 'ACN',
    tagline: 'Associate Software Engineer (ASE & FSE)',
    tier: 'Services',
    packageRange: '₹4.5 LPA - ₹6.5 LPA',
    overview: 'Accenture evaluates cognitive ability, technical assessment (MS Office, Cloud, Networking, Pseudo-code), and hands-on coding.',
    rounds: [
      { roundNumber: 1, title: 'Cognitive & Technical Assessment', description: 'Eliminatory round with English, Reasoning, MS Office fundamentals, Pseudocode', duration: '90 mins' },
      { roundNumber: 2, title: 'Coding Assessment', description: '2 programming challenges (immediately unlocks after clearing Round 1)', duration: '45 mins' },
      { roundNumber: 3, title: 'Communication Round', description: 'Automated voice assessment testing reading, repetition, and speaking', duration: '20 mins' },
      { roundNumber: 4, title: 'Virtual Interview', description: 'Project defense, situational questions, HR clearance', duration: '25 mins' }
    ],
    pattern: {
      aptitudeWeight: '30%',
      codingWeight: '35%',
      technicalWeight: '35%',
      interviewRounds: 1
    },
    aptitudeTopics: ['Critical Reasoning', 'Abstract Reasoning', 'English Vocabulary & Grammar'],
    codingDifficulty: 'Easy',
    technicalTopics: ['Common Cloud terminology', 'Pseudocode loops', 'Network Protocols', 'Basic Security'],
    faqs: [
      { q: 'Is the communication test eliminatory?', a: 'Yes, scoring below benchmark in speech clarity or listening can lead to rejection.' }
    ],
    previousQuestions: [
      { title: 'Bitwise operation pseudocode output', type: 'Technical', difficulty: 'Easy' },
      { title: 'Calculate Rat Count in Houses with minimum food requirements', type: 'Coding', difficulty: 'Easy' }
    ]
  },
  {
    id: 'amazon',
    name: 'Amazon',
    logoText: 'AMZN',
    tagline: 'Software Development Engineer (SDE-1)',
    tier: 'Product',
    packageRange: '₹28 LPA - ₹45 LPA',
    overview: 'Amazon focuses heavily on Data Structures & Algorithms, Clean Code, Scalable Architecture, and the 16 Amazon Leadership Principles (LPs).',
    rounds: [
      { roundNumber: 1, title: 'Online Assessment (OA)', description: '2 DSA coding questions + Work Style Assessment (Leadership Principles)', duration: '105 mins' },
      { roundNumber: 2, title: 'Technical Interview 1', description: 'Data structures: Trees, Graphs, Hash Maps, algorithmic optimization', duration: '60 mins' },
      { roundNumber: 3, title: 'Technical Interview 2', description: 'Dynamic Programming, System Architecture design, OOD', duration: '60 mins' },
      { roundNumber: 4, title: 'Bar Raiser & Hiring Manager', description: 'High-level design, deep behavioral drill on Customer Obsession and Ownership', duration: '60 mins' }
    ],
    pattern: {
      aptitudeWeight: '10%',
      codingWeight: '60%',
      technicalWeight: '30%',
      interviewRounds: 3
    },
    aptitudeTopics: ['Analytical Reasoning', 'Probabilistic Thinking'],
    codingDifficulty: 'Hard',
    technicalTopics: ['Binary Search Trees', 'Trie Data Structure', 'Graph BFS/DFS', 'LRU Cache', 'Concurrency'],
    faqs: [
      { q: 'How important are Leadership Principles?', a: 'Critical. 50% of your interview evaluation at Amazon depends on behavioral alignment with LPs.' }
    ],
    previousQuestions: [
      { title: 'LRU Cache implementation with O(1) get and put', type: 'Coding', difficulty: 'Hard' },
      { title: 'Rotting Oranges (Multi-source BFS)', type: 'Coding', difficulty: 'Medium' },
      { title: 'Course Schedule II (Topological Sort)', type: 'Coding', difficulty: 'Medium' }
    ]
  },
  {
    id: 'microsoft',
    name: 'Microsoft',
    logoText: 'MSFT',
    tagline: 'Software Engineer (Campus)',
    tier: 'Product',
    packageRange: '₹25 LPA - ₹42 LPA',
    overview: 'Microsoft campus hiring focuses on solid coding fundamentals, modular code structure, memory management, and growth mindset.',
    rounds: [
      { roundNumber: 1, title: 'Online Coding Assessment', description: '3 coding problems on Codility platform', duration: '90 mins' },
      { roundNumber: 2, title: 'Technical Rounds (2-3)', description: 'Data structures, algorithm complexity, debugging edge cases, system design', duration: '45 mins each' },
      { roundNumber: 3, title: 'AA / Partner Round', description: 'Culture fit, past projects, vision, technical breadth', duration: '45 mins' }
    ],
    pattern: {
      aptitudeWeight: '10%',
      codingWeight: '65%',
      technicalWeight: '25%',
      interviewRounds: 3
    },
    aptitudeTopics: ['Problem Solving Logic'],
    codingDifficulty: 'Medium-Hard',
    technicalTopics: ['Pointers & Memory', 'Binary Trees', 'Dynamic Programming', 'OS Threading'],
    faqs: [
      { q: 'Does Microsoft ask OOP design questions?', a: 'Yes, Object-Oriented Design (e.g. Design Parking Lot or File System) is very common in Round 2.' }
    ],
    previousQuestions: [
      { title: 'Lowest Common Ancestor in Binary Tree', type: 'Coding', difficulty: 'Medium' },
      { title: 'Design an in-memory File System', type: 'Technical', difficulty: 'Hard' }
    ]
  },
  {
    id: 'google',
    name: 'Google',
    logoText: 'GOOG',
    tagline: 'Software Engineer, Early Career (Campus)',
    tier: 'Product',
    packageRange: '₹32 LPA - ₹55 LPA',
    overview: 'Google tests deep algorithmic intuition, computational geometry, graph algorithms, mathematical proofs, and Googleyness & Leadership.',
    rounds: [
      { roundNumber: 1, title: 'Google Online Challenge', description: '2 complex algorithmic challenges on HackerEarth', duration: '60 mins' },
      { roundNumber: 2, title: 'Technical Interviews (3-4 rounds)', description: 'DSA, algorithmic correctness proofs, space/time optimizations, edge case analysis', duration: '45 mins each' },
      { roundNumber: 3, title: 'Googleyness & Leadership', description: 'Behavioral scenarios, collaborative instincts, ambiguity navigation', duration: '45 mins' }
    ],
    pattern: {
      aptitudeWeight: '5%',
      codingWeight: '75%',
      technicalWeight: '20%',
      interviewRounds: 4
    },
    aptitudeTopics: ['Combinatorics', 'Discrete Math'],
    codingDifficulty: 'Hard',
    technicalTopics: ['Segment Trees', 'Dijkstra / Shortest Paths', 'Dynamic Programming on Trees', 'Bit Manipulation'],
    faqs: [
      { q: 'Is pseudo-code accepted during Google interviews?', a: 'No, you must write syntactically clean, production-quality code in your chosen language.' }
    ],
    previousQuestions: [
      { title: 'Word Ladder II (Shortest transformation sequence)', type: 'Coding', difficulty: 'Hard' },
      { title: 'Sliding Window Maximum using Deque', type: 'Coding', difficulty: 'Hard' }
    ]
  },
  {
    id: 'cognizant',
    name: 'Cognizant',
    logoText: 'CTSH',
    tagline: 'GenC, GenC Elevate & GenC Next',
    tier: 'Services',
    packageRange: '₹4.0 LPA - ₹6.75 LPA',
    overview: 'Cognizant campus process features GenC (Aptitude & Basic Coding) and GenC Elevate/Next (Advanced algorithmic coding, DB and cloud).',
    rounds: [
      { roundNumber: 1, title: 'Communication Assessment', description: 'Listening, sentence formation, vocabulary', duration: '45 mins' },
      { roundNumber: 2, title: 'Technical Assessment', description: 'Aptitude, SQL queries, Python/Java coding', duration: '60 mins' },
      { roundNumber: 3, title: 'Technical & HR Discussion', description: 'Core CS subjects and academic project demonstration', duration: '30 mins' }
    ],
    pattern: {
      aptitudeWeight: '35%',
      codingWeight: '40%',
      technicalWeight: '25%',
      interviewRounds: 1
    },
    aptitudeTopics: ['Numerical Ability', 'Logical Deduction', 'Reading Comprehension'],
    codingDifficulty: 'Easy',
    technicalTopics: ['SQL Joins', 'OOP Concepts', 'Java Collections', 'HTML/CSS/JS'],
    faqs: [
      { q: 'How can I get the GenC Next role?', a: 'Solve both coding questions with optimal space/time complexity in the advanced coding round.' }
    ],
    previousQuestions: [
      { title: 'Find duplicate elements in an array', type: 'Coding', difficulty: 'Easy' },
      { title: 'Write SQL query to find second highest salary', type: 'Technical', difficulty: 'Easy' }
    ]
  },
  {
    id: 'capgemini',
    name: 'Capgemini',
    logoText: 'CAP',
    tagline: 'Analyst & Senior Analyst Roles',
    tier: 'Services',
    packageRange: '₹4.25 LPA - ₹7.5 LPA',
    overview: 'Capgemini uses pseudo-code rounds, game-based cognitive aptitude, and English essay/speech evaluations.',
    rounds: [
      { roundNumber: 1, title: 'Technical Assessment & Pseudocode', description: '30 questions on data structures, algorithmic flow, loops', duration: '30 mins' },
      { roundNumber: 2, title: 'Game-Based Aptitude', description: '4 interactive mini-games evaluating working memory and spatial awareness', duration: '25 mins' },
      { roundNumber: 3, title: 'Coding Round', description: '2 coding challenges', duration: '45 mins' },
      { roundNumber: 4, title: 'Technical + HR Interview', description: 'Combined interview with project deep dive', duration: '30 mins' }
    ],
    pattern: {
      aptitudeWeight: '40%',
      codingWeight: '35%',
      technicalWeight: '25%',
      interviewRounds: 1
    },
    aptitudeTopics: ['Game-based cognitive tests', 'Inductive Reasoning', 'Deductive Logic'],
    codingDifficulty: 'Easy-Medium',
    technicalTopics: ['Pseudocode Tracing', 'Recursion basics', 'Array pointers'],
    faqs: [
      { q: 'Can we use calculators in the Game-based aptitude?', a: 'No, they test reaction time and mental math without aids.' }
    ],
    previousQuestions: [
      { title: 'Evaluate recursive pseudocode return value', type: 'Technical', difficulty: 'Medium' },
      { title: 'Check if two strings are Anagrams', type: 'Coding', difficulty: 'Easy' }
    ]
  },
  {
    id: 'deloitte',
    name: 'Deloitte',
    logoText: 'DTT',
    tagline: 'Analyst - Consulting & Advisory',
    tier: 'Services',
    packageRange: '₹6.0 LPA - ₹9.0 LPA',
    overview: 'Deloitte looks for a strong blend of quantitative rigor, business acumen, verbal articulate communication, and technical depth.',
    rounds: [
      { roundNumber: 1, title: 'Online Assessment', description: 'Quantitative, Logical, Verbal, and Computer Fundamentals', duration: '90 mins' },
      { roundNumber: 2, title: 'Case Study / Group Discussion', description: 'Business & tech problem scenario solving in a team format', duration: '30 mins' },
      { roundNumber: 3, title: 'Technical Interview', description: 'Database design, Python/Java, web development overview', duration: '30 mins' },
      { roundNumber: 4, title: 'Partner / HR Round', description: 'Leadership, consulting orientation, client communication', duration: '20 mins' }
    ],
    pattern: {
      aptitudeWeight: '45%',
      codingWeight: '25%',
      technicalWeight: '30%',
      interviewRounds: 2
    },
    aptitudeTopics: ['Data Interpretation', 'Critical Reasoning', 'Business Math'],
    codingDifficulty: 'Easy-Medium',
    technicalTopics: ['SQL Subqueries', 'Cloud Concepts', 'SDLC Models', 'Python Data Structures'],
    faqs: [
      { q: 'Is there a coding round for Deloitte Analyst role?', a: 'Some years have 1-2 coding problems, while others emphasize technical MCQs and pseudocode.' }
    ],
    previousQuestions: [
      { title: 'SQL query for Department highest salary using GROUP BY', type: 'Technical', difficulty: 'Medium' }
    ]
  },
  {
    id: 'wipro',
    name: 'Wipro',
    logoText: 'WIPRO',
    tagline: 'Elite National Talent Hunt (NTH) & Turbo',
    tier: 'Services',
    packageRange: '₹3.5 LPA - ₹6.5 LPA',
    overview: 'Wipro Elite NTH tests Quantitative, Logical, Verbal, Written Communication (Essay), and Hands-on Coding.',
    rounds: [
      { roundNumber: 1, title: 'National Talent Hunt (NTH)', description: 'Aptitude (48 mins) + Essay Writing (20 mins) + Coding (60 mins)', duration: '128 mins' },
      { roundNumber: 2, title: 'Technical Interview', description: 'Resume projects, basic data structures, OOPs concepts', duration: '25-30 mins' },
      { roundNumber: 3, title: 'HR Interview', description: 'Willingness to relocate, career aspirations, shift timings', duration: '15 mins' }
    ],
    pattern: {
      aptitudeWeight: '40%',
      codingWeight: '35%',
      technicalWeight: '25%',
      interviewRounds: 2
    },
    aptitudeTopics: ['Speed Math', 'Grammar & Vocabulary', 'Analytical Puzzles'],
    codingDifficulty: 'Easy',
    technicalTopics: ['C/C++ basics', 'String manipulation', 'Linked List traversal'],
    faqs: [
      { q: 'Is the essay evaluated by AI in Wipro NTH?', a: 'Yes, an automated engine checks spelling, grammar, punctuation, and vocabulary variety.' }
    ],
    previousQuestions: [
      { title: 'Check whether a number is Armstrong or not', type: 'Coding', difficulty: 'Easy' },
      { title: 'Reverse words in a given string sentence', type: 'Coding', difficulty: 'Easy' }
    ]
  }
];

export const initialResume: ResumeData = {
  personal: {
    fullName: 'Shivam Nival',
    title: 'Aspiring Software Engineer & B.Tech CSE Candidate',
    email: 'shivam.nival@engg.edu',
    phone: '+91 98765 43210',
    location: 'Bengaluru, Karnataka, India',
    linkedin: 'linkedin.com/in/shivam-nival',
    github: 'github.com/shivam-nival',
    summary: 'Proactive Computer Science undergraduate with a solid foundation in Data Structures, Algorithms, Full-Stack Web Development, and Database Systems. Proven track record of building production-ready web apps and solving 80+ algorithmic challenges.'
  },
  education: [
    {
      id: 'edu-1',
      institution: 'National Institute of Engineering & Technology',
      degree: 'Bachelor of Technology (B.Tech)',
      field: 'Computer Science and Engineering',
      startYear: '2022',
      endYear: '2026',
      cgpa: '8.82 / 10.0'
    },
    {
      id: 'edu-2',
      institution: 'Delhi Public Senior Secondary School',
      degree: 'Class XII (CBSE - PCM with Computer Science)',
      field: 'Science & Mathematics',
      startYear: '2020',
      endYear: '2022',
      cgpa: '94.6%'
    }
  ],
  skills: [
    {
      category: 'Programming Languages',
      items: ['C++', 'Python', 'Java', 'JavaScript', 'TypeScript', 'SQL']
    },
    {
      category: 'Web & Frameworks',
      items: ['React.js', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS', 'RESTful APIs']
    },
    {
      category: 'Core Computer Science',
      items: ['Data Structures & Algorithms', 'DBMS & SQL', 'Operating Systems', 'Computer Networks', 'OOPs']
    },
    {
      category: 'Developer Tools & Platforms',
      items: ['Git & GitHub', 'Docker', 'Postman', 'VS Code', 'Linux/Unix', 'Vercel']
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'PlacePrep - Placement Preparation Platform',
      techStack: 'Next.js 14, TypeScript, Tailwind CSS, Local Storage, Web APIs',
      description: 'Engineered an end-to-end placement accelerator supporting interactive aptitude quizzes, in-browser code editor with multi-language execution simulation, AI mock interview rubrics, and dynamic placement readiness scoring.',
      link: 'https://placeprep.app'
    },
    {
      id: 'proj-2',
      name: 'DevSync - Collaborative Real-Time Code Board',
      techStack: 'React, Node.js, Socket.IO, Monaco Editor, Express, Redis',
      description: 'Created a synchronized multi-user code room with real-time cursor tracking, syntax highlighting for 12 languages, and sub-50ms message latency using WebSockets.',
      link: 'https://github.com/shivam-nival/devsync'
    }
  ],
  experience: [
    {
      id: 'exp-1',
      role: 'Software Engineering Intern',
      company: 'TechNovus Solutions',
      period: 'May 2025 - July 2025 (3 Months)',
      points: [
        'Built 6 responsive dashboard modules using Next.js and Tailwind CSS, improving client portal engagement by 28%.',
        'Optimized Postgres query indices and reduced average analytics endpoint response latency from 680ms to 210ms.',
        'Collaborated with senior engineers in Agile sprints, creating automated unit tests with 85% code coverage.'
      ]
    }
  ],
  certifications: [
    'AWS Certified Cloud Practitioner (Foundational)',
    'Meta Front-End Developer Professional Certificate (Coursera)',
    'HackerRank Problem Solving (Gold Badge - 5 Star in C++ & Python)'
  ],
  achievements: [
    'Ranked in top 5% among 12,000+ candidates in National Coding Olympiad 2025.',
    'Winner - Inter-College Hackathon 2024 for Best EdTech Solution.',
    'Solved 80+ LeetCode problems across Arrays, Linked Lists, Trees, and Dynamic Programming.'
  ]
};

export const adminStudents: AdminStudentOverview[] = [
  {
    id: 'st-01',
    name: 'Shivam Nival',
    email: 'shivam.nival@engg.edu',
    college: 'NIET Bengaluru',
    branch: 'CSE',
    readinessScore: 72,
    codingSolved: 84,
    testsCompleted: 32,
    status: 'Placement Ready'
  },
  {
    id: 'st-02',
    name: 'Ananya Sharma',
    email: 'ananya.s@engg.edu',
    college: 'NIET Bengaluru',
    branch: 'CSE (AI & ML)',
    readinessScore: 88,
    codingSolved: 142,
    testsCompleted: 45,
    status: 'Placement Ready'
  },
  {
    id: 'st-03',
    name: 'Rohan Deshmukh',
    email: 'rohan.d@engg.edu',
    college: 'NIET Bengaluru',
    branch: 'Information Technology',
    readinessScore: 61,
    codingSolved: 52,
    testsCompleted: 24,
    status: 'Needs Practice'
  },
  {
    id: 'st-04',
    name: 'Pooja Verma',
    email: 'pooja.v@engg.edu',
    college: 'NIET Bengaluru',
    branch: 'Electronics & Comm.',
    readinessScore: 76,
    codingSolved: 95,
    testsCompleted: 38,
    status: 'Placement Ready'
  },
  {
    id: 'st-05',
    name: 'Aditya Nair',
    email: 'aditya.n@engg.edu',
    college: 'NIET Bengaluru',
    branch: 'Mechanical (Minor CS)',
    readinessScore: 48,
    codingSolved: 28,
    testsCompleted: 15,
    status: 'Struggling'
  }
];

export const performanceHistoryData = [
  { id: 'h1', test: 'TCS NQT Full Diagnostic Mock', category: 'Aptitude', score: '84%', accuracy: '91%', date: 'Oct 04, 2026' },
  { id: 'h2', test: 'Operating Systems - Concurrency & Deadlocks', category: 'Technical', score: '90%', accuracy: '90%', date: 'Oct 02, 2026' },
  { id: 'h3', test: 'Arrays & Sliding Window Speed Drill', category: 'Coding', score: '70%', accuracy: '80%', date: 'Sep 29, 2026' },
  { id: 'h4', test: 'DBMS Indexing & Normalization Quiz', category: 'Technical', score: '58%', accuracy: '65%', date: 'Sep 25, 2026' },
  { id: 'h5', test: 'Amazon SDE AI Mock Technical Interview', category: 'Interview', score: '76%', accuracy: '78%', date: 'Sep 20, 2026' },
  { id: 'h6', test: 'Logical Reasoning & Syllogism Drill', category: 'Aptitude', score: '82%', accuracy: '85%', date: 'Sep 16, 2026' }
];

// ============================================================================
// COLLEGE PLACEMENT INTELLIGENCE DATA (Sample College Records)
// ============================================================================

export const defaultCollegePlacementData = {
  collegeName: 'National Institute of Engineering & Technology',
  collegeCode: 'NIET-BEN',
  location: 'Bengaluru, Karnataka',
  overview: 'Autonomous Engineering Institution affiliated with State Tech University. Hosts annual on-campus and joint pool recruitment drives for Product Engineering and IT Services organizations.',
  isDemoCollege: true, // Clearly documented: Sample / Demo data
  historicalYears: ['2025-2026', '2024-2025', '2023-2024'],
  branchTrends: [
    {
      branch: 'Computer Science and Engineering',
      totalStudents: 240,
      placedCount: 204,
      avgPackageLPA: 7.8,
      highestPackageLPA: 42.0,
      topRecruiters: ['Amazon', 'TCS Digital', 'Infosys SP', 'Accenture']
    },
    {
      branch: 'Information Technology',
      totalStudents: 120,
      placedCount: 98,
      avgPackageLPA: 7.2,
      highestPackageLPA: 28.0,
      topRecruiters: ['Cognizant GenC Next', 'Capgemini', 'TCS']
    },
    {
      branch: 'Electronics & Communication',
      totalStudents: 180,
      placedCount: 135,
      avgPackageLPA: 6.1,
      highestPackageLPA: 19.5,
      topRecruiters: ['Wipro Turbo', 'Deloitte', 'TCS']
    },
    {
      branch: 'Mechanical & Civil Engineering',
      totalStudents: 160,
      placedCount: 88,
      avgPackageLPA: 4.8,
      highestPackageLPA: 12.0,
      topRecruiters: ['TCS Ninja', 'Infosys', 'Capgemini']
    }
  ],
  recruiterHistory: [
    {
      id: 'rec_hist_1',
      companyName: 'TCS (Tata Consultancy Services)',
      companyId: 'tcs',
      academicYear: '2024-2025',
      status: 'Confirmed' as const,
      rolesOffered: ['Assistant System Engineer (Ninja)', 'Systems Engineer (Digital)', 'Prime Specialist'],
      hiringTier: 'Services' as const,
      packageLPA: '3.6 - 9.0 LPA',
      offersCount: 84,
      branchesEligible: ['CSE', 'IT', 'ECE', 'EEE', 'Mechanical'],
      minCgpa: 6.0,
      maxBacklogs: 1,
      requiredSkills: ['Quantitative Aptitude', 'Reasoning', 'C/C++/Java Basics', 'Basic SQL'],
      recruitmentStages: ['TCS NQT Online Cognitive Test', 'Advanced Coding (2 Problems)', 'Technical Interview', 'HR Interview'],
      verifiedStatus: 'Verified by TPO' as const,
      dataSource: 'NIET Annual Placement Report 2024-25',
      lastUpdated: 'Aug 2025'
    },
    {
      id: 'rec_hist_2',
      companyName: 'Amazon',
      companyId: 'amazon',
      academicYear: '2024-2025',
      status: 'Historical' as const,
      rolesOffered: ['Software Development Engineer I (SDE-1)', 'Quality Assurance Engineer (QAE)'],
      hiringTier: 'Product' as const,
      packageLPA: '28.0 - 44.0 LPA',
      offersCount: 6,
      branchesEligible: ['CSE', 'IT', 'ECE'],
      minCgpa: 7.5,
      maxBacklogs: 0,
      requiredSkills: ['Advanced DSA (Trees, Graphs, DP)', 'System Design Basics', 'Amazon Leadership Principles', 'OOP in Java/C++'],
      recruitmentStages: ['Online Assessment 1 (Debugging & Coding)', 'Work Style Assessment', 'Technical Interview Round 1', 'Technical Interview Round 2', 'Bar Raiser Round'],
      verifiedStatus: 'Verified by TPO' as const,
      dataSource: 'College Campus Placed Records Board',
      lastUpdated: 'Sep 2025'
    },
    {
      id: 'rec_hist_3',
      companyName: 'Infosys',
      companyId: 'infosys',
      academicYear: '2024-2025',
      status: 'Confirmed' as const,
      rolesOffered: ['System Engineer (SE)', 'Digital Specialist Engineer (DSE)', 'Specialist Programmer (SP)'],
      hiringTier: 'Services' as const,
      packageLPA: '3.6 - 9.5 LPA',
      offersCount: 62,
      branchesEligible: ['CSE', 'IT', 'ECE', 'Mechanical'],
      minCgpa: 6.5,
      maxBacklogs: 0,
      requiredSkills: ['Cryptarithmetic & Puzzles', 'Pseudocode Tracing', 'DSA (Arrays, Strings)', 'DBMS Normalization'],
      recruitmentStages: ['InfyTQ / Campus Online Test (Sectional Cutoffs)', 'Technical Interview', 'HR Clearance'],
      verifiedStatus: 'Verified by TPO' as const,
      dataSource: 'TPO Placement Cell Database',
      lastUpdated: 'Oct 2025'
    },
    {
      id: 'rec_hist_4',
      companyName: 'Accenture',
      companyId: 'accenture',
      academicYear: '2024-2025',
      status: 'Confirmed' as const,
      rolesOffered: ['Associate Software Engineer (ASE)', 'Advanced ASE'],
      hiringTier: 'Services' as const,
      packageLPA: '4.5 - 6.5 LPA',
      offersCount: 75,
      branchesEligible: ['CSE', 'IT', 'ECE', 'EEE'],
      minCgpa: 6.5,
      maxBacklogs: 0,
      requiredSkills: ['Critical Reasoning', 'Cloud Terminology', 'Hands-on Coding (2 Problems)', 'Verbal Fluency'],
      recruitmentStages: ['Cognitive & Technical Assessment', 'Coding Test (Immediate unlock)', 'Automated Communication Test', 'Virtual Tech/HR Interview'],
      verifiedStatus: 'Verified by TPO' as const,
      dataSource: 'TPO Placement Notice #2024-11',
      lastUpdated: 'Nov 2025'
    },
    {
      id: 'rec_hist_5',
      companyName: 'Microsoft',
      companyId: 'microsoft',
      academicYear: '2023-2024',
      status: 'Historical' as const,
      rolesOffered: ['Software Engineer (Campus Graduate)'],
      hiringTier: 'Product' as const,
      packageLPA: '26.0 - 42.0 LPA',
      offersCount: 3,
      branchesEligible: ['CSE', 'IT'],
      minCgpa: 8.0,
      maxBacklogs: 0,
      requiredSkills: ['Data Structures & Algorithms', 'OS Concurrency', 'Object-Oriented Design', 'Code Quality'],
      recruitmentStages: ['Online Codility Screening (3 Problems)', 'Technical Round 1 (DSA)', 'Technical Round 2 (Design & Core CS)', 'AA / Partner Fit Round'],
      verifiedStatus: 'Sample / Demo Record' as const,
      dataSource: 'Sample College Historical Record (Demo Mode)',
      lastUpdated: 'Feb 2024'
    },
    {
      id: 'rec_hist_6',
      companyName: 'Deloitte',
      companyId: 'deloitte',
      academicYear: '2024-2025',
      status: 'Confirmed' as const,
      rolesOffered: ['Analyst - Consulting & Technology Advisory'],
      hiringTier: 'Services' as const,
      packageLPA: '6.0 - 8.5 LPA',
      offersCount: 18,
      branchesEligible: ['CSE', 'IT', 'ECE'],
      minCgpa: 6.8,
      maxBacklogs: 0,
      requiredSkills: ['Business Aptitude & DI', 'SQL Queries & Joins', 'Communication & Articulation', 'SDLC'],
      recruitmentStages: ['Online Cognitive & Tech MCQ Assessment', 'Group Discussion / Case Study', 'Technical Interview', 'Partner Round'],
      verifiedStatus: 'Verified by TPO' as const,
      dataSource: 'College TPO Placement Digest',
      lastUpdated: 'Dec 2024'
    }
  ]
};

// Initial student assessment topic breakdown
export const sampleTopicPerformances = [
  { topic: 'Quantitative Aptitude', category: 'Aptitude' as const, score: 82, totalAttempts: 6, lastTested: 'Oct 04, 2026', status: 'Strength' as const },
  { topic: 'Logical Reasoning & Syllogisms', category: 'Aptitude' as const, score: 76, totalAttempts: 5, lastTested: 'Sep 16, 2026', status: 'Strength' as const },
  { topic: 'Verbal Ability & Grammar', category: 'Aptitude' as const, score: 74, totalAttempts: 4, lastTested: 'Sep 20, 2026', status: 'Moderate' as const },
  { topic: 'Arrays & Two Pointers', category: 'Coding' as const, score: 78, totalAttempts: 12, lastTested: 'Yesterday', status: 'Strength' as const },
  { topic: 'Strings & Sliding Window', category: 'Coding' as const, score: 70, totalAttempts: 8, lastTested: 'Sep 29, 2026', status: 'Moderate' as const },
  { topic: 'Dynamic Programming', category: 'Coding' as const, score: 42, totalAttempts: 4, lastTested: 'Sep 28, 2026', status: 'Weakness' as const },
  { topic: 'Linked List & Stacks', category: 'Coding' as const, score: 68, totalAttempts: 6, lastTested: 'Sep 15, 2026', status: 'Moderate' as const },
  { topic: 'Database Normalization & SQL', category: 'Technical' as const, score: 58, totalAttempts: 5, lastTested: 'Sep 25, 2026', status: 'Weakness' as const },
  { topic: 'Operating Systems & Concurrency', category: 'Technical' as const, score: 88, totalAttempts: 4, lastTested: 'Oct 02, 2026', status: 'Strength' as const },
  { topic: 'Object-Oriented Programming (OOP)', category: 'Technical' as const, score: 86, totalAttempts: 5, lastTested: 'Sep 18, 2026', status: 'Strength' as const },
  { topic: 'Computer Networks (OSI/TCP)', category: 'Technical' as const, score: 72, totalAttempts: 3, lastTested: 'Sep 10, 2026', status: 'Moderate' as const },
  { topic: 'HR Behavioral & STAR Structure', category: 'Interview' as const, score: 78, totalAttempts: 4, lastTested: 'Sep 20, 2026', status: 'Strength' as const },
  { topic: 'Technical Architecture Defense', category: 'Interview' as const, score: 72, totalAttempts: 4, lastTested: 'Sep 20, 2026', status: 'Moderate' as const }
];

// Initial Personalized Roadmap generated for Shivam (prioritizes weak skills DBMS & DP based on target Amazon & TCS)
export const initialPersonalizedRoadmapTasks = [
  {
    id: 'task_01',
    dayNumber: 1,
    dateString: 'Today (Day 1)',
    weekNumber: 1,
    title: 'DBMS Normalization & B+ Tree Indexing Drill',
    topic: 'Database Management Systems',
    category: 'Technical' as const,
    recommendedActivity: 'Review 3NF/BCNF functional dependencies and attempt 10 SQL MCQ drills',
    estimatedMinutes: 45,
    priority: 'High' as const,
    status: 'Pending' as const,
    moduleHref: '/technical',
    reasonForRecommendation: 'Current DBMS score is 58% (below 70% threshold). High priority for TCS Digital and Amazon technical rounds.',
    targetCompanyRelevance: 'TCS Digital & Amazon SDE Technical Round'
  },
  {
    id: 'task_02',
    dayNumber: 1,
    dateString: 'Today (Day 1)',
    weekNumber: 1,
    title: 'Solve Sliding Window & 2-Pointer Problem',
    topic: 'Arrays & Strings',
    category: 'Coding' as const,
    recommendedActivity: 'Code and pass all testcases for Longest Substring Without Repeating Characters in Python/C++',
    estimatedMinutes: 45,
    priority: 'High' as const,
    status: 'Pending' as const,
    moduleHref: '/coding',
    reasonForRecommendation: 'Top frequency coding question at Amazon OA and Infosys Specialist Programmer.',
    targetCompanyRelevance: 'Amazon OA & Infosys SP'
  },
  {
    id: 'task_03',
    dayNumber: 2,
    dateString: 'Tomorrow (Day 2)',
    weekNumber: 1,
    title: 'Dynamic Programming Tabulation Basics',
    topic: 'Dynamic Programming',
    category: 'Coding' as const,
    recommendedActivity: 'Solve Coin Change (Min Coins) with 1D DP tabulation and analyze space complexity',
    estimatedMinutes: 60,
    priority: 'High' as const,
    status: 'Pending' as const,
    moduleHref: '/coding',
    reasonForRecommendation: 'DP score is 42% (Critical Gap). Amazon and Microsoft heavily test 1D/2D memoization.',
    targetCompanyRelevance: 'Amazon SDE-1 Technical Round 1'
  },
  {
    id: 'task_04',
    dayNumber: 2,
    dateString: 'Tomorrow (Day 2)',
    weekNumber: 1,
    title: 'Quantitative Speed Drill: Time, Speed & Distance',
    topic: 'Quantitative Aptitude',
    category: 'Aptitude' as const,
    recommendedActivity: 'Complete 5-minute timed test for train platform crossings and relative velocity formulas',
    estimatedMinutes: 30,
    priority: 'Medium' as const,
    status: 'Pending' as const,
    moduleHref: '/aptitude',
    reasonForRecommendation: 'Maintains top accuracy speed required for TCS NQT and Accenture Cognitive elimination round.',
    targetCompanyRelevance: 'TCS NQT & Accenture Cognitive'
  },
  {
    id: 'task_05',
    dayNumber: 3,
    dateString: 'Day 3',
    weekNumber: 1,
    title: 'TCS Previous-Style Puzzles & Code Tracing',
    topic: 'Company Specific Preparation',
    category: 'Company Prep' as const,
    recommendedActivity: 'Review TCS NQT pattern, sectional cutoffs, and previous question archives',
    estimatedMinutes: 45,
    priority: 'Medium' as const,
    status: 'Pending' as const,
    moduleHref: '/companies',
    reasonForRecommendation: 'Confirmed campus drive in 4 weeks. High hire volume (84 historical offers at your college).',
    targetCompanyRelevance: 'TCS Confirmed On-Campus Drive'
  },
  {
    id: 'task_06',
    dayNumber: 4,
    dateString: 'Day 4',
    weekNumber: 1,
    title: 'Technical Mock Interview: System Trade-Offs',
    topic: 'Technical Interview Simulation',
    category: 'Interview' as const,
    recommendedActivity: 'Simulate 20-minute mock interview defending ACID properties and indexing trade-offs',
    estimatedMinutes: 35,
    priority: 'High' as const,
    status: 'Pending' as const,
    moduleHref: '/interview',
    reasonForRecommendation: 'Reinforces yesterday\'s DBMS learnings with verbal articulation and STAR rubric scoring.',
    targetCompanyRelevance: 'Amazon & Deloitte Technical Round'
  },
  {
    id: 'task_07',
    dayNumber: 5,
    dateString: 'Day 5',
    weekNumber: 1,
    title: 'Full Aptitude Diagnostic Simulation',
    topic: 'Full-Length Mock Test',
    category: 'Aptitude' as const,
    recommendedActivity: 'Attempt mixed cognitive section with Quantitative, Logical, and Verbal timed sections',
    estimatedMinutes: 50,
    priority: 'Medium' as const,
    status: 'Pending' as const,
    moduleHref: '/aptitude',
    reasonForRecommendation: 'Tracks aggregate speed improvement before company drive shortlisting opens.',
    targetCompanyRelevance: 'All Target Recruiters'
  }
];

