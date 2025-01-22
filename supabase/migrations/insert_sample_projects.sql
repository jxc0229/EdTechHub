-- Insert sample projects
insert into public.projects (
  name,
  content,
  image_url,
  author,
  topics,
  forms,
  created_at
) values
(
  'AI-Powered Learning Assistant',
  'An intelligent tutoring system that adapts to individual learning styles using natural language processing and machine learning algorithms. Features include personalized lesson plans, real-time feedback, and progress tracking.',
  'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=800',
  'Sarah Chen',
  array['AI', 'E-Learning', 'Assistive Technology'],
  array['Web APP'],
  now() - interval '2 days'
),
(
  'VR Chemistry Lab',
  'A virtual reality chemistry laboratory where students can safely conduct experiments, visualize molecular structures in 3D, and learn complex chemical concepts through interactive simulations.',
  'https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=800',
  'Michael Rodriguez',
  array['VR/AR', 'E-Learning'],
  array['Physical', 'Mobile'],
  now() - interval '5 days'
),
(
  'Gamified Math Quest',
  'An engaging mobile game that teaches mathematics through story-driven quests, puzzles, and challenges. Designed to make learning math fun and accessible for students with different learning styles.',
  'https://images.unsplash.com/photo-1518133910546-b6c2fb7d79e3?auto=format&fit=crop&w=800',
  'Emma Thompson',
  array['Gamification', 'Learning Difference'],
  array['Mobile'],
  now() - interval '1 week'
),
(
  'Adaptive Learning Management System',
  'A modern LMS that uses AI to create personalized learning paths, track student progress, and provide real-time analytics for educators. Features include automated grading and content recommendations.',
  'https://images.unsplash.com/photo-1501504905252-473c47e087f8?auto=format&fit=crop&w=800',
  'David Park',
  array['LMS', 'AI', 'E-Learning'],
  array['Web APP'],
  now() - interval '2 weeks'
),
(
  'AR Language Learning',
  'An augmented reality application that helps users learn new languages by overlaying translations and pronunciation guides on real-world objects. Includes interactive speaking practice and cultural insights.',
  'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&w=800',
  'Lisa Wang',
  array['VR/AR', 'E-Learning'],
  array['Mobile', 'Physical'],
  now() - interval '3 weeks'
),
(
  'Dyslexia Reading Assistant',
  'An assistive technology tool that helps students with dyslexia improve their reading comprehension through customizable text formatting, text-to-speech features, and interactive exercises.',
  'https://images.unsplash.com/photo-1456735190827-d1262f71b8a3?auto=format&fit=crop&w=800',
  'James Wilson',
  array['Assistive Technology', 'Learning Difference'],
  array['Web APP', 'Mobile'],
  now() - interval '1 month'
);
