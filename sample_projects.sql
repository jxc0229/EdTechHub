-- Insert sample projects with different statuses
INSERT INTO projects (name, content, image_url, author, topics, forms, status, created_at)
VALUES
  (
    'AI-Powered Study Buddy',
    'An intelligent chatbot that helps students with their homework and study planning. Uses natural language processing to understand questions and provide personalized assistance.',
    'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5',
    'Sarah Chen',
    ARRAY['AI', 'E-Learning'],
    ARRAY['Web APP'],
    'approved',
    NOW() - INTERVAL '7 days'
  ),
  (
    'VR Chemistry Lab',
    'A virtual reality chemistry laboratory where students can conduct experiments safely. Includes realistic chemical reactions and safety protocols.',
    'https://images.unsplash.com/photo-1507413245164-6160d8298b31',
    'Michael Rodriguez',
    ARRAY['VR/AR', 'E-Learning'],
    ARRAY['Physical', 'Web APP'],
    'approved',
    NOW() - INTERVAL '5 days'
  ),
  (
    'Dyslexia-Friendly Reader',
    'A mobile app that makes reading easier for students with dyslexia. Features customizable fonts, color overlays, and text-to-speech functionality.',
    'https://images.unsplash.com/photo-1512076249812-fd58fb2c7c28',
    'Emma Thompson',
    ARRAY['Learning Difference', 'Assistive Technology'],
    ARRAY['Mobile'],
    'pending',
    NOW() - INTERVAL '3 days'
  ),
  (
    'Math Quest Adventure',
    'A gamified mathematics learning platform where students solve math problems to progress through an epic fantasy story.',
    'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3',
    'Alex Kim',
    ARRAY['Gamification', 'E-Learning'],
    ARRAY['Web APP', 'Mobile'],
    'approved',
    NOW() - INTERVAL '6 days'
  ),
  (
    'Smart Language Partner',
    'An AI-powered language learning app that creates personalized conversation scenarios and provides real-time pronunciation feedback.',
    'https://images.unsplash.com/photo-1546410531-bb4caa6b424d',
    'Lisa Wang',
    ARRAY['AI', 'E-Learning'],
    ARRAY['Mobile'],
    'pending',
    NOW() - INTERVAL '2 days'
  ),
  (
    'Inclusive Learning Management System',
    'An LMS designed with accessibility in mind, featuring screen reader support, keyboard navigation, and high contrast modes.',
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40',
    'David Park',
    ARRAY['LMS', 'Assistive Technology'],
    ARRAY['Web APP'],
    'rejected',
    NOW() - INTERVAL '4 days'
  ),
  (
    'AR Science Explorer',
    'An augmented reality app that brings scientific concepts to life through interactive 3D models and experiments.',
    'https://images.unsplash.com/photo-1532094349884-543bc11b234d',
    'Rachel Foster',
    ARRAY['VR/AR', 'E-Learning'],
    ARRAY['Mobile', 'Physical'],
    'approved',
    NOW() - INTERVAL '8 days'
  ),
  (
    'Collaborative Music Creator',
    'A web-based platform for music education that allows students to compose and perform music together in real-time.',
    'https://images.unsplash.com/photo-1511379938547-c1f69419868d',
    'James Wilson',
    ARRAY['E-Learning'],
    ARRAY['Web APP'],
    'pending',
    NOW() - INTERVAL '1 day'
  ),
  (
    'Speech Therapy Assistant',
    'An AI-powered mobile app that helps students practice speech exercises and tracks their progress over time.',
    'https://images.unsplash.com/photo-1516321497487-e288fb19713f',
    'Maria Garcia',
    ARRAY['AI', 'Assistive Technology'],
    ARRAY['Mobile'],
    'approved',
    NOW() - INTERVAL '9 days'
  ),
  (
    'Historical Time Travel VR',
    'A VR experience that transports students to different historical periods for immersive learning.',
    'https://images.unsplash.com/photo-1461360228754-6e81c478b882',
    'Tom Anderson',
    ARRAY['VR/AR', 'Gamification'],
    ARRAY['Physical'],
    'rejected',
    NOW() - INTERVAL '5 days'
  );
