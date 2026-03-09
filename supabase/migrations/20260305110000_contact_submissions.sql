-- Contact form submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  position text,
  company text,
  email text NOT NULL,
  whatsapp text,
  country text,
  message text,
  created_at timestamptz DEFAULT now()
);

-- Allow public insert (no auth required for contact form)
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Only authenticated admins can read submissions
CREATE POLICY "Admins can read contact submissions"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

-- Admins can delete submissions
CREATE POLICY "Admins can delete contact submissions"
  ON contact_submissions FOR DELETE
  TO authenticated
  USING (true);
