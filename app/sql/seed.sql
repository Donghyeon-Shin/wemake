-- cursour prompt
-- @migrations/  Use this migration files to get the context you need to generate a seed.sql file to seed each table in the database. For 'profile_id' column this value '0b46e383-c42f-4725-9582-ae94a1a07dde', respect composite primary keys, unique values so on. Create at least 5 rows per table if possible, 1 row per table that contains a composite primary key. Do not seed 'profile' use '0b46e383-c42f-4725-9582-ae94a1a07dde' for 'profile_id' everwhere

-- Seed data for WeMake database
-- Profile ID to use: 0b46e383-c42f-4725-9582-ae94a1a07dde

-- Categories
INSERT INTO categories (name, description) VALUES
('Productivity', 'Tools and apps to boost your productivity'),
('Design', 'Design tools and resources for creators'),
('Development', 'Development tools and frameworks'),
('Marketing', 'Marketing and growth tools'),
('Analytics', 'Data analytics and insights tools');

-- Jobs
INSERT INTO jobs (position, overview, responsibilities, qualifications, benefits, skills, company_name, company_logo_url, company_location, apply_url, job_type, location_type, salary_range) VALUES
('Senior Frontend Developer', 'Join our team to build amazing user experiences', 'Develop responsive web applications, collaborate with design team', '5+ years React experience, TypeScript proficiency', 'Health insurance, remote work, flexible hours', 'React, TypeScript, CSS, Git', 'TechCorp', 'https://example.com/logo1.png', 'San Francisco, CA', 'https://example.com/apply1', 'full-time', 'hybrid', '$120,000 - $150,000'),
('Product Designer', 'Create beautiful and functional product designs', 'Design user interfaces, conduct user research', '3+ years design experience, Figma expertise', 'Competitive salary, creative environment', 'Figma, Sketch, Adobe Creative Suite', 'DesignStudio', 'https://example.com/logo2.png', 'New York, NY', 'https://example.com/apply2', 'full-time', 'in-person', '$100,000 - $120,000'),
('DevOps Engineer', 'Build and maintain our cloud infrastructure', 'Manage AWS infrastructure, implement CI/CD', '4+ years DevOps experience, AWS certified', 'Remote work, learning budget', 'AWS, Docker, Kubernetes, Terraform', 'CloudTech', 'https://example.com/logo3.png', 'Austin, TX', 'https://example.com/apply3', 'full-time', 'remote', '$150,000 - $250,000'),
('Marketing Manager', 'Drive growth through strategic marketing', 'Develop marketing campaigns, analyze performance', '3+ years marketing experience, data-driven', 'Performance bonuses, career growth', 'Google Analytics, Facebook Ads, SEO', 'GrowthCo', 'https://example.com/logo4.png', 'Los Angeles, CA', 'https://example.com/apply4', 'part-time', 'hybrid', '$70,000 - $100,000'),
('Data Scientist', 'Extract insights from complex data sets', 'Build ML models, create data visualizations', 'Masters in Data Science, Python expertise', 'Research opportunities, conference budget', 'Python, R, SQL, Machine Learning', 'DataLab', 'https://example.com/logo5.png', 'Seattle, WA', 'https://example.com/apply5', 'full-time', 'remote', '$150,000 - $250,000');

-- Products
INSERT INTO products (name, tagline, description, how_it_works, icon, url, profile_id, category_id) VALUES
('TaskMaster Pro', 'Organize your life with smart task management', 'A comprehensive task management app with AI-powered prioritization', 'Uses machine learning to automatically prioritize tasks based on deadlines and importance', 'https://example.com/icon1.png', 'https://taskmaster.com', '0b46e383-c42f-4725-9582-ae94a1a07dde', 1),
('DesignFlow', 'Streamline your design workflow', 'Collaborative design tool for teams with real-time editing', 'Real-time collaboration with version control and design system management', 'https://example.com/icon2.png', 'https://designflow.io', '0b46e383-c42f-4725-9582-ae94a1a07dde', 2),
('CodeSync', 'Version control made simple', 'Git client with visual diff and merge conflict resolution', 'Visual interface for Git operations with intelligent conflict detection', 'https://example.com/icon3.png', 'https://codesync.dev', '0b46e383-c42f-4725-9582-ae94a1a07dde', 3),
('GrowthTracker', 'Track your marketing ROI', 'Comprehensive marketing analytics platform', 'Multi-channel attribution and ROI tracking with automated reporting', 'https://example.com/icon4.png', 'https://growthtracker.com', '0b46e383-c42f-4725-9582-ae94a1a07dde', 4),
('DataViz Pro', 'Beautiful data visualizations', 'Create stunning charts and dashboards', 'Drag-and-drop interface with 100+ chart types and real-time data', 'https://example.com/icon5.png', 'https://datavizpro.com', '0b46e383-c42f-4725-9582-ae94a1a07dde', 5);

-- Reviews
INSERT INTO reviews (product_id, profile_id, rating, review) VALUES
(1, '0b46e383-c42f-4725-9582-ae94a1a07dde', 5, 'Amazing task management app! The AI prioritization is incredibly accurate.'),
(2, '0b46e383-c42f-4725-9582-ae94a1a07dde', 4, 'Great collaboration features, but could use more design templates.'),
(3, '0b46e383-c42f-4725-9582-ae94a1a07dde', 5, 'Finally, a Git client that makes sense! Visual diffs are a game-changer.'),
(4, '0b46e383-c42f-4725-9582-ae94a1a07dde', 4, 'Excellent ROI tracking, helped us optimize our marketing spend.'),
(5, '0b46e383-c42f-4725-9582-ae94a1a07dde', 5, 'Beautiful charts and easy to use. Perfect for presentations.');

