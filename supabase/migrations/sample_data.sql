-- Insert sample projects
INSERT INTO projects (
    id,
    name,
    summary,
    content,
    image_url,
    demo_url,
    topics,
    forms,
    audiences,
    status
) VALUES
    (
        'c2d6c6d0-9b3a-4f1c-8b3a-9f1c8b3a9f1c',
        'CodeCraft: Interactive Programming for Kids',
        'A block-based coding platform designed specifically for elementary school students to learn programming concepts through interactive games.',
        E'CodeCraft is an innovative educational platform that makes learning to code fun and accessible for elementary school students. Using a drag-and-drop interface inspired by Scratch, students can create their own games, animations, and interactive stories.\n\nKey Features:\n- Visual block-based programming interface\n- Built-in tutorial system with progressive challenges\n- Real-time preview of code execution\n- Sharing platform for student projects\n- Teacher dashboard for progress monitoring\n\nThe platform focuses on fundamental programming concepts like sequences, loops, and conditionals, while maintaining an engaging and colorful interface that appeals to young learners. Students can start with simple projects and gradually advance to more complex programming concepts.\n\nTeachers can track student progress, assign specific challenges, and provide feedback directly through the platform. The built-in sharing feature allows students to learn from each other and showcase their creativity.',
        'https://example.com/codecraft-preview.jpg',
        'https://demo.codecraft.edu',
        ARRAY['Coding', 'STEM'],
        ARRAY['Web App'],
        ARRAY['K-12 Students', 'K-12 Educators'],
        'approved'
    ),
    (
        'd3e7d7e1-0c4b-5f2d-9c4b-6f2d9c4b6f2d',
        'LanguageLab VR',
        'Virtual reality language learning environment that immerses students in realistic scenarios for practicing conversation skills.',
        E'LanguageLab VR revolutionizes language learning by creating immersive virtual environments where students can practice their language skills in realistic scenarios. Using VR technology, students can explore virtual cities, markets, and other locations while engaging in natural conversations with AI-powered characters.\n\nFeatures:\n- Multiple language support (Spanish, French, Mandarin)\n- AI-powered conversation partners\n- Cultural immersion experiences\n- Progressive difficulty levels\n- Speech recognition for pronunciation feedback\n\nThe platform adapts to each student''s proficiency level, providing appropriate vocabulary and grammar challenges. Teachers can create custom scenarios and track student progress through detailed analytics.\n\nThe VR environment helps reduce anxiety about speaking a new language by providing a safe, judgment-free space for practice. Students can repeat scenarios as many times as needed and receive instant feedback on their pronunciation and grammar.',
        'https://example.com/languagelab-preview.jpg',
        'https://languagelab-vr.edu/demo',
        ARRAY['Languages'],
        ARRAY['Physical Device', 'Mobile App'],
        ARRAY['College Students', 'K-12 Students'],
        'approved'
    ),
    (
        'e4f8e8f2-1d5c-6f3e-0d5c-7f3e0d5c7f3e',
        'HistoryXplorer',
        'An augmented reality app that brings historical events to life through interactive 3D models and storytelling.',
        E'HistoryXplorer transforms history education by bringing historical events and artifacts directly into the classroom through augmented reality. Students can examine 3D models of historical artifacts, explore ancient cities, and witness key historical events through immersive AR experiences.\n\nKey Features:\n- High-quality 3D models of historical artifacts\n- Interactive timelines\n- Virtual museum tours\n- Collaborative exploration modes\n- Integration with standard history curricula\n\nThe app includes detailed historical information, primary sources, and interactive quizzes to reinforce learning. Teachers can create custom tours and assignments, highlighting specific historical periods or themes.\n\nThe AR technology allows students to walk around historical scenes, examine artifacts from all angles, and interact with historical figures through animated presentations. This hands-on approach makes history more engaging and memorable for students.',
        'https://example.com/historyxplorer-preview.jpg',
        'https://historyxplorer.edu/demo',
        ARRAY['History'],
        ARRAY['Mobile App'],
        ARRAY['K-12 Students', 'K-12 Educators'],
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
        'c2d6c6d0-9b3a-4f1c-8b3a-9f1c8b3a9f1c',
        'Dr. Sarah Chen',
        'Computer Science Professor',
        'sarah.chen@university.edu',
        'Tech University'
    ),
    (
        'c2d6c6d0-9b3a-4f1c-8b3a-9f1c8b3a9f1c',
        'Michael Rodriguez',
        'K-12 Education Specialist',
        'mrodriguez@school.edu',
        'Valley Elementary School'
    ),
    (
        'd3e7d7e1-0c4b-5f2d-9c4b-6f2d9c4b6f2d',
        'Dr. Emma Thompson',
        'Language Department Chair',
        'emma.thompson@college.edu',
        'State University'
    ),
    (
        'd3e7d7e1-0c4b-5f2d-9c4b-6f2d9c4b6f2d',
        'James Wilson',
        'VR Technology Lead',
        'jwilson@techlab.com',
        'Educational Technology Lab'
    ),
    (
        'e4f8e8f2-1d5c-6f3e-0d5c-7f3e0d5c7f3e',
        'Dr. Robert Kim',
        'History Professor',
        'rkim@university.edu',
        'Heritage University'
    ),
    (
        'e4f8e8f2-1d5c-6f3e-0d5c-7f3e0d5c7f3e',
        'Lisa Martinez',
        'Educational Content Developer',
        'lmartinez@edutech.com',
        'EduTech Solutions'
    );
