-- Insert sample projects
INSERT INTO projects (
    id,  -- Explicitly specify IDs for linking authors
    name,
    content,
    image_url,
    topics,
    forms,
    audiences,
    status
) VALUES
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        'Interactive Python Learning Platform',
        'A web-based platform that teaches Python programming through interactive exercises and real-time feedback. Features include code visualization, step-by-step debugging, and automated assessment.',
        'https://images.unsplash.com/photo-1461749280684-dccba630e2f6',
        ARRAY['Coding', 'Languages'],
        ARRAY['Web App', 'API Integration'],
        ARRAY['College Students', 'K-12 Students'],
        'approved'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
        'Historical Events AR Experience',
        'An augmented reality application that brings historical events to life in the classroom. Students can interact with 3D models and experience historical moments through their mobile devices.',
        'https://images.unsplash.com/photo-1599507593499-a3f7d7d97667',
        ARRAY['History', 'STEM'],
        ARRAY['Mobile App', 'Physical Device'],
        ARRAY['K-12 Students', 'K-12 Educators'],
        'approved'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
        'STEM Lab Kit for Remote Learning',
        'A physical kit containing sensors and electronic components that integrate with a web platform, allowing students to conduct science experiments from home while collecting and analyzing data digitally.',
        'https://images.unsplash.com/photo-1532094349884-543bc11b234d',
        ARRAY['STEM', 'Coding'],
        ARRAY['Physical Device', 'Web App', 'API Integration'],
        ARRAY['K-12 Students', 'K-12 Educators', 'College Students'],
        'approved'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
        'Adaptive Writing Assistant',
        'An AI-powered writing tool that provides personalized feedback and suggestions for improving academic writing. Includes features for different citation styles and academic disciplines.',
        'https://images.unsplash.com/photo-1455390582262-044cdead277a',
        ARRAY['Writing', 'Accessibility'],
        ARRAY['Web App', 'API Integration'],
        ARRAY['College Students', 'University Professors'],
        'approved'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
        'Language Learning Through Stories',
        'An immersive platform that teaches languages through interactive storytelling, combining natural language processing with engaging narratives and cultural context.',
        'https://images.unsplash.com/photo-1457369804613-52c61a468e7d',
        ARRAY['Languages', 'Writing'],
        ARRAY['Mobile App', 'Web App'],
        ARRAY['K-12 Students', 'College Students'],
        'approved'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
        'Universal Design Learning Platform',
        'A comprehensive learning management system designed with accessibility in mind, featuring multiple ways of presenting content and engaging with materials to accommodate different learning styles and needs.',
        'https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e',
        ARRAY['Accessibility', 'STEM', 'Writing'],
        ARRAY['Web App', 'API Integration'],
        ARRAY['K-12 Educators', 'University Professors'],
        'approved'
    );

-- Insert sample authors
INSERT INTO project_authors (
    project_id,
    author_name,
    author_title,
    author_email,
    author_institution
) VALUES
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        'Prof. Sarah Chen',
        'Associate Professor of Computer Science',
        'sarah.chen@university.edu',
        'Tech University'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11',
        'Dr. Michael Lee',
        'Senior Lecturer',
        'michael.lee@university.edu',
        'Tech University'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
        'Dr. James Thompson',
        'Professor of History',
        'james.thompson@college.edu',
        'History College'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12',
        'Dr. Emily White',
        'AR/VR Research Lead',
        'emily.white@college.edu',
        'History College'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
        'Dr. Maria Rodriguez',
        'STEM Education Director',
        'maria.rodriguez@institute.edu',
        'STEM Institute'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13',
        'Prof. David Kim',
        'Professor of Engineering',
        'david.kim@institute.edu',
        'STEM Institute'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14',
        'Prof. Michael Chang',
        'Professor of English',
        'michael.chang@university.edu',
        'Language University'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
        'Dr. Emma Wilson',
        'Language Department Head',
        'emma.wilson@academy.edu',
        'Language Academy'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15',
        'Dr. Sofia Garcia',
        'Applied Linguistics Researcher',
        'sofia.garcia@academy.edu',
        'Language Academy'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
        'Dr. Robert Martinez',
        'Accessibility Research Director',
        'robert.martinez@edu.org',
        'Education Research Center'
    ),
    (
        'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16',
        'Dr. Lisa Johnson',
        'Universal Design Specialist',
        'lisa.johnson@edu.org',
        'Education Research Center'
    );