-- Product Upvotes (Composite Primary Key)
INSERT INTO product_upvotes (product_id, profile_id) VALUES
(1, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(2, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(3, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(4, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(5, '0b46e383-c42f-4725-9582-ae94a1a07dde');

-- GPT Ideas
INSERT INTO gpt_ideas (idea, views, claimed_at, claimed_by) VALUES
('AI-powered personal finance advisor that analyzes spending patterns', 150, NULL, NULL),
('Social media content scheduler with viral prediction', 89, NULL, NULL),
('Virtual reality meeting platform for remote teams', 234, '2024-01-15 10:30:00', '0b46e383-c42f-4725-9582-ae94a1a07dde'),
('Blockchain-based freelance payment system', 67, NULL, NULL),
('Smart home automation with voice commands', 198, NULL, NULL);

-- GPT Idea Likes (Composite Primary Key)
INSERT INTO gpt_idea_likes (gpt_idea_id, profile_id) VALUES
(1, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(2, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(3, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(4, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(5, '0b46e383-c42f-4725-9582-ae94a1a07dde');

-- Topics
INSERT INTO topics (name, slug) VALUES
('Product Development', 'product-development'),
('Design Tips', 'design-tips'),
('Marketing Strategies', 'marketing-strategies'),
('Tech News', 'tech-news'),
('Startup Advice', 'startup-advice');

-- Posts
INSERT INTO posts (title, content, topic_id, profile_id) VALUES
('How to Build a Successful MVP', 'Building an MVP requires focus on core features...', 1, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
('Design Principles for Better UX', 'Good design is invisible. Here are the key principles...', 2, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
('Growth Hacking Techniques', 'Growth hacking is about rapid experimentation...', 3, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
('Latest AI Developments', 'The AI landscape is evolving rapidly...', 4, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
('Funding Strategies for Startups', 'Raising capital is a crucial milestone...', 5, '0b46e383-c42f-4725-9582-ae94a1a07dde');

-- Post Upvotes (Composite Primary Key)
INSERT INTO post_upvotes (post_id, profile_id) VALUES
(1, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(2, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(3, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(4, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(5, '0b46e383-c42f-4725-9582-ae94a1a07dde');

-- Post Replies
INSERT INTO post_replies (post_id, parent_id, profile_id, reply) VALUES
(1, NULL, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'Great article! I especially liked the section about user feedback.'),
(1, 1, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'Thanks! User feedback is indeed crucial for MVP success.'),
(2, NULL, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'These design principles are timeless. Well explained!'),
(3, NULL, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'Growth hacking has changed how we think about marketing.'),
(4, NULL, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'AI is transforming every industry. Exciting times ahead!');

-- Team
INSERT INTO team (product_name, team_size, equity_split, product_stage, roles, product_description) VALUES
('EcoTracker', 3, 33, 'mvp', 'Developer, Designer, Marketer', 'Sustainability tracking app for businesses'),
('HealthAI', 4, 25, 'prototype', 'ML Engineer, Frontend Dev, Backend Dev, Product Manager', 'AI-powered health monitoring platform'),
('EduTech Pro', 2, 50, 'idea', 'Full-stack Developer, UX Designer', 'Personalized learning platform for students'),
('FinFlow', 5, 20, 'launched', 'CEO, CTO, CFO, Designer, Developer', 'Financial planning tool for millennials'),
('SocialSync', 3, 33, 'mvp', 'Backend Developer, Mobile Developer, Growth Hacker', 'Social media management platform');

-- Message Rooms
INSERT INTO message_rooms () VALUES (), (), (), (), ();

-- Message Room Members (Composite Primary Key)
INSERT INTO message_room_members (message_room_id, profile_id) VALUES
(1, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(2, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(3, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(4, '0b46e383-c42f-4725-9582-ae94a1a07dde'),
(5, '0b46e383-c42f-4725-9582-ae94a1a07dde');

-- Messages
INSERT INTO messages (message_room_id, sender_id, content, seen) VALUES
(1, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'Hey! How is the project going?', true),
(1, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'Great! We just finished the MVP', false),
(2, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'Can we schedule a meeting?', true),
(3, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'I have some feedback on the design', false),
(4, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'The new features look amazing!', true);

-- Notifications
INSERT INTO notifications (source_id, product_id, post_id, target_id, type) VALUES
('0b46e383-c42f-4725-9582-ae94a1a07dde', 1, NULL, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'review'),
('0b46e383-c42f-4725-9582-ae94a1a07dde', NULL, 1, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'reply'),
('0b46e383-c42f-4725-9582-ae94a1a07dde', NULL, NULL, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'follow'),
('0b46e383-c42f-4725-9582-ae94a1a07dde', 2, NULL, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'review'),
('0b46e383-c42f-4725-9582-ae94a1a07dde', NULL, 2, '0b46e383-c42f-4725-9582-ae94a1a07dde', 'mention');

-- Followers (Composite Primary Key - using same profile_id for demonstration)
-- Note: In real scenario, these would be different profile_ids
INSERT INTO followers (follower_id, following_id) VALUES
('0b46e383-c42f-4725-9582-ae94a1a07dde', '0b46e383-c42f-4725-9582-ae94a1a07dde');
