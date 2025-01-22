-- Drop existing table and related objects
drop table if exists public.projects cascade;

-- Create projects table
create table public.projects (
    id uuid default gen_random_uuid() primary key,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    name text not null,
    content text,
    image_url text,
    author text not null,
    user_id uuid references auth.users(id),
    topics text[] default '{}'::text[] not null,
    forms text[] default '{}'::text[] not null
);

-- Enable Row Level Security (RLS)
alter table public.projects enable row level security;

-- Create policies
create policy "Public projects are viewable by everyone"
  on public.projects for select
  using (true);

create policy "Users can insert their own projects"
  on public.projects for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own projects"
  on public.projects for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "Users can delete their own projects"
  on public.projects for delete
  using (auth.uid() = user_id);
