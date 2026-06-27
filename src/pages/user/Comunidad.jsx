import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus, Smile } from 'lucide-react';

const mockPosts = [
  {
    id: 1,
    user: "Valeria Mendoza",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=60",
    time: "Hace 10 min",
    content: "¡Preparando mi almuerzo post-entrenamiento! Bowl de quinua con pechuga de pollo, palta y espinaca fresca. 550 Kcal impecables. 🔥🥗",
    likes: 24,
    comments: 5,
    liked: false
  },
  {
    id: 2,
    user: "Carlos Romero",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=60",
    time: "Hace 1 hora",
    content: "Para los que buscan opciones rápidas en la calle: Encontré que el puesto de ensaladas de Doña María tiene la mejor relación calidad-precio y macros exactos. ¡Recomendadísimo!",
    likes: 42,
    comments: 12,
    liked: true
  }
];

const Comunidad = () => {
  const [posts, setPosts] = useState(mockPosts);
  const [newPostText, setNewPostText] = useState('');

  const handleLike = (id) => {
    setPosts(posts.map(post => {
      if (post.id === id) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    const newPost = {
      id: Date.now(),
      user: "Tú",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=60",
      time: "Ahora mismo",
      content: newPostText,
      likes: 0,
      comments: 0,
      liked: false
    };

    setPosts([newPost, ...posts]);
    setNewPostText('');
  };

  return (
    <div className="flex flex-col gap-4" style={{ paddingTop: '1rem' }}>
      <h2>Comunidad Saludable</h2>
      
      {/* Create Post Form */}
      <form onSubmit={handleAddPost} className="glass-panel flex flex-col gap-3">
        <textarea
          placeholder="Comparte tu plato del día o tips nutricionales..."
          value={newPostText}
          onChange={e => setNewPostText(e.target.value)}
          rows="2"
          style={{ resize: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
        />
        <div className="flex justify-between items-center">
          <Smile size={20} className="text-muted" style={{ cursor: 'pointer' }} />
          <button type="submit" className="btn btn-primary flex items-center gap-1" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
            <Plus size={16} /> Publicar
          </button>
        </div>
      </form>

      {/* Feed */}
      <div className="flex flex-col gap-4">
        {posts.map(post => (
          <div key={post.id} className="glass-panel flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <img 
                src={post.avatar} 
                alt={post.user} 
                style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover', border: '1px solid var(--border-color)' }} 
              />
              <div>
                <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{post.user}</h4>
                <span className="text-xs text-muted">{post.time}</span>
              </div>
            </div>

            <p style={{ fontSize: '0.9rem', lineHeight: '1.4' }}>{post.content}</p>

            <div className="flex gap-6 mt-2 pt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
              <button 
                className="flex items-center gap-1 text-sm" 
                style={{ background: 'transparent', color: post.liked ? 'var(--secondary)' : 'var(--text-muted)' }}
                onClick={() => handleLike(post.id)}
              >
                <Heart size={16} fill={post.liked ? 'currentColor' : 'none'} />
                {post.likes}
              </button>
              <button className="flex items-center gap-1 text-sm text-muted" style={{ background: 'transparent' }}>
                <MessageCircle size={16} />
                {post.comments}
              </button>
              <button className="flex items-center gap-1 text-sm text-muted" style={{ background: 'transparent', marginLeft: 'auto' }}>
                <Share2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comunidad;
