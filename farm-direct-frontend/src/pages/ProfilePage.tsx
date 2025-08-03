import React from 'react';

interface UserProfile {
    name: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
}

const mockUser: UserProfile = {
    name: 'Jane Doe',
    email: 'jane.doe@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    bio: 'Passionate about sustainable farming and fresh produce.',
};

const ProfilePage: React.FC = () => {
    const user = mockUser;

    return (
        <div style={{ maxWidth: 400, margin: '40px auto', padding: 24, boxShadow: '0 2px 8px #eee', borderRadius: 8 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <img
                    src={user.avatarUrl}
                    alt={user.name}
                    style={{ width: 100, height: 100, borderRadius: '50%', marginBottom: 16 }}
                />
                <h2>{user.name}</h2>
                <p style={{ color: '#888' }}>{user.email}</p>
                {user.bio && <p style={{ marginTop: 16 }}>{user.bio}</p>}
            </div>
        </div>
    );
};

export default ProfilePage;