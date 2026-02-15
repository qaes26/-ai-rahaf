-- Create conversations table
CREATE TABLE IF NOT EXISTS conversations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_message TEXT NOT NULL,
  ai_response TEXT NOT NULL,
  has_image BOOLEAN DEFAULT FALSE,
  user_name TEXT DEFAULT 'rahaf',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_conversations_created_at ON conversations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_conversations_user ON conversations(user_name);

-- Enable Row Level Security (RLS)
ALTER TABLE conversations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all operations for now (you can make it more restrictive later)
CREATE POLICY "Enable all access for conversations" ON conversations
  FOR ALL
  USING (true)
  WITH CHECK (true);
