import React, { useState, useContext, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaMapMarkerAlt, FaLinkedin, FaGithub, FaTwitter, FaEdit, FaSave } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext';


const MyProfile = () => {
  const { user } = useContext(AuthContext);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    linkedin: '',
    github: '',
    twitter: ''
  });
  const [loading, setLoading] = useState(true);

  // Load profile data from Firestore
  useEffect(() => {
    const fetchProfile = async () => {
      if (user) {
        try {
          const docRef = doc(db, 'profiles', user.uid);
          const docSnap = await getDoc(docRef);
          
          if (docSnap.exists()) {
            setProfile(docSnap.data());
          } else {
            
            setProfile({
              name: user.displayName || '',
              email: user.email || '',
              phone: '',
              location: '',
              bio: '',
              linkedin: '',
              github: '',
              twitter: ''
            });
          }
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchProfile();
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    try {
      // Save to Firestore
      await setDoc(doc(db, 'profiles', user.uid), profile, { merge: true });
      setIsEditing(false);
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md p-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold mb-4">Please sign in to view your profile</h2>
          <p className="text-gray-600">You need to be authenticated to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-15 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        {/* Profile Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">{user.displayName || 'Your Profile'}</h1>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-gray-100 transition"
              disabled={loading}
            >
              {isEditing ? (
                <>
                  <FaSave /> Save
                </>
              ) : (
                <>
                  <FaEdit /> Edit Profile
                </>
              )}
            </button>
          </div>
          <p className="mt-2 opacity-90">{profile.bio || 'Tell us about yourself'}</p>
        </div>

        {/* Profile Content */}
        <div className="p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={user.name}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Bio</label>
                    <textarea
                      name="bio"
                      value={profile.bio}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-xl font-semibold mb-4">Social Links</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">LinkedIn</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md bg-gray-200 text-gray-700">
                        linkedin.com/in/
                      </span>
                      <input
                        type="text"
                        name="linkedin"
                        value={profile.linkedin}
                        onChange={handleChange}
                        className="flex-1 px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">GitHub</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md bg-gray-200 text-gray-700">
                        github.com/
                      </span>
                      <input
                        type="text"
                        name="github"
                        value={profile.github}
                        onChange={handleChange}
                        className="flex-1 px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Twitter</label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 rounded-l-md bg-gray-200 text-gray-700">
                        twitter.com/
                      </span>
                      <input
                        type="text"
                        name="twitter"
                        value={profile.twitter}
                        onChange={handleChange}
                        className="flex-1 px-4 py-2 border rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start">
                    <FaUser className="mt-1 mr-4 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-700">Full Name</h3>
                      <p className="text-gray-600">{profile.name || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaEnvelope className="mt-1 mr-4 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-700">Email</h3>
                      <p className="text-gray-600">{profile.email || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaPhone className="mt-1 mr-4 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-700">Phone</h3>
                      <p className="text-gray-600">{profile.phone || 'Not provided'}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <FaMapMarkerAlt className="mt-1 mr-4 text-blue-500" />
                    <div>
                      <h3 className="font-semibold text-gray-700">Location</h3>
                      <p className="text-gray-600">{profile.location || 'Not provided'}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2">About Me</h3>
                  <p className="text-gray-600">{profile.bio || 'No bio yet'}</p>
                </div>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Social Links</h3>
                <div className="flex flex-wrap gap-4">
                  {profile.linkedin && (
                    <a 
                      href={`https://linkedin.com/in/${profile.linkedin}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"
                    >
                      <FaLinkedin className="mr-2" />
                      LinkedIn
                    </a>
                  )}
                  {profile.github && (
                    <a 
                      href={`https://github.com/${profile.github}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-gray-50 text-gray-800 rounded-lg hover:bg-gray-100 transition"
                    >
                      <FaGithub className="mr-2" />
                      GitHub
                    </a>
                  )}
                  {profile.twitter && (
                    <a 
                      href={`https://twitter.com/${profile.twitter}`} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-blue-100 text-blue-500 rounded-lg hover:bg-blue-200 transition"
                    >
                      <FaTwitter className="mr-2" />
                      Twitter
                    </a>
                  )}
                  {!profile.linkedin && !profile.github && !profile.twitter && (
                    <p className="text-gray-500">No social links added yet</p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;