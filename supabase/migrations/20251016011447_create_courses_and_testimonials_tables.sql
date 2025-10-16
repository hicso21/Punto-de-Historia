/*
  # Create Courses and Testimonials Tables

  1. New Tables
    - `courses`
      - `id` (uuid, primary key) - Unique identifier for each course
      - `title` (text) - Course/e-book title
      - `short_description` (text) - Brief description shown in card
      - `full_description` (text) - Extended description shown in modal
      - `image_url` (text) - URL to course image
      - `purchase_link` (text) - External link for purchasing
      - `order_index` (integer) - For controlling display order
      - `created_at` (timestamptz) - Record creation timestamp

    - `testimonials`
      - `id` (uuid, primary key) - Unique identifier for each testimonial
      - `first_name` (text) - Testimonial author's first name
      - `last_name` (text) - Testimonial author's last name
      - `message` (text) - Testimonial message content
      - `created_at` (timestamptz) - Record creation timestamp

  2. Security
    - Enable RLS on both tables
    - Add policies for public read access (no authentication required for viewing)
    - Data is public for landing page display

  3. Important Notes
    - Both tables use default values for automatic field population
    - Order index allows manual sorting of courses
    - All text fields are required (NOT NULL)
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  short_description text NOT NULL,
  full_description text NOT NULL,
  image_url text NOT NULL,
  purchase_link text NOT NULL,
  order_index integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  message text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access
CREATE POLICY "Anyone can view courses"
  ON courses
  FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view testimonials"
  ON testimonials
  FOR SELECT
  USING (true);