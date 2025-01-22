// Define project type for better type safety
export interface Project {
  id: number;
  title: string;
  author: string;
  email: string;
  github: string;
  demoUrl: string;
  description: string;
  topics: string[];
  forms: string[];
  image: string;
  date: string;
  detailedDescription: string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: "AI Learning Assistant",
    author: "Sarah Chen",
    email: "sarah.chen@example.com",
    github: "https://github.com/sarahchen",
    demoUrl: "https://demo.ailearning.example.com",
    description: "An AI-powered learning assistant that helps students with personalized learning paths and adaptive content delivery. The system uses machine learning to understand each student's learning style and pace.",
    topics: ["AI", "E-Learning"],
    forms: ["Web APP"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-15",
    detailedDescription: `An innovative AI-powered learning assistant that revolutionizes personalized education. The system employs advanced machine learning algorithms to analyze student performance, learning patterns, and preferences in real-time.

Key Features:
- Adaptive learning paths that adjust to student progress
- Real-time performance analytics and feedback
- Personalized content recommendations
- Interactive practice sessions
- Progress tracking and reporting
- Integration with popular learning management systems

The platform uses natural language processing to provide conversational interactions and contextual help, making the learning experience more engaging and effective for students of all levels.`
  },
  {
    id: 2,
    title: "VR Chemistry Lab",
    author: "Michael Rodriguez",
    email: "michael.rodriguez@example.com",
    github: "https://github.com/mrodriguez",
    demoUrl: "https://demo.vrchemlab.example.com",
    description: "Virtual reality chemistry laboratory for safe experimentation. Students can conduct dangerous experiments safely while learning about chemical reactions and lab safety protocols.",
    topics: ["VR/AR"],
    forms: ["Physical"],
    image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-10",
    detailedDescription: `A cutting-edge virtual reality chemistry laboratory that provides a safe and immersive environment for students to conduct experiments. This innovative platform allows students to perform complex and potentially dangerous chemical reactions without any real-world risks.

Key Features:
- Realistic 3D molecular visualization
- Interactive chemical reaction simulations
- Comprehensive lab safety training modules
- Real-time experiment feedback
- Collaborative virtual lab sessions
- Detailed experiment analytics and reporting

The VR Chemistry Lab makes advanced chemistry concepts accessible and engaging while ensuring student safety and promoting proper laboratory practices.`
  },
  {
    id: 3,
    title: "Gamified Math App",
    author: "Emma Wilson",
    email: "emma.wilson@example.com",
    github: "https://github.com/emmawilson",
    demoUrl: "https://demo.mathgame.example.com",
    description: "Making math fun through interactive games and challenges. Features progressive difficulty levels and rewards system to keep students engaged while learning mathematics.",
    topics: ["Gamification", "Learning Difference"],
    forms: ["Mobile"],
    image: "https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-08",
    detailedDescription: `Transform mathematics learning into an engaging adventure with our gamified math application. This innovative platform combines educational content with game mechanics to create an immersive learning experience that makes math enjoyable for students of all abilities.

Key Features:
- Progressive difficulty levels
- Customizable learning paths
- Achievement system and rewards
- Real-time progress tracking
- Competitive and collaborative modes
- Parent and teacher dashboards

The app adapts to each student's pace and learning style, ensuring that mathematics concepts are understood thoroughly while maintaining engagement through game-like elements.`
  },
  {
    id: 4,
    title: "Adaptive Learning Platform",
    author: "David Kim",
    email: "david.kim@example.com",
    github: "https://github.com/davidkim",
    demoUrl: "https://demo.adaptivelearn.example.com",
    description: "LMS with built-in accessibility features for diverse learners. Includes screen reader support, high contrast modes, and customizable learning paths for different abilities.",
    topics: ["LMS", "Assistive Technology"],
    forms: ["Web APP"],
    image: "https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-05",
    detailedDescription: `An inclusive learning management system designed to accommodate diverse learning needs and abilities. This platform prioritizes accessibility while providing a robust set of features for effective learning and teaching.

Key Features:
- Screen reader compatibility
- High contrast and customizable display modes
- Adaptive content delivery
- Multi-modal learning resources
- Progress monitoring tools
- Collaborative learning spaces

The platform ensures that educational content is accessible to all students, regardless of their learning differences or disabilities.`
  },
  {
    id: 5,
    title: "AR Language Learning",
    author: "Lisa Thompson",
    email: "lisa.thompson@example.com",
    github: "https://github.com/lisathompson",
    demoUrl: "https://demo.arlanguage.example.com",
    description: "Learn languages through augmented reality experiences. Point your device at objects to see and hear translations, creating an immersive language learning environment.",
    topics: ["VR/AR", "E-Learning"],
    forms: ["Mobile", "Physical"],
    image: "https://images.unsplash.com/photo-1546777764-f6a8a6b39c88?auto=format&fit=crop&w=800&q=80",
    date: "2024-03-01",
    detailedDescription: `Experience language learning in a whole new way with our augmented reality application. By combining AR technology with language education, we create an immersive learning environment that makes vocabulary acquisition and language practice more natural and effective.

Key Features:
- Real-time object recognition and translation
- Interactive pronunciation guidance
- Contextual vocabulary learning
- Progress tracking and spaced repetition
- Social learning features
- Offline mode support

The AR Language Learning app transforms everyday surroundings into a language learning playground, making the process more engaging and effective.`
  },
  {
    id: 6,
    title: "Interactive Study Tools",
    author: "James Parker",
    email: "james.parker@example.com",
    github: "https://github.com/jamesparker",
    demoUrl: "https://demo.studytools.example.com",
    description: "Suite of study tools with gamification elements. Includes flashcards, quizzes, and progress tracking with achievement badges and learning streaks.",
    topics: ["Gamification", "E-Learning"],
    forms: ["Web APP", "Mobile"],
    image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=800&q=80",
    date: "2024-02-28",
    detailedDescription: `A comprehensive suite of interactive study tools designed to make learning more engaging and effective. This platform combines traditional study methods with modern gamification techniques to enhance the learning experience.

Key Features:
- Interactive flashcards with spaced repetition
- Customizable quiz generation
- Progress tracking and analytics
- Achievement system and badges
- Study streak monitoring
- Cross-platform synchronization

The Interactive Study Tools suite helps students maintain motivation and track their progress while mastering new subjects and concepts.`
  }
];