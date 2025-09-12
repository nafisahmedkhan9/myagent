import sqlite3
import json
import uuid
from datetime import datetime, timedelta
from typing import List, Dict, Optional
import os

DATABASE_PATH = "chat_sessions.db"

class DatabaseManager:
    def __init__(self):
        self.init_database()
    
    def init_database(self):
        """Initialize SQLite database with required tables"""
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        # Create sessions table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS sessions (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                last_activity TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                title TEXT DEFAULT 'New Chat'
            )
        ''')
        
        # Create messages table
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                user_message TEXT NOT NULL,
                bot_response TEXT NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (session_id) REFERENCES sessions (id)
            )
        ''')
        
        # Create index for better performance
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_session_user ON sessions(user_id)')
        cursor.execute('CREATE INDEX IF NOT EXISTS idx_messages_session ON messages(session_id)')
        
        conn.commit()
        conn.close()
    
    def generate_session_id(self) -> str:
        """Generate unique session ID"""
        return str(uuid.uuid4())
    
    def generate_user_id(self) -> str:
        """Generate unique user ID (can be enhanced with actual user auth later)"""
        return str(uuid.uuid4())
    
    def create_session(self, user_id: str, title: str = "New Chat") -> str:
        """Create new chat session"""
        session_id = self.generate_session_id()
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            INSERT INTO sessions (id, user_id, title)
            VALUES (?, ?, ?)
        ''', (session_id, user_id, title))
        
        conn.commit()
        conn.close()
        return session_id
    
    def save_message(self, session_id: str, user_message: str, bot_response: str):
        """Save user message and bot response to database"""
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        # Save the message
        cursor.execute('''
            INSERT INTO messages (session_id, user_message, bot_response)
            VALUES (?, ?, ?)
        ''', (session_id, user_message, bot_response))
        
        # Update session last activity
        cursor.execute('''
            UPDATE sessions 
            SET last_activity = CURRENT_TIMESTAMP
            WHERE id = ?
        ''', (session_id,))
        
        conn.commit()
        conn.close()
    
    def get_session_history(self, session_id: str) -> List[Dict]:
        """Get chat history for a specific session"""
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT user_message, bot_response, timestamp
            FROM messages
            WHERE session_id = ?
            ORDER BY timestamp ASC
        ''', (session_id,))
        
        messages = []
        for row in cursor.fetchall():
            messages.extend([
                {"role": "user", "content": row[0], "timestamp": row[2]},
                {"role": "assistant", "content": row[1], "timestamp": row[2]}
            ])
        
        conn.close()
        return messages
    
    def get_user_sessions(self, user_id: str, limit: int = 5) -> List[Dict]:
        """Get recent sessions for a user (last 4-5 sessions)"""
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT s.id, s.title, s.created_at, s.last_activity,
                   COUNT(m.id) as message_count
            FROM sessions s
            LEFT JOIN messages m ON s.id = m.session_id
            WHERE s.user_id = ?
            GROUP BY s.id
            ORDER BY s.last_activity DESC
            LIMIT ?
        ''', (user_id, limit))
        
        sessions = []
        for row in cursor.fetchall():
            sessions.append({
                "id": row[0],
                "title": row[1],
                "created_at": row[2],
                "last_activity": row[3],
                "message_count": row[4]
            })
        
        conn.close()
        return sessions
    
    def session_exists(self, session_id: str) -> bool:
        """Check if session exists"""
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        cursor.execute('SELECT 1 FROM sessions WHERE id = ?', (session_id,))
        exists = cursor.fetchone() is not None
        
        conn.close()
        return exists
    
    def cleanup_old_sessions(self, days_old: int = 30):
        """Clean up sessions older than specified days"""
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        cutoff_date = datetime.now() - timedelta(days=days_old)
        
        # Delete old messages first (foreign key constraint)
        cursor.execute('''
            DELETE FROM messages 
            WHERE session_id IN (
                SELECT id FROM sessions 
                WHERE last_activity < ?
            )
        ''', (cutoff_date,))
        
        # Delete old sessions
        cursor.execute('''
            DELETE FROM sessions 
            WHERE last_activity < ?
        ''', (cutoff_date,))
        
        conn.commit()
        conn.close()
    
    def get_conversation_context(self, session_id: str, max_messages: int = 10) -> List[Dict]:
        """Get recent conversation context for AI model"""
        conn = sqlite3.connect(DATABASE_PATH)
        cursor = conn.cursor()
        
        cursor.execute('''
            SELECT user_message, bot_response
            FROM messages
            WHERE session_id = ?
            ORDER BY timestamp DESC
            LIMIT ?
        ''', (session_id, max_messages // 2))  # Divide by 2 since each row has user + bot message
        
        context = []
        for row in reversed(cursor.fetchall()):  # Reverse to get chronological order
            context.append({"role": "user", "content": row[0]})
            context.append({"role": "assistant", "content": row[1]})
        
        conn.close()
        return context

# Global database manager instance
db_manager = DatabaseManager()
